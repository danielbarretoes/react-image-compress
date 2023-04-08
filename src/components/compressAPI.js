/* ---------------------------------------- */
/* || COMPRESS API - V.2.0 ||
/*
/* Last update: 09 04 2023
/* By Daniel Izef Barreto Tejada

/* COMPRESS CORE API FUNTIONS
    - compressImageAttachment (imageAttachment)
    - downloadLocalAttachmentURL (attachment)
*/

/* ---------------------------------------- */
/* || LIBRARY IMPORTS || */
import imageCompression from "browser-image-compression";

/* ---------------------------------------- */
// Connection Test.
export const connection = () => {
  console.log("Compress API v2.0 connected.");
};

/* ---------------------------------------- */
/* COMPRESS CORE API FUNTIONS */

/**
 * Compress a single image attachment
 * @param {string} imageAttachment
 * @returns {file} userCredential {object}.
 * @version 3.0
 */
export const compressImageAttachment = async (imageAttachment) => {
  if (imageAttachment === null) {
    console.log("The imageAttachment is invalid.");
    return null;
  }

  // Display original size
  console.log(
    `Original file size: ${
      Math.round((imageAttachment.size / 1024 / 1024) * 100) / 100
    } MB`
  );

  // Set compress options
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  // If the file is smaller than minimun options, skip
  if (options.maxSizeMB >= imageAttachment.size / 1024 / 1024) {
    // smaller than maxSizeMB
    console.log("Image is too small, cant be compressed");
    // Return the same as input
    return imageAttachment;
  }

  // Excecution
  try {
    const compressResult = await imageCompression(imageAttachment, options);
    //console.log("Compressing:", compressResult instanceof Blob); // true
    // Display compressed size
    console.log(
      `Compressed file size: ${
        Math.round((compressResult.size / 1024 / 1024) * 100) / 100
      } MB`
    );
    // Return the compressed file
    return compressResult;
  } catch (error) {
    console.log(error);
  }
};

export const downloadLocalAttachmentURL = (attachment) => {
  console.log(URL.createObjectURL(attachment));
  const localURL = URL.createObjectURL(attachment);
  return localURL;
};

/* ---------------------------------------- */
/* CALL SAMPLE

import { useState } from "react";
import { compressImageAttachment, downloadLocalAttachmentURL } from "./compressAPI";

const SimpleCompress = () => {
  const [compressedFileURL, setCompressedFileURL] = useState("");

  // Compress funtion
  const handleUpload = async (event) => {
    const imageAttachment = event.target.files[0];
    const compressResult = await compressImageAttachment(imageAttachment);
    setCompressedFileURL(downloadLocalAttachmentURL(compressResult));
  };

  return (
    <div>
      <h2>SimpleCompress</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(event) => handleUpload(event)}
      ></input>
      <img src={compressedFileURL} alt="img"></img>
    </div>
  );
};

export default SimpleCompress;

*/
