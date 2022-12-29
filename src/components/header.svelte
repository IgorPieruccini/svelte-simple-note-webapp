<script lang="ts">
	import { onMount } from "svelte";

    type MenuOptions = 'home' | 'account' | 'note';
    $: selectedOption = 'home' 

    function selectMenuOption (option: MenuOptions) {
        selectedOption = option;
    }

	onMount(() => { 
        if (window.location.pathname.includes('notes')) {
            selectedOption = 'note'
        }

        if (window.location.pathname.includes('home')) {
            selectedOption = '/'
        }

        if (window.location.pathname.includes('account')) {
            selectedOption = 'account'
        }
	});

</script>

<div class='header'>
        <div class='header-logo'>
            <img class='header-icon' src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg" alt="logo">
        </div>
        <a
            on:click={()=> selectMenuOption('home')}
            class={`${selectedOption === 'home' ? 'header-option-selected' : 'header-option'}`}
            href="/"
        >
            <svg  class='header-icon' xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M11 39h7.5V26.5h11V39H37V19.5L24 9.75 11 19.5Zm-3 3V18L24 6l16 12v24H26.5V29.5h-5V42Zm16-17.65Z"/></svg>
        </a>
 
        <a
            class={`${selectedOption === 'note' ? 'header-option-selected' : 'header-option'}`}
            on:click={()=> selectMenuOption('note')}
            href="/notes"
        >
            <svg class='header-icon' xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M15.95 35.5h16.1v-3h-16.1Zm0-8.5h16.1v-3h-16.1ZM11 44q-1.2 0-2.1-.9Q8 42.2 8 41V7q0-1.2.9-2.1Q9.8 4 11 4h18.05L40 14.95V41q0 1.2-.9 2.1-.9.9-2.1.9Zm16.55-27.7V7H11v34h26V16.3ZM11 7v9.3V7v34V7Z"/></svg>
        </a>

        <a 
            on:click={()=> selectMenuOption('account')}
            class={`${selectedOption === 'account' ? 'header-option-selected' : 'header-option'}`}
            href="/account"
        >
            <svg class='header-icon' xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 23.95q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1ZM8 40v-4.7q0-1.9.95-3.25T11.4 30q3.35-1.5 6.425-2.25Q20.9 27 24 27q3.1 0 6.15.775 3.05.775 6.4 2.225 1.55.7 2.5 2.05.95 1.35.95 3.25V40Zm3-3h26v-1.7q0-.8-.475-1.525-.475-.725-1.175-1.075-3.2-1.55-5.85-2.125Q26.85 30 24 30t-5.55.575q-2.7.575-5.85 2.125-.7.35-1.15 1.075Q11 34.5 11 35.3Zm13-16.05q1.95 0 3.225-1.275Q28.5 18.4 28.5 16.45q0-1.95-1.275-3.225Q25.95 11.95 24 11.95q-1.95 0-3.225 1.275Q19.5 14.5 19.5 16.45q0 1.95 1.275 3.225Q22.05 20.95 24 20.95Zm0-4.5ZM24 37Z"/></svg>
        </a>
  
</div>

<style>
    .header {
        margin: 0;  
        display: grid;
        grid-auto-flow: row;
        grid-auto-rows: 56px;
        gap: 10px;
    }

    .header-icon {
        fill: white;
        transform: scale(0.5);
    }

    .header-option {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .header-option-selected {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #2d193d;
        border-radius: 5px 0px 0px 5px;

    }
</style>