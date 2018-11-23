import { AbstractDrawable } from "./AbstractDrawable.js";
import { COLOR } from "./Constants.js";
import { Rect } from "./Rectangle.js";
import { Text } from "./Text.js";

export class Button extends AbstractDrawable {
    constructor(x = null, y = null, w = null, h = null, text="", padding = 0) {
        super(x, y + 3, w, h);

        this.text = text;
        
        this.textIconColor = COLOR.BLACK;

        this.buttonRect = new Rect(x, y, w, h, undefined, 5, false);
        this.textIcon = new Text(x + padding,y, w, h, text, this.textIconColor);
    }

    DrawObject(screen) {
        this.buttonRect.DrawObject(screen);
        this.textIcon.DrawObject(screen);
    }

    IsInside(position){
        return this.x <= position[0] && this.x + this.w >= position[0] && this.y <= position[1] && this.y + this.h >= position[1];
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

    DeselectThis() {
        this.buttonRect.SetColor(COLOR.BLACK);
    }
}