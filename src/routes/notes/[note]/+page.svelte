<script lang='ts'>
	import { debounce } from "../../../utils";
	import { beforeUpdate, getContext} from "svelte";
	import type { Writable } from "svelte/store";

    type NoteStore = Writable<{currentSelected: string | null, notes: Note[]}>;
    type Note = {id: string, title: string, html: string};
    
    export let data: Note;
    $: note = data;

    let currentId: string = data.id;
    let editableElement: HTMLElement;
    
    const notesStore = getContext<NoteStore>('noteStore');


    const UpdateNoteText = (id: string, html: string)=> {
        fetch(`/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ html}),
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    const UpdateNoteTitle = (id: string, title: string)=> {
        fetch(`/${id}/title`, {
            method: 'PUT',
            body: JSON.stringify({title}),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then((response)=> response.json())
        .then((jsonResponse) => {
            notesStore.set({
                ...$notesStore,
                notes: jsonResponse
            })
        })
    }

    const debounceSaveNoteText = debounce((id:string, html: string) => {
        UpdateNoteText(id, html);   
    }, 1000)

    const debounceSaveNoteTitle = debounce((id:string, html: string) => {
        UpdateNoteTitle(id, html);   
    }, 1000)

    beforeUpdate(() => {
        const urlId  = window.location.pathname?.replace('/', ''); 
        if (urlId !== currentId && editableElement) {
            currentId = urlId;
            editableElement.innerHTML = note.html;
        }        
	});
    

</script>

<div class='note-page-container'>
    <div class='note-text'>
        <input
            class='note-text-title'
            bind:value={note.title}
            on:input={()=> debounceSaveNoteTitle(currentId, note.title)}
        />
        
        <div class='note-text-scroller'>
            <div
                class='note-text-block'
                contenteditable={true}
                bind:this={editableElement}
                on:input={()=> debounceSaveNoteText(currentId, editableElement.innerHTML)}
            >
                {note.html}
            </div>
        </div>
    </div>    
</div>

<style>
    .note-page-container {
        background-color: #2d193d;
        margin: 0;
    }

    .note-text {
        color: #38373c;
        margin: 20px;
        padding: 10px;
        background-color: #e0e0e9;
        display: grid;
        grid-template-rows: 30px;
        gap: 30px;
        box-shadow: 0px 0px 10px #0000004f;
        border-radius: 10px;
    }

    .note-text-scroller {
        overflow: auto;
        padding-right: 5px;
        height: calc(100vh - 120px);
    }

    .note-text-title {
        margin: 0;
        color: #2d193d;
        font-weight: 100;
        font-size: 2rem;
        outline: 0px solid transparent; 
        border: none;
        background-color: transparent;
        height: 3rem;
    }

    .note-text-block {
        border: none;
        outline: 0px solid transparent; 
    }
</style>