import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { getDownloadLink } from "../utils/storage";
import { db } from "./firebase";

const TODOS_COLLECTION = "todos";

export function addTodo(
  title,
  description,
  date,
  completed,
  fileName,
  fileBucket
) {
  addDoc(collection(db, TODOS_COLLECTION), {
    title,
    description,
    date,
    completed,
    fileName,
    fileBucket,
  });
}

export function editTodo(
  id,
  title,
  description,
  date,
  completed,
  fileName,
  fileBucket
) {
  setDoc(doc(db, TODOS_COLLECTION, id), {
    title,
    description,
    date,
    completed,
    fileName,
    fileBucket,
  });
}

export async function getAllTodos(setTodos) {
  const receiptsQuery = query(
    collection(db, TODOS_COLLECTION),
    orderBy("date", "asc")
  );

  const unsubscribe = onSnapshot(receiptsQuery, async (snapshot) => {
    let allTodos = [];
    for (const documentSnapshot of snapshot.docs) {
      const todos = documentSnapshot.data();
      if (!todos.fileBucket) {
        allTodos.push({
          ...todos,
          id: documentSnapshot.id,
          link: false,
        });
      } else {
        allTodos.push({
          ...todos,
          id: documentSnapshot.id,
          link: await getDownloadLink(todos.fileBucket),
        });
      }
    }
    setTodos(allTodos);
  });
  return unsubscribe;
}

export function deleteTodo(id) {
  deleteDoc(doc(db, TODOS_COLLECTION, id));
}
