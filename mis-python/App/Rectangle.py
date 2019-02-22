# -*- coding: utf-8 -*-

import pygame

from App.AbstractDrawable import AbstractDrawable
from App.Constants import COLOR as Color


class Rect(AbstractDrawable):

    def __init__(self, x=None, y=None, w=None, h=None, color=Color.BLACK, width=0, transparent = True):
        super(Rect, self).__init__(x=x, y=y, w=w, h=h)
        self.color = color
        self.width = width
        self.transparent = transparent
        self.accentColor = Color.WHITE

    def DrawObject(self, screen):
        if not self.transparent:
            pygame.draw.rect(screen, self.accentColor, (self.x, self.y, self.w, self.h), 0)
        pygame.draw.rect(screen, self.color, (self.x, self.y, self.w, self.h), self.width)

    def IsInside(self, position):
        return self.x <= position[0] and self.x + self.w >= position[0] and self.y <= position[1] and self.y + self.h >= position[1]

    def SetAccentColor(self, accent):
        self.accentColor = accent

    def SetColor(self, color):
        self.color = color