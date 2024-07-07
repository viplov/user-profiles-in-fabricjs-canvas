import { fabric } from "fabric"; // v5

export let cardWidth =400;
export let cardHeight =120;

export let shadow = new fabric.Shadow({
    color: "#d2d2d2",
    blur: 10,
    offsetX: 2,
    offsetY: 4,
  });

export  let hoverShadow = new fabric.Shadow({
    color: "#d2d2d2",
    blur: 15,
    offsetX: 2,
    offsetY: 4,
  });

export  let gradient = new fabric.Gradient({
    type: "linear",
    gradientUnits: "pixels", // or 'percentage'
    coords: { x1: 0, y1: 0, x2: cardWidth, y2: 0 },
    colorStops: [
      { offset: 0, color: "#edfcff" },
      { offset: 1, color: "#cbeef4" },
    ],
  });