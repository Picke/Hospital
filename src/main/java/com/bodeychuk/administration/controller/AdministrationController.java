package com.bodeychuk.administration.controller;

import com.bodeychuk.users.dao.UserDto;
import com.bodeychuk.users.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value =  "/administration")
public class AdministrationController {
    @RequestMapping(value =  "", method = RequestMethod.GET)
    public ModelAndView administration() {
        ModelAndView model = new ModelAndView();
        model.setViewName("adminHome");
        return model;
    }

    @RequestMapping(value =  "/create", method = RequestMethod.GET)
    public ModelAndView create() {
        ModelAndView modelAndView = new ModelAndView();
        UserDto user = new UserDto();

        modelAndView.addObject("user", user);
        modelAndView.setViewName("adminCreate");
        return modelAndView;
    }

    @RequestMapping(value =  "/create", method = RequestMethod.POST)
    public ModelAndView add(@ModelAttribute("user") User user) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("username",user.getUsername());
        modelAndView.setViewName("adminCreate");
        return modelAndView;
    }
}
