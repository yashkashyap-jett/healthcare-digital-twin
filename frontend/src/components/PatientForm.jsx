import { useState, useEffect } from 'react';
import patientService from '../services/patientService';

function PatientForm({ patient, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    medicalHistory: '',
    allergies: '',
    currentMedications: '',
    heartRate: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    temperature: '',
    oxygenSaturation: '',
    weight: '',
    height: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (patient) {
      setFormData({
        firstName: patient.firstName || '',
        lastName: patient.lastName || '',
        dateOfBirth: patient.dateOfBirth || '',
        gender: patient.gender || '',
        email: patient.email || '',
        phone: patient.phone || '',
        medicalHistory: patient.medicalHistory || '',
        allergies: patient.allergies || '',
        currentMedications: patient.currentMedications || '',
        heartRate: patient.heartRate || '',
        bloodPressureSystolic: patient.bloodPressureSystolic || '',
        bloodPressureDiastolic: patient.bloodPressureDiastolic || '',
        temperature: patient.temperature || '',
        oxygenSaturation: patient.oxygenSaturation || '',
        weight: patient.weight || '',
        height: patient.height || '',
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const patientData = {
        ...formData,
        heartRate: formData.heartRate ? parseFloat(formData.heartRate) : null,
        bloodPressureSystolic: formData.bloodPressureSystolic ? parseFloat(formData.bloodPressureSystolic) : null,
        bloodPressureDiastolic: formData.bloodPressureDiastolic ? parseFloat(formData.bloodPressureDiastolic) : null,
        temperature: formData.temperature ? parseFloat(formData.temperature) : null,
        oxygenSaturation: formData.oxygenSaturation ? parseFloat(formData.oxygenSaturation) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        height: formData.height ? parseFloat(formData.height) : null,
      };

      if (patient) {
        await patientService.updatePatient(patient.id, patientData);
      } else {
        await patientService.createPatient(patientData);
      }
      
      onClose();
    } catch (err) {
      alert('Failed to save patient: ' + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-300 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
          {patient ? '✏️ Edit Patient' : '➕ Add New Patient'}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-3xl font-bold transition-colors"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-blue-700 mb-4 pb-2 border-b-2 border-blue-200">👤 Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}`}
              />
              {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}`}
              />
              {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.dateOfBirth ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}`}
              />
              {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.gender ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-blue-700 mb-4 pb-2 border-b-2 border-blue-200">📋 Medical Information</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medical History
              </label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-2.5 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-2.5 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Medications
              </label>
              <textarea
                name="currentMedications"
                value={formData.currentMedications}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-2.5 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Health Metrics (Digital Twin) */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-blue-700 mb-4 pb-2 border-b-2 border-blue-200">💓 Health Metrics (Digital Twin)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heart Rate (bpm)
              </label>
              <input
                type="number"
                name="heartRate"
                value={formData.heartRate}
                onChange={handleChange}
                step="0.1"
                className="w-full px-4 py-2.5 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                BP Systolic (mmHg)
              </label>
              <input
                type="number"
                name="bloodPressureSystolic"
                value={formData.bloodPressureSystolic}
                onChange={handleChange}
                step="0.1"
                className="w-full px-4 py-2.5 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                BP Diastolic (mmHg)
              </label>
              <input
                type="number"
                name="bloodPressureDiastolic"
                value={formData.bloodPressureDiastolic}
                onChange={handleChange}
                step="0.1"
                className="w-full px-4 py-2.5 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Temperature (°C)
              </label>
              <input
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                step="0.1"
                className="w-full px-4 py-2.5 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                O2 Saturation (%)
              </label>
              <input
                type="number"
                name="oxygenSaturation"
                value={formData.oxygenSaturation}
                onChange={handleChange}
                step="0.1"
                className="w-full px-4 py-2.5 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                step="0.1"
                className="w-full px-4 py-2.5 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                step="0.1"
                className="w-full px-4 py-2.5 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-100 font-semibold transition-all duration-200 hover:shadow-md"
          >
            ❌ Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-400 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
          >
            {submitting ? '⏳ Saving...' : patient ? '✅ Update Patient' : '✅ Add Patient'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PatientForm;
