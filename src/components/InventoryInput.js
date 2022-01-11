import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './InventoryInput.module.scss';

export default function InventoryInput() {
  return (
    <div className={styles.inventoryPage}>
      <Form className={styles.form}>
        <Form.Group className={styles.formGroup1} controlId="itemName">
          <Form.Label>New Item Name</Form.Label>
          <Form.Control
            className={styles.textInput}
            required
            placeholder="product name"
          />
        </Form.Group>
        <Form.Group className={styles.formGroup1} controlId="inventoryId">
          <Form.Label>Inventory ID Number</Form.Label>
          <Form.Control className={styles.textInput} />
          <Form.Text>
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
          />
        </Form.Group>
        <div className={styles.formGroupWrapper}>
          <Form.Group className={styles.formGroup2} controlId="itemSize">
            <Form.Label>Item Size (if any)</Form.Label>
            <Form.Control className={styles.textInput} />
          </Form.Group>
          <Form.Group className={styles.formGroup2} controlId="itemColor">
            <Form.Label>Item Color (if any)</Form.Label>
            <Form.Control className={styles.textInput} />
          </Form.Group>
        </div>
        <div className={styles.formGroupWrapper}>
          <Form.Group className={styles.formGroup2} controlId="category">
            <Form.Label>Category (if any)</Form.Label>
            <Form.Control className={styles.textInput} />
          </Form.Group>
          <Form.Group
            className={styles.formGroup2}
            controlId="wholesaleSupplier"
          >
            <Form.Label>Wholesale Supplier Name</Form.Label>
            <Form.Control className={styles.textInput} />
          </Form.Group>
        </div>
        <div className={styles.formGroupWrapper}>
          <Form.Group className={styles.formGroup4} controlId="wholesalePrice">
            <Form.Label>Wholesale Price $</Form.Label>
            <Form.Control className={styles.textInput} type="number" />
          </Form.Group>
          <Form.Group className={styles.formGroup4} controlId="retailPrice">
            <Form.Label>Retail Price $</Form.Label>
            <Form.Control className={styles.textInput} type="number" />
          </Form.Group>
          <Form.Group className={styles.formGroup4} controlId="quantityInStock">
            <Form.Label>Quantity In Stock</Form.Label>
            <Form.Control className={styles.textInput} type="number" />
          </Form.Group>
          <Form.Group className={styles.formGroup4} controlId="lowStockAlert">
            <Form.Label>Low Stock alert</Form.Label>
            <Form.Control
              className={styles.textInput}
              placeholder="Set re-order alert when stock goes down to this number"
              type="number"
            />
          </Form.Group>
        </div>
      </Form>
    </div>
  );
}
