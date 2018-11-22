import { COLOR,  MOUSE } from "./Constants.js";
import { Button } from "./Button.js";
import { Rect } from "./Rectangle.js";
import { DrawRect } from "./SupportFunctions.js";

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
        this.vertexButton.OnClick = this.vertexButton.SelectThis;
        this.Add(this.vertexButton);

        this.edgeButton = new Button(380, 20, 150, 50, "Edge", 20);
        this.edgeButton.OnClick = this.edgeButton.SelectThisR;
        this.Add(this.edgeButton);

        this.addButton = new Button(20, 100, 150, 50, "Add", 35);
        this.Add(this.addButton);

        this.selectButton = new Button(20, 170, 150, 50, "Select", 10);
        this.Add(this.selectButton);

        this.delteButton = new Button(20, 240, 150, 50, "Delete", 10);
        this.Add(this.delteButton);

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
    }

    OnClick(event) {
        this.mouseDown = true;
        if(!this.disable_input) {
            for (const item of this.items) {
                if(item.IsInside(event.realpos)) {
                    if (item instanceof Button) {
                        console.log("Picsaba");
                        
                        item.OnClick(event);
                        return;
                    }
                } 
            }
        }
    }

    EventPos(event) {
        return [Math.round((event.clientX - this.canvasRect.left) / (this.canvasRect.right - this.canvasRect.left) * this.canvas.width),
                    Math.round((event.clientY - this.canvasRect.top) / (this.canvasRect.bottom - this.canvasRect.top) * this.canvas.height)];
    }


    SelectVertexOrEdge(event) {
        console.log("QWEQWEQW")
        console.log(event);

    }

    SelectMode() {

    }
}