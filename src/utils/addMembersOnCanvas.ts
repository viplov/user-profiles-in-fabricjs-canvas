import { cardWidth, cardHeight, shadow, gradient } from "../data/constants";
import type { Member } from "../models/Member";
import memberCard from "../models/MemberClass";
import { Canvas } from "fabric";

export default function addMembersOnCanvas(members : Member[], canvas:Canvas){
    let top = 10;
    members.forEach((object: any) => {
        var labeledRect = new memberCard({
          width: cardWidth,
          height: cardHeight,
          left: canvas.width / 2 - 200 - canvas.viewportTransform[4] * canvas.viewportTransform[3],
          top: -100,
          rx: 20,
          ry: 20,
          shadow: shadow,
          fill: gradient,
          hasControls : false,
          gitUrl: object.html_url,
          label: object.login,
          imageUrl: object.avatar_url,
        });
        canvas.add(labeledRect);
  
        labeledRect.animate("top", top - canvas.viewportTransform[5] * canvas.viewportTransform[3],
          {
            onChange: canvas.renderAll.bind(canvas),
          }
        );
        top = top + 150;
      });
}