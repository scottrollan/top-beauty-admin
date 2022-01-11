import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBvy8d4VGvdvghWrpvbI_v-_Xan9ur2Nh0',
  authDomain: 'top-beauty-6dd29.firebaseapp.com',
  projectId: 'top-beauty-6dd29',
  storageBucket: 'top-beauty-6dd29.appspot.com',
  messagingSenderId: '1021972171410',
  appId: '1:1021972171410:web:93c26baf7cd204e308f44b',
});

const firestore = getFirestore();

export const getAllInventory = async () => {
  let items = [];
  const querySnapshot = await getDocs(collection(firestore, 'inventory-items'));
  querySnapshot.forEach((item) => {
    items = [...items, { ...item.data() }];
  });

  return items;
};
