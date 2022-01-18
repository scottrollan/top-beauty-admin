import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { uploadImage, deleteImage } from '../firestore/index';
import SaveItemModal from './SaveItemModal';
import styles from './InventoryForm.module.scss';

export default function InventoryInput({ item, setItem, title }) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [imagesArray, setImagesArray] = useState([]);

  const changeValue = (key, value) => {
    setItem({ ...item, [key]: value });
  };

  const addNewImage = async (file) => {
    const fileName = file.name;
    try {
      const url = await uploadImage(file);
      setImagesArray([...imagesArray, { url: url, name: fileName }]);
    } catch (error) {
      console.log(error.message);
    }
    window.document.getElementById('images').value = '';
  };

  const removeImage = (idx, image) => {
    imagesArray.splice(idx, 1);
    setImagesArray([...imagesArray]);
    deleteImage(image);
  };

  const saveItem = (event) => {
    event.preventDefault();
    setItem({ ...item, images: [...imagesArray] });
    setShowSaveModal(true);
  };

  return (
    <>
      <SaveItemModal
        title={title}
        item={item}
        show={showSaveModal}
        setShow={setShowSaveModal}
      />
      <div className={styles.inventoryPage}>
        <Form className={styles.form} onSubmit={saveItem}>
          <Form.Group className={styles.formGroup1} controlId="name">
            <Form.Label>New Item Name</Form.Label>
            <Form.Control
              className={styles.textInput}
              required
              placeholder="product name"
              value={item.name}
              onChange={(e) => changeValue('name', e.target.value)}
            />
          </Form.Group>
          <Form.Group className={styles.formGroup1} controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              className={styles.textInput}
              required
              placeholder="brand name"
              value={item.brand}
              onChange={(e) => changeValue('brand', e.target.value)}
            />
          </Form.Group>
          <Form.Group className={styles.formGroup1} controlId="description">
            <Form.Label>Item Description</Form.Label>
            <Form.Control
              className={styles.textInput}
              as="textarea"
              rows={4}
              value={item.description}
              onChange={(e) => changeValue('description', e.target.value)}
            />
          </Form.Group>
          <div className={styles.formGroupWrapper}>
            <Form.Group className={styles.formGroup2} controlId="size">
              <Form.Label>Item Size (if any)</Form.Label>
              <Form.Control
                className={styles.textInput}
                value={item.size}
                onChange={(e) => changeValue('size', e.target.value)}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup2} controlId="color">
              <Form.Label>Item Color (if any)</Form.Label>
              <Form.Control
                value={item.color}
                onChange={(e) => changeValue('color', e.target.value)}
                className={styles.textInput}
              />
            </Form.Group>
          </div>
          <div className={styles.formGroupWrapper}>
            <Form.Group className={styles.formGroup2} controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={item.category}
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
                value={item.wholesaleSupplier}
                onChange={(e) =>
                  changeValue('wholesaleSupplier', e.target.value)
                }
                className={styles.textInput}
              />
            </Form.Group>
          </div>
          <div className={styles.formGroupWrapper}>
            <Form.Group
              className={styles.formGroup4}
              controlId="wholesalePrice"
            >
              <Form.Label>Wholesale Price $</Form.Label>
              <Form.Control
                className={styles.textInput}
                type="number"
                step="0.01"
                value={item.wholesalePrice}
                onChange={(e) => changeValue('wholesalePrice', e.target.value)}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup4} controlId="retailPrice">
              <Form.Label>Retail Price $</Form.Label>
              <Form.Control
                className={styles.textInput}
                type="number"
                required
                step="0.01"
                value={item.retailPrice}
                onChange={(e) => changeValue('retailPrice', e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className={styles.formGroup4}
              controlId="quantityInStock"
            >
              <Form.Label>Quantity In Stock</Form.Label>
              <Form.Control
                className={styles.textInput}
                type="number"
                value={item.quantityInStock}
                onChange={(e) => changeValue('quantityInStock', e.target.value)}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup4} controlId="lowStockAlert">
              <Form.Label>Low Stock alert</Form.Label>
              <Form.Control
                className={styles.textInput}
                placeholder="Set re-order alert when stock goes down to this number"
                type="number"
                value={item.lowStockAlert}
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
          <div className={styles.imagesArray}>
            {imagesArray.length > 0 ? (
              imagesArray.map((img, idx) => {
                return (
                  <span
                    key={`${idx}${img.name}`}
                    style={{
                      width: `calc($whole-line / ${imagesArray.length} - 16px)`,
                      maxWidth: '30%',
                      margin: '8px',
                      position: 'relative',
                    }}
                  >
                    <img src={img.url} alt="error" style={{ width: '100%' }} />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-8px',
                        right: '-8px',
                        cursor: 'pointer',
                      }}
                      onClick={() => removeImage(idx, img)}
                    >
                      <i
                        className={[`fad fa-times-circle fa-2x`]}
                        style={{ color: 'red' }}
                      ></i>
                    </div>
                  </span>
                );
              })
            ) : (
              <p>-- no images --</p>
            )}
          </div>
          <p className={styles.formGroupWrapper}>
            Item name, description, size/color (if any) and retail price will
            all be visible to customers on the website/app
          </p>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
