import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Inventoryform from '../components/InventoryForm';
import { db, getAllInventory, getInventoryItemById } from '../firestore/index';
import { query, collection, onSnapshot } from 'firebase/firestore';
import styles from './UpdateItem.module.scss';

export default function UpdateItem() {
  const [allItems, setAllItems] = useState([]);

  const getItemById = (id) => {
    const selectedItem = getInventoryItemById(id);
    console.log(selectedItem);
  };

  useEffect(() => {
    // const getInv = async () => {
    //   const invItems = await getAllInventory();
    //   setAllItems(invItems);
    // };
    // getInv();
    let items = [];
    const q = query(collection(db, 'inventory-items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setAllItems(items);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={styles.updatePage}>
      {allItems.map((item) => {
        return (
          <div key={item.inventoryId} className={styles.itemLine}>
            <div className={styles.col1}>{item.name}</div>
            <div className={styles.col2}>{item.supplier}</div>
            <div className={styles.col3}>
              Quantity on hand: {item.quantityInStock}
            </div>
            <div className={styles.col4}>
              Quick add: <i className="fas fa-plus fa-1x"></i>
            </div>
            <div className={styles.col5}>
              Quick subtract: <i className="fas fa-minus fa-1x"></i>
            </div>
            <div className={styles.col6}>
              Edit: <i className="fas fa-edit fa-1x"></i>
            </div>
          </div>
        );
      })}
    </div>
  );
}
