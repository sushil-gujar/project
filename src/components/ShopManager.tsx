import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Shop } from '../types';

interface ShopManagerProps {
  shops: Shop[];
  onAddShop: (name: string) => void;
  onDeleteShop: (id: string) => void;
}

export function ShopManager({ shops, onAddShop, onDeleteShop }: ShopManagerProps) {
  const [newShop, setNewShop] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newShop.trim() && !shops.some(shop => shop.name === newShop.trim())) {
      onAddShop(newShop.trim());
      setNewShop('');
    }
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Manage Shops</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newShop}
          onChange={(e) => setNewShop(e.target.value)}
          placeholder="Add new shop..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Plus size={24} />
        </button>
      </form>
      <div className="flex flex-wrap gap-2">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full"
          >
            <span>{shop.name}</span>
            <button
              onClick={() => onDeleteShop(shop.id)}
              className="p-1 text-red-500 hover:bg-red-50 rounded-full"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}