import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

// Validar que las variables de entorno estén definidas
if (!process.env.SQL_SERVER_USER ||
    !process.env.SQL_SERVER_PASSWORD ||
    !process.env.SQL_SERVER_DATABASE ||
    !process.env.SQL_SERVER_HOST) {
  throw new Error("❌ Faltan variables de entorno para SQL Server.");
}

const sqlConfig: sql.config = {
  user: process.env.SQL_SERVER_USER as string,
  password: process.env.SQL_SERVER_PASSWORD as string,
  database: process.env.SQL_SERVER_DATABASE as string,
  server: process.env.SQL_SERVER_HOST as string,
  port: Number(process.env.SQL_SERVER_PORT) || 1433,
  options: {
    encrypt: process.env.SQL_SERVER_ENCRYPT === 'true',
    trustServerCertificate: true
  }
};

const connectSQL = async (): Promise<void> => {
  try {
    await sql.connect(sqlConfig);
    console.log('✅ Conectado a SQL Server');
  } catch (error) {
    console.error('❌ Error conectando a SQL Server:', error);
  }
};

export { connectSQL, sql };
