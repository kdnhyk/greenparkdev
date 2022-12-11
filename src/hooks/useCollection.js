import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { appFireStore } from "../firebase";

export const useCollection = (transaction, id) => {
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    if (!id) {
      const unsubscribe = onSnapshot(
        query(
          collection(appFireStore, transaction),
          orderBy("createdTime", "desc")
        ),
        (snapshot) => {
          let result = [];
          snapshot.docs.forEach((doc) => {
            result.push({ ...doc.data(), id: doc.id });
          });

          setDocuments(result);
        },
        (error) => {
          console.log(error.message);
        }
      );
      return unsubscribe;
    } else if (id) {
      const q = query(
        collection(appFireStore, transaction),
        where("title", "==", id),
        limit(1)
      );

      console.log("FireStore Access");
      let result = [];
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(result);
      });
    }
  }, [collection]);

  return { documents };
};
