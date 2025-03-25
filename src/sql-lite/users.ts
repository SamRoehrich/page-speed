import { Database } from "bun:sqlite";

const dbName = "users.sqlite";

export type User = {
  id: number;
  email: string;
  username?: string;
  password: string;
  revisions: string;
  created_at: string;
  status?: string;
};

export function initUsersDb() {
  using db = new Database(dbName, { create: true, strict: true });

  db.run(`
  CREATE TABLE IF NOT EXISTS
  posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    password TEXT,
    revisions INTEGER,
    status TEXT,
    username TEXT
  )
  `);

  db.close();
}

export function insertUser(form: FormData) {
  const email = form.get("email")?.toString() || "";
  const password = form.get("password")?.toString() || "";
  const username = form.get("username")?.toString() || "";

  const db = new Database(dbName);

  try {
    db.transaction(() => {
      const insertUser = db.prepare(`
          INSERT INTO users (email, password, status, updated_at, revisions, username)
          VALUES (?, ?, ?, ?, ?, ?)
        `);

      insertUser.run(
        email,
        password,
        "active",
        new Date().getTime(),
        0,
        username,
      );
    })();

    return true;
  } catch (error) {
    console.error("Error inserting user:", error);
    return false;
  } finally {
    db.close();
  }
}

export function getUser(email: string): User | null {
  const db = new Database(dbName);

  if (!email) return null;

  try {
    const user = db
      .query(
        `
      SELECT *
      FROM users
      WHERE email = ?
    `,
      )
      .get(email);
    if (user) {
      return user;
    }
  } finally {
    db.close();
  }
}

function isPost(item: unknown) {
  return Boolean(
    item &&
      typeof item === "object" &&
      "title" in item &&
      "description" in item &&
      "content" in item,
  );
}
