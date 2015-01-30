package com.bodeychuk.registration.comparator;


import com.bodeychuk.registration.model.Encounter;

import java.util.Comparator;

public class EncountersComparator implements Comparator<Encounter> {
    @Override
    public int compare(Encounter enc1, Encounter enc2) {
        return enc2.getRegistrationDate().compareTo(enc1.getRegistrationDate());
    }
}
