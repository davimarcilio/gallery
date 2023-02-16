// Import the functions you need from the SDKs you need
import { User } from "@/context/UserContext";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { api } from "../axios";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeSVFzg6mogtGN25Yg-1qjVIzcKetyC98",
  authDomain: "gallery-44ffe.firebaseapp.com",
  projectId: "gallery-44ffe",
  storageBucket: "gallery-44ffe.appspot.com",
  messagingSenderId: "542582950847",
  appId: "1:542582950847:web:a08b19ea31a2fcfbb86f0a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function uploadImage(user: User, file: File) {
  try {
    const fileRef = ref(storage, `${user.login}/${file.name}`);
    const bytesUploaded = await uploadBytes(fileRef, file);

    const response = await api.post(
      "/image/upload",
      {
        name: file.name,
        size: file.size,
        src: `https://firebasestorage.googleapis.com/v0/b/${bytesUploaded.metadata.bucket}/o/${user.login}%2F${bytesUploaded.metadata.name}?alt=media`,
        userId: user.id,
      },
      {
        headers: {
          "authorization-token": user.authToken,
        },
      }
    );

    return {
      success: bytesUploaded.metadata.timeCreated,
      toDatabase: true,
    };
  } catch (error) {
    return error;
  }
}
