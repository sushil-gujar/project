import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Shop } from '../types';

interface AddItemFormProps {
  shops: Shop[];
  onAdd: (name: string, shopId: string, quantity: number) => void;
}

export function AddItemForm({ shops, onAdd }: AddItemFormProps) {
  const [name, setName] = useState('');
  const [shopId, setShopId] = useState(shops[0]?.id || '');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && shopId) {
      onAdd(name.trim(), shopId, quantity);
      setName('');
      setQuantity(1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add new item..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-20 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={shopId}
          onChange={(e) => setShopId(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {shops.map((shop) => (
            <option key={shop.id} value={shop.id}>
              {shop.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Plus size={24} />
        </button>
      </div>
    </form>
  );
}