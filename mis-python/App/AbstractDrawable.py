# -*- coding: utf-8 -*-

from abc import ABCMeta, abstractmethod

class AbstractDrawable:
    __metaclass__ = ABCMeta

    def __init__(self, x = None, y = None, w = None, h = None):
        if x is None and y is None and w is None and h is None:
            return

        if x is not None and y is not None:
            self.x = x
            self.y = y
        else:
            raise ValueError("Not enough parameter, give X and Y")

        if w is not None and h is not None:
            self.w = w
            self.h = h
        else:
            raise ValueError("Not enough parameter, give W and H, or size=tuple(int,int)")

        self.base = {
            "x" : self.x,
            "y" : self.y,
            "h" : self.h,
            "w" : self.w
        }

    @abstractmethod
    def DrawObject(self, screen):
        pass

    @abstractmethod
    def IsInside(self, position):
        pass
