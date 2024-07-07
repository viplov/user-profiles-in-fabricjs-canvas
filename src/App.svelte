<script lang="ts">
  import { onMount } from "svelte";
  import { fabric, Canvas } from "fabric";
  import fetchData from "./utils/fetchData";
  import addListeners from "./utils/addListeners";
  import type { Member } from "./models/Member";
  import addMembersOnCanvas from "./utils/addMembersOnCanvas";
  import debounce from "./utils/debounce";

  let members: Member[];
  let data: Member[];
  let canvas: Canvas;
  let imageList: string[] = [];

  onMount(async () => {
    //Fetching Data
    data = await fetchData();
    members = data;
    //creating a canvas
    canvas = new fabric.Canvas("canvas");
    //setting dimentions
    canvas.setHeight(window.innerHeight - 126);
    canvas.setWidth(window.innerWidth - 600);
    //canvas is dragable alaway to pan
    canvas.isDragging = true;
    canvas.hoverCursor = "pointer";
    canvas.lastPosX = 0;
    canvas.lastPosY = 0;
    //Adding keydown event listener as Fabric js canvas does not support this event
    document.addEventListener("wheel", (e: WheelEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(canvas.lastPosX , canvas.lastPosY)
        canvas.viewportTransform[4] = canvas.lastPosX + e.deltaX;
        canvas.viewportTransform[5] = canvas.lastPosY + e.deltaY;
        canvas.requestRenderAll();
        canvas.lastPosX = canvas.lastPosX + e.deltaX;
        canvas.lastPosY = canvas.lastPosY + e.deltaY;
      },
      { passive: false }
    );

    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key == "s" || e.key == "S")) {
        let newimageList: string[] = [];
        canvas._objects.forEach((member: any) => {
          member.set("shadow", "none");
          newimageList.push(member.toDataURL("png"));
        });
        imageList = newimageList;
      }
    });


    //Adding event Listeners
    addListeners(canvas);
  });

  const selectMemebrsdebounced = debounce((e: InputEvent) => {
    canvas.clear();
    let value = (e.target as HTMLInputElement)?.value;
    let newArray = data.filter((object: any) => {
      if (object.login.toLowerCase().includes(value.toLocaleLowerCase())) {
        return object;
      }
    });
    members = newArray;
    addMembersOnCanvas(members, canvas);
  }, 500);
</script>

<main>
  <div class="container">
    <div>
      <input
        id="input"
        on:input={(e) => selectMemebrsdebounced(e)}
        placeholder="Search..."
      />
      <canvas id="canvas" />
    </div>
    <div class="imageDisplay">
      {#if imageList.length > 0}
        {#each imageList as src}
          <img {src} alt="exported" />
        {/each}
      {/if}
    </div>
  </div>
</main>
