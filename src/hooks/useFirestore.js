import { appFireStore, timestamp } from "../firebase";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";

export const useFirestore = (transaction) => {
  const collectionRef = collection(appFireStore, transaction);

  const addDocument = async (album) => {
    try {
      const createdTime = timestamp.fromDate(new Date());
      const docRef = await setDoc(
        doc(collectionRef, album.title),
        { ...album, createdTime },
        { merge: true }
      );
      console.log(docRef);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteDocument = async (id) => {
    console.log("Del: " + id);
    try {
      await deleteDoc(doc(collectionRef, id));
      console.log(doc(appFireStore, transaction, id));
    } catch (error) {
      console.log(error.message);
    }
  };

  return { addDocument, deleteDocument };
};
