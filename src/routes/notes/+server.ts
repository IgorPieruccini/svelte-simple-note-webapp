import { UUID } from "../../utils";
import { noteText } from "./[note]/+server";
import type { RequestEvent } from "./$types";

export let notes = [
  {
    id: "1",
    title: "This is note 1",
    lastUpdated: Date.now(),
  },
  {
    id: "2",
    title: "This is note 2",
    lastUpdated: Date.now(),
  }
]

/** @type {import('./$types').RequestHandler} */
export function GET({ url }: RequestEvent) {
  return new Response(JSON.stringify(notes));
}

/** @type {import('./$types').RequestHandler} */
export async function POST({request}: RequestEvent) {
  const lastUpdated: number = Date.now();
  const note = { id: UUID(), title: 'New note', lastUpdated};
  const html = {id: note.id, html: ''};
  notes.push(note);
  noteText.push(html);
  return new Response(JSON.stringify(notes));  
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({request}: RequestEvent) {
  const body = await request.json();
  notes = notes.filter(note => note.id !== body.id);
  const noteIndex = noteText.findIndex(item => item.id === body.id);
  noteText.splice(noteIndex, 1);
  return new Response(JSON.stringify(notes));  
}