<script lang='ts'>
	import { goto } from "$app/navigation";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";
    
    type Note = {id: string, title: string, lastUpdated: number};
    type NoteStore = Writable<{currentSelected: string | null, notes: Note[]}>;

    const notesStore = getContext<NoteStore>('noteStore');

    function newNote() {
      fetch('/notes', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        }
      }).then((response) => response.json())
        .then((jsonResponse) => {
            const lastCreatedNote = jsonResponse[jsonResponse.length-1];
            notesStore.set({
                notes: jsonResponse,
                currentSelected: lastCreatedNote.id
            })
        })
        .catch((err) => new Error (err))
        .finally(() => {
            goto(`/notes/${$notesStore.currentSelected}`);
        })
    }
</script>

<div class="note-container">
    <div class='tip-container'>
        {#if $notesStore.notes.length}
            To start your note, please create or select an existing note 
        {/if} 
        {#if !$notesStore.notes.length}
           Looks like you don't have a note yet!
           <div class='note-create-note-container'>
               <button class='note-create-note-container-button' on:click={newNote}>Click here to create a note</button>
           </div>
        {/if} 
    </div>
   
</div>

<style>
    .note-container {
        display: flex;
        justify-content: center;
        align-content: center;
        background-color: #2d193d;
    }

    .tip-container {
        color: white;
        max-width: 256px;
        height: 30%;
        align-self: center;
    }

    .note-create-note-container {
        display: flex;
        justify-content: center;
        justify-items: center;
    }

    .note-create-note-container-button {
        border: none;
        border-radius: 10px;
        color: white;
        background-color: #3c1f54;
    } 
</style>