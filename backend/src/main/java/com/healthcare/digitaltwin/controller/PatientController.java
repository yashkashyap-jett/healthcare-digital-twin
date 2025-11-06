package com.healthcare.digitaltwin.controller;

import com.healthcare.digitaltwin.model.Patient;
import com.healthcare.digitaltwin.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientController {
    
    @Autowired
    private PatientService patientService;
    
    // GET /patients - List all patients
    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> patients = patientService.getAllPatients();
        return ResponseEntity.ok(patients);
    }
    
    // GET /patients/{id} - Get patient by ID
    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // POST /patients - Add new patient
    @PostMapping
    public ResponseEntity<Patient> createPatient(@Valid @RequestBody Patient patient) {
        Patient createdPatient = patientService.createPatient(patient);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPatient);
    }
    
    // PUT /patients/{id} - Update patient info
    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(
            @PathVariable Long id,
            @Valid @RequestBody Patient patientDetails) {
        return patientService.updatePatient(id, patientDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // DELETE /patients/{id} - Remove patient
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        boolean deleted = patientService.deletePatient(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
    
    // GET /patients/search?lastName={lastName}
    @GetMapping("/search")
    public ResponseEntity<List<Patient>> searchPatients(
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String firstName) {
        if (lastName != null) {
            return ResponseEntity.ok(patientService.searchPatientsByLastName(lastName));
        } else if (firstName != null) {
            return ResponseEntity.ok(patientService.searchPatientsByFirstName(firstName));
        }
        return ResponseEntity.ok(patientService.getAllPatients());
    }
}
