# -*- coding: utf-8 -*-
import os.path

class MOUSE:
    LMB = 1
    RMB = 3
    MMB = 2
    SCROLLUP = 4
    SCROLLDOWN = 5

class COLOR:
    WHITE = (255, 255, 255, 255)
    BLACK = (0, 0, 0, 255)
    RED = (255, 0, 0, 255)
    GREEN = (0, 255, 0, 255)
    BLUE = (0, 0, 255, 255)
    CYAN = (0, 255, 255, 255)
    GREY = (127, 127, 127, 255)
    MAGENTA = (255, 0, 255, 255)
    YELLOW = (255, 236, 4, 255)
    LIGHTBLUE = (168, 244, 255, 255)
    LIGHTORANGE = (255, 233, 127, 255)
    KINDAORANGE = (255, 128, 0, 255)
    LIGHTGRAY = (238, 238, 238, 255)

    HATTER_1 = (211, 255, 204, 255) 
    HATTER_2 = (214, 255, 248, 255) 
    HATTER_3 = (196, 201, 255, 255) 
    HATTER_4 = (246, 255, 196, 255) 
    HATTER_5 = (255, 251, 160, 255) 
    HATTER_6 = (255, 236, 211, 255) 
    HATTER_7 = (255, 201, 207, 255) 
    HATTER_8 = (216, 255, 255, 255) 


    COLOR_LIST = [WHITE, BLACK, RED, GREEN, BLUE, CYAN, GREY, LIGHTGRAY,
                  MAGENTA, YELLOW, LIGHTBLUE, LIGHTORANGE, KINDAORANGE ]

    LOOP_COLORS = [BLACK, BLUE, RED, GREEN, CYAN, MAGENTA, KINDAORANGE]

class IMAGE_PATHS:
    DEFALUT = PLACEHOLDER = os.path.join(os.sep, "Resources","icon-placeholder.png")
    TURTLE = os.path.join(os.sep, "Resources", "turtle.png")
    BEND_LEFT = os.path.join(os.sep, "Resources", "bendleft.png")
    BEND_RIGHT = os.path.join(os.sep, "Resources", "bendright.png")
    TURN_LEFT = os.path.join(os.sep, "Resources", "turnleft.png")
    TURN_RIGHT = os.path.join(os.sep, "Resources", "turnright.png")
    RED_PENCIL = os.path.join(os.sep,"Resources", "pencil2.png")
    ICON = os.path.join(os.sep, "Resources", "visuallogoicon.png")


class FONT_AWESOME:
    FONT_PATH = os.path.join("Resources", "FontAwesome.otf")
    SETTINGS = u"\uF085"
    LOAD = u"\uF115"
    SAVE = u"\uF0C7"
    SCREENSHOT = CAMERA = u"\uF083"
    EXIT = u"\uF011"
    PLAY = u"\uF04B"
    STEPOVER = u"\uF051"
    STOP = u"\uF04D"
    UP = u"\uF062"
    DOWN = u"\uF063"
    RIGHT = u"\uF064"
    LEFT = u"\uF112"
    PEN = u"\uF040"
    HOME = u"\uF015"
    FLOODFILL = u"\uF1FC"
    RESET = u"\uF014"
    CLEAR = u"\uF12D"
    LOOP = u"\uF0E2"
    PLACEHOLDER = u"\uF071"
    BOOKMARK = u"\uF097"
    ANGLE_DOUBLE_DOWN = u"\uF103"
    ANGLE_DOUBLE_LEFT = u"\uF100"
    ANGLE_DOUBLE_RIGHT = u"\uF101"
    ANGLE_DOUBLE_UP = u"\uF102"
    ANGLE_UP = u"\uF106"
    ANGLE_RIGHT = u"\uF105"
    ANGLE_LEFT = u"\uF104"
    ANGLE_DOWN = u"\uF107"
    LONG_UP = u"\uF176"
    LONG_DOWN = u"\uF175"
    EYE_SEE = u"\uF06E"
    EYE_NOT_SEE = u"\uF070" # http://imgur.com/w8vx7A6
    BACKGROUND_PICTURE = u"\uF03E"
    STICKY_NOTE = u"\uF24A"
    ROUND_X = u"\uF05C"
    SQUARE_X = u"\uF2D4"
    CHECK = u"\uF00C"
    CLOSE = u"\uF00D"