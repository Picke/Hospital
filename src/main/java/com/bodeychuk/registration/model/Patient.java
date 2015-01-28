package com.bodeychuk.registration.model;

import java.util.Set;

public class Patient {
    private int patientId;
    private Set<Encounter> encounters;

    public Patient() {
    }

    public Patient(int patientId, Set<Encounter> encounters) {
        this.patientId = patientId;
        this.encounters = encounters;
    }

    public int getPatientId() {
        return patientId;
    }

    public void setPatientId(int patientId) {
        this.patientId = patientId;
    }

    public Set<Encounter> getEncounters() {
        return encounters;
    }

    public void setEncounters(Set<Encounter> encounters) {
        this.encounters = encounters;
    }
}
