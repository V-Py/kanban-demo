<script context="module">
    import {getGanttProperties} from '$lib/services';

    export async function load({url, params, fetch, session, context}){
        const {data, error} = await getGanttProperties();
        console.log('DATA', data);
        console.log('ERROR', error);

        return{
            props:{
                data,
                error
            }
        }
    }
</script>

<script>
    import Kanban from 'svelte-kanban';
    import {signIn, signInWithGithub, signOut, getUser} from '$lib/services';
    import { onMount } from 'svelte';

    export let data, error;

    let email ='';
    let connected = false;
    let user;
    let colsList;
    let categories_list;

    if(data) {
        // console.log('DATA',data);   
        const props = data[0];
        colsList = JSON.parse(props.columns);
    }

    function testFunction(){
        console.log('COLUMN ADDED');
    }

    onMount(async ()=>{
        user = getUser();
        if(user) connected = true;
    })
</script>

<div style="width:100%;display:flex;justify-content:center;align-items:center;">
    {#if connected}
        <button on:click={() => {signOut(); user=false;}}>Sign-out</button>
    {:else}
        <input id="magic-email" style="width:200px; margin:0 20px;" type="text" bind:value={email} placeholder="example@mail.com" />
        <button on:click={() => {signIn(email)}}>Send Magic link</button>
        <button on:click={() => {signInWithGithub()}}>GitHub</button>
    {/if}
</div>
<div style="width:100%; height:600px;">
    <Kanban
        on:columnAdd={testFunction}
        {colsList}
        {categories_list}
    />
</div>


<style>
    *{
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    }
</style>