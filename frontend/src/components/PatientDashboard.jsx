import { useState, useEffect } from 'react';
import patientService from '../services/patientService';
import PatientForm from './PatientForm';
import HealthSummary from './HealthSummary';

function PatientDashboard() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await patientService.getAllPatients();
      setPatients(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch patients. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setShowForm(true);
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setShowForm(true);
  };

  const handleDeletePatient = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await patientService.deletePatient(id);
        fetchPatients();
      } catch (err) {
        alert('Failed to delete patient');
        console.error(err);
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedPatient(null);
    fetchPatients();
  };

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <div className="text-2xl text-blue-600 font-semibold animate-pulse">⏳ Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <div className="text-2xl text-red-600 font-semibold">❌ {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                🏥 Healthcare Digital Twin
              </h1>
              <p className="text-blue-100 text-lg">Patient Management Dashboard</p>
            </div>
            <button
              onClick={handleAddPatient}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              + Add New Patient
            </button>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-6">

          {showForm && (
            <div className="mb-6">
              <PatientForm
                patient={selectedPatient}
                onClose={handleFormClose}
              />
            </div>
          )}

          {selectedPatient && !showForm && (
            <div className="mb-6">
              <HealthSummary
                patient={selectedPatient}
                onClose={() => setSelectedPatient(null)}
                onEdit={() => handleEditPatient(selectedPatient)}
              />
            </div>
          )}

          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold">ID</th>
                  <th className="py-4 px-6 text-left font-semibold">Name</th>
                  <th className="py-4 px-6 text-left font-semibold">Age</th>
                  <th className="py-4 px-6 text-left font-semibold">Gender</th>
                  <th className="py-4 px-6 text-left font-semibold">Email</th>
                  <th className="py-4 px-6 text-left font-semibold">Risk Alerts</th>
                  <th className="py-4 px-6 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center">
                      <div className="text-gray-500">
                        <div className="text-5xl mb-4">📋</div>
                        <p className="text-lg font-medium">No patients found</p>
                        <p className="text-sm mt-2">Add a new patient to get started</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  patients.map((patient) => {
                    const age = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();
                    return (
                      <tr
                        key={patient.id}
                        className="border-b border-gray-200 hover:bg-blue-50/50 cursor-pointer transition-all duration-200"
                        onClick={() => handleViewDetails(patient)}
                      >
                        <td className="py-4 px-6 font-mono text-blue-600 font-semibold">{patient.id}</td>
                        <td className="py-4 px-6 font-semibold text-gray-800">
                          {patient.firstName} {patient.lastName}
                        </td>
                        <td className="py-4 px-6 text-gray-700">{age}</td>
                        <td className="py-4 px-6 text-gray-700">{patient.gender}</td>
                        <td className="py-4 px-6 text-gray-600 text-sm">{patient.email || 'N/A'}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${
                              patient.riskAlerts === 'No risks detected'
                                ? 'bg-green-100 text-green-700 border border-green-300'
                                : 'bg-red-100 text-red-700 border border-red-300'
                            }`}
                          >
                            {patient.riskAlerts === 'No risks detected' ? '✓' : '⚠'} {patient.riskAlerts}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditPatient(patient);
                            }}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2 text-sm font-medium transition-all duration-200 hover:shadow-md"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePatient(patient.id);
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
