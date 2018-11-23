import { AbstractDrawable } from "./AbstractDrawable.js";
import { COLOR } from "./Constants.js";
import { DrawCircle } from "./SupportFunctions.js";
import { Text } from "./Text.js";

export class Point extends AbstractDrawable {
    constructor(x = null, y = null, num = null) {
        super(x, y, 0, 0);
        this.color = COLOR.BLACK;
        this.text = "p" + num;
        this.diagDelta = 7;
        this.pointNameText = new Text(x + this.diagDelta, y + this.diagDelta, 20, 20, this.text, undefined);
        this.degreeText = new Text(x + 15, y - 25, 20, 20, "0", undefined);
        this.edges = [];
    }

    DrawObject(screen) {
        DrawCircle(screen, this.color, [this.x, this.y], 15, 0);
        this.pointNameText.DrawObject(screen);
        this.degreeText.DrawObject(screen);
    }

    IsInside(position) {
        return this.x - 15 <= position[0] && this.x + 30 >= position[0] && this.y - 20 <= position[1] && this.y + 30 >= position[1];
    }

    SetDegree(num) {
        this.degreeText.SetText(num);
    }

    DisconnectEdge(point) {
        for (const edge of this.edges) {
            if(edge.point1 == point) {
                edge.point1.RemoveEdge(edge);
                this.RemoveEdge(edge);
                return edge;
            } else if (edge.point2 == point) {
                edge.point2.RemoveEdge(edge);
                this.RemoveEdge(edge);
                return edge;
            }
        }
        return null;
    }

    DisconnectAllEdges() {
        for (const edge of this.edges) {
            if(edge.point1 != this) {
                edge.point1.RemoveEdge(edge);
            } else {
                edge.point2.RemoveEdge(edge);
            }
        }
        return this.edges;
    }

    SelectThis() {
        this.color = COLOR.GREEN;
    }

    DeselectThis() {
        this.color = COLOR.BLACK;
    }

    Center() {
        return [this.x, this.y];
    }

    AddEdge(edge) {
        for (const e of this.edges) {
            if(edge.point1 == e.point1 && edge.point2 == e.point2 ||
                edge.point1 == e.point2 && edge.point2 == e.point1) {
                    return false;
                }
        }
        this.edges.push(edge);
        this.degreeText.SetText(this.edges.length);
        return true;
    }

    RemoveEdge(edge){
        this.edges.remove(edge);
        this.degreeText.SetText(this.edges.length);
    }
}