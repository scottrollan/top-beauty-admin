import React from 'react';
import InventoryForm from '../components/InventoryForm';
import { createRandomString } from '../functions/CreateRandomString';

export default function AddItem() {
  const newItem = {
    brand: '',
    category: '',
    images: [],
    inventoryId: createRandomString(20),
    name: '',
    description: '',
    size: '',
    color: '',
    lowStockAlert: 0,
    quantityInStock: 0,
    wholesalePrice: 0,
    retailPrice: 0,
    wholesaleSupplier: '',
  };
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <InventoryForm thisItem={newItem} title="Add New Inventory Item" />
    </div>
  );
}
