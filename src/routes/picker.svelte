<script context="module">
</script>
<script lang="ts">
    import Picker from 'svelte-material-color-picker';
    let mainColor = '#f44336';
    let fontColor = pickTextColorBasedOnBgColorAdvanced(mainColor, '#fff', '#000');
    function colorHandler(e){
        mainColor = e.detail.new;
        fontColor = pickTextColorBasedOnBgColorAdvanced(mainColor, '#fff', '#000');
    }

    function pickTextColorBasedOnBgColorAdvanced(bgColor:string, lightColor:string, darkColor:string) {
        const color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
        const r = parseInt(color.substring(0, 2), 16); // hexToR
        const g = parseInt(color.substring(2, 4), 16); // hexToG
        const b = parseInt(color.substring(4, 6), 16); // hexToB
        const uicolors = [r / 255, g / 255, b / 255];
        const c = uicolors.map((col) => {
            if (col <= 0.03928) {
            return col / 12.92;
            }
            return Math.pow((col + 0.055) / 1.055, 2.4);
        });
        const L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
        return (L > 0.179) ? darkColor : lightColor;
    }

</script>
<div class="container">
    <div class="chosen"><span class="badge" style:background-color={mainColor} style:color={fontColor}>{mainColor ? mainColor : "none"} </span></div>
    <div class="picker-container" style:border-color="{mainColor}">
        <Picker on:colorChanged={colorHandler}/>
    </div>
</div>

<style>
    .container{
        width:100%;
        height:100%;
        display:flex;
        justify-content: center;
        align-items: center;
        position:relative;
        font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";

    }
    .picker-container{
        position:absolute;
        top:150px;
        display:flex;
        justify-content:center; 
        padding:50px;
        border-radius:50px;
        border:20px solid;
    }

    .chosen{
        top:100px;
        position:absolute;
    }

    .badge{
        padding: 5px 10px;
        border-radius:50px;
    }
</style>