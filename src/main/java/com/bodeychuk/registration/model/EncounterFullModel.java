package com.bodeychuk.registration.model;

public class EncounterFullModel {
    private int encounterId;
    private int patientId;
    private String patientName;
    private String patientGender;
    private String patientDOB;
    private String cityOfBirth;
    private String phone;
    private String physician;
    private String street;
    private String zip;
    private String city;
    private String intakeDate;
    private String registrationType;
    private String primaryInsurance;
    private String policyNumber;
    private String insuredsName;
    private String insuredsGender;
    private String insuredsRelation;
    private String insuredsDOB;

    public EncounterFullModel() {
    }

    public EncounterFullModel(int encounterId, int patientId, String patientName, String patientGender, String patientDOB, String cityOfBirth, String phone, String physician, String street, String zip, String city, String intakeDate, String registrationType, String primaryInsurance, String policyNumber, String insuredsName, String insuredsGender, String insuredsRelation, String insuredsDOB) {
        this.encounterId = encounterId;
        this.patientId = patientId;
        this.patientName = patientName;
        this.patientGender = patientGender;
        this.patientDOB = patientDOB;
        this.cityOfBirth = cityOfBirth;
        this.phone = phone;
        this.physician = physician;
        this.street = street;
        this.zip = zip;
        this.city = city;
        this.intakeDate = intakeDate;
        this.registrationType = registrationType;
        this.primaryInsurance = primaryInsurance;
        this.policyNumber = policyNumber;
        this.insuredsName = insuredsName;
        this.insuredsGender = insuredsGender;
        this.insuredsRelation = insuredsRelation;
        this.insuredsDOB = insuredsDOB;
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

    public String getPatientGender() {
        return patientGender;
    }

    public void setPatientGender(String patientGender) {
        this.patientGender = patientGender;
    }

    public String getPatientDOB() {
        return patientDOB;
    }

    public void setPatientDOB(String patientDOB) {
        this.patientDOB = patientDOB;
    }

    public String getCityOfBirth() {
        return cityOfBirth;
    }

    public void setCityOfBirth(String cityOfBirth) {
        this.cityOfBirth = cityOfBirth;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPhysician() {
        return physician;
    }

    public void setPhysician(String physician) {
        this.physician = physician;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getIntakeDate() {
        return intakeDate;
    }

    public void setIntakeDate(String intakeDate) {
        this.intakeDate = intakeDate;
    }

    public String getRegistrationType() {
        return registrationType;
    }

    public void setRegistrationType(String registrationType) {
        this.registrationType = registrationType;
    }

    public String getPrimaryInsurance() {
        return primaryInsurance;
    }

    public void setPrimaryInsurance(String primaryInsurance) {
        this.primaryInsurance = primaryInsurance;
    }

    public String getPolicyNumber() {
        return policyNumber;
    }

    public void setPolicyNumber(String policyNumber) {
        this.policyNumber = policyNumber;
    }

    public String getInsuredsName() {
        return insuredsName;
    }

    public void setInsuredsName(String insuredsName) {
        this.insuredsName = insuredsName;
    }

    public String getInsuredsGender() {
        return insuredsGender;
    }

    public void setInsuredsGender(String insuredsGender) {
        this.insuredsGender = insuredsGender;
    }

    public String getInsuredsRelation() {
        return insuredsRelation;
    }

    public void setInsuredsRelation(String insuredsRelation) {
        this.insuredsRelation = insuredsRelation;
    }

    public String getInsuredsDOB() {
        return insuredsDOB;
    }

    public void setInsuredsDOB(String insuredsDOB) {
        this.insuredsDOB = insuredsDOB;
    }

    public int getPatientId() {
        return patientId;
    }

    public void setPatientId(int patientId) {
        this.patientId = patientId;
    }
}
