import { db } from './server/db';
import * as schema from './shared/schema';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';

// This script will push all schema changes to the database
async function main() {
  console.log('Starting migration...');
  
  try {
    await migrate(db, { migrationsFolder: './migrations', migrationsTable: 'drizzle_migrations' });
    console.log('Migration completed successfully!');
    
    // Push schema to db
    console.log('Creating tables...');
    
    // Create tables in order of dependencies
    await db.execute`
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
      );
      
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
      );
      
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
      );
      
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
      );
    `;
    
    // Create an admin user for testing
    const adminUserExists = await db.execute`
      SELECT * FROM users WHERE username = 'admin' LIMIT 1;
    `;
    
    if (adminUserExists.rowCount === 0) {
      console.log('Creating admin user...');
      await db.execute`
        INSERT INTO users (username, password, email, is_admin, profile_completed)
        VALUES (
          'admin', 
          '5f122a6a54ecc2f7bc490d76831d9d10f06a82c8eb32b935b4c2eb03a9b205cb.cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e', 
          'admin@example.com',
          TRUE,
          TRUE
        );
      `;
      // Note: Password is 'adminpassword' hashed with scrypt
    }
    
    console.log('Database setup completed successfully!');
    
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

main();