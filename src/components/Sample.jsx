import { useState } from "react";

import { Container, Grid, Image, Item, Button } from "semantic-ui-react";


import imageCompression from "browser-image-compression";

function Sample() {
  const [origImage, setOrigImage] = useState("");

  const [origImageFile, setOrigImageFile] = useState("");

  const [compressedImage, setCompressedImage] = useState("");

  const [fileName, setFileName] = useState("");

  const handle = (e) => {
    const imageFile = e.target.files[0];

    setOrigImage(imageFile);

    setOrigImageFile(URL.createObjectURL(imageFile));

    setFileName(imageFile.name);
  };

  const handleCompressImage = (e) => {
    e.preventDefault();

    const options = {
      maxSizeMB: 1,

      maxWidthOrHeight: 500,

      useWebWorker: true,
    };

    if (options.maxSizeMB >= origImage / 1024) {
      alert("Image is too small, cant be compressed");

      return 0;
    }

    let output;

    imageCompression(origImage, options).then((x) => {
      output = x;

      const downloadLink = URL.createObjectURL(output);

      setCompressedImage(downloadLink);
    });
  };

  return (
    <div className="App">
      <h1></h1>

      <Container>
        <Grid>
          <Grid.Column width={6}>
            <Item>
              {origImageFile ? (
                <Image src={origImageFile}></Image>
              ) : (
                <Image src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"></Image>
              )}
            </Item>
          </Grid.Column>

          <Grid.Column width={4}>
            <input
              type="file"
              accept="image/*"
              className="mt-2 btn btn-dark w-75"
              onChange={(e) => handle(e)}
            />

            <h1></h1>

            {origImageFile && (
              <Button
                primary
                onClick={(e) => {
                  handleCompressImage(e);
                }}
              >
                {" "}
                Compress Image
              </Button>
            )}

            <h1></h1>

            {compressedImage && (
              <Button>
                <a href={compressedImage} download={fileName}>
                  {" "}
                  Download Image
                </a>
              </Button>
            )}
          </Grid.Column>

          <Grid.Column width={6}>
            <Item>
              {compressedImage ? (
                <Image src={compressedImage}></Image>
              ) : (
                <Image src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"></Image>
              )}
            </Item>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

export default Sample;
