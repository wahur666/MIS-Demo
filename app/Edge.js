import { AbstractDrawable } from "./AbstractDrawable.js";
import { COLOR } from "./Constants.js";
import { DrawLine } from "./SupportFunctions.js";

export class Edge extends AbstractDrawable {
    constructor(point1 = null, point2 = null) {
        super(0, 0, 0, 0);
        this.point1 = point1;
        this.point2 = point2;
    }

    DrawObject(screen) {
        DrawLine(screen, COLOR.RED, this.point1.Center(), this.point2.Center(), 5);
    }

}