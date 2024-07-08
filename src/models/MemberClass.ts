
import { fabric } from "fabric"; // v5

let memberCard = fabric.util.createClass(fabric.Rect, {
    type: "memberCard",
    imageload: function( url: string, crossOrigin = null)
      {
        return new Promise(function (resolve) {
        const img = document.createElement('img');
        const done = function () {
          img.onload = img.onerror = null;
          resolve(img);
        };
        if (!url) {
          done();
          return;
        }
        img.onload = done;
        crossOrigin && (img.crossOrigin = crossOrigin);
        img.src = url;
      })},

    initialize: function (options: any) {
      options || (options = {});
      this.callSuper("initialize", options);
      this.set("label", options.label || "");
      this.set("imageUrl", options.imageUrl || "");
      this.set("gitUrl", options.gitUrl || "");
      this.imageload(options.imageUrl, "anonymous").then((img : any) => {this.set("img", img) });

    },

    toObject: function () {
      return fabric.util.object.extend(this.callSuper("toObject"), {
        label: this.get("label"),
        imageUrl: this.get("imageUrl"),
        gitUrl: this.get("gitUrl"),
        img : this.get("img")
      });
    },

    _render: function (ctx: any) {
      let cardWidth = this.width;
      let cardHeight = this.height;
    
      this.callSuper("_render", ctx);
      ctx.font = "normal 20px Poppins";
      ctx.fillStyle = "#333";
      ctx.fillText(this.label, -40, 0);

      ctx.font = "normal 12px Helvetica";
      ctx.fillStyle = "#333";
      ctx.fillText("Go to github profile >", -40, 25);

      if(this.img){
          ctx.save();
          ctx.beginPath();
          ctx.arc(-120, 0, 40, 0, Math.PI * 2, false);
          ctx.strokeStyle = "#4473b6";
          ctx.lineWidth = 5;
          ctx.stroke();
          ctx.clip();
          ctx.drawImage(this.img, -cardWidth / 2 + 40, -cardHeight / 2 + 20, 80, 80);
          ctx.restore();
        }else{
          let img = new Image();
          img.crossOrigin="anonymous";
          img.onload = function () {
            ctx.save();
            ctx.beginPath();
            ctx.arc(-120, 0, 40, 0, Math.PI * 2, false);
            ctx.strokeStyle = "#4473b6";
            ctx.lineWidth = 5;
            ctx.stroke();
            ctx.clip();
            ctx.drawImage(img, -cardWidth / 2 + 40, -cardHeight / 2 + 20, 80, 80);
            ctx.restore();
          };
          img.src = this.imageUrl;
        }
    },
  });

  export default memberCard;