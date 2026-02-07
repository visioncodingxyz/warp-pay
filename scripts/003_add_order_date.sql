-- Add order_date column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS order_date TIMESTAMP;

-- Add comment
COMMENT ON COLUMN users.order_date IS 'Date when the card was ordered';
