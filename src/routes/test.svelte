<script>
    import Kanban from 'svelte-kanban';
    let primary = "#111FFF"
</script>
<div class="options">
    <div>
        options 1
    </div>

    <div>
        options 2
    </div>
</div>
<div style="width:75%;height:650px;justify-content:center,align-items:center;margin:auto;">
    <Kanban {primary}/>
</div>

<style>
    .options{
        position:absolute;
        display:flex;
        flex-direction: column;
        width:150px;
        top:100px;
        left:10px;
        border:1px solid black;
        padding:10px;
    }
</style>