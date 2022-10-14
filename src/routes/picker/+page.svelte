<script context="module">
</script>
<script lang="ts">
    import Picker from 'svelte-material-color-picker';
    let useSpectrumPicker = true;
    let defaultTint = 500;
    let colorsPerRow = 6;
    let mode = "palette";
    let size = 50;
    let margin = 1;

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
    <div class="props">
        <div class="props-container">
            <label class="label" for="useSpectrum" style:background-color="{mainColor}" style:color="{fontColor}" style:border-color="{mainColor}">useSpectrum</label>
            <span class="input"><input type="checkbox" id="useSpectrum" bind:checked={useSpectrumPicker} /></span>
            <span class="value">{useSpectrumPicker}</span>
        </div>

        <div class="props-container">
            <label class="label" for="defaultTint" style:background-color="{mainColor}" style:color="{fontColor}" style:border-color="{mainColor}">default tint</label>
            <span class="input"><input type="range" id="defaultTint" min="100" max="900" step="100" bind:value={defaultTint} /></span>
            <span class="value">{defaultTint}</span>
        </div>

        <div class="props-container">
            <label class="label" for="size" style:background-color="{mainColor}" style:color="{fontColor}" style:border-color="{mainColor}">size</label>
            <span class="input"><input type="range" id="size" min="10" max="100" step="10" bind:value={size}/></span>
            <span class="value">{size}</span>
        </div>

        <div class="props-container">
            <label class="label" for="margin" style:background-color="{mainColor}" style:color="{fontColor}" style:border-color="{mainColor}">margin</label>
            <span class="input"><input type="range" id="margin" min="0" max="10" step="1" bind:value={margin} /></span>
            <span class="value">{margin}</span>
        </div>

        <div class="props-container">
            <label class="label" for="colorsPerRow" style:background-color="{mainColor}" style:color="{fontColor}" style:border-color="{mainColor}">colors per row</label>
            <span class="input"><input type="range" id="colorsPerRow" min="1" max="10" step="1" bind:value={colorsPerRow} /></span>
            <span class="value">{colorsPerRow}</span>
        </div>
    </div>

    <div class="chosen"><span class="badge" style:background-color={mainColor} style:color={fontColor}>{mainColor ? mainColor : "none"} </span></div>
    <div class="picker-container" style:border-color="{mainColor}">
        <Picker {useSpectrumPicker} {defaultTint} {size} {margin} {colorsPerRow} on:colorChanged={colorHandler}/>
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

    .props{
        position:absolute;
        top:30px;
        left:0px;
        border-radius:5px;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
        /* width:150px; */
        background: white;
        z-index: 3;
        border: 1px solid rgba(0,0,0,0.25);
        padding: 5px;
    }

    .props-container{
        /* display:flex;
        justify-content: center;
        align-items: center; */
        display:grid;
        grid-template-columns: 100px 120px 50px;
        grid-template-areas: "label input value";
        margin-bottom: 10px;
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

    .label{
        grid-area:label;
        font-size:12px;
        text-align:center;
        border:1px solid;
        border-radius:8px;
        padding:5px;
    }

    .value{
        grid-area:value;
        font-size:12px;

    }

    .input{
        grid-area:input;
        display:inline-block;
        text-align:center;
    }

    input[type=range] {
        width:100px;
    }
</style>