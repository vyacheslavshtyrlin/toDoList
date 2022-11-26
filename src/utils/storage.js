import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "./firebase";
import dayjs from "dayjs";

const BUCKET_URL = "todolistproject-3edcb.appspot.com";

export async function uploadFile(file) {
  console.log(file)
  const formattedDate = dayjs().format("YYYY-MM-DDTHH:mm");
  const bucket = `${BUCKET_URL}/files/${file.name}`;
  await uploadBytes(ref(storage, bucket), file);
  return bucket;
}

export async function getDownloadLink(bucket) {
  const fileRef = ref(storage, `${bucket}`);
  return await getDownloadURL(fileRef);
}

export function deleteFile(bucket) {
  deleteObject(ref(storage, bucket));
}
