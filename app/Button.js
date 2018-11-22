import { AbstractDrawable } from "./AbstractDrawable.js";
import { COLOR } from "./Constants.js";
import { Rect } from "./Rectangle.js";
import { TextIcon } from "./TextIcon.js";

export class Button extends AbstractDrawable {
    constructor(x = null, y = null, w = null, h = null, text="", padding = 0) {
        super(x, y + 3, w, h);

        this.text = text;
        
        this.textIconColor = COLOR.BLACK;

        this.buttonRect = new Rect(x, y, w, h, undefined, 5, false);
        this.textIcon = new TextIcon(x + padding,y, w, h, text, this.textIconColor);
    }

    DrawObject(screen) {
        this.buttonRect.DrawObject(screen);
        this.textIcon.DrawObject(screen);
    }

    IsInside(position){
        return this.x <= position[0] && this.x + this.h >= position[0] && this.y <= position[1] && this.y + this.w >= position[1];
    }

    OnClick(eventType, context) {
        console.log("Unbound button");
    }

    SetAccentColor(accent) {
        this.buttonRect.SetAccentColor(accent);
    }

    SetTextIconColor(color){
        this.textIconColor = color;
    }

    SelectThis() {
        this.buttonRect.SetColor(COLOR.GREEN);
    }

    DelectThis() {
        this.buttonRect.SetColor(color.BLACK);
    }
}