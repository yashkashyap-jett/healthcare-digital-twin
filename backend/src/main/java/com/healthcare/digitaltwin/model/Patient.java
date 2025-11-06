package com.healthcare.digitaltwin.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "patients")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "First name is required")
    @Column(nullable = false)
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    @Column(nullable = false)
    private String lastName;
    
    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be in the past")
    @Column(nullable = false)
    private LocalDate dateOfBirth;
    
    @NotBlank(message = "Gender is required")
    private String gender;
    
    @Email(message = "Invalid email format")
    private String email;
    
    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Invalid phone number")
    private String phone;
    
    @Column(length = 1000)
    private String medicalHistory;
    
    @Column(length = 500)
    private String allergies;
    
    @Column(length = 500)
    private String currentMedications;
    
    // Health Metrics for Digital Twin
    private Double heartRate; // bpm
    private Double bloodPressureSystolic; // mmHg
    private Double bloodPressureDiastolic; // mmHg
    private Double temperature; // Celsius
    private Double oxygenSaturation; // percentage
    private Double weight; // kg
    private Double height; // cm
    private Double bmi;
    
    @Column(length = 500)
    private String riskAlerts;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(nullable = false)
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        calculateBMI();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        calculateBMI();
    }
    
    private void calculateBMI() {
        if (weight != null && height != null && height > 0) {
            double heightInMeters = height / 100;
            bmi = weight / (heightInMeters * heightInMeters);
            bmi = Math.round(bmi * 10.0) / 10.0; // Round to 1 decimal place
        }
    }
}
