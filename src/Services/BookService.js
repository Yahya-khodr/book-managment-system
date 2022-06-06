import { db } from "../firebase";

//method helps to connect react with firestore collections
//methods are availble in firstore for crud operaitons
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

//firslty we need to have reference of our collection
const bookCollectionRef = collection(db, "books");

//we need to define a class,inside it we have methods which include code
//on data which do crud operations
class BookDataService {
  addBooks = (newBook) => {
    return addDoc(bookCollectionRef, newBook);
  };

  updateBook = (id, updatedBook) => {
    const bookDoc = doc(db, "books", id);
    return updateDoc(bookDoc, updatedBook);
  };

  deleteBook = (id) => {
    const bookDoc = doc(db, "books", id);
    return deleteDoc(bookDoc);
  };

  getAllBooks = () => {
    return getDocs(bookCollectionRef);
  };

  getBook = (id) => {
    const bookDoc = doc(db, "books", id);
    return getDoc(bookDoc);
  };
}

export default new BookDataService();