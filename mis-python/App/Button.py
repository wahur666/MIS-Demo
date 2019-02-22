# -*- coding: utf-8 -*-

from App.AbstractDrawable import AbstractDrawable
from App.Rectangle import Rect
from App.Constants import COLOR as Color
from App.Text import Text


class Button(AbstractDrawable):

    def __init__(self, x=None, y=None, w=None, h=None, text="", padding=0):
        super(Button, self).__init__(x=x, y=y, w=w, h=h)

        self.text = text

        self.text_icon_color = Color.BLACK

        self.button = Rect(x , y , w , h, width=5, transparent=False)
        self.texticon = Text(x + padding, y, w, h, text, self.text_icon_color)

    def DrawObject(self, screen):
        self.button.DrawObject(screen)
        self.texticon.DrawObject(screen)

    def IsInside(self, position):
        return self.x <= position[0] <= self.x + self.w and self.y <= position[1] <= self.y + self.h

    def bind(self, funcpointer):
        self.OnClick = funcpointer

    def OnClick(self, event_type, context):
        raise RuntimeError("Undobund button")

    def SetAccentColor(self, accent):
        self.button.SetAccentColor(accent)

    def SelectThis(self):
        self.button.SetColor(Color.GREEN)

    def DeselectThis(self):
        self.button.SetColor(Color.BLACK)