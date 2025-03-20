import { Database } from "bun:sqlite";

const dbName = "posts.sqlite";

export type Post = {
  id: number;
  title: string;
  updated_at: string;
  description: string;
  content: string;
  url: string;
  tag: string;
};

export function initPostsDb() {
  using db = new Database(dbName, { create: true, strict: true });

  db.run(`
  CREATE TABLE IF NOT EXISTS
  posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    content TEXT,
    url TEXT,
    tag TEXT
  )
  `);

  db.close();
}

export function insertPost(form: FormData) {
  const title = form.get("title")?.toString() || "";
  const description = form.get("description")?.toString() || "";
  const content = form.get("content")?.toString() || "";
  const url = form.get("url")?.toString() || "";
  const tag = form.get("tag")?.toString() || "";

  const db = new Database(dbName);

  try {
    db.transaction(() => {
      const insertPost = db.prepare(`
          INSERT INTO posts (title, description, content, updated_at, url, tag)
          VALUES (?, ?, ?, ?, ?, ?)
        `);

      insertPost.run(
        title,
        description,
        content,
        new Date().getTime(),
        url,
        tag,
      );
    })();

    return true;
  } catch (error) {
    console.error("Error inserting article:", error);
    return false;
  } finally {
    db.close();
  }
}

export function getPost(
  url: string,
): Pick<Post, "content" | "description" | "title"> | false {
  const db = new Database(dbName);

  if (!url) return false;

  try {
    const post = db
      .query(
        `
      SELECT title, description, content
      FROM posts
      WHERE url = ?
    `,
      )
      .get(url) as {
      title: string;
      description: string;
      content: string;
    };

    if (isPost(post)) {
      return post;
    }
    return false;
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
