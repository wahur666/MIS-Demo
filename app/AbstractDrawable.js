export class AbstractDrawable {
    constructor(x = null, y = null, w = null, h = null) {
        if(x == null && y == null && w == null && h == null){
            return;
        }
        if ( x != null && y != null) {
            this.x = x;
            this.y = y;
        } else {
            throw "Not enough parameter, give X and Y";
        } 

        if (w != null && h != null) {
            this.w = w;
            this.h = h;
        } else {
            throw "Not enough parameter, give W and H";
        }
        this.base = {
            "x" : this.x,
            "y" : this.y,
            "h" : this.h,
            "w" : this.w
        }
    }

    DrawObject(screen){
        console.log("Abstract DrawObject");
    }

    IsInside(position){
        console.log("Abstract IsInside");
    }

    SetPosition(x, y){
        this.x = x;
        this.y = y;
    }

    ResetPosition() {
        this.x = this.base.x;
        this.y = this.base.y;
        this.h = this.base.h;
        this.w = this.base.w;
    }

    GetParameters(){
        return [this.x, this.y, this.w, this.h];
    }
}