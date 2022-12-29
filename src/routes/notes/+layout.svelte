<script lang='ts'>
	import { setContext, } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
    import ListNote from '../../components/list-note.svelte';

    type Note = {id: string, title: string, lastUpdated: number};
    type NoteStore = Writable<{currentSelected: string | null, notes: Note[]}>;

    /** @type {import('./$types').PageData} */
    export let data: {notes: Note[]} = {notes: []}

    const notesStore = writable({
        currentSelected: null,
        notes: data.notes
    });

    setContext<NoteStore>('noteStore', notesStore);
</script>

<div id='notes'>
    <ListNote/>
    <slot></slot>
</div>


<style>
    #notes {   
        height: 100%;
        display:grid;
        grid-template-columns: 264px 1fr;
    }
</style>