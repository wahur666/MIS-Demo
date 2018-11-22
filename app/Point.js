import { AbstractDrawable } from "./AbstractDrawable.js";
import { COLOR } from "./Constants.js";
import { DrawCircle } from "./SupportFunctions.js";

export class Point extends AbstractDrawable {
    constructor(x = null, y = null) {
        super(x, y, 0, 0);
        this.color = COLOR.BLACK;
    }

    DrawObject(screen) {
        DrawCircle(screen, this.color, [this.x, this.y], 15, 0);
    }

    IsInside(pos) {
        return false;
    }

}