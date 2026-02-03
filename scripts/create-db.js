const { Client } = require('pg');

async function createDatabase() {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres', // Connect to default postgres DB
    password: '7235',
    port: 5433,
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL server');
    
    // Check if database exists
    const res = await client.query("SELECT 1 FROM pg_database WHERE datname='ai_assistant'");
    if (res.rowCount === 0) {
      console.log('Creating database "ai_assistant"...');
      await client.query('CREATE DATABASE ai_assistant');
      console.log('Database created successfully');
    } else {
      console.log('Database "ai_assistant" already exists');
    }
  } catch (err) {
    console.error('Error creating database:', err.stack);
  } finally {
    await client.end();
  }
}

createDatabase();
