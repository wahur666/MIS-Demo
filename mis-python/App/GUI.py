# -*- coding: utf-8 -*-
from typing import List

from pygame import MOUSEBUTTONDOWN, MOUSEBUTTONUP, MOUSEMOTION
import pygame
import time

from App.Edge import Edge
from App.Point import Point
from App.Text import Text
from App.Button import Button
from App.Rectangle import Rect
from App.Constants import COLOR as Color, MOUSE, FONT_AWESOME as FA

import os.path, os

VERTEX = 0
EDGE = 1

ADD = 0
DELETE = 1
MIS = 2

CLASS_HIGH = 3
CLASS_HIGH_MED = 2
CLASS_MED_LOW = 1
CLASS_LOW = 0


class GUI:

    def __init__(self, parent):
        self.parent = parent
        self.items = []
        self.points = []
        self.edges = []
        self.initilize()

    def initilize(self):
        self.background_color = Color.LIGHTGRAY
        self.background_color_index = 7

        self.vertexButton = Button(200, 20, 150, 50, "Vertex", 10)
        self.vertexButton.bind(self.SelectVertexOrEdge)
        self.Add(self.vertexButton)

        self.edgeButton = Button(380, 20, 150, 50, "Edge", 20)
        self.edgeButton.bind(self.SelectVertexOrEdge)
        self.Add(self.edgeButton)

        self.addButton = Button(20, 100, 150, 50, "Add", 35)
        self.addButton.bind(self.SelectMode)
        self.Add(self.addButton)

        self.deleteButton = Button(20, 170, 150, 50, "Delete", 10)
        self.deleteButton.bind(self.SelectMode)
        self.Add(self.deleteButton)

        self.misButton = Button(20, 20, 150, 50, "MIS", 35)
        self.misButton.bind(self.SelectMode)
        self.Add(self.misButton)

        self.demoButton = Button(560, 20, 150, 50, "Demo", 17)
        self.demoButton.bind(self.LoadDemo)
        self.Add(self.demoButton)

        self.resetButton = Button(740, 20, 150, 50, "Reset", 20)
        self.resetButton.bind(self.ClearCanvas)
        self.Add(self.resetButton)

        self.lHighLabelText = Text(20, 250, 20, 20, "L_high:")
        self.Add(self.lHighLabelText)

        self.lHighMedLabelText = Text(20, 350, 20, 20, "L_high_mediumn:")
        self.Add(self.lHighMedLabelText)

        self.lMedLowLabelText = Text(20, 450, 20, 20, "L_medium_low:")
        self.Add(self.lMedLowLabelText)

        self.lLowLabelText = Text(20, 550, 20, 20, "L_low:")
        self.Add(self.lLowLabelText)

        self.lHighText = Text(20, 275, 20, 20, "[]")
        self.Add(self.lHighText)
        self.lHighMedText = Text(20, 375, 20, 20, "[]")
        self.Add(self.lHighMedText)
        self.lMedLowText = Text(20, 475, 20, 20, "[]")
        self.Add(self.lMedLowText)
        self.lLowText = Text(20, 575, 20, 20, "[]")
        self.Add(self.lLowText)


        self.ClearCanvas()


    def DrawGUI(self, screen):
        w, h = pygame.display.get_surface().get_size()
        pygame.draw.rect(screen, self.background_color, (0, 0, w, h), 0)
        pygame.draw.rect(screen, Color.WHITE, (200, 100, w, h), 0)

        for element in self.items:
            if self.modeVE == EDGE and element == self.misButton:
                continue
            element.DrawObject(screen)

        for edge in self.edges:
            edge.DrawObject(screen)

        for point in self.points:
            point.DrawObject(screen)

    def Add(self, item):
        self.items.append(item)

    def AddPoint(self, point):
        self.points.append(point)

    def AddEdge(self, edge):
        self.edges.append(edge)


    def MouseHandler(self, event):
        if event.type == MOUSEMOTION:
            pass
        elif event.type == MOUSEBUTTONUP:
            self.OnRelease(event)
        elif event.type == MOUSEBUTTONDOWN:
            self.OnClick(event)

    def KeyboardHandler(self, event):
        if event.key == pygame.K_ESCAPE:
            self.Exit()
        elif event.key == pygame.K_a:
            self.modeAD = ADD
        elif event.key == pygame.K_d:
            self.modeAD = DELETE
        elif event.key == pygame.K_w:
            self.modeVE = VERTEX
        elif event.key == pygame.K_e:
            self.modeVE = EDGE
        elif event.key == pygame.K_m:
            self.modeAD = MIS

        self.UpdateSelection()


    def OnRelease(self, event):
        w, h = pygame.display.get_surface().get_size()
        self.mouseDown = False
        if 220 < event.pos[0] < w - 30 and 120 < event.pos[1] < h -30:
            if self.modeVE == VERTEX:
                if self.modeAD == ADD:
                    self.AddVertex(event)
                elif self.modeAD == MIS:
                    self.ChangeMis(event)
                else:
                    self.DeleteVertex(event)
            else:
                if self.modeAD == ADD:
                    self.AddEdgeToGraph(event)
                else:
                    self.DeleteEdgeFromGraph(event)

    def AddVertex(self, event):
        if not self.CoverOtherPoint(event.pos):
            self.CreatePoint(*event.pos)

    def DeleteVertex(self, event):
        marked = None
        for point in self.points:
            if point.IsInside(event.pos):
                otherPoint = None
                edges = point.DisconnectAllEdges()
                for edge in edges:
                    if edge.point1 == point:
                        self.ClassifyPoint(edge.point2)
                        otherPoint = edge.point2
                    else:
                        self.ClassifyPoint(edge.point1)
                        otherPoint = edge.point1

                    self.edges.remove(edge)
                    self.CalculateMISAfterEdgeRemove(point, otherPoint)
                marked = point
        if marked:
            self.points.remove(marked)

    def AddEdgeToGraph(self, event):
        for point in self.points:
            if point.IsInside(event.pos):
                if not self.point1:
                    point.SelectThis()
                    self.point1 = point
                    break
                else:
                    if self.point1 == point:
                        point.DeselectThis()
                        self.point1 = None
                    else:
                        self.point2 = point
                        self.point2.SelectThis()
                    break
        if self.point1 and self.point2:
            self.CreateEdge(self.point1, self.point2)
            self.point1.DeselectThis()
            self.point2.DeselectThis()
            self.point1 = None
            self.point2 = None


    def DeleteEdgeFromGraph(self, event):
        for point in self.points:
            if point.IsInside(event.pos):
                if not self.point1:
                    point.SelectThis()
                    self.point1 = point
                    break
                else:
                    if self.point1 == point:
                        point.DeselectThis()
                        self.point1 = None
                    else:
                        self.point2 = point
                        self.point2.SelectThis()
                    break
        if self.point1 and self.point2:
            edge = self.point1.DisconnectEdge(self.point2)
            if edge:
                self.edges.remove(edge)
                self.ClassifyPoint(self.point1)
                self.ClassifyPoint(self.point2)
                self.CalculateMISAfterEdgeRemove(self.point1, self.point2)
            self.point1.DeselectThis()
            self.point2.DeselectThis()
            self.point1 = None
            self.point2 = None

    def OnClick(self, event):
        self.mouseDown = True
        for item in self.items:
            if item.IsInside(event.pos):
                if isinstance(item, Button):
                    item.OnClick(event, item)
                    return

    def SelectVertexOrEdge(self, event, context):
        if context == self.edgeButton:
            self.modeVE = EDGE
        else:
            self.modeVE = VERTEX

        self.UpdateSelection()

    def SelectMode(self, event, context):
        if context == self.addButton:
            self.modeAD = ADD
        elif context == self.misButton:
            self.modeAD = MIS
        else:
            self.modeAD = DELETE

        self.UpdateSelection()


    def UpdateSelection(self):
        if self.modeVE == EDGE:
            self.edgeButton.SelectThis()
            self.vertexButton.DeselectThis()
            if self.modeAD == MIS:
                self.modeAD = ADD
        else:
            self.vertexButton.SelectThis()
            self.edgeButton.DeselectThis()

        if self.modeAD == ADD:
            self.addButton.SelectThis()
            self.deleteButton.DeselectThis()
            self.misButton.DeselectThis()
        elif self.modeAD == MIS:
            self.addButton.DeselectThis()
            self.deleteButton.DeselectThis()
            self.misButton.SelectThis()
        else:
            self.addButton.DeselectThis()
            self.deleteButton.SelectThis()
            self.misButton.DeselectThis()

        if self.point1:
            self.point1.DeselectThis()
            self.point1 = None

        if self.point2:
            self.point2.DeselectThis()
            self.point2 = None

    def CoverOtherPoint(self, position):
        top_left = (position[0] - 15, position[1] - 20)
        bottom_left = (position[0] - 15, position[1] + 30)

        top_right = (position[0] + 30, position[1] - 20)
        bottom_right = (position[0] + 30, position[1] + 30)

        for point in self.points:
            if point.IsInside(top_left) or \
                    point.IsInside(bottom_left) or \
                    point.IsInside(top_right) or \
                    point.IsInside(bottom_right):
                return True

        return False

    def ClearCanvas(self, event = None, context = None):
        self.maximumIndependentSet = []
        self.points = []
        self.edges = []
        self.modeAD = ADD
        self.modeVE = VERTEX
        self.pointCounter = 0

        self.highArr = []
        self.highMedArr = []
        self.medLowArr = []
        self.lowArr = []

        self.UpdateClassArrayTexts()
        self.lHighText.SetText("[]")
        self.point1 = None
        self.point2 = None
        self.UpdateSelection()

    def CreatePoint(self, x, y):
        point = Point(x, y, self.pointCounter)
        point.SetPartOfMis(True)
        self.AddPoint(point)
        self.pointCounter += 1
        return point

    def CreateEdge(self, p1, p2):
        edge = Edge(p1, p2)
        if p1.AddEdge(edge):
            p2.AddEdge(edge)
            self.AddEdge(edge)

        self.ClassifyPoint(p1)
        self.ClassifyPoint(p2)

        if p1.IsPartOfMis() and p2.IsPartOfMis():
            p1.SetPartOfMis(False)
            p2.SetPartOfMis(True)
            L = list(set(filter(lambda x: x.classification == CLASS_LOW, p1.neighbours)))
            for w in p1.neighbours:
                if w not in L:
                    if w.MIS_neighbours() == 0:
                        w.SetPartOfMis(True)
                else:
                    L_mis = []
                    L_1hop = []

                    a = []

                    for point in w.mis_2hop_neighbours:
                        if point in L:
                            a.append(point)

                    L_2hop = a

                    l_mis = len(L_mis)
                    l_1hop = len(L_1hop)
                    l_2hop = len(L_2hop)

                    if l_2hop <= 4 * len(self.edges) ** 0.75:
                        for point in L_2hop:
                            if point.MIS_neighbours() == 0:
                                L_1hop.append(point)

                        if l_1hop <= 4 * len(self.edges) ** 0.5:
                            for point in L_1hop:
                                if point.real_mis_neighbours == 0:
                                    L_mis.append(point)
                            for point in L_mis:
                                if point.MIS_neighbours() == 0:
                                    point.SetPartOfMis(True)
                        else:
                            for p1 in L_1hop:
                                arr_to_check = p1.mis_neighbours.copy()
                                while len(arr_to_check):
                                    marked = []
                                    for point in arr_to_check:
                                        if point.classification == CLASS_HIGH and \
                                            point.Real_MIS_Neighbours() != 0:
                                            marked.append(point)
                                    for point in marked:
                                        point.SetPartOfMis(False)
                                    arr_to_check = marked.copy()
                    else:
                        for point in L_2hop:
                            if point.real_mis_neighbours == 0:
                                point.SetPartOfMis(True)

                        for point in L_2hop:
                            arr_to_check = point.real_mis_neighbours.copy()
                            while arr_to_check:
                                marked = []
                                for point in arr_to_check:
                                    if point.classification in (CLASS_MED_LOW, CLASS_LOW) and \
                                            point.Real_MIS_Neighbours() != 0:
                                        marked.append(point)
                                for point in marked:
                                    point.SetPartOfMis(False)
                                arr_to_check = marked.copy()

    def CalculateL2Hop(self, L):
        unique_neighbours = set()
        for p in L:
            for p1 in p.neigbours:
                for p2 in p1.neighbours:
                    if p2.MIS_neighbours() == 0:
                        unique_neighbours.add(p2)
        return list(unique_neighbours)

    def CalculateMISAfterEdgeRemove(self, p1, p2):
        p1.Calculate_MIS_neighbours()
        p2.Calculate_MIS_neighbours()
        if not p1.IsPartOfMis() and not p2.IsPartOfMis():
            pass
        elif p1.IsPartOfMis() and not p2.IsPartOfMis():
            if p2.MIS_neighbours() == 0 and p2.classification == CLASS_LOW:
                flag = False
                for neighbour in p2.mis_neighbours:
                    if neighbour.IsPartOfMis():
                        flag = True
                        break
                if not flag:
                    p2.SetPartOfMis(True)
        elif not p1.IsPartOfMis() and p2.IsPartOfMis():
            if p1.MIS_neighbours() == 0 and p1.classification == CLASS_LOW:
                flag = False
                for neighbour in p1.mis_neighbours:
                    if neighbour.IsPartOfMis():
                        flag = True
                        break
                if not flag:
                    p1.SetPartOfMis(True)

    def UpdateClassArrayTexts(self):
        self.lHighText.SetText("[" + ", ".join(self.highArr) + "]")
        self.lHighMedText.SetText("[" + ", ".join(self.highMedArr) + "]")
        self.lMedLowText.SetText("[" + ", ".join(self.medLowArr) + "]")
        self.lLowText.SetText("[" + ", ".join(self.lowArr) + "]")


    def ClassifyPoint(self, point):
        m = len(self.edges)
        degV = point.GetDegree()

        highValue = m ** 0.75
        medValue = m ** 0.5
        lowValue = m ** 0.25

        if(degV >= highValue):
            point.SetClassification(CLASS_HIGH)
        elif highValue > degV >= medValue:
            point.SetClassification(CLASS_HIGH_MED)
        elif medValue > degV >= lowValue:
            point.SetClassification(CLASS_MED_LOW)
        else:
            point.SetClassification(CLASS_LOW)
        self.RecollectClassArrays()

    def RecollectClassArrays(self):
        self.highArr = []
        self.highMedArr = []
        self.medLowArr = []
        self.lowArr = []

        for point in self.points:
            if point.classification == CLASS_HIGH:
                self.highArr.append(point.text)
            elif point.classification == CLASS_HIGH_MED:
                self.highMedArr.append(point.text)
            elif point.classification == CLASS_MED_LOW:
                self.medLowArr.append(point.text)
            else:
                self.lowArr.append(point.text)

        self.UpdateClassArrayTexts()

    def ChangeMis(self, event):
        for point in self.points:
            if point.IsInside(event.pos):
                if not point.IsPartOfMis():
                    if not any(x.IsPartOfMis() for x in point.neighbours) :
                        point.SetPartOfMis(True)
                else:
                    point.SetPartOfMis(False)

    def LoadDemo(self, event = None, context = None):
        self.ClearCanvas()
        p1 = self.CreatePoint(700, 140)
        p2 = self.CreatePoint(980, 345)
        p3 = self.CreatePoint(870, 675)
        p4 = self.CreatePoint(525, 675)
        p5 = self.CreatePoint(420, 340)

        p6 = self.CreatePoint(700, 260)
        p7 = self.CreatePoint(875, 385)
        p8 = self.CreatePoint(810, 590)
        p9 = self.CreatePoint(595, 590)
        p10 = self.CreatePoint(525, 390)

        self.CreateEdge(p1, p2)
        self.CreateEdge(p2, p3)
        self.CreateEdge(p3, p4)
        self.CreateEdge(p4, p5)
        self.CreateEdge(p5, p1)

        self.CreateEdge(p6, p8)
        self.CreateEdge(p7, p9)
        self.CreateEdge(p8, p10)
        self.CreateEdge(p9, p6)
        self.CreateEdge(p10, p7)

        self.CreateEdge(p1, p6)
        self.CreateEdge(p2, p7)
        self.CreateEdge(p3, p8)
        self.CreateEdge(p4, p9)
        self.CreateEdge(p5, p10)
































