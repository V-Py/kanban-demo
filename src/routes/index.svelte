<script context="module">
    import {getGanttProperties} from '$lib/services';

    export async function load({url, params, fetch, session, context}){


        let userTemp = getUser();
        console.log('USER TEMP', userTemp);

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
    import {signIn, signInWithGithub, signOut, getUser, saveGanttProperties} from '$lib/services';
    import { onMount } from 'svelte';
    export let data, error;

    let email ='';
    let connected = false;
    let user;
    let colsList;
    let categories_list;
    let props; // Properties of the gantt 
    let idle = true;
    let mailSent = false;
    let loading = false;

    if(data && data.length > 0) colsList = JSON.parse(data[0].columns); // Init with DB 
 
    async function saveProps(e){
        if(!user || !user.id) return;
        loading = true;

        let ganttProperties = {};
        let columnsTemp = e.detail.columns;
        let columnsProps = []
        for(let i=0;i<columnsTemp.length; i++){
            const colTemp = {};
            colTemp['name'] = columnsTemp[i].title;
            colTemp['cards'] = columnsTemp[i].slots;
            columnsProps.push(colTemp);
        }
        ganttProperties['columns'] = JSON.stringify(columnsProps);
        if(categories_list) ganttProperties['categories'] = JSON.stringify(categories_list);
        if(props) ganttProperties['props'] = JSON.stringify(props);

        const res = await saveGanttProperties({uid:user.id, ganttProperties})
        loading = false;

        console.log('RES', res);
    }

    async function handleSign(){
        idle = false;
        const res = await signIn(email);
        if(!data){idle = true; alert('Error while sending the email to '+email); return;}
        mailSent = true;
    }


    onMount(async ()=>{
        user = getUser();
        if(user) connected = true;
    })
</script>

<div style="width:100%;display:flex;justify-content:center;align-items:center;">
    {#if connected}
        <button class="cust-button primary" on:click={() => {signOut(); user=null; connected=false;}}>Sign-out</button>
    {:else}

        {#if idle}
            <input id="magic-email" style="width:150px; margin:0 20px;" type="text" bind:value={email} placeholder="example@mail.com" />
            <button class="cust-button primary" on:click={() => {handleSign()}}>Send Magic link</button>
            <button class="cust-button github" on:click={() => {signInWithGithub()}}>
                Connect with GitHub&nbsp
                <img height="16px" width="16px" src="github.svg" alt="">
            </button>
        {:else}
            {#if mailSent}
                <div>Email sent with success to <b>{email}</b> !</div>
            {:else}
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            {/if}
        {/if}
    {/if}

    {#if loading}
        <div style="position:absolute;right:15px;top:15px;">
            <div class="lds-ring small"><div></div><div></div><div></div><div></div></div>
        </div>
     {/if}
</div>
<div style="width:100%; height:600px;">
    <Kanban
        on:columnAdd={saveProps}
        on:columnRemove={saveProps}
        on:cardDragSuccess={saveProps}
        on:cardAdd={saveProps}
        on:cardRemove={saveProps}
        on:cardPropSaved={saveProps}
        on:moveCardUp={saveProps}
        on:moveCardDown={saveProps}
        {colsList}
        {categories_list}
    />
</div>


<style>
    *{
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    }

    .lds-ring {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }
    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 64px;
        height: 64px;
        margin: 8px;
        border: 8px solid #28a745;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #28a745 transparent transparent transparent;
    }

    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .cust-button{
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        user-select: none;
        border: 1px solid transparent;
        padding: 0.375rem 0.375rem;
        font-size: 12px;
        line-height: 1.5;
        border-radius: 0.25rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }

    .primary{
        color: #fff;
        background-color: #007bff;
        border-color: #007bff;
    }

    .primary:hover{
        cursor:pointer;
        background-color:#005abb;
        border-color:#005abb;
    }

    .github{
        margin-left:10px;
        display:flex;
        justify-content:center;
        align-items:center;
        background:white;
        border:1px solid rgba(0,0,0,0.1);
    }

    .github:hover{
        cursor:pointer;
        background-color:rgba(0,0,0,0.1)
    }
</style>