<script lang="ts">
	import { goto } from "$app/navigation";
	import { getContext, onMount } from "svelte";
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
  
    function deleteNote(id: string) {
      const body = JSON.stringify({ id });
      fetch('/notes', {
        method: 'DELETE',
        body,
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(jsonResponse => { 
        notesStore.set({
            notes: jsonResponse,
            currentSelected: null
        });
    })
      .catch((err) => new Error (err))
      .finally(()=> goto('/notes'));
    }

    onMount(() => { 
        const currentSelected = window.location.pathname.split('/').pop();
        if (currentSelected) {
            notesStore.set({
                ...$notesStore,
                currentSelected
            })
        }
	});

</script>


<div class='note-list'>
    <button class='note-list-create-note' on:click={newNote}>NEW NOTE</button>
    <div class='note-list-scroller'>
        <div class='note-list-container'>
            {#each $notesStore.notes as note}
                <a
                    on:click={()=> notesStore.set({...$notesStore, currentSelected: note.id})} 
                    href={`/notes/${note.id}`}
                    class={`note-list-option${$notesStore.currentSelected === note.id ? '-selected' : ''}`}
                    id={note.id} >
                    <div>
                        <p class='note-list-option-title'>{note.title}</p>
                        <small class='note-list-option-date'>{new Date(note.lastUpdated).toDateString()}</small>
                    </div>

                    {#if $notesStore.currentSelected === note.id}
                        <div>
                            <button
                            class='note-list-option-delete'
                            on:click={()=>deleteNote(note.id)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M7.042 16.042q-.459 0-.782-.323-.322-.323-.322-.802V5.542h-.98v-.604h3.063v-.792h3.958v.792h3.083v.604h-.979v9.375q0 .479-.323.802-.322.323-.802.323Zm6.437-10.5H6.542v9.375q0 .229.146.375.145.146.354.146h5.916q.188 0 .354-.157.167-.156.167-.364Zm-4.75 8.416h.604V7.021h-.604Zm1.938 0h.604V7.021h-.604ZM6.542 5.542v9.896-.521Z"/></svg>
                            </button>
                        </div>
                    {/if}
                </a>  
            {/each}
        </div>
    </div>
</div>

<style>
    .note-list {
        border-radius: 10px;
        padding: 10px;
        color: #f8f7ff;
        display: grid;
        grid-template-rows: 30px;
        gap: 30px;
        background-color: #2d193d;
    }

    .note-list-create-note {
        border: none;
        border-radius: 10px;
        color: white;
        background-color: #3c1f54;
    } 

    .note-list-container {
        display: grid;
        grid-auto-flow: row;
        grid-auto-rows: 55px;
        gap: 10px;
    }
    
    .note-list-scroller {
        overflow: auto;
        height: calc(100vh - 220px);

        padding-right: 5px;
    }

    .note-list-option {
        color : inherit;
        text-decoration : none;
        padding: 2px 2px 2px 10px ;
        border-radius: 10px;
        display: grid;
        grid-template-columns: 80% 20%;
    }

    .note-list-option-selected {
        color : inherit;
        text-decoration : none;
        padding: 2px 2px 2px 10px ;
        border-radius: 10px;
        display: grid;
        grid-template-columns: 80% 20%;
        background-color: #3c1f54;
    }
    
    .note-list-option-title {
        margin: 0;
    }

    .note-list-option-date {
        margin: 0;
        font-style: italic;
        font-size: 0.7em;
        color: white;
    }

    .note-list-option-delete {
        border: none;
        background-color: transparent;
        width: 100%;
        height: 100%;
    }
    
    .note-list-option-delete svg {
        fill: white;
        transform: scale(1.5);
        justify-self: center;
     
    }
</style>