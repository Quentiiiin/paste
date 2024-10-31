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

export async function getContent(id: string, db: D1Database) {
    const res = await db
        .prepare('SELECT content FROM paste WHERE id = ?')
        .bind(id)
        .all();

    if(!res.success) {
        return 'error';
    }
    if(res.results.length === 0) {
        return 'not found';
    }
    return res.results[0].content;
}