import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ShoppingItem, Shop } from '../types';


export function useShoppingList(userId: string | undefined) {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    
    loadShops();
    loadItems();

    const shopsSubscription = supabase
      .channel('shops')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'shops' }, loadShops)
      .subscribe();

    const itemsSubscription = supabase
      .channel('items')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'shopping_items' }, loadItems)
      .subscribe();

    return () => {
      shopsSubscription.unsubscribe();
      itemsSubscription.unsubscribe();
    };
  }, [userId]);

  const loadShops = async () => {
    if (!userId) return;
    
    const { data, error } = await supabase
      .from('shops')
      .select('*')
      .eq('user_id', userId)
      .order('name');
    
    if (error) {
      console.error('Error loading shops:', error);
      return;
    }

    setShops(data || []);
    setLoading(false);
  };

  const loadItems = async () => {
    if (!userId) return;

    const { data, error } = await supabase
      .from('shopping_items')
      .select(`
        id,
        name,
        quantity,
        completed,
        created_at,
        shop_id,
        shops (
          id,
          name
        )
      `)
      .eq('user_id', userId)
      .order('completed', { ascending: true })
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error loading items:', error);
      return;
    }

    setItems(data?.map(item => ({
      id: item.id,
      name: item.name,
      shop: item.shops?.name || '',
      shopId: item.shop_id,
      quantity: item.quantity,
      completed: item.completed,
      createdAt: new Date(item.created_at)
    })) || []);
    setLoading(false);
  };

  const addItem = async (name: string, shopId: string, quantity: number) => {
    if (!userId) return;

    const { error } = await supabase
      .from('shopping_items')
      .insert({
        name,
        shop_id: shopId,
        quantity,
        user_id: userId
      });

    if (error) {
      console.error('Error adding item:', error);
      throw error;
    }

    await loadItems();
  };

  const toggleItem = async (id: string) => {
    if (!userId) return;

    const item = items.find(i => i.id === id);
    if (!item) return;

    const { error } = await supabase
      .from('shopping_items')
      .update({ completed: !item.completed })
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      console.error('Error toggling item:', error);
      throw error;
    }

    await loadItems();
  };

  const deleteItem = async (id: string) => {
    if (!userId) return;

    const { error } = await supabase
      .from('shopping_items')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting item:', error);
      throw error;
    }

    await loadItems();
  };

  const addShop = async (name: string) => {
    if (!userId) return;

    const { error } = await supabase
      .from('shops')
      .insert({
        name,
        user_id: userId
      });

    if (error) {
      console.error('Error adding shop:', error);
      throw error;
    }

    await loadShops();
  };

  const deleteShop = async (id: string) => {
    if (!userId) return;

    const { error } = await supabase
      .from('shops')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting shop:', error);
      throw error;
    }

    await loadShops();
  };

  return {
    items,
    shops,
    loading,
    addItem,
    toggleItem,
    deleteItem,
    addShop,
    deleteShop,
  };
}