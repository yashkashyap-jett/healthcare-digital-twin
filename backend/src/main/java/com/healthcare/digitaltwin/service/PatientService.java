package com.healthcare.digitaltwin.service;

import com.healthcare.digitaltwin.model.Patient;
import com.healthcare.digitaltwin.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {
    
    @Autowired
    private PatientRepository patientRepository;
    
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }
    
    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }
    
    public Patient createPatient(Patient patient) {
        assessHealthRisks(patient);
        return patientRepository.save(patient);
    }
    
    public Optional<Patient> updatePatient(Long id, Patient patientDetails) {
        return patientRepository.findById(id).map(patient -> {
            patient.setFirstName(patientDetails.getFirstName());
            patient.setLastName(patientDetails.getLastName());
            patient.setDateOfBirth(patientDetails.getDateOfBirth());
            patient.setGender(patientDetails.getGender());
            patient.setEmail(patientDetails.getEmail());
            patient.setPhone(patientDetails.getPhone());
            patient.setMedicalHistory(patientDetails.getMedicalHistory());
            patient.setAllergies(patientDetails.getAllergies());
            patient.setCurrentMedications(patientDetails.getCurrentMedications());
            
            // Update health metrics
            patient.setHeartRate(patientDetails.getHeartRate());
            patient.setBloodPressureSystolic(patientDetails.getBloodPressureSystolic());
            patient.setBloodPressureDiastolic(patientDetails.getBloodPressureDiastolic());
            patient.setTemperature(patientDetails.getTemperature());
            patient.setOxygenSaturation(patientDetails.getOxygenSaturation());
            patient.setWeight(patientDetails.getWeight());
            patient.setHeight(patientDetails.getHeight());
            
            assessHealthRisks(patient);
            return patientRepository.save(patient);
        });
    }
    
    public boolean deletePatient(Long id) {
        return patientRepository.findById(id).map(patient -> {
            patientRepository.delete(patient);
            return true;
        }).orElse(false);
    }
    
    public List<Patient> searchPatientsByLastName(String lastName) {
        return patientRepository.findByLastNameContainingIgnoreCase(lastName);
    }
    
    public List<Patient> searchPatientsByFirstName(String firstName) {
        return patientRepository.findByFirstNameContainingIgnoreCase(firstName);
    }
    
    // Digital Twin: Assess health risks based on vitals
    private void assessHealthRisks(Patient patient) {
        StringBuilder risks = new StringBuilder();
        
        // Check heart rate
        if (patient.getHeartRate() != null) {
            if (patient.getHeartRate() < 60) {
                risks.append("Low heart rate (Bradycardia). ");
            } else if (patient.getHeartRate() > 100) {
                risks.append("High heart rate (Tachycardia). ");
            }
        }
        
        // Check blood pressure
        if (patient.getBloodPressureSystolic() != null && patient.getBloodPressureDiastolic() != null) {
            if (patient.getBloodPressureSystolic() > 140 || patient.getBloodPressureDiastolic() > 90) {
                risks.append("High blood pressure (Hypertension). ");
            } else if (patient.getBloodPressureSystolic() < 90 || patient.getBloodPressureDiastolic() < 60) {
                risks.append("Low blood pressure (Hypotension). ");
            }
        }
        
        // Check temperature
        if (patient.getTemperature() != null) {
            if (patient.getTemperature() > 37.5) {
                risks.append("Elevated temperature (Fever). ");
            } else if (patient.getTemperature() < 36.0) {
                risks.append("Low temperature (Hypothermia). ");
            }
        }
        
        // Check oxygen saturation
        if (patient.getOxygenSaturation() != null && patient.getOxygenSaturation() < 95) {
            risks.append("Low oxygen saturation. ");
        }
        
        // Check BMI
        if (patient.getBmi() != null) {
            if (patient.getBmi() < 18.5) {
                risks.append("Underweight. ");
            } else if (patient.getBmi() >= 25 && patient.getBmi() < 30) {
                risks.append("Overweight. ");
            } else if (patient.getBmi() >= 30) {
                risks.append("Obese. ");
            }
        }
        
        patient.setRiskAlerts(risks.length() > 0 ? risks.toString().trim() : "No risks detected");
    }
}
