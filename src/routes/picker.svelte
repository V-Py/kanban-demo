<script context="module">
    // import {getGanttProperties} from '$lib/services';

    // export async function load({url, params, fetch, session, context}){


    //     let userTemp = getUser();
    //     console.log('USER TEMP', userTemp);

    //     const {data, error} = await getGanttProperties();
    //     console.log('DATA', data);
    //     console.log('ERROR', error);

    //     return{
    //         props:{
    //             data,
    //             error
    //         }
    //     }
    // }
</script>
<script>
    import Picker from 'svelte-material-color-picker';
</script>

<div style="width:100%;height:100%;display:flex;justify-content:center; padding:50px;">

    <Picker />
</div>