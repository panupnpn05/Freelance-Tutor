// pages/index.js
import { useEffect, useState } from "react";
import { storage } from "./api/getimage"; // Update the path to your firebase.js file
import { ref, getDownloadURL } from "firebase/storage";

const MyImage = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await getDownloadURL(ref(storage, "myImage.png"));
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div>
      {imageUrl && (
        <>
          {/* Display image directly */}
          <img src={imageUrl} alt="Stars" />

          {/* Or use it in an <img> element */}
          {/* <img id="myimg" src={imageUrl} alt="Stars" /> */}
        </>
      )}
    </div>
  );
};

export default MyImage;
