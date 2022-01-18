import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  query,
  onSnapshot,
  doc,
  setDoc,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBvy8d4VGvdvghWrpvbI_v-_Xan9ur2Nh0',
  authDomain: 'top-beauty-6dd29.firebaseapp.com',
  projectId: 'top-beauty-6dd29',
  storageBucket: 'top-beauty-6dd29.appspot.com',
  messagingSenderId: '1021972171410',
  appId: '1:1021972171410:web:93c26baf7cd204e308f44b',
});

//Realtime Database Functions//
export const db = getFirestore();

export const getAllInventory = () => {
  return new Promise((resolve) => {
    const q = query(collection(db, 'inventory-items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      resolve(items);
    });
  });
};

export const getInventoryItemById = async (item) => {
  const docRef = doc(db, 'inventory-items', item.inventoryId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      return docData;
    } else {
      console.log('No Such Document');
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const saveInventoryItem = (item) => {
  try {
    setDoc(doc(db, 'inventory-items', item.inventoryId), item);
    console.log(`Item #${item.inventoryId} created/updated!`);
  } catch (error) {
    console.log(error.message);
  }
};

//Storage references//
const storage = getStorage();

export const uploadImage = (file) => {
  return new Promise((resolve) => {
    const storageRef = ref(storage, `images/${file.name}`);
    try {
      uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then((url) => {
          const downloadURL = url;
          resolve(downloadURL); //storageRef is provided for later deletion, if needed
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const deleteImage = (file) => {
  try {
    const storageRef = ref(storage, `images/${file.name}`);
    deleteObject(storageRef);
    console.log('Image deleted successfully.');
  } catch (error) {
    console.log(error.message);
  }
};

export const addInventoryItem = async (item) => {};
