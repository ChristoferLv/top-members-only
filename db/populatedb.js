import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   username VARCHAR (255),
   password VARCHAR (255),
   is_member BOOLEAN DEFAULT false,
   is_admin BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(30),
  content VARCHAR(255),
  added TIMESTAMPTZ,
  author INTEGER,
  FOREIGN KEY (author) REFERENCES users (id) 
);
`;

async function main() {
  console.log("seeding...", `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
