package com.bodeychuk.users.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
public class AdministrationController {
    @RequestMapping(value =  "/administration", method = RequestMethod.GET)
    public ModelAndView administration(HttpServletRequest request) {
        ModelAndView model = new ModelAndView();
        model.setViewName("adminHome");
        return model;
    }
}
