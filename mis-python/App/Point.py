# -*- coding: utf-8 -*-
import pygame

from App.AbstractDrawable import AbstractDrawable
from App.Constants import COLOR
from App.Text import Text

CLASS_HIGH = 3
CLASS_HIGH_MED = 2
CLASS_MED_LOW = 1
CLASS_LOW = 0

class Point(AbstractDrawable):

    def __init__(self, x = None, y = None, num = None):
        super(Point, self).__init__(x, y, 0, 0)
        self.color = COLOR.BLACK
        self.text = "p" + str(num)
        self.diagDelta = 7
        self.pointNameText = Text(x + self.diagDelta, y + self.diagDelta, 20, 20, self.text)
        self.degreeText = Text(x + 15, y - 25, 20, 20, "0")
        self.edges = []
        self.classification = 0
        self.partOfMis = False
        self.neighbours = []
        self.mis_neighbours = []
        self.unique_2hop_neighbours = []
        self.mis_2hop_neighbours = []
        self.real_mis_neighbours = []

    def DrawObject(self, screen):
        pygame.draw.circle(screen, self.color, (self.x, self.y), 15, 0)
        if(self.partOfMis):
            pygame.draw.circle(screen, COLOR.MAGENTA, (self.x, self.y), 15, 5)
        self.pointNameText.DrawObject(screen)
        self.degreeText.DrawObject(screen)

    def IsInside(self, position):
        return self.x - 15 <= position[0] <= self.x + 30 and self.y - 20 <= position[1] <= self.y + 30

    def GetDegree(self):
        return len(self.edges)

    def SetClassification(self, num):
        self.classification = num

    def RecollectNeighbours(self):
        self.neighbours = []
        for edge in self.edges:
            if edge.point1 == self:
                self.neighbours.append(edge.point2)
            else:
                self.neighbours.append(edge.point1)

    def DisconnectEdge(self, point):
        for edge in self.edges:
            if edge.point1 == point:
                edge.point1.RemoveEdge(edge)
                edge.point1.RecollectNeighbours()
                self.RemoveEdge(edge)
                self.RecollectNeighbours()
                return edge
            elif edge.point2 == point:
                edge.point2.RemoveEdge(edge)
                edge.point2.RecollectNeighbours()
                self.RemoveEdge(edge)
                self.RecollectNeighbours()
                return edge
        return None

    def DisconnectAllEdges(self):
        for edge in self.edges:
            if edge.point1 is not self:
                edge.point1.RemoveEdge(edge)
            else:
                edge.point2.RemoveEdge(edge)
        return self.edges


    def SelectThis(self):
        self.color = COLOR.GREEN

    def DeselectThis(self):
        self.color = COLOR.BLACK

    def Center(self):
        return self.x, self.y

    def AddEdge(self, edge):
        for e in self.edges:
            if edge.point1 == e.point1 and edge.point2 == e.point2 or edge.point1 == e.point2 and edge.point2 == e.point1:
                return False
        self.edges.append(edge)
        if(edge.point1 == self):
            self.neighbours.append(edge.point2)
        else:
            self.neighbours.append(edge.point1)
        self.degreeText.SetText(len(self.edges))
        return True

    def RemoveEdge(self, edge):
        self.edges.remove(edge)
        self.degreeText.SetText(len(self.edges))

    def SetPartOfMis(self, state):
        self.partOfMis = state
        for point in self.neighbours:
            point.Calculate_MIS_neighbours()
            point.Calculate_MIS_2hop_neighbours()

    def IsPartOfMis(self):
        return self.partOfMis

    def NeighborsDegree(self):
        neighboursDegree = []
        for point in self.neighbours:
            neighboursDegree.append(point.GetDegree())
        return neighboursDegree

    def Real_MIS_Neighbours(self):
        return len(self.real_mis_neighbours)

    def Calculate_MIS_neighbours(self):
        self.mis_neighbours = []
        if self.classification != CLASS_LOW:
            for point in self.neighbours:
                if point.IsPartOfMis():
                    self.mis_neighbours.append(point)
        else:
            for point in self.neighbours:
                if point.IsPartOfMis() and point.classification != CLASS_HIGH:
                    self.mis_neighbours.append(point)

    def MIS_neighbours(self):
        return len(self.mis_neighbours)

    def Calculate_MIS_2hop_neighbours(self):
        self.mis_2hop_neighbours = []
        self.CollectUnique2HopNeighbours()
        self.unique_2hop_neighbours.remove(self)
        for point in self.unique_2hop_neighbours:
            if point.IsPartOfMis() and (point.classification in (CLASS_LOW, CLASS_MED_LOW)):
                self.mis_2hop_neighbours.append(point)

    def CollectUnique2HopNeighbours(self):
        self.unique_2hop_neighbours = set()
        for point in self.neighbours:
            for neighbour in point.neighbours:
                self.unique_2hop_neighbours.add(neighbour)

    def __str__(self):
        return "Point: " + self.text

    def __repr__(self):
        return "Point: " + self.text

