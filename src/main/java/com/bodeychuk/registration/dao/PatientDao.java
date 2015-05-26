package com.bodeychuk.registration.dao;

import com.bodeychuk.registration.model.Encounter;
import com.bodeychuk.registration.model.EncounterFullModel;
import com.bodeychuk.registration.model.Patient;

import java.util.List;

public interface PatientDao {
    List<Patient> getAllPatients();
    EncounterFullModel getEncounterByEncounterId(int encounterId);
    int getEncounterIdByPatientId(int patientId);
    void addEncounterDetails(int patientId, EncounterFullModel encounterFullModel);
    void addEncounter(Encounter encounter);
}
