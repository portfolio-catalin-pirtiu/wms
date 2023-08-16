const dbConfig = {
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: process.env.DATABASE_PASSWORD,
  database: 'wms',
};
export default dbConfig;
