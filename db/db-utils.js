 async function tableExists(pool, tableName) {
    const client = await pool.connect();
    try {
      const res = await client.query(`
        SELECT EXISTS (
          SELECT 1
          FROM pg_catalog.pg_class c
          JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
          WHERE n.nspname = 'public'
            AND c.relname = '${tableName}'
            AND c.relkind = 'r'
        );
      `);
      return res.rows[0].exists;
    } finally {
      client.release();
    }
  }
  
async function createTable(pool, tableName) {
    const exists = await tableExists(pool, tableName);
    if (!exists) {
      const client = await pool.connect();
      try {
        await client.query(`
          CREATE TABLE ${tableName} (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            age INTEGER NOT NULL
          );
        `);
        console.log('Table created successfully');
      } finally {
        client.release();
      }
    } else {
      console.log('Table already exists');
    }
  }

  
  module.exports = {
    createTable,
  };