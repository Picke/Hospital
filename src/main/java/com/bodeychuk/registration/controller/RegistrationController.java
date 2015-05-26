package com.bodeychuk.registration.controller;

import com.bodeychuk.registration.model.Encounter;
import com.bodeychuk.registration.model.EncounterFullModel;
import com.bodeychuk.registration.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
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

    @RequestMapping(value =  "/encounter/{mrn}/data", method = RequestMethod.GET)
    public
    @ResponseBody
    EncounterFullModel getEncounterData (
            @PathVariable("ern") Integer encounterId) {
        EncounterFullModel encounterLargeTileModel =  patientService.getEncounterData(encounterId);
        return encounterLargeTileModel;
    }

    @RequestMapping(value =  "/patient/{pcn}/data", method = RequestMethod.GET)
    public
    @ResponseBody
    EncounterFullModel getPatientData (
            @PathVariable("pcn") Integer patientId) {
        EncounterFullModel encounterFullModel =  patientService.getPatientData(patientId);
        return encounterFullModel;
    }

    @RequestMapping(value =  "/patient/{pcn}/save", method = RequestMethod.POST, consumes="application/json")
    public
    @ResponseBody
    EncounterFullModel addEncounter (
            @PathVariable("pcn") Integer patientId,
            @RequestBody EncounterFullModel encounterLargeTileModel)
            {
        patientService.addEncounter(patientId, encounterLargeTileModel);
        return encounterLargeTileModel;
    }


}
