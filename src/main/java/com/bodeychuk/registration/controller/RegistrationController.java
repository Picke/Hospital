package com.bodeychuk.registration.controller;

import com.bodeychuk.registration.model.Patient;
import com.bodeychuk.registration.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(value = "/registration", produces = "application/json", consumes = "*")
public class RegistrationController {
    @Autowired
    PatientService patientService;

    @RequestMapping(value =  "/getAllPatients", method = RequestMethod.GET)
    public
    @ResponseBody
    List<Patient> getAllPatients () {
        List<Patient> patients =  patientService.getAllPatients();
        return patients;


    }




}
