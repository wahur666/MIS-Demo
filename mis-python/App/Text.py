# -*- coding: utf-8 -*-
import pygame

from App.AbstractDrawable import AbstractDrawable
from App.Constants import COLOR as Color


class Text(AbstractDrawable):

    def __init__(self, x=None, y=None, w=None, h=None, text="", color = Color.BLACK):
        super(Text, self).__init__(x, y, w, h)

        self.text = text
        self.color = color
        self.font = pygame.font.SysFont("arial", self.h - 6)


    def IsInside(self, position):
        return self.x <= position[0] <= self.x + self.h and self.y <= position[1] <= self.y + self.w

    def DrawObject(self, screen):
        textSurface = self.font.render(str(self.text), 1, self.color)
        screen.blit(textSurface, (self.x + 6, self.y - 1))

    def SetColor(self, color):
        self.color = color

    def SetText(self, text):
        self.text = text