# -*- coding: utf-8 -*-
import pygame

from App.AbstractDrawable import AbstractDrawable
from App.Constants import COLOR


class Edge(AbstractDrawable):

    def __init__(self, point1=None, point2=None):
        super(Edge, self).__init__(0,0,0,0)
        self.point1 = point1
        self.point2 = point2

    def DrawObject(self, screen):
        pygame.draw.line(screen, COLOR.RED, self.point1.Center(), self.point2.Center(), 5)

    def IsInside(self, position):
        pass