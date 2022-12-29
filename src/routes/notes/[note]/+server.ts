import type { RequestEvent } from "../$types";
import { notes } from "../+server";

export let noteText = [
    {id: '1', html: 'Note 1'},
    {id: '2', html: 'Note 2'}
]


/** @type {import('./$types').RequestHandler} */
export function GET({ params }: RequestEvent) {
    const note = notes.find((note) => note.id === params.note);
    const item = (noteText ?? []).find((noteText) => noteText.id === params.note);
    return new Response(JSON.stringify({...item, ...note}));
}


/** @type {import('./$types').RequestHandler} */
export async function PUT({ params, request }: RequestEvent) {
    const id = params.note;
    const { html } = await request.json();
    noteText = noteText.map((item)=> {
        return item.id === id ? {id, html} : item;
    });
    
    const findNoteIndex = notes.findIndex(item => item.id === id);
    notes.splice(findNoteIndex, 1, {...notes[findNoteIndex], lastUpdated: Date.now()})

    return new Response(JSON.stringify({id, html}));
}
