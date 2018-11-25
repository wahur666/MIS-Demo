export class COLOR {

    static get WHITE() { return 'rgba(255, 255, 255, 255)' }
    static get BLACK() { return 'rgba(0, 0, 0, 255)' }
    static get RED() { return 'rgba(255, 0, 0, 255)' }
    static get GREEN() { return 'rgba(0, 255, 0, 255)' }
    static get BLUE() { return 'rgba(0, 0, 255, 255)' }
    static get CYAN() { return 'rgba(0, 255, 255, 255)' }
    static get GREY() { return 'rgba(127, 127, 127, 255)' }
    static get MAGENTA() { return 'rgba(255, 0, 255, 255)' }
    static get YELLOW() { return 'rgba(255, 236, 4, 255)' }
    static get LIGHTBLUE() { return 'rgba(168, 244, 255, 255)' }
    static get LIGHTORANGE() { return 'rgba(255, 233, 127, 255)' }
    static get KINDAORANGE() { return 'rgba(255, 128, 0, 255)' }
    static get LIGHTGRAY() { return 'rgba(238, 238, 238, 255)' }
    static get DARK_GREEN() { return 'rgba(73, 121, 107, 255)'}

    static get HATTER_1() { return 'rgba(211, 255, 204, 255)' } // halvany zold
    static get HATTER_2() { return 'rgba(214, 255, 248, 255)' } // halvany kek
    static get HATTER_3() { return 'rgba(196, 201, 255, 255)' } // lilaskek
    static get HATTER_4() { return 'rgba(246, 255, 196, 255)' } // halvanysarga
    static get HATTER_5() { return 'rgba(255, 251, 160, 255)' } // halvanyrozsaszin
    static get HATTER_6() { return 'rgba(255, 236, 211, 255)' } // kicsit erosebb sarga
    static get HATTER_7() { return 'rgba(255, 201, 207, 255)' } // halvanypiros
    static get HATTER_8() { return 'rgba(216, 255, 255, 255)' } // halovany nagyon kek

    static get COLOR_LIST() {
        return [this.WHITE, this.BLACK, this.RED, this.GREEN, this.BLUE, this.CYAN, this.GREY, this.LIGHTGRAY,
        this.MAGENTA, this.YELLOW, this.LIGHTBLUE, this.LIGHTORANGE, this.KINDAORANGE]
    }

    static get LOOP_COLORS() { return [this.BLACK, this.BLUE, this.RED, this.GREEN, this.CYAN, this.MAGENTA, this.KINDAORANGE] }

}


export class MOUSE {
    static get LMB() { return 0; }
    static get MMB() { return 1; }
    static get RMB() { return 2; }
}