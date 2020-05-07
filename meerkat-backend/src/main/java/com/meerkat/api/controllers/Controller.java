package com.meerkat.api.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class Controller {
    @RequestMapping("/")
    public String testResponse(){
        return "Meerkat API";
    }
}