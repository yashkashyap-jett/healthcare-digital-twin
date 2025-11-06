package com.healthcare.digitaltwin.repository;

import com.healthcare.digitaltwin.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByLastNameContainingIgnoreCase(String lastName);
    List<Patient> findByFirstNameContainingIgnoreCase(String firstName);
}
