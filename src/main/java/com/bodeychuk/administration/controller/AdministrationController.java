package com.bodeychuk.administration.controller;

import com.bodeychuk.users.dao.UserDto;
import com.bodeychuk.users.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value =  "/administration")
public class AdministrationController {
    @Autowired
    UserService userService;

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
    public ModelAndView add(@ModelAttribute("user") UserDto userDto) {
        ModelAndView modelAndView = new ModelAndView();

        if (userService.exists(userDto.getUsername())) {
            modelAndView.addObject("error", "Username " + userDto.getUsername() + " already exists");
        } else {
            userService.saveUser(userDto);
            modelAndView.addObject("username",userDto.getUsername());
        }

        modelAndView.setViewName("adminCreate");
        return modelAndView;
    }

    @RequestMapping(value =  "/users", method = RequestMethod.GET)
    public ModelAndView list() {
        ModelAndView modelAndView = new ModelAndView();

        String users = userService.getAllUsers();

        modelAndView.addObject("users", users);
        modelAndView.setViewName("adminUserList");
        return modelAndView;
    }

    @RequestMapping(value =  "/users", method = RequestMethod.POST)
    public ModelAndView delete(@RequestParam(value = "username", required = false) String username) {
        ModelAndView modelAndView = new ModelAndView();

        userService.deleteUser(username);

        modelAndView.setViewName("userList");
        return modelAndView;
    }
}
