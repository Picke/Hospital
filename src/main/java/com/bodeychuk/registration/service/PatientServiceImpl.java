package com.bodeychuk.registration.service;

import com.bodeychuk.registration.dao.PatientDao;
import com.bodeychuk.registration.model.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {
    @Autowired
    private PatientDao patientDao;

    @Override
    public List<Patient> getAllPatients() {
        return patientDao.getAllPatients();
    }
}
