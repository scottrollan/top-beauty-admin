import React, { useState } from 'react';
import InventoryForm from '../components/InventoryForm';

export default function AddItem() {
  const [newItem, setNewItem] = useState({
    brand: '',
    category: '',
    images: [],
    inventoryId: '',
    name: '',
    description: '',
    size: '',
    color: '',
    lowStockAlert: 0,
    quantityInStock: 0,
    wholesalePrice: 0,
    retailPrice: 0,
    wholesaleSupplier: '',
  });
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <InventoryForm
        item={newItem}
        setItem={setNewItem}
        title="Add New Inventory Item"
      />
    </div>
  );
}
