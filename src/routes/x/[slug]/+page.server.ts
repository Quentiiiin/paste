import { addView, getContent } from '$lib';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, platform, cookies }) => {

    let hasSeen = false;
    const seenCookie = cookies.get('seen');
    if(seenCookie === 'true') {
        hasSeen = true;
    }

    const db = platform?.env.DB;
    if(!db) {
        return {
            id: params.slug,
            content: 'db not found'
        }
    }

    const content = await getContent(params.slug, db);
    let viewCount = content.viewCount;

    if(!hasSeen && content.success) {
        await addView(params.slug, db);
        viewCount = viewCount + 1;
    }

    cookies.set('seen', 'true', {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: `/x/${params.slug}`,
        httpOnly: true
    });



	return {
        success: content.success,
        id: params.slug,
        content: content.content,
        viewCount: viewCount,
        createdAt: content.createdAt,
    }
};