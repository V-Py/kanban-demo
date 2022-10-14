<script>
    import Header from "$lib/components/Header.svelte";
</script>


<Header />

<main>
	<slot />
</main>

<style>
    main{
        width:100%;
        height:100%;
    }
</style>