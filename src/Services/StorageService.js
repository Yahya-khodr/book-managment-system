import { storage } from '../firebase'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";


export async function upload(file, currentBook, setLoading) {
  const fileRef = ref(storage, currentBook.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  
  setLoading(false);
  alert("Uploaded file!");
}
