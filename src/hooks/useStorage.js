import { appStorage } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

export const useStorage = () => {
  const upload = async (file, setImageURL) => {
    console.log("upload start");
    const storageRef = ref(appStorage, `images/${file.name}`);

    try {
      if (file === null) return;

      await uploadBytes(storageRef, file);

      getDownloadURL(storageRef).then((url) => {
        console.log(url, "나는 URL");

        setImageURL(url);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteImage = async (url) => {
    const storageRef = ref(appStorage, url);

    try {
      deleteObject(storageRef);
    } catch (error) {
      console.log(error.message);
    }
  };
  return { upload, deleteImage };
};
