package com.bodeychuk.registration.service;

import com.bodeychuk.registration.model.Encounter;
import com.bodeychuk.registration.model.Patient;

import java.util.List;

public interface PatientService {
    List<Patient> getAllPatients();
    List<Encounter> getAllEncounters();
}
