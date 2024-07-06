<script lang="ts">
  import { onMount } from 'svelte';
  import Counter from './lib/Counter.svelte';
  import { Canvas, Rect } from 'fabric';
  // import * as fabric from 'fabric/node';
  import { fabric } from 'fabric'; // v5
  let members : any;
  let data : any;

  onMount(async()=>{
    let dataFetch = await fetch(`https://api.github.com/orgs/mozilla/members?page=1`);
    data = await dataFetch.json();
    members = data;
    console.log(members)
    var canvas = new fabric.Canvas('canvas');

// create a rectangle object
var rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: 'red',
  width: 20,
  height: 20
});

// "add" rectangle onto canvas
canvas.add(rect);
  })

  const selectMemebrs = (e:InputEvent)=>{
    let value = ((e.target as HTMLInputElement)?.value);
    let newArray = data.filter((object:any)=>{
      if(object.login.toLowerCase().includes(value.toLocaleLowerCase())){
        return object
      }
    });
    members = newArray;

  }
  
  
// canvas?.renderAll();
</script>

<main>
  <div class="card">
    <Counter />
  </div>
  <input on:input={(e)=>selectMemebrs(e)}>
  {#if data}
    {#each members as member}
      <p>{member.login}</p>
    {/each}
  {/if}
  <canvas id='canvas'/>
</main>
