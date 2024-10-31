import { getContent } from '$lib';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, platform }) => {


    const db = platform?.env.DB;
    if(!db) {
        return {
            id: params.slug,
            content: 'db not found'
        }
    }

    const content = await getContent(params.slug, db);


	return {
        id: params.slug,
        content: content
    }
};