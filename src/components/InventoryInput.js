import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { uploadImage } from '../firestore/index';
import { createRandomString } from '../functions/CreateRandomString';
import styles from './InventoryInput.module.scss';

export default function InventoryInput() {
  const [newItem, setNewItem] = useState({
    category: '',
    images: [],
    inventoryId: '',
    itemName: '',
    itemDescription: '',
    itemSize: '',
    itemColor: '',
    lowStockAlert: 0,
    quantityInStock: 0,
    wholesalePrice: 0,
    retailPrice: 0,
    wholesaleSupplier: '',
  });
  const [newImage, setNewImage] = useState(null);

  const changeValue = (key, value) => {
    setNewItem({ ...newItem, [key]: value });
  };

  const addNewImage = (file) => {
    const name = createRandomString(10);
    uploadImage(file, name);
    console.log(`Original file name: ${file.name}`);
  };

  const addNewItem = (event) => {
    event.preventDefault();
    console.log(newItem);
  };

  return (
    <div className={styles.inventoryPage}>
      <Form className={styles.form} onSubmit={addNewItem}>
        <Form.Group className={styles.formGroup1} controlId="itemName">
          <Form.Label>New Item Name</Form.Label>
          <Form.Control
            className={styles.textInput}
            required
            placeholder="product name"
            value={newItem.itemName}
            onChange={(e) => changeValue('itemName', e.target.value)}
          />
        </Form.Group>
        <Form.Group className={styles.formGroup1} controlId="inventoryId">
          <Form.Label>Inventory ID Number</Form.Label>
          <Form.Control
            value={newItem.inventoryId}
            onChange={(e) => changeValue('inventoryId', e.target.value)}
            className={styles.textInput}
          />
          <Form.Text className={styles.formText}>
            This number will be automatically generated if you don't supply one.
          </Form.Text>
        </Form.Group>
        <Form.Group className={styles.formGroup1} controlId="itemDescription">
          <Form.Label>Item Description</Form.Label>
          <Form.Control
            className={styles.textInput}
            as="textarea"
            rows={4}
            placeholder="This will be visible to customers on the app/website"
            value={newItem.itemDescription}
            onChange={(e) => changeValue('itemDescription', e.target.value)}
          />
        </Form.Group>
        <div className={styles.formGroupWrapper}>
          <Form.Group className={styles.formGroup2} controlId="itemSize">
            <Form.Label>Item Size (if any)</Form.Label>
            <Form.Control
              className={styles.textInput}
              value={newItem.itemSize}
              onChange={(e) => changeValue('itemSize', e.target.value)}
            />
          </Form.Group>
          <Form.Group className={styles.formGroup2} controlId="itemColor">
            <Form.Label>Item Color (if any)</Form.Label>
            <Form.Control
              value={newItem.itemColor}
              onChange={(e) => changeValue('itemColor', e.target.value)}
              className={styles.textInput}
            />
          </Form.Group>
        </div>
        <div className={styles.formGroupWrapper}>
          <Form.Group className={styles.formGroup2} controlId="category">
            <Form.Label>Category (if any)</Form.Label>
            <Form.Control
              value={newItem.category}
              onChange={(e) => changeValue('category', e.target.value)}
              className={styles.textInput}
            />
          </Form.Group>
          <Form.Group
            className={styles.formGroup2}
            controlId="wholesaleSupplier"
          >
            <Form.Label>Wholesale Supplier Name</Form.Label>
            <Form.Control
              value={newItem.wholesaleSupplier}
              onChange={(e) => changeValue('wholesaleSupplier', e.target.value)}
              className={styles.textInput}
            />
          </Form.Group>
        </div>
        <div className={styles.formGroupWrapper}>
          <Form.Group className={styles.formGroup4} controlId="wholesalePrice">
            <Form.Label>Wholesale Price $</Form.Label>
            <Form.Control
              className={styles.textInput}
              type="number"
              step="0.01"
              value={newItem.wholesalePrice}
              onChange={(e) => changeValue('wholesalePrice', e.target.value)}
            />
          </Form.Group>
          <Form.Group className={styles.formGroup4} controlId="retailPrice">
            <Form.Label>Retail Price $</Form.Label>
            <Form.Control
              className={styles.textInput}
              type="number"
              step="0.01"
              value={newItem.retailPrice}
              onChange={(e) => changeValue('retailPrice', e.target.value)}
            />
          </Form.Group>
          <Form.Group className={styles.formGroup4} controlId="quantityInStock">
            <Form.Label>Quantity In Stock</Form.Label>
            <Form.Control
              className={styles.textInput}
              type="number"
              value={newItem.quantityInStock}
              onChange={(e) => changeValue('quantityInStock', e.target.value)}
            />
          </Form.Group>
          <Form.Group className={styles.formGroup4} controlId="lowStockAlert">
            <Form.Label>Low Stock alert</Form.Label>
            <Form.Control
              className={styles.textInput}
              placeholder="Set re-order alert when stock goes down to this number"
              type="number"
              value={newItem.lowStockAlert}
              onChange={(e) => changeValue('lowStockAlert', e.target.value)}
            />
          </Form.Group>
        </div>
        <Form.Group className={styles.formGroup1} controlId="images">
          <Form.Label>Choose Image(s)</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={(e) => addNewImage(e.target.files[0])}
          />
        </Form.Group>
        <p className={styles.formGroupWrapper}>
          Item name, description, size/color (if any) and retail price will all
          be visible to customers on the website/app
        </p>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
