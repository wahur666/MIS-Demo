import { AbstractDrawable } from "./AbstractDrawable.js";
import { COLOR } from "./Constants.js";
import { DrawRect } from "./SupportFunctions.js";

export class Rect extends AbstractDrawable {

    constructor(x = null, y = null, w = null, h = null, color = COLOR.BLACK, width = 0, transparent = true) {
        super(x, y, w, h);
        this.delta = [0, 0];
        this.color = color;
        this.width = width;
        this.transparent = transparent;
        this.accentColor = COLOR.WHITE;
        this.Clickable = true;
    }

    DrawObject(screen) {
        if (!this.transparent) {
            DrawRect(screen, this.accentColor, this.x, this.y, this.w, this.h, 0);
        }
        DrawRect(screen, this.color, this.x, this.y, this.w, this.h, this.width);
    }

    IsInside(position) {
        return this.x <= position[0] && this.x + this.w >= position[0] && this.y <= position[1] && this.y + this.h >= position[1];
    }

    DeltaPos(position) {
        return [position[0] - this.x, position[1] - this.y];
    }

    Drag(mousePosition) {
        this.x = mousePosition[0] - this.delta[0];
        this.y = mousePosition[1] - this.delta[1];
    }

    SetDelta(mousePosition) {
        this.delta = this.DeltaPos(mousePosition);
    }

    IsMovable() {
        return this.movable;
    }

    Extend(y, h) {
        this.y = y;
        this.h = h;
    }

    SetAccentColor(accent) {
        this.accentColor = accent;
    }

    SetColor(color) {
        this.color = color;
    }

}