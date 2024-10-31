import pool from '../config/database';

export const createTransactionsTable = async () => {
  const client = await pool.connect();
  try {
    const queryText = `
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        book_id INT NOT NULL,
        transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        quantity INT NOT NULL DEFAULT 1,
        total DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
      );
    `;
    await client.query(queryText);
    console.log('Tabela "transactions" criada com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabela "transactions":', err);
  } finally {
    client.release();
  }
};