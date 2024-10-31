import { submitContent } from "$lib";
import { json, type RequestHandler } from "@sveltejs/kit";


export const POST: RequestHandler = async ({ request, platform }) => {

    const {content}: { content: string } = await request.json();

    if(!(content)){
        return json({error: 'content required'}, {status: 400});
    }

    if(content.length > 10000) {
        return json({error: 'content too long'}, {status: 413});
    }

    const db = platform?.env.DB;
    if(!db) {
        return json({error: 'could not connect to database'}, {status: 500});
    }

    const id = await submitContent(content, db);


    return json({id: id});
  };