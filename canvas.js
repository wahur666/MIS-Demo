import { ApplicationCore } from "./app/ApplicationCore.js";

var canvas = document.querySelector('canvas');
var applicationCore = new ApplicationCore(canvas);

function mainLoop() {
    applicationCore.Update();
    requestAnimationFrame(mainLoop);
}
mainLoop();