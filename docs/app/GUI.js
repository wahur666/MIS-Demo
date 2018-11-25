import { COLOR,  MOUSE } from "./Constants.js";
import { Button } from "./Button.js";
import { Rect } from "./Rectangle.js";
import { DrawRect } from "./SupportFunctions.js";
import { Point } from "./Point.js";
import { Edge } from "./Edge.js";
import { Text } from "./Text.js";

const VERTEX = 0;
const EDGE = 1;

const ADD = 0;
const DELETE = 1;

const CLASS_HIGH = 3;
const CLASS_HIGH_MED = 2;
const CLASS_MED_LOW = 1;
const CLASS_LOW = 0;


export class GUI {
    constructor(application_core){
        this.application_core = application_core;
        this.items = [];
        this.points = [];
        this.edges = [];
        this.Initialize();
    }

    Initialize() {


        this.background_color = COLOR.LIGHTGRAY;
        this.background_color_index = 7;
        this.canvas = this.application_core.canvas;
        this.screen = this.canvas.getContext("2d");
        this.canvasRect = this.canvas.getBoundingClientRect();
        
        this.vertexButton = new Button(200, 20, 150, 50, "Vertex", 10);
        this.vertexButton.OnClick = this.SelectVertexOrEdge.bind(this, this.edgeButton);
        this.Add(this.vertexButton);

        this.edgeButton = new Button(380, 20, 150, 50, "Edge", 20);
        this.edgeButton.OnClick = this.SelectVertexOrEdge.bind(this, this.edgeButton);
        this.Add(this.edgeButton);

        this.addButton = new Button(20, 100, 150, 50, "Add", 35);
        this.addButton.OnClick = this.SelectMode.bind(this, this.addButton);
        this.Add(this.addButton);

        this.deleteButton = new Button(20, 170, 150, 50, "Delete", 10);
        this.deleteButton.OnClick = this.SelectMode.bind(this, this.deleteButton);
        this.Add(this.deleteButton);

        this.demoButton = new Button(560, 20, 150, 50, "Demo", 17);
        this.demoButton.OnClick = this.LoadDemo.bind(this);
        this.Add(this.demoButton);

        this.resetButton = new Button(740, 20, 150, 50, "Reset", 20);
        this.resetButton.OnClick = this.ClearCanvas.bind(this);
        this.Add(this.resetButton);

        
        this.lHighLabelText = new Text(20, 250, 20, 20, "L_high:");
        this.Add(this.lHighLabelText);
        this.lHighMedLabelText = new Text(20, 350, 20, 20, "L_high_medium:");
        this.Add(this.lHighMedLabelText);
        this.lMedLowLabelText = new Text(20, 450, 20, 20, "L_medium_low:");
        this.Add(this.lMedLowLabelText);
        this.lLowLabelText = new Text(20, 550, 20, 20, "L_low");
        this.Add(this.lLowLabelText);

        this.lHighText = new Text(20, 275, 20, 20, "[]");
        this.Add(this.lHighText);
        this.lHighMedText = new Text(20, 375, 20, 20, "[]");
        this.Add(this.lHighMedText);
        this.lMedLowText = new Text(20, 475, 20, 20, "[]");
        this.Add(this.lMedLowText);
        this.lLowText = new Text(20, 575, 450, 20, "[]");
        this.Add(this.lLowText);

        this.ClearCanvas();

    }

    DrawGUI(){
        DrawRect(this.screen, this.background_color, 0, 0, this.canvas.width, this.canvas.height, 0);
        DrawRect(this.screen, COLOR.WHITE, 200, 100, this.canvas.width, this.canvas.height, 0);
        
        for (const element of this.items) {
            element.DrawObject(this.screen);
        }

        for (const edge of this.edges) {
            edge.DrawObject(this.screen);
        }
        
        for (const point of this.points) {
            point.DrawObject(this.screen);
        }
        
    }

    Add(item){
        this.items.push(item);
    }

    AddPoint(point) {
        this.points.push(point);
    }

    AddEdge(edge) {
        this.edges.push(edge);
    }

    MouseHandler(event) {
        event["realpos"] = this.EventPos(event);
        if(event.type == "mousemove") {
            if (this.mouseDown) {
                this.OnDrag(event);
            }
        } else if(event.type == "mousedown" || event.type == "wheel") {
            console.log("Qwe");
            
            this.OnClick(event);
        } else { // MouseUp, MouseOut
            this.OnRelease(event);
        }
        
    }

    KeyboardHandler(event) {
        if(event.type == "keyup") {
            if(event.key == "a") {
                this.modeAD = ADD;
            } else if(event.key == "d") {
                this.modeAD = DELETE;
            } else if(event.key == "w") {
                this.modeVE = VERTEX;
            } else if(event.key == "e") {
                this.modeVE = EDGE;
            }
        }
        this.UpdateSelection();
    }

    OnDrag(event){ 
        // PASS
    }

    OnRelease(event) {
        this.mouseDown = false;
        if(event.realpos[0] > 220 && 
            event.realpos[1] > 120 && 
            event.realpos[0] < this.canvas.width - 30 && 
            event.realpos[1] < this.canvas.height - 30 ) {

            if(this.modeVE == VERTEX) {
                if(this.modeAD == ADD) { // VERTEX + ADD
                    if(!this.CoverOtherPoint(event.realpos)){
                        this.CreatePoint(...event.realpos);
                    }
                } else {  // VERTEX + DELETE
                    var marked = null;
                    for (const point of this.points) {
                        if(point.IsInside(event.realpos)) {
                            var edges = point.DisconnectAllEdges();
                            for (const edge of edges) {
                                this.edges.remove(edge);
                            }
                            marked = point;
                        }
                    }
                    if(marked) {
                        this.points.remove(marked);
                        this.ReclassifyAllPoints();
                    }
                }
            } else { 
                if(this.modeAD == ADD) {  // EDGE + ADD
                    for (const point of this.points) {
                        if(point.IsInside(event.realpos)) {
                            if(!this.point1) {
                                point.SelectThis();
                                this.point1 = point;
                                break;
                            } else {
                                if(this.point1 == point) {
                                    point.DeselectThis();
                                    this.point1 = null;
                                } else {
                                    this.point2 = point;
                                    this.point2.SelectThis();
                                }
                                break;
                            }
                        }
                    }
                    if(this.point1 && this.point2) {
                        this.CreateEdge(this.point1, this.point2);
                        this.point1.DeselectThis();
                        this.point2.DeselectThis();
                        this.point1 = null;
                        this.point2 = null;
                    }
                } else {  // EDGE + DELETE
                    for (const point of this.points) {
                        if(point.IsInside(event.realpos)) {
                            if(!this.point1) {
                                point.SelectThis();
                                this.point1 = point;
                                break;
                            } else {
                                if(this.point1 == point) {
                                    point.DeselectThis();
                                    this.point1 = null;
                                } else {
                                    this.point2 = point;
                                    this.point2.SelectThis();
                                }
                                break;
                            }
                        }
                    }
                    if(this.point1 && this.point2) {
                        var edge = this.point1.DisconnectEdge(this.point2);
                        if(edge) {
                            this.edges.remove(edge);
                            this.ReclassifyAllPoints();
                        }
                        this.point1.DeselectThis();
                        this.point2.DeselectThis();
                        this.point1 = null;
                        this.point2 = null;
                    }
                }
            }

            
        }
    }

    OnClick(event) {
        this.mouseDown = true;
        for (const item of this.items) {
            if(item.IsInside(event.realpos)) {
                if (item instanceof Button) {
                    item.OnClick(event);
                    return;
                }
            } 
        }
    }

    EventPos(event) {
        return [Math.round((event.clientX - this.canvasRect.left) / (this.canvasRect.right - this.canvasRect.left) * this.canvas.width),
                    Math.round((event.clientY - this.canvasRect.top) / (this.canvasRect.bottom - this.canvasRect.top) * this.canvas.height)];
    }


    SelectVertexOrEdge(event) {
        if(event == this.edgeButton) {
            this.modeVE = EDGE;
        } else {
            this.modeVE = VERTEX;
        }
        this.UpdateSelection();
    }

    SelectMode(event) {
        if(event == this.addButton) {
            this.modeAD = ADD;
        } else {
            this.modeAD = DELETE;
        }
        this.UpdateSelection();
    }

    UpdateSelection() {

        if(this.modeVE == EDGE) {
            this.edgeButton.SelectThis();
            this.vertexButton.DeselectThis();
        } else {
            this.vertexButton.SelectThis();
            this.edgeButton.DeselectThis();
        }

        if(this.modeAD == ADD) {
            this.addButton.SelectThis();
            this.deleteButton.DeselectThis();
        } else {
            this.addButton.DeselectThis();
            this.deleteButton.SelectThis();
        }

        if(this.point1) {
            this.point1.DeselectThis();
            this.point1 = null;
        }
        if(this.point2) {
            this.point2.DeselectThis();
            this.point2 = null;
        }
    }

    CoverOtherPoint(position) {
        var top_left = [position[0] - 15, position[1] - 20];
        var bottom_left = [position[0] - 15, position[1] + 30];

        var top_right = [position[0] + 30, position[1] - 20];
        var bottom_right = [position[0] + 30, position[1] + 30];

        for (const point of this.points) {
            if(point.IsInside(top_left) ||
                point.IsInside(bottom_left) ||
                point.IsInside(top_right) ||
                point.IsInside(bottom_right)) {
                    return true;
                }
        }

        return false;
    }

    ClearCanvas() {
        this.points = [];
        this.edges = [];
        this.modeAD = ADD;
        this.modeVE = VERTEX;
        this.pointCounter = 0;

        this.highArr=  [];
        this.highMedArr= [];
        this.medLowArr= [];
        this.lowArr = [];

        this.UpdateClassArrayTexts();

        this.lHighText.SetText("[]");
        this.UpdateSelection();
    }

    CreatePoint(x, y) {
        var point = new Point(x, y, this.pointCounter);
        this.AddPoint(point);
        this.pointCounter += 1;
        return point;
    }

    CreateEdge(p1, p2) {
        var edge = new Edge(p1, p2);
        if (p1.AddEdge(edge)) {
            p2.AddEdge(edge);
            this.AddEdge(edge);
        }
        
        this.ReclassifyAllPoints();
    }

    UpdateClassArrayTexts() {
        this.lHighText.SetText("["+ this.highArr.join(", ") + "]");
        this.lHighMedText.SetText("["+ this.highMedArr.join(", ") + "]");
        this.lMedLowText.SetText("["+ this.medLowArr.join(", ") + "]");
        this.lLowText.SetText("["+ this.lowArr.join(", ") + "]");
    }

    ClassifyPoint(point) {
        var m = this.edges.length;
        var degV = point.GetDegree();

        var highValue = m ** 0.75;
        var medValue = m ** 0.5;
        var lowValue = m ** 0.25; 

        if(degV >= highValue) {
            point.SetClassification(CLASS_HIGH);
        } else if ( highValue > degV && degV >= medValue) {
            point.SetClassification(CLASS_HIGH_MED);
        } else if ( medValue > degV && degV >= lowValue ) {
            point.SetClassification(CLASS_MED_LOW);
        } else {
            point.SetClassification(CLASS_LOW);
        }
    }

    ReclassifyAllPoints() {
        for (const point of this.points) {
            this.ClassifyPoint(point);
        }
        this.RecollectClassArrays();
    }

    RecollectClassArrays() {
        this.highArr = [];
        this.highMedArr = [];
        this.medLowArr = [];
        this.lowArr = [];
        for (const point of this.points) {
            if(point.classification == CLASS_HIGH) {
                this.highArr.push(point.text);
            } else if (point.classification == CLASS_HIGH_MED) {
                this.highMedArr.push(point.text);
            } else if (point.classification == CLASS_MED_LOW) {
                this.medLowArr.push(point.text);
            } else {
                this.lowArr.push(point.text);
            }
        }
        this.UpdateClassArrayTexts();
    }

    LoadDemo() {
        this.ClearCanvas();
        // Petersen Graf lesz itt

        // Kulso 5szog
        var p1 = this.CreatePoint(700, 140);
        var p2 = this.CreatePoint(980, 345);
        var p3 = this.CreatePoint(870,675);
        var p4 = this.CreatePoint(525, 675);
        var p5 = this.CreatePoint(420, 340);


        // Belso 5szog
        var p6 = this.CreatePoint(700, 260);
        var p7 = this.CreatePoint(875, 385);
        var p8 = this.CreatePoint(810, 590);
        var p9 = this.CreatePoint(595, 590);
        var p10 = this.CreatePoint(525, 390);

        this.CreateEdge(p1, p2);
        this.CreateEdge(p2, p3);
        this.CreateEdge(p3, p4);
        this.CreateEdge(p4, p5);
        this.CreateEdge(p5, p1);

        this.CreateEdge(p6, p8);
        this.CreateEdge(p7, p9);
        this.CreateEdge(p8, p10);
        this.CreateEdge(p9, p6);
        this.CreateEdge(p10, p7);

        this.CreateEdge(p1, p6);
        this.CreateEdge(p2, p7);
        this.CreateEdge(p3, p8);
        this.CreateEdge(p4, p9);
        this.CreateEdge(p5, p10);

        p1.SetPartOfMis(true);
        p4.SetPartOfMis(true);
        p7.SetPartOfMis(true);
        p8.SetPartOfMis(true);

        
    }
}