import { useState } from "react";
import imageCompression from "browser-image-compression";

const SimpleCompress = () => {
  const [compressedFileURL, setCompressedFileURL] = useState("");
  const handleUpload = async (event) => {
    const imageFile = event.target.files[0];
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    if (options.maxSizeMB >= imageFile / 1024) {
      // smaller than maxSizeMB
      alert("Image is too small, cant be compressed");
      return 0;
    }

    try {
      const compressedFile = await imageCompression(imageFile, options);

      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob
      ); // true

      //console.log(URL.createObjectURL(compressedFile));
      setCompressedFileURL(URL.createObjectURL(compressedFile));
      return compressedFile;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>SimpleCompress</h2>{" "}
      <input
        type="file"
        accept="image/*"
        onChange={(event) => handleUpload(event)}
      ></input>
      <img src={compressedFileURL}></img>
    </div>
  );
};

export default SimpleCompress;
