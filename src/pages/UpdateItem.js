import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Inventoryform from '../components/InventoryForm';
import { db, getAllInventory, getInventoryItemById } from '../firestore/index';
import { query, collection, onSnapshot } from 'firebase/firestore';
import styles from './UpdateItem.module.scss';

export default function UpdateItem() {
  const [allItems, setAllItems] = useState([]);

  const toggleEditMode = async (id) => {
    const u = document.getElementById(`form${id}`);
    const x = document.getElementById(`x${id}`);
    const e = document.getElementById(`edit${id}`);

    if (u.style.display === 'none') {
      u.style.display = 'inherit';
      x.style.display = 'inherit';
      e.style.display = 'none';
    } else {
      u.style.display = 'none';
      x.style.display = 'none';
      e.style.display = 'inherit';
    }
  };

  useEffect(() => {
    let items = [];
    const q = query(collection(db, 'inventory-items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // items.push(doc.data());
        items = [...items, doc.data()];
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
          <div
            key={item.inventoryId}
            style={{ borderBottom: '2px solid white' }}
          >
            <div className={styles.headerLine}>
              <div className={styles.col1}>{item.name}</div>
              <div>Inventory ID: {item.inventoryId}</div>
            </div>
            <div className={styles.itemLine}>
              <div className={styles.col3}>On hand: {item.quantityInStock}</div>
              <div className={styles.col4}>
                Wholesale: ${item.wholesalePrice}
              </div>
              <div className={styles.col5}>Retail: ${item.retailPrice}</div>
            </div>
            <div
              className={styles.toggleEdit}
              onClick={() => toggleEditMode(item.inventoryId)}
            >
              <i
                className="far fa-times-circle fa-1x"
                id={`x${item.inventoryId}`}
                style={{ display: 'none', color: 'red' }}
              >
                {' '}
              </i>
              <i
                className="fas fa-edit fa-1x green-hover"
                id={`edit${item.inventoryId}`}
              ></i>
            </div>
            <div id={`form${item.inventoryId}`} style={{ display: 'none' }}>
              <Inventoryform thisItem={item} title="Update Inventory Item" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
