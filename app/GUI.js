import { COLOR,  MOUSE } from "./Constants.js";
import { Button } from "./Button.js";
import { Rect } from "./Rectangle.js";
import { DrawRect } from "./SupportFunctions.js";
import { Point } from "./Point.js";

const VERTEX = 0;
const EDGE = 0;
const ADD = 0;
const DELETE = 0;

export class GUI {
    constructor(application_core){
        this.application_core = application_core;
        this.items = [];
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
        this.Add(this.demoButton);

        this.resetButton = new Button(740, 20, 150, 50, "Reset", 20);
        this.Add(this.resetButton);

        this.mode = ADD;
        this.selectMode = VERTEX;
        this.vertexButton.SelectThis();
        this.addButton.SelectThis();

    }

    DrawGUI(){
        DrawRect(this.screen, this.background_color, 0, 0, this.canvas.width, this.canvas.height, 0);
        
        for (const element of this.items) {
            element.DrawObject(this.screen);
        }

    }

    Add(item){
        this.items.push(item);
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
                this.button_down.a = false;
            }
            if(event.key == "s") {
                this.button_down.s = false;
            }
            if(event.key == "d") {
                this.button_down.d = false;
            }
        } else {
            if(event.key == "a") {
                this.button_down.a = true;
                this.button_down.s = false;
                this.button_down.d = false;
            }
            if(event.key == "s") {
                this.button_down.a = false;
                this.button_down.s = true;
                this.button_down.d = false;
            }
            if(event.key == "d") {
                this.button_down.a = false;
                this.button_down.s = false;
                this.button_down.d = true;
            }
        }
    }

    OnDrag(event){ 
        console.log(event);
        for (const element of this.items) {

        }
    }

    OnRelease(event) {
        this.mouseDown = false;
        for (const item of this.items) {

        }
        console.log("REALEASE");
        console.log("Realpos");
        console.log(event.realpos);
        if(event.realpos[0] > 220 && event.realpos[1] > 120) {
            console.log("qweqwe");
            var point = new Point(event.realpos[0], event.realpos[1]);
            this.Add(point);
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
            this.edgeButton.SelectThis();
            this.vertexButton.DeselectThis();
            this.selectMode = EDGE;
        } else {
            this.vertexButton.SelectThis();
            this.edgeButton.DeselectThis();
            this.selectMode = VERTEX;
        }
        //console.log(this);
        //console.log("QWEQWEQW")
        //console.log(event); 

    }

    SelectMode(event) {
        if(event == this.addButton) {
            this.addButton.SelectThis();
            this.deleteButton.DeselectThis();
            this.mode = ADD;
        } else {
            this.addButton.DeselectThis();
            this.deleteButton.SelectThis();
            this.mode = DELETE;
        }
    }
}