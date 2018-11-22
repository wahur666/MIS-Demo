import { ApplicationCore } from "./app/ApplicationCore.js";

var canvas = document.querySelector('canvas');
var applicationCore = new ApplicationCore(canvas);

window.onresize = function () {
    setTimeout(function () {
        window.location.reload();
    });
}

function mainLoop() {
    applicationCore.Update();
    requestAnimationFrame(mainLoop);
}
mainLoop();