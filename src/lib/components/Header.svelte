<script>
    import {page} from '$app/stores';
</script>

<nav>
    <ul>
        <a href="/" class="{$page.url.pathname == '/' ? 'active' : ''}"><li>Kanban</li></a>
        <a href="/picker" class="{$page.url.pathname == '/picker' ? 'active' : ''}"><li>Picker</li></a>
    </ul>
</nav>

<style>
    nav{
        position:absolute;
        top:30vh;
        height:50px;
        right:0px;
        font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";
    }

    ul{
        display:flex;
        flex-direction: column;
        background-color:#f1f1f1;
        color:inherit;
        list-style: none;
        margin:0;
        padding:0;
        border-radius: 5px;
    }

    a {
        text-decoration: none;
        color:inherit;
        padding:20px;
        width:100%;
    }

    a:hover{
        cursor:pointer;
        background:rgba(0,0,0,0.2);
    }

    a.active{
        background:#007bff;
        color:white;
    }

</style>