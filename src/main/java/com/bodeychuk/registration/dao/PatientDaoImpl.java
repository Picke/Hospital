package com.bodeychuk.registration.dao;

import com.bodeychuk.registration.model.Encounter;
import com.bodeychuk.registration.model.EncounterFullModel;
import com.bodeychuk.registration.model.Patient;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public class PatientDaoImpl implements PatientDao {
    private final String GET_ENCOUNTER_ID_BY_PATIENT_ID = "SELECT encounterId FROM patients WHERE patientId=?";
    private final String GET_MAX_PATIENT_ID = "SELECT MAX(patientId) FROM patients";
    private final String ADD_ENCOUNTER_TO_PATIENT = "INSERT INTO patients VALUES (?, ?) ";

    @Autowired
    private SessionFactory sessionFactory;

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public List<Patient> getAllPatients() {
        return sessionFactory.getCurrentSession().createQuery("from Patient group by patientId").list();
    }

    @Override
    public EncounterFullModel getEncounterByEncounterId(int encounterId) {
        List<EncounterFullModel> encounterFullModelList = sessionFactory.getCurrentSession().createQuery("from EncounterFullModel where encounterId=?").setParameter(0, encounterId).list();
        if (encounterFullModelList.size() > 0) {
            return encounterFullModelList.get(0);
        }
        return null;
    }

    @Override
    public int getEncounterIdByPatientId(int patientId) {
        List<Integer> encounterIds = sessionFactory.getCurrentSession().createSQLQuery(GET_ENCOUNTER_ID_BY_PATIENT_ID).setParameter(0, patientId).list();
        return encounterIds.get(encounterIds.size()-1);
    }

    @Override
    public int generatePatientId() {
        return (Integer) sessionFactory.getCurrentSession().createSQLQuery(GET_MAX_PATIENT_ID).list().get(0) + 1;
    }

    @Override
    public void addEncounterDetails(EncounterFullModel encounterFullModel) {
        encounterFullModel.setEncounterId((Integer) sessionFactory.getCurrentSession().save(encounterFullModel));
    }

    @Override
    public void addEncounter(Encounter encounter) {
        sessionFactory.getCurrentSession().createSQLQuery(ADD_ENCOUNTER_TO_PATIENT).setParameter(0, encounter.getPatientId()).setParameter(1, encounter.getEncounterId()).executeUpdate();
        sessionFactory.getCurrentSession().save(encounter);
    }

    @Override
    public void updateEncounterDetails(int encounterId, EncounterFullModel encounterFullModel) {
        sessionFactory.getCurrentSession().update(encounterFullModel);
    }

    @Override
    public void updateEncounter(Encounter encounter) {
        sessionFactory.getCurrentSession().update(encounter);
    }

}
