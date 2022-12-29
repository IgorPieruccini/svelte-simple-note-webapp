import { error } from '@sveltejs/kit';
 
/** @type {import('./$types').PageLoad} */
export function load({ params, fetch }: any) {
    if (!params.note) throw error(404, 'Not found');

     return fetch(`/notes/${params.note}`)
    .then((response: any) => response.json())
    .then((jsonResponse: any)=> jsonResponse)
    .catch((err: any)=> {
      throw error(404, err);
    });
}