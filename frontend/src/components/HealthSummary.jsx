function HealthSummary({ patient, onClose, onEdit }) {
  const age = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();

  const MetricCard = ({ label, value, unit, status }) => (
    <div className={`p-4 rounded-lg border-2 ${
      status === 'normal' ? 'border-green-300 bg-green-50' :
      status === 'warning' ? 'border-yellow-300 bg-yellow-50' :
      'border-red-300 bg-red-50'
    }`}>
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-2xl font-bold text-gray-800">
        {value !== null && value !== undefined ? `${value} ${unit}` : 'N/A'}
      </div>
    </div>
  );

  const getHeartRateStatus = (hr) => {
    if (!hr) return 'normal';
    if (hr < 60 || hr > 100) return 'danger';
    return 'normal';
  };

  const getBPStatus = (systolic, diastolic) => {
    if (!systolic || !diastolic) return 'normal';
    if (systolic > 140 || diastolic > 90 || systolic < 90 || diastolic < 60) return 'danger';
    if (systolic > 120 || diastolic > 80) return 'warning';
    return 'normal';
  };

  const getTempStatus = (temp) => {
    if (!temp) return 'normal';
    if (temp > 37.5 || temp < 36.0) return 'danger';
    return 'normal';
  };

  const getO2Status = (o2) => {
    if (!o2) return 'normal';
    if (o2 < 95) return 'danger';
    return 'normal';
  };

  const getBMIStatus = (bmi) => {
    if (!bmi) return 'normal';
    if (bmi < 18.5 || bmi >= 30) return 'danger';
    if (bmi >= 25) return 'warning';
    return 'normal';
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border-2 border-green-300 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-green-800 flex items-center gap-2">📊 Patient Health Summary</h2>
        <div className="flex gap-3">
          <button
            onClick={onEdit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            ✏️ Edit
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-3xl font-bold transition-colors"
          >
            ×
          </button>
        </div>
      </div>

      {/* Patient Info */}
      <div className="mb-6 p-6 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl border-2 border-blue-200">
        <h3 className="text-2xl font-bold text-blue-800 mb-3">
          👤 {patient.firstName} {patient.lastName}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div><span className="font-semibold">Age:</span> {age} years</div>
          <div><span className="font-semibold">Gender:</span> {patient.gender}</div>
          <div><span className="font-semibold">Email:</span> {patient.email || 'N/A'}</div>
          <div><span className="font-semibold">Phone:</span> {patient.phone || 'N/A'}</div>
        </div>
      </div>

      {/* Risk Alerts */}
      {patient.riskAlerts && (
        <div className={`mb-6 p-4 rounded-lg ${
          patient.riskAlerts === 'No risks detected'
            ? 'bg-green-100 border-2 border-green-300'
            : 'bg-red-100 border-2 border-red-300'
        }`}>
          <h3 className="text-lg font-semibold mb-2">
            {patient.riskAlerts === 'No risks detected' ? '✓ Health Status' : '⚠️ Risk Alerts'}
          </h3>
          <p className={`${
            patient.riskAlerts === 'No risks detected'
              ? 'text-green-800'
              : 'text-red-800 font-medium'
          }`}>
            {patient.riskAlerts}
          </p>
        </div>
      )}

      {/* Vital Signs */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-blue-700 mb-4 pb-2 border-b-2 border-blue-200">💓 Vital Signs (Digital Twin)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            label="Heart Rate"
            value={patient.heartRate}
            unit="bpm"
            status={getHeartRateStatus(patient.heartRate)}
          />
          <MetricCard
            label="Blood Pressure"
            value={patient.bloodPressureSystolic && patient.bloodPressureDiastolic
              ? `${patient.bloodPressureSystolic}/${patient.bloodPressureDiastolic}`
              : null}
            unit="mmHg"
            status={getBPStatus(patient.bloodPressureSystolic, patient.bloodPressureDiastolic)}
          />
          <MetricCard
            label="Temperature"
            value={patient.temperature}
            unit="°C"
            status={getTempStatus(patient.temperature)}
          />
          <MetricCard
            label="O2 Saturation"
            value={patient.oxygenSaturation}
            unit="%"
            status={getO2Status(patient.oxygenSaturation)}
          />
        </div>
      </div>

      {/* Body Metrics */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-blue-700 mb-4 pb-2 border-b-2 border-blue-200">📏 Body Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <MetricCard
            label="Weight"
            value={patient.weight}
            unit="kg"
            status="normal"
          />
          <MetricCard
            label="Height"
            value={patient.height}
            unit="cm"
            status="normal"
          />
          <MetricCard
            label="BMI"
            value={patient.bmi}
            unit=""
            status={getBMIStatus(patient.bmi)}
          />
        </div>
      </div>

      {/* Medical Information */}
      <div>
        <h3 className="text-xl font-bold text-blue-700 mb-4 pb-2 border-b-2 border-blue-200">📋 Medical Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">🏥 Medical History</h4>
          <p className="text-sm text-gray-600">
            {patient.medicalHistory || 'No medical history recorded'}
          </p>
        </div>
          <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">⚠️ Allergies</h4>
          <p className="text-sm text-gray-600">
            {patient.allergies || 'No known allergies'}
          </p>
        </div>
          <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">💊 Current Medications</h4>
          <p className="text-sm text-gray-600">
            {patient.currentMedications || 'No current medications'}
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthSummary;
