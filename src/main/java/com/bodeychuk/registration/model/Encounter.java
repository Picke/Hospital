package com.bodeychuk.registration.model;

public class Encounter {
    private int encounterId;
    private String patientName;
    private String patientPhone;
    private String patientDob;
    private String registrationDate;
    private int patientId;

    public Encounter() {
    }

    public Encounter(int encounterId, String patientName, String patientPhone, String patientDob, String registrationDate) {
        this.encounterId = encounterId;
        this.patientName = patientName;
        this.patientPhone = patientPhone;
        this.patientDob = patientDob;
        this.registrationDate = registrationDate;
    }

    public int getEncounterId() {
        return encounterId;
    }

    public void setEncounterId(int encounterId) {
        this.encounterId = encounterId;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getPatientPhone() {
        return patientPhone;
    }

    public void setPatientPhone(String patientPhone) {
        this.patientPhone = patientPhone;
    }

    public String getPatientDob() {
        return patientDob;
    }

    public void setPatientDob(String patientDob) {
        this.patientDob = patientDob;
    }

    public String getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(String registrationDate) {
        this.registrationDate = registrationDate;
    }

    public int getPatientId() {
        return patientId;
    }

    public void setPatientId(int patientId) {
        this.patientId = patientId;
    }
}
