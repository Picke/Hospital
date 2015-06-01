package com.bodeychuk.registration.service;

import com.bodeychuk.registration.model.Encounter;
import com.bodeychuk.registration.model.EncounterFullModel;

import java.util.List;

public interface PatientService {
    List<Encounter> getAllEncounters();
    EncounterFullModel getEncounterData(int encounterId);
    EncounterFullModel getPatientData(int patientId);
    void addEncounter(int patientId, EncounterFullModel encounterFullModel);
    void createPatient(EncounterFullModel encounterFullModel);
    void updateEncounter(int encounterId, EncounterFullModel encounterFullModel);
}
