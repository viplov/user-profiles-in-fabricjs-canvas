import { Canvas, fabric } from "fabric";
import { cardHeight, cardWidth, shadow,gradient, hoverShadow } from "../data/constants";


export default function addListeners(canvas : Canvas){
      //hover effects
      canvas.on("mouse:over", function (opt : fabric.IGroupOptions) {
        console.log(canvas)
        if (opt.target) {
          opt.target.set("stroke", "#4473b6");
          opt.target.set("strokeWidth", 3);
          opt.target.set("shadow", hoverShadow);
          canvas.requestRenderAll();
        }
      });
  
      canvas.on("mouse:out", function (opt : fabric.IGroupOptions) {
        if (opt.target) {
          // e.target.set('stroke', "#4473b6");
          opt.target.set("strokeWidth", 0);
          opt.target.set("shadow", shadow);
          canvas.requestRenderAll();
        }
      });
  
      //Panning of canvas
      canvas.on("mouse:down", function (this: Canvas, opt: fabric.IGroupOptions) {
        var evt = opt.e;
        if (!opt.target && window.innerWidth> 1366) {
          this.dragStart = true;
          this.selection = false;
          this.lastPosX = evt.clientX;
          this.lastPosY = evt.clientY;
        } else {
          this.cardMove = false;
          opt.target.set("width", cardWidth + 10);
          opt.target.set("height", cardHeight + 10);
        }
      });
      canvas.on("mouse:move", function (this: Canvas, opt: fabric.IGroupOptions) {
        // TO-DO fix the functionality of this for IPAD
        if (this.dragStart) {
          var e = opt.e;
          var vpt = this.viewportTransform;
          vpt[4] += e.clientX - this.lastPosX;
          vpt[5] += e.clientY - this.lastPosY;
          this.requestRenderAll();
          this.lastPosX = e.clientX;
          this.lastPosY = e.clientY;
        }
        if (opt.target) {
          this.cardMove = true;
        }
      });
      canvas.on("mouse:up", function (this: Canvas, opt: fabric.IGroupOptions) {
        if (this.dragStart) {
          this.setViewportTransform(this.viewportTransform);
          this.dragStart = false;
          this.selection = true;
          this.lastPosX = this.viewportTransform[4];
          this.lastPosY = this.viewportTransform[5];
        } else if (!this.cardMove) {
          window?.open(opt.target.gitUrl, "_blank").focus();
          opt.target.set("width", cardWidth);
          opt.target.set("height", cardHeight);
        } else {
          this.cardMove = false;
          opt.target.set("width", cardWidth);
          opt.target.set("height", cardHeight);
        }
      });
  
      //Zoom of canvas
      canvas.on("mouse:wheel", function (this: Canvas, opt: fabric.IGroupOptions) {
          if (opt.e.ctrlKey) {
            var delta = opt.e.deltaY;
            var zoom = this.getZoom();
            zoom *= 0.99 ** delta;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.01) zoom = 0.01;
            this.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
            this.lastPosX = this.viewportTransform[4];
            this.lastPosY = this.viewportTransform[5];
            this.requestRenderAll();

            opt.e.preventDefault();
            opt.e.stopPropagation();
          }
        }
      );
}