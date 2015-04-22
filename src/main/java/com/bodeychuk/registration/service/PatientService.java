package com.bodeychuk.registration.service;

import com.bodeychuk.registration.model.Encounter;
import com.bodeychuk.registration.model.EncounterLargeTileModel;

import java.util.List;

public interface PatientService {
    List<Encounter> getAllEncounters();
    EncounterLargeTileModel getEncounterLargeTileModel(int patientId, int encounterId);
}
