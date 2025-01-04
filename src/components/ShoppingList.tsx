import React from 'react';
import { ShoppingItem } from '../types';
import { Check, X } from 'lucide-react';

interface ShoppingListProps {
  items: ShoppingItem[];
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

export function ShoppingList({ items, onToggleItem, onDeleteItem }: ShoppingListProps) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className={`flex items-center justify-between p-3 bg-white rounded-lg shadow-sm ${
            item.completed ? 'opacity-50' : ''
          }`}
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onToggleItem(item.id)}
              className={`p-1 rounded-full ${
                item.completed
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              <Check size={16} />
            </button>
            <span
              className={`text-gray-800 ${
                item.completed ? 'line-through' : ''
              }`}
            >
              {item.name} ({item.quantity})
            </span>
          </div>
          <button
            onClick={() => onDeleteItem(item.id)}
            className="p-1 text-red-500 hover:bg-red-50 rounded-full"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}