import pool from '../config/database';

const createBooksTable = async () => {
  const client = await pool.connect();
  try {
    const queryText = `
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(100) NOT NULL,
        genre VARCHAR(50),
        price DECIMAL(10, 2) NOT NULL,
        stock INT DEFAULT 0,  -- Estoque do livro
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Data de criação do livro
      );
    `;
    await client.query(queryText);
    console.log('Tabela "books" criada com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabela "books":', err);
  } finally {
    client.release();
  }
};

createBooksTable().then(() => process.exit(0));