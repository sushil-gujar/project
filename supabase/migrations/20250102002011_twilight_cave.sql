/*
  # Shopping List Schema

  1. New Tables
    - `shops`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)
    
    - `shopping_items`
      - `id` (uuid, primary key)
      - `name` (text)
      - `quantity` (integer)
      - `completed` (boolean)
      - `created_at` (timestamp)
      - `shop_id` (uuid, references shops)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

-- Create shops table
CREATE TABLE IF NOT EXISTS shops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL
);

-- Create unique constraint on shop name per user
CREATE UNIQUE INDEX shops_name_user_id_idx ON shops(name, user_id);

-- Create shopping items table
CREATE TABLE IF NOT EXISTS shopping_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  quantity integer DEFAULT 1,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  shop_id uuid REFERENCES shops ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL
);

-- Enable RLS
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_items ENABLE ROW LEVEL SECURITY;

-- Policies for shops
CREATE POLICY "Users can manage their own shops"
  ON shops
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for shopping items
CREATE POLICY "Users can manage their own shopping items"
  ON shopping_items
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);