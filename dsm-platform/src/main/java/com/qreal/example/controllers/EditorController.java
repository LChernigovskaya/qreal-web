package com.qreal.example.controllers;

import com.qreal.example.model.Palette;
import com.qreal.example.service.PaletteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * Created by LChernigovskaya on 09.03.2016.
 */

@Controller
public class EditorController {

    @Autowired
    private PaletteService paletteService;

    @ResponseBody
    @RequestMapping(value = "/createPalette", method = RequestMethod.POST)
    public void saveDiagram(@RequestBody Palette palette) {
        paletteService.createPalette(palette);
    }
}
