# Healthcare Digital Twin System

A full-stack web application that creates digital twins of patients for personalized healthcare management. Healthcare providers can monitor patient data, track health metrics, and receive real-time risk alerts.

## 🎯 Project Overview

This system demonstrates how digital twins can revolutionize healthcare by:
- Creating virtual representations of patients with real-time health data
- Providing personalized treatment recommendations based on health metrics
- Visualizing health trends and risk factors
- Enabling proactive healthcare management

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Database**: H2 (in-memory)
- **ORM**: JPA/Hibernate
- **Language**: Java 17
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

## 📋 Prerequisites

Before running this project, ensure you have:
- **Java 17** or higher installed
- **Maven 3.6+** installed
- **Node.js 18+** and **npm** installed
- **Git** installed

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd healthcare-digital-twin
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Build the project
mvn clean install

# Run the Spring Boot application
mvn spring-boot:run
```

The backend server will start at `http://localhost:8080`

**H2 Console**: Access the database console at `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:healthcaredb`
- Username: `sa`
- Password: (leave empty)

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📡 API Endpoints

### Patient Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/patients` | Get all patients |
| GET | `/api/patients/{id}` | Get patient by ID |
| POST | `/api/patients` | Create new patient |
| PUT | `/api/patients/{id}` | Update patient |
| DELETE | `/api/patients/{id}` | Delete patient |
| GET | `/api/patients/search?lastName={name}` | Search by last name |
| GET | `/api/patients/search?firstName={name}` | Search by first name |

### Sample Patient JSON

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1990-05-15",
  "gender": "Male",
  "email": "john.doe@email.com",
  "phone": "+1234567890",
  "medicalHistory": "Diabetes Type 2",
  "allergies": "Penicillin",
  "currentMedications": "Metformin 500mg",
  "heartRate": 72,
  "bloodPressureSystolic": 120,
  "bloodPressureDiastolic": 80,
  "temperature": 37.0,
  "oxygenSaturation": 98,
  "weight": 75.5,
  "height": 175
}
```

## 🧪 Testing with Postman

1. Import the endpoints into Postman
2. Set the base URL to `http://localhost:8080`
3. Test each endpoint:
   - **Create Patient**: POST `/api/patients` with JSON body
   - **Get All Patients**: GET `/api/patients`
   - **Update Patient**: PUT `/api/patients/1` with updated JSON
   - **Delete Patient**: DELETE `/api/patients/1`

## 🏥 Digital Twin Features

### Health Risk Assessment

The system automatically analyzes patient vitals and generates risk alerts:

- **Heart Rate**: Detects bradycardia (<60 bpm) or tachycardia (>100 bpm)
- **Blood Pressure**: Identifies hypertension (>140/90) or hypotension (<90/60)
- **Temperature**: Flags fever (>37.5°C) or hypothermia (<36°C)
- **Oxygen Saturation**: Alerts for low oxygen (<95%)
- **BMI**: Calculates and categorizes weight status

### Patient Dashboard Features

- View all patients in a sortable table
- Add new patients with comprehensive forms
- Edit existing patient information
- View detailed health summaries with color-coded metrics
- Delete patients with confirmation
- Real-time risk alerts displayed on dashboard

### Health Summary View

- Personal information overview
- Vital signs with status indicators (green/yellow/red)
- Body metrics including auto-calculated BMI
- Medical history, allergies, and current medications
- Comprehensive risk assessment

## 📁 Project Structure

```
healthcare-digital-twin/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/healthcare/digitaltwin/
│   │   │   │   ├── DigitalTwinApplication.java
│   │   │   │   ├── controller/
│   │   │   │   │   └── PatientController.java
│   │   │   │   ├── model/
│   │   │   │   │   └── Patient.java
│   │   │   │   ├── repository/
│   │   │   │   │   └── PatientRepository.java
│   │   │   │   ├── service/
│   │   │   │   │   └── PatientService.java
│   │   │   │   └── config/
│   │   │   │       └── CorsConfig.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── PatientDashboard.jsx
    │   │   ├── PatientForm.jsx
    │   │   └── HealthSummary.jsx
    │   ├── services/
    │   │   └── patientService.js
    │   ├── App.jsx
    │   └── index.css
    ├── package.json
    └── tailwind.config.js
```

## 🎓 Educational Value

This project demonstrates:

1. **Full-Stack Development**: Integration of React frontend with Spring Boot backend
2. **RESTful API Design**: CRUD operations with proper HTTP methods
3. **Database Management**: JPA/Hibernate with H2 in-memory database
4. **Modern UI/UX**: Responsive design with Tailwind CSS
5. **Health Informatics**: Digital twin concept in healthcare
6. **Data Validation**: Both client-side and server-side validation
7. **State Management**: React hooks for managing application state

## 🔄 Basic Functional Flow

1. **Add Patient Data**
   - User fills out the form on the frontend
   - Frontend sends POST request to `/api/patients`
   - Backend validates and stores data in H2 database
   - System calculates BMI and assesses health risks
   - Success response returned to frontend

2. **Fetch Patient Data**
   - Frontend sends GET request to `/api/patients`
   - Backend retrieves data from database
   - Patient list displayed on dashboard
   - Health metrics shown with color-coded status

3. **Update/Delete Data**
   - User clicks Edit or Delete button
   - Frontend sends PUT or DELETE request
   - Backend updates/removes record from database
   - Dashboard refreshes to show changes

## 🌟 Why Digital Twin?

Digital twins in healthcare enable:

- **Predictive Analytics**: Anticipate health issues before they become critical
- **Personalized Care**: Tailor treatments to individual patient profiles
- **Continuous Monitoring**: Track health changes over time
- **Evidence-Based Decisions**: Make informed clinical decisions based on real-time data
- **Remote Healthcare**: Enable telemedicine and remote patient monitoring

## 🚧 Future Enhancements

- Add data visualization with charts and graphs
- Implement user authentication and authorization
- Add historical health data tracking
- Integrate with wearable devices for real-time monitoring
- Implement ML models for predictive health analytics
- Add appointment scheduling and notifications
- Export patient reports as PDF

## 📝 License

This project is created for educational purposes as a college project.

## 👥 Author

Created by [Your Name] - [Your College]

## 🙏 Acknowledgments

- Spring Boot Documentation
- React Documentation
- Tailwind CSS
- Digital Twin Healthcare Research Papers
