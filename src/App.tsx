import React, { useState } from 'react';
import { ShoppingList } from './components/ShoppingList';
import { AddItemForm } from './components/AddItemForm';
import { ShopManager } from './components/ShopManager';
import { AuthForm } from './components/AuthForm';
import { ShoppingBag, Settings, LogOut } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { useShoppingList } from './hooks/useShoppingList';

function App() {
  const { user, loading: authLoading, signIn, signUp, signOut } = useAuth();
  const {
    items,
    shops,
    loading: dataLoading,
    addItem,
    toggleItem,
    deleteItem,
    addShop,
    deleteShop,
  } = useShoppingList(user?.id);
  
  const [activeShop, setActiveShop] = useState<string | null>(null);
  const [showShopManager, setShowShopManager] = useState(false);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm onSignIn={signIn} onSignUp={signUp} />;
  }

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const filteredItems = activeShop
    ? items.filter((item) => item.shopId === activeShop)
    : items;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800">Shopping List</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowShopManager(!showShopManager)}
              className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg"
            >
              <Settings size={24} />
            </button>
            <button
              onClick={() => signOut()}
              className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg"
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>

        {showShopManager && (
          <ShopManager
            shops={shops}
            onAddShop={addShop}
            onDeleteShop={deleteShop}
          />
        )}

        <AddItemForm shops={shops} onAdd={addItem} />

        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setActiveShop(null)}
              className={`px-4 py-2 rounded-lg ${
                activeShop === null
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            {shops.map((shop) => (
              <button
                key={shop.id}
                onClick={() => setActiveShop(shop.id)}
                className={`px-4 py-2 rounded-lg ${
                  activeShop === shop.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {shop.name}
              </button>
            ))}
          </div>
        </div>

        <ShoppingList
          items={filteredItems}
          onToggleItem={toggleItem}
          onDeleteItem={deleteItem}
        />
      </div>
    </div>
  );
}

export default App;