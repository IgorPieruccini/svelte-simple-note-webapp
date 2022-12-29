<script>
    import Header from "../components/header.svelte";
</script>

<div id='root'>
    <Header/>
    <div>
        <slot></slot>
    </div>
</div>


<style>
    @font-face {
        font-family: myFirstFont;
        src: url('../assets/Catamaran-VariableFont_wght.ttf');
    }

    #root {
        font-family: myFirstFont;
        margin: 0;
        background-color: #3c1f54;
        height: 100vh;
        width: 100%;
        display: grid;
        grid-template-columns: 56px 1fr;
    }

    :global(body) {
        margin: 0;
    }

    :global(::-webkit-scrollbar) {
        width: 5px;
    }


    :global(::-webkit-scrollbar-track) {
        box-shadow: inset 0 0 5px #3c1f54;
        border-radius: 10px;
    }
    
    :global(::-webkit-scrollbar-thumb) {
        background: #3c1f54;
        border-radius: 5px;
    }

</style>