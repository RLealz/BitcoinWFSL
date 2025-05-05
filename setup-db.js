import { pool } from './server/db.js';

// This script will create all tables in the database
async function main() {
  console.log('Starting database setup...');
  
  try {
    // Create tables in order of dependencies
    console.log('Creating tables...');
    
    // Create users table
    console.log('Creating users table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        full_name VARCHAR(255),
        is_admin BOOLEAN DEFAULT FALSE,
        profile_completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create user_profiles table
    console.log('Creating user_profiles table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_profiles (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        phone VARCHAR(20),
        country VARCHAR(100),
        preferred_language VARCHAR(50) DEFAULT 'en',
        risk_tolerance VARCHAR(20),
        investment_goals VARCHAR(255),
        monthly_investment_budget DECIMAL(12,2),
        prefers_dark_mode BOOLEAN DEFAULT FALSE,
        preferred_font_size VARCHAR(20) DEFAULT 'normal',
        prefers_high_contrast BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create investment_plans table
    console.log('Creating investment_plans table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS investment_plans (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        minimum_investment DECIMAL(12,2) NOT NULL,
        monthly_return_rate DECIMAL(5,2) NOT NULL,
        duration_months INTEGER NOT NULL,
        risk_level VARCHAR(20) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create leads table
    console.log('Creating leads table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        investment_range TEXT,
        message TEXT,
        converted_to_user BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create session table for auth session persistence
    console.log('Creating session table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "session" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL,
        CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
      )
    `);
    
    await pool.query(`
      CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire")
    `);
    
    // Create an admin user for testing
    console.log('Checking for admin user...');
    const adminUserExists = await pool.query(`
      SELECT * FROM users WHERE username = 'admin' LIMIT 1
    `);
    
    if (adminUserExists.rowCount === 0) {
      console.log('Creating admin user...');
      await pool.query(`
        INSERT INTO users (username, password, email, is_admin, profile_completed)
        VALUES (
          'admin', 
          '5f122a6a54ecc2f7bc490d76831d9d10f06a82c8eb32b935b4c2eb03a9b205cb.cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e', 
          'admin@example.com',
          TRUE,
          TRUE
        )
      `);
      // Note: Password is 'adminpassword' hashed with scrypt
    } else {
      console.log('Admin user already exists');
    }
    
    // Create sample investment plans if none exist
    console.log('Checking for investment plans...');
    const plansExist = await pool.query(`
      SELECT COUNT(*) FROM investment_plans
    `);
    
    if (plansExist.rows[0].count === '0') {
      console.log('Creating sample investment plans...');
      await pool.query(`
        INSERT INTO investment_plans 
          (name, description, minimum_investment, monthly_return_rate, duration_months, risk_level, is_active)
        VALUES
          ('Conservative Plan', 'Low-risk investment with stable returns. Perfect for beginners or risk-averse investors.', 1000.00, 0.50, 6, 'low', TRUE),
          ('Balanced Growth', 'Medium-risk investment balancing stability and growth. Ideal for intermediate investors.', 5000.00, 1.20, 12, 'medium', TRUE),
          ('Aggressive Growth', 'Higher-risk investment strategy focusing on maximum returns. For experienced investors.', 10000.00, 2.50, 18, 'high', TRUE)
      `);
    } else {
      console.log('Investment plans already exist');
    }
    
    console.log('Database setup completed successfully!');
    
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

main();