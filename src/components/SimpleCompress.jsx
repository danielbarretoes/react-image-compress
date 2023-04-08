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
