
import { error } from '@sveltejs/kit';
 
export async function load({ fetch }: any) {
  return fetch('/notes')
    .then((response: any) => response.json())
    .then((jsonResponse: any)=> {
      return {
        notes: jsonResponse
      };
    })
    .catch((err: any)=> {
      throw error(404, err);
    });
}