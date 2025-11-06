# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Healthcare Digital Twin System - A full-stack application creating virtual representations of patients for personalized healthcare management with real-time health monitoring and risk assessment.

**Tech Stack:**
- Backend: Spring Boot 3.2.0 (Java 17), JPA/Hibernate, H2 in-memory database
- Frontend: React 18, Vite, Tailwind CSS, Axios
- Build Tools: Maven (backend), npm (frontend)

## Development Commands

### Backend (Spring Boot)
```bash
cd backend

# Build and run
mvn clean install                 # Build project
mvn spring-boot:run              # Start backend server (port 8080)

# Testing
mvn test                          # Run all tests
mvn test -Dtest=ClassName        # Run specific test class

# Other
mvn clean                         # Clean build artifacts
```

**Backend URL:** http://localhost:8080  
**H2 Console:** http://localhost:8080/h2-console (JDBC URL: `jdbc:h2:mem:healthcaredb`, username: `sa`, password: empty)

### Frontend (React + Vite)
```bash
cd frontend

# Development
npm install                       # Install dependencies
npm run dev                       # Start dev server (port 5173)

# Build and quality
npm run build                     # Production build
npm run lint                      # Run ESLint
npm run preview                   # Preview production build
```

**Frontend URL:** http://localhost:5173

### Full Stack Development
Start both servers simultaneously:
```bash
# Terminal 1 - Backend
cd backend && mvn spring-boot:run

# Terminal 2 - Frontend
cd frontend && npm run dev
```

## Architecture

### Backend Architecture (Layered Pattern)

**Controller Layer** (`controller/`)
- `PatientController.java`: REST endpoints at `/api/patients`
- Handles HTTP requests/responses, validation (`@Valid`)
- CORS configured for frontend origin (localhost:5173)

**Service Layer** (`service/`)
- `PatientService.java`: Business logic and health risk assessment
- **Digital Twin Core**: `assessHealthRisks()` analyzes vitals and generates risk alerts
  - Heart rate: detects bradycardia (<60) / tachycardia (>100)
  - Blood pressure: flags hypertension (>140/90) / hypotension (<90/60)
  - Temperature: identifies fever (>37.5°C) / hypothermia (<36°C)
  - Oxygen saturation: alerts if <95%
  - BMI: categorizes weight status
- All health metrics updated on patient create/update

**Repository Layer** (`repository/`)
- `PatientRepository.java`: JPA data access
- Spring Data JPA with custom query methods for case-insensitive name search

**Model Layer** (`model/`)
- `Patient.java`: Entity with JPA annotations, Lombok, and validation
- **Lifecycle hooks**: `@PrePersist` and `@PreUpdate` auto-calculate BMI and timestamps
- Health metrics: heartRate, bloodPressure (systolic/diastolic), temperature, oxygenSaturation, weight, height, bmi
- Generated field: `riskAlerts` (set by service layer)

**Configuration** (`config/`)
- `CorsConfig.java`: Global CORS configuration
- `application.properties`: Database, JPA, server, and CORS settings

### Frontend Architecture (Component-Based)

**Main App**
- `App.jsx`: Root component, renders PatientDashboard

**Components** (`components/`)
- `PatientDashboard.jsx`: Main view with patient table, add/edit/delete actions
- `PatientForm.jsx`: Form for creating/updating patients with validation
- `HealthSummary.jsx`: Detailed view of patient vitals with color-coded status indicators

**Services** (`services/`)
- `patientService.js`: Axios-based API client for all backend communication
- Base URL: `http://localhost:8080/api/patients`

**Data Flow:**
1. User action triggers component state change
2. Component calls `patientService` method
3. Axios sends HTTP request to backend
4. Backend processes request through controller → service → repository
5. Service layer applies digital twin logic (BMI calculation, risk assessment)
6. Response returned to frontend
7. Component state updates, UI re-renders

### Key Integration Points

- **CORS**: Configured in both `CorsConfig.java` and `application.properties` for localhost:5173
- **API Contract**: RESTful endpoints with JSON payloads
- **Validation**: Server-side with Jakarta validation, client-side in React forms
- **State Management**: React hooks (useState, useEffect) in components
- **Database**: H2 in-memory (data resets on server restart, configured with `spring.jpa.hibernate.ddl-auto=create-drop`)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/patients` | Get all patients |
| GET | `/api/patients/{id}` | Get patient by ID |
| POST | `/api/patients` | Create new patient |
| PUT | `/api/patients/{id}` | Update patient |
| DELETE | `/api/patients/{id}` | Delete patient |
| GET | `/api/patients/search?lastName={name}` | Search by last name |
| GET | `/api/patients/search?firstName={name}` | Search by first name |

## Important Notes

- **Database Persistence**: H2 is in-memory, all data is lost on server restart
- **CORS**: Frontend must run on port 5173, backend on port 8080
- **Validation**: Patient entity has Jakarta validation constraints (@NotBlank, @Email, @Pattern, etc.)
- **Auto-calculations**: BMI calculated automatically via JPA lifecycle hooks, risk alerts generated by service layer
- **Lombok**: Backend uses Lombok for boilerplate reduction (@Data, @NoArgsConstructor, @AllArgsConstructor)
