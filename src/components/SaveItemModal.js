import React from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { saveInventoryItem } from '../firestore/index';
import { createRandomString } from '../functions/CreateRandomString';
import styles from './SaveItemModal.module.scss';

export default function SaveItemModal({ title, item, show, setShow }) {
  const saveToFirestore = () => {
    const newIdNum = createRandomString(20);
    const saveItem = { ...item, inventoryId: newIdNum };

    Object.keys(saveItem).forEach((key) => {
      if (saveItem[key] === '' || !saveItem[key]) {
        delete saveItem[key];
      }
    });
    console.log(saveItem);
    saveInventoryItem(saveItem);
  };
  return (
    <Modal
      title={title}
      size="lg"
      show={show}
      onHide={() => setShow(false)}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>{title}</Modal.Header>
      <Modal.Body>
        <h4>{item.name}</h4>
        <p className={styles.line}>{item.description}</p>
        <p className={styles.line}>
          <span className={styles.segment}>
            {item.size ? `Item Size: ${item.size}     ` : null}
          </span>
          <span className={styles.segment}>
            {item.color ? `Item color: ${item.color}` : null}
          </span>
        </p>
        <p className={styles.line}>
          <span className={styles.segment}>
            {item.category ? `Category: ${item.category}     ` : null}
          </span>
          <span className={styles.segment}>
            {item.wholesaleSupplier
              ? `Wholesale Supplier: ${item.wholesaleSupplier}`
              : null}
          </span>
        </p>
        <p className={styles.line}>
          <span className={styles.segment}>
            Wholsale price: $
            {item.wholesalePrice > 0 ? item.wholesalePrice : '0.00'}
          </span>
          <span className={styles.segment}>
            Retail price: ${item.retailPrice}
          </span>
        </p>
        <p className={styles.line}>
          <span className={styles.segment}>
            {item.quantityInStock !== 0
              ? `Quantity in stock: ${item.quantityInStock}          `
              : null}
          </span>
          <span className={styles.segment}>
            {item.lowStockAlert !== 0
              ? `Low Stock Alert: ${item.lowStockAlert}`
              : null}
          </span>
        </p>
        <div>
          {item.images.map((img, idx) => {
            return (
              <img
                key={`${idx}${img.name}`}
                src={img.url}
                alt="error"
                className={styles.image}
              />
            );
          })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShow(false)}>Go Back</Button>
        <Button onClick={(item) => saveToFirestore(item)}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
