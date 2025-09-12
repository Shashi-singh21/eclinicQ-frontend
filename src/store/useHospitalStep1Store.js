import { create } from 'zustand';
import axios from '../lib/axios';

const useHospitalStep1Store = create((set, get) => ({
  form: {
    firstName: '',
    lastName: '',
    emailId: '',
    phone: '',
    gender: '',
    city: '',
    mfa: { emailId: false, phone: false },
    profilePhotoKey: '',
    isAlsoDoctor: false,
    role: 'admin',
  },
  setField: (field, value) => set(state => ({
    form: { ...state.form, [field]: value }
  })),
  setMfa: (mfaField, value) => set(state => ({
    form: { ...state.form, mfa: { ...state.form.mfa, [mfaField]: value } }
  })),
  setProfilePhotoKey: (key) => set(state => ({
    form: { ...state.form, profilePhotoKey: key }
  })),
  resetForm: () => set({
    form: {
      firstName: '',
      lastName: '',
      emailId: '',
      phone: '',
      gender: '',
      city: '',
      mfa: { emailId: false, phone: false },
      profilePhotoKey: '',
      isAlsoDoctor: false,
      role: 'admin',
    }
  }),
  submit: async () => {
    const { form } = get();
    try {
      const res = await axios.post('/auth/register', form);
      return res.data;
    } catch (err) {
      throw err;
    }
  },
}));

export default useHospitalStep1Store;
