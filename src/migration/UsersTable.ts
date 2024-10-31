import pool from '../config/database';

const createUsersTable = async () => {
  const client = await pool.connect();
  try {
    const queryText = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,  -- Para armazenar senhas
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Data de criação do usuário
      );
    `;
    await client.query(queryText);
    console.log('Tabela "users" criada com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabela "users":', err);
  } finally {
    client.release();
  }
};

createUsersTable().then(() => process.exit(0));