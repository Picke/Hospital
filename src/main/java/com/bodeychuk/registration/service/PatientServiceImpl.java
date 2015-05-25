package com.bodeychuk.registration.service;

import com.bodeychuk.registration.comparator.EncountersComparator;
import com.bodeychuk.registration.dao.PatientDao;
import com.bodeychuk.registration.model.Encounter;
import com.bodeychuk.registration.model.EncounterFullModel;
import com.bodeychuk.registration.model.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {
    @Autowired
    private PatientDao patientDao;

    @Override
    public List<Encounter> getAllEncounters() {
        List<Patient> patients = patientDao.getAllPatients();
        List<Encounter> encounters = new ArrayList<>();
        for (Patient patient : patients) {
            for (Encounter encounter : patient.getEncounters()) {
                encounter.setPatientId(patient.getPatientId());
                encounters.add(encounter);
            }
        }
        Collections.sort(encounters, new EncountersComparator());
        return encounters;
    }

    @Override
    public EncounterFullModel getEncounterData(int encounterId) {
        return patientDao.getEncounterByEncounterId(encounterId);
    }

    @Override
    public EncounterFullModel getPatientData(int patientId) {
        int encounterId = patientDao.getEncounterIdByPatientId(patientId);
        return getEncounterData(encounterId);
    }

}
