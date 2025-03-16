import { Database } from "bun:sqlite";

export function initAnalyticsDb() {
  using db = new Database("analytics.sqlite", { create: true, strict: true });

  db.run(`
  CREATE TABLE IF NOT EXISTS
  page_views (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_agent TEXT,
    ip_address TEXT,
    referrer TEXT,
    unique_id TEXT
  )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS path_stats (
      path TEXT PRIMARY KEY,
      view_count INTEGER DEFAULT 0,
      last_viewed DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.close();
}

export function recordPageView(
  path: string,
  userAgent?: string,
  ipAddress?: string,
  referrer?: string,
  uniqueId?: string,
) {
  const db = new Database("analytics.sqlite");

  try {
    // Use transactions for data integrity
    db.transaction(() => {
      // Insert individual page view record
      const insertPageView = db.prepare(`
          INSERT INTO page_views (path, user_agent, ip_address, referrer, unique_id)
          VALUES (?, ?, ?, ?, ?)
        `);

      insertPageView.run(
        path,
        userAgent || null,
        ipAddress || null,
        referrer || null,
        uniqueId || null,
      );
      const updatePathStats = db.prepare(`
          INSERT INTO path_stats (path, view_count, last_viewed)
          VALUES (?, 1, CURRENT_TIMESTAMP)
          ON CONFLICT(path) DO UPDATE SET
            view_count = view_count + 1,
            last_viewed = CURRENT_TIMESTAMP
        `);

      updatePathStats.run(path);
    })();

    return true;
  } catch (error) {
    console.error("Error recording page view:", error);
    return false;
  } finally {
    db.close();
  }
}

// Get page view stats for a specific path
export function getPageViewsForPath(path: string) {
  const db = new Database("analytics.sqlite");
  console.log({ path });

  try {
    const stats = db
      .query(
        `
      SELECT path, view_count, last_viewed
      FROM path_stats
      WHERE path = ?
    `,
      )
      .get(path);

    return stats || { path, view_count: 0, last_viewed: null };
  } finally {
    db.close();
  }
}

// Get top viewed pages
export function getTopPages(limit = 10) {
  const db = new Database("analytics.sqlite");

  try {
    const topPages = db
      .query(
        `
      SELECT path, view_count, last_viewed
      FROM path_stats
      ORDER BY view_count DESC
      LIMIT ?
    `,
      )
      .all(limit);

    return topPages;
  } finally {
    db.close();
  }
}

// Get page views over time (useful for charts)
export function getPageViewsOverTime(path?: string, days = 30) {
  const db = new Database("analytics.sqlite");

  try {
    let query = `
      SELECT
        date(timestamp) as date,
        count(*) as count
      FROM page_views
      WHERE timestamp >= datetime('now', '-${days} days')
    `;

    if (path) {
      query += ` AND path = ?`;
      return db.query(`${query} GROUP BY date ORDER BY date`).all(path);
    } else {
      return db.query(`${query} GROUP BY date ORDER BY date`).all();
    }
  } finally {
    db.close();
  }
}

// Get all time total views
export function getTotalPageViews() {
  const db = new Database("analytics.sqlite");

  try {
    const result = db
      .query(
        `
      SELECT COUNT(*) as total FROM page_views
    `,
      )
      .get();

    return result?.total || 0;
  } finally {
    db.close();
  }
}
