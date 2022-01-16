import React, { useState } from 'react';
import InventoryForm from '../components/InventoryForm';

export default function UdateItem() {
  const [updateItem, setUpdateItem] = useState({});
  return (
    <div>
      <InventoryForm item={updateItem} />
    </div>
  );
}
