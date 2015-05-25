package com.bodeychuk.registration.dao;

import com.bodeychuk.registration.model.EncounterFullModel;
import com.bodeychuk.registration.model.Patient;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public class PatientDaoImpl implements PatientDao {
    private final String GET_ENCOUNTER_ID_BY_PATIENT_ID = "SELECT encounterId FROM patients WHERE patientId=?";

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


}
