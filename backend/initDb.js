const { Client } = require('pg');

async function initializeDB() {
  const defaultClient = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Abhijeet@2004',
    port: 5432,
  });

  try {
    await defaultClient.connect();
    
    // Check if database exists
    const res = await defaultClient.query("SELECT datname FROM pg_database WHERE datname = 'farmer_tool_rent'");
    if (res.rows.length === 0) {
      console.log('Creating database farmer_tool_rent...');
      await defaultClient.query('CREATE DATABASE farmer_tool_rent');
      console.log('Database created.');
    } else {
      console.log('Database already exists.');
    }
  } catch (err) {
    console.error('Error with default db connection:', err);
  } finally {
    await defaultClient.end();
  }

  // Now connect to the new database to create tables
  const dbClient = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'farmer_tool_rent',
    password: 'Abhijeet@2004',
    port: 5432,
  });

  try {
    await dbClient.connect();

    // Drop existing tables for a clean slate
    console.log('Dropping old tables to recreate schema...');
    await dbClient.query('DROP TABLE IF EXISTS bookings');
    await dbClient.query('DROP TABLE IF EXISTS tools');
    await dbClient.query('DROP TABLE IF EXISTS users');

    console.log('Creating tables...');
    
    // Create users table
    await dbClient.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        village VARCHAR(255),
        mobile VARCHAR(30) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'farmer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create tools table with exact fields matching the React components
    await dbClient.query(`
      CREATE TABLE tools (
        id SERIAL PRIMARY KEY,
        owner_id INTEGER REFERENCES users(id),
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        location VARCHAR(255),
        price_hour DECIMAL(10, 2) NOT NULL,
        price_day DECIMAL(10, 2) NOT NULL,
        description TEXT,
        image TEXT,
        is_available BOOLEAN DEFAULT true,
        is_popular BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create bookings table matching FarmerBooking logic
    await dbClient.query(`
      CREATE TABLE bookings (
        id SERIAL PRIMARY KEY,
        tool_id INTEGER REFERENCES tools(id),
        renter_id INTEGER REFERENCES users(id),
        booking_date DATE NOT NULL,
        booking_time VARCHAR(20) NOT NULL,
        hours INTEGER NOT NULL DEFAULT 1,
        address TEXT NOT NULL,
        total_cost DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'પેન્ડિંગ',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Tables created successfully. Seeding initial data...');

    // Seed Admin account
    await dbClient.query(`
      INSERT INTO users (full_name, mobile, password, role)
      VALUES ('Admin Access', 'admin', 'admin123', 'admin')
      ON CONFLICT (mobile) DO NOTHING;
    `);

    // Seed Farmer account for testing
    await dbClient.query(`
      INSERT INTO users (full_name, village, mobile, password, role)
      VALUES ('રમેશભાઈ પટેલ', 'રાજકોટ', '9999999999', 'password123', 'farmer')
      ON CONFLICT (mobile) DO NOTHING;
    `);

    // Fetch the admin user id
    const adminRes = await dbClient.query("SELECT id FROM users WHERE role = 'admin' ORDER BY id ASC LIMIT 1");
    const adminId = adminRes.rows[0]?.id || 1;

    // Seed initial tools
    const insertToolStr = `
      INSERT INTO tools (owner_id, name, category, location, price_hour, price_day, description, image, is_popular)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;

    const equipmentData = [
      [adminId, 'John Deere 5310', 'Tractor', 'રાજકોટ', 800, 7000, '55 HP, Power Steering, High torque suitable for all heavy farm applications.', 'https://images.unsplash.com/photo-1592982537447-6f23f8b54964?auto=format&fit=crop&q=80&w=400', true],
      [adminId, 'Mahindra Arjun Novo', 'Tractor', 'જૂનાગઢ', 750, 6500, 'Powerful performance for tough agricultural tasks.', 'https://plus.unsplash.com/premium_photo-1661913349940-b47214ddc797?auto=format&fit=crop&q=80&w=400', false],
      [adminId, 'farmtrac 47 promaxx', 'Tractor', 'જામનગર', 900, 9000, 'Advanced tractor with modern tech.', 'https://images.unsplash.com/photo-1610471203597-27ea2a98f1f5?auto=format&fit=crop&q=80&w=400', false],
      [adminId, 'Electric Corn Thresher', 'Thresher', 'રાજકોટ', 1000, 9000, 'Fast processing of corn kernels.', 'https://images.unsplash.com/photo-1605335955610-1845184b2c15?auto=format&fit=crop&q=80&w=400', false],
      [adminId, 'Sesame Seeds Thresher', 'Thresher', 'જૂનાગઢ', 900, 8000, 'Gentle and precise separation for sesame.', 'https://images.unsplash.com/photo-1595841696677-647fa54e2fe8?auto=format&fit=crop&q=80&w=400', false],
      [adminId, 'Combine Harvester', 'Pruning', 'રાજકોટ', 5000, 50000, 'Massive harvesting efficiency.', 'https://plus.unsplash.com/premium_photo-1661908221650-a89e9f9024f2?auto=format&fit=crop&q=80&w=400', false],
      [adminId, 'Shaktiman Rotavator', 'Sowing', 'અમદાવાદ', 400, 3500, 'Makes soil soft & ready for sowing', 'https://plus.unsplash.com/premium_photo-1661908221650-a89e9f9024f2?auto=format&fit=crop&q=80&w=400', true],
      [adminId, 'Seed Cum Fertilizer Drill - Dharti Agro', 'Sowing', 'સુરત', 500, 4000, 'Maintains proper seed-to-seed distance', 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&q=80&w=400', true]
    ];

    for (const tool of equipmentData) {
      await dbClient.query(insertToolStr, tool);
    }
    
    console.log('Seed data successfully inserted!');

  } catch (err) {
    console.error('Error creating database schema:', err);
  } finally {
    await dbClient.end();
  }
}

initializeDB();
