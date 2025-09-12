import { create } from 'zustand';
import axiosInstance from '../lib/axios';

const initialState = {
  // Step 1
  userId: '',
  specialization: '',
  experienceYears: '',
  medicalCouncilName: '',
  medicalCouncilRegYear: '',
  medicalCouncilRegNo: '',
  medicalDegreeType: '',
  medicalDegreeUniversityName: '',
  medicalDegreeYearOfCompletion: '',
  pgMedicalDegreeType: '',
  pgMedicalDegreeUniversityName: '',
  pgMedicalDegreeYearOfCompletion: '',

  // Step 3
  hasClinic: true,
  clinicData: {
    name: '',
    email: '',
    phone: '',
    proof: '', // file key/url
    latitude: '',
    longitude: '',
    blockNo: '',
    areaStreet: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    image: '', // file key/url
    panCard: '',
  },

  // Step 4/5
  documents: [], // [{ no, type, url }]

  loading: false,
  error: null,
  success: false,
};

const useDoctorRegistrationStore = create((set, get) => ({
  ...initialState,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  setClinicField: (field, value) => set((state) => ({
    ...state,
    clinicData: { ...state.clinicData, [field]: value },
  })),
  setDocument: (doc) => set((state) => ({
    ...state,
    documents: [...state.documents.filter(d => d.no !== doc.no), doc],
  })),
  setDocuments: (docs) => set({ documents: docs }),
  reset: () => set(initialState),
  submit: async () => {
    set({ loading: true, error: null, success: false });
    try {
      const state = get();
      // Compose the body as required, but filter out empty fields
      const body = {};
      const fields = [
        'userId',
        'specialization',
        'experienceYears',
        'medicalCouncilName',
        'medicalCouncilRegYear',
        'medicalCouncilRegNo',
        'medicalDegreeType',
        'medicalDegreeUniversityName',
        'medicalDegreeYearOfCompletion',
        'pgMedicalDegreeType',
        'pgMedicalDegreeUniversityName',
        'pgMedicalDegreeYearOfCompletion',
        'hasClinic',
      ];
      fields.forEach((key) => {
        if (state[key] !== '' && state[key] !== null && state[key] !== undefined) {
          body[key] = state[key];
        }
      });
      // Only add clinicData if it has at least one non-empty value
      if (state.clinicData && Object.values(state.clinicData).some(v => v !== '' && v !== null && v !== undefined)) {
        body.clinicData = {};
        Object.entries(state.clinicData).forEach(([k, v]) => {
          if (v !== '' && v !== null && v !== undefined) {
            body.clinicData[k] = v;
          }
        });
      }
      // Only add documents if array is not empty
      if (Array.isArray(state.documents) && state.documents.length > 0) {
        body.documents = state.documents.filter(doc => doc && doc.url);
      }
      // Replace with your axios instance
  const res = await axiosInstance.post('/doctors/create', body);
  if (!res || res.status !== 200) throw new Error('Failed to submit');
  set({ loading: false, success: true });
    } catch (error) {
      set({ loading: false, error: error.message, success: false });
    }
  },
}));

export default useDoctorRegistrationStore;
