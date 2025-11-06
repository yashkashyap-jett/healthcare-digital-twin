import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/patients';

const patientService = {
  getAllPatients: async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },

  getPatientById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  createPatient: async (patientData) => {
    const response = await axios.post(API_BASE_URL, patientData);
    return response.data;
  },

  updatePatient: async (id, patientData) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, patientData);
    return response.data;
  },

  deletePatient: async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  },

  searchPatients: async (searchParams) => {
    const response = await axios.get(`${API_BASE_URL}/search`, { params: searchParams });
    return response.data;
  },
};

export default patientService;
