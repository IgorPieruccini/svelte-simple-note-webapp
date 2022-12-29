import type { RequestEvent } from "../$types";
import { notes } from "../../+server";

/** @type {import('./$types').RequestHandler} */
export async function PUT({ params, request }: RequestEvent) {
    const id = params.note;
    const { title} = await request.json();

    const noteIndex = notes.findIndex((note) => note.id === id);
    notes.splice(noteIndex, 1, {
        ...notes[noteIndex],
        title
    });

    return new Response(JSON.stringify(notes));
}