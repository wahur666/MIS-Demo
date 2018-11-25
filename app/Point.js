import { AbstractDrawable } from "./AbstractDrawable.js";
import { COLOR } from "./Constants.js";
import { DrawCircle } from "./SupportFunctions.js";
import { Text } from "./Text.js";

const CLASS_HIGH = 3;
const CLASS_HIGH_MED = 2;
const CLASS_MED_LOW = 1;
const CLASS_LOW = 0;

export class Point extends AbstractDrawable {
    constructor(x = null, y = null, num = null) {
        super(x, y, 0, 0);
        this.color = COLOR.BLACK;
        this.text = "p" + num;
        this.diagDelta = 7;
        this.pointNameText = new Text(x + this.diagDelta, y + this.diagDelta, 20, 20, this.text, undefined);
        this.degreeText = new Text(x + 15, y - 25, 20, 20, "0", undefined);
        this.edges = [];
        this.classification = 0;
        this.partOfMis = false;
        this.neighbors = [];
        this.mis_neighbors = [];
        this.unique_2hop_neighbors = [];
        this.mis_2hop_neighbors = [];
    }

    DrawObject(screen) {
        DrawCircle(screen, this.color, [this.x, this.y], 15, 0);
        if(this.partOfMis){
            DrawCircle(screen, COLOR.MAGENTA, [this.x, this.y], 15, 5);
        }
        this.pointNameText.DrawObject(screen);
        this.degreeText.DrawObject(screen);
    }

    IsInside(position) {
        return this.x - 15 <= position[0] && this.x + 30 >= position[0] && this.y - 20 <= position[1] && this.y + 30 >= position[1];
    }

    GetDegree() {
        return this.edges.length;
    }

    SetClassification(num) {
        this.classification = num;
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
        if(edge.point1 == this) {
            this.neighbors.push(edge.point2);
        } else {
            this.neighbors.push(edge.point1);
        }
        this.degreeText.SetText(this.edges.length);
        return true;
    }

    RemoveEdge(edge){
        this.edges.remove(edge);
        this.degreeText.SetText(this.edges.length);
    }

    SetPartOfMis(state) {
        this.partOfMis = state;
    }

    IsPartOfMis() {
        return this.partOfMis;
    }

    NeighborPoints() {
        return this.neighbors;
    }

    NeighborsDegree() {
        var neighborsDegree = [];
        for (const point of this.neighbors) {
            neighborsDegree.push(point.GetDegree());
        }
        return neighborsDegree;
    }

    Calculate_MIS_neighbors() {
        this.mis_neighbors = [];
        if(this.classification != CLASS_LOW) { 
            for (const point of this.neighbors) {
                if(point.IsPartOfMis()) {
                    this.mis_neighbors.push(point);
                }
            }
        } else { // Low
            for (const point of this.neighbors) {
                if(point.IsPartOfMis() && point.classification != CLASS_HIGH) {
                    this.mis_neighbors.push(point);
                }
            }
        }
    }

    MIS_neighbors() {
        return this.mis_neighbors.length;
    }

    Calculate_MIS_2hop_neighbors() {
        this.mis_2hop_neighbors = [];
        this.CollectUnique2HopNeighbors();
        for (const point of this.unique_2hop_neighbors) {
            if(point.IsPartOfMis() && 
                    (point.classification == CLASS_LOW || 
                     point.classification == CLASS_MED_LOW )) {
                this.mis_2hop_neighbors.push(point);
            }
        }
    }

    CollectUnique2HopNeighbors() {
        this.unique_2hop_neighbors = new Set();
        for (const point of this.neighbors) {
            for (const neighbor in point.NeighborPoints()) {
                unique_2hop_neighbors.add(neighbor);
            }
        }
    }

    MIS_2hop_neighbors() {
        this.mis_2hop_neighbors.length;
    }

    UpdateNeighborsAlgo() {
        for (const point of this.neighbors) {
            if(this.classification == CLASS_HIGH) {
                if(point.classification != CLASS_LOW) {
                    point.Calculate_MIS_neighbors();
                }
            } else {
                point.Calculate_MIS_neighbors();
            }
        }
    }

    Update2HopNeighborsAlgo() {
        for (const point of this.neighbors) {
            if(this.classification == CLASS_LOW ||
                this.classification == CLASS_MED_LOW) {
                    if(point.classification == CLASS_LOW) {
                        for (const point_2hop of point.neighbor) {
                            point_2hop.Calculate_MIS_neighbors();
                        }
                    } else {
                        point.Calculate_MIS_2hop_neighbors();
                    }
                }
        }
    }
}