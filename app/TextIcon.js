import { AbstractDrawable } from "./AbstractDrawable.js";
import {  COLOR } from "./Constants.js";

export class TextIcon extends AbstractDrawable {

    constructor(x = null, y = null, w = null, h = null, text = "", color = COLOR.BLACK) {
        super(x, y + h * 0.8, w, h);

        this.text = text;
        this.pad_x = 0;
        this.color = color;
    }

    IsInside(position) {
        return this.x <= position[0] && this.x + this.h >= position[0] && this.y <= position[1] && this.y + this.w >= position[1];
    }

    DrawObject(screen) {
        screen.save();

        screen.font =  this.h - 6 + "px Arial";
        screen.fillStyle =this.color;
        screen.fillText(this.text, this.x + this.pad_x , this.y);

        screen.restore();
    }

    SetPadding(x) {
        this.pad_x = x;
    }

    SetColor(color) {
        this.color = color;
    }

}