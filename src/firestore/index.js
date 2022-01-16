import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBvy8d4VGvdvghWrpvbI_v-_Xan9ur2Nh0',
  authDomain: 'top-beauty-6dd29.firebaseapp.com',
  projectId: 'top-beauty-6dd29',
  storageBucket: 'top-beauty-6dd29.appspot.com',
  messagingSenderId: '1021972171410',
  appId: '1:1021972171410:web:93c26baf7cd204e308f44b',
});

const firestore = getFirestore();

//Storage references//
const storage = getStorage();

export const uploadImage = (file) => {
  const storageRef = ref(storage, `images/${file.name}`);
  return new Promise((resolve) => {
    uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then((url) => {
        const downloadURL = url;
        resolve(downloadURL);
      });
    });
  });
};

export const addInventoryItem = async (item) => {};
