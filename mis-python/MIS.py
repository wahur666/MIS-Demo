# -*- coding: utf-8 -*-

import os, os.path
import shutil
import pygame
if not pygame.font: print('Warning, fonts disabled')

from App import *
from App.Constants import COLOR as Color

class ApplicationCore:

    def __init__(self):
        self.SCREEN_WIDHT = 1280
        self.SCREEN_HEIGHT = 720

        pygame.init()


        self.background_color = Color.LIGHTGRAY
        self.background_color_index = 7

        self.screen = pygame.display.set_mode((self.SCREEN_WIDHT, self.SCREEN_HEIGHT))
        self.screen.fill(self.background_color)

        pygame.display.init()
        pygame.display.update()

        pygame.display.set_caption("Visual Logo 1.2.3")

        self.gui = GUI(self)

        self.clock = pygame.time.Clock()

        self.gameExit = False

    def Exit(self):
        self.gameExit = True

    def Run(self):
        while not self.gameExit:
            pygame.display.update()
            self.screen.fill(self.background_color)

            self.gui.DrawGUI(self.screen)

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.Exit()

                if event.type in [pygame.MOUSEBUTTONDOWN, pygame.MOUSEBUTTONUP, pygame.MOUSEMOTION]:
                    self.gui.MouseHandler(event)

                if event.type == pygame.KEYUP:
                    self.gui.KeyboardHandler(event)


            self.clock.tick(60)

        pygame.quit()




core = ApplicationCore()
core.Run()