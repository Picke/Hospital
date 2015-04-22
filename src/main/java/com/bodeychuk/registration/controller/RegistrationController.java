package com.bodeychuk.registration.controller;

import com.bodeychuk.registration.model.Encounter;
import com.bodeychuk.registration.model.EncounterLargeTileModel;
import com.bodeychuk.registration.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping(value = "/registration", produces = "application/json", consumes = "*")
public class RegistrationController {
    @Autowired
    PatientService patientService;

    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView registration() {
        ModelAndView model = new ModelAndView();
        model.setViewName("registrarHome");
        return model;
    }

    @RequestMapping(value =  "/getAllEncounters", method = RequestMethod.GET)
    public
    @ResponseBody
    List<Encounter> getAllPatients () {
        List<Encounter> encounters =  patientService.getAllEncounters();
        return encounters;
    }

    @RequestMapping(value =  "/patient/{pcn}/encounter/{ern}/data", method = RequestMethod.GET)
    public
    @ResponseBody
    EncounterLargeTileModel getEncounterData (
            @PathVariable("pcn") Integer patientId,
            @PathVariable("ern") Integer encounterId) {
        EncounterLargeTileModel encounterLargeTileModel =  patientService.getEncounterLargeTileModel(patientId, encounterId);
        return encounterLargeTileModel;
    }


}
