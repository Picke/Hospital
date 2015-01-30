package com.bodeychuk.registration.dao;

import com.bodeychuk.registration.model.Patient;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public class PatientDaoImpl implements PatientDao {
    @Autowired
    private SessionFactory sessionFactory;

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public List<Patient> getAllPatients() {
        return sessionFactory.getCurrentSession().createQuery("from Patient group by patientId").list();
    }
}
