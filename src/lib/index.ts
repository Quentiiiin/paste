export function generateId() {
    const ran = crypto.randomUUID().replaceAll('-','').substring(0,6);
    return ran;
}

export async function submitContent(content: string, db: D1Database) {
    const id = generateId();
    await db
        .prepare('INSERT INTO paste (id, content, created_at) VALUES (?, ?, ?)')
        .bind(id , content, Date.now())
        .all();
    return id;
}

export async function addView(id: string, db: D1Database) {
    await db.prepare('UPDATE paste SET views = views + 1 WHERE id = ?')
        .bind(id)
        .all();
}

export async function getContent(id: string, db: D1Database) {
    const res = await db
        .prepare('SELECT content, created_at, views FROM paste WHERE id = ?')
        .bind(id)
        .all();

    if(!res.success) {
        return {
            success: false,
            content: 'error',
            createdAt: 0,
            viewCount: 0,
        }
    }
    if(res.results.length === 0) {
        return {
            success: false,
            content: 'not found',
            createdAt: 0,
            viewCount: 0,
        }
    }
    const content = res.results[0].content;
    const createdAt = res.results[0].created_at;
    const views = res.results[0].views;

    if(typeof(content) === "string" && typeof(createdAt) === "number" && typeof(views) === "number") {
        return {
            success: true,
            content: content,
            createdAt: createdAt,
            viewCount: views,
        }
    }
    return {
        success: false,
        content: 'error',
        createdAt: 0,
        viewCount: 0,
    };
}