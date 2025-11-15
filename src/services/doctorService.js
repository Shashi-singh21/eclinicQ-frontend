import axios from "../lib/axios";

// Get all doctors for Super Admin
export const getAllDoctorsBySuperAdmin = async () => {
  try {
    // axios instance adds baseURL '/api' and Authorization header
    const res = await axios.get("/doctors/getAllDoctorsBySuperAdmin");
    return res.data; // { success, message, data: { active: [], inactive: [] }, ... }
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get doctor details by userId for Super Admin
export const getDoctorDetailsByIdBySuperAdmin = async (userId) => {
  if (!userId) throw new Error("userId is required");
  try {
    const res = await axios.get(`/doctors/getDoctorDetailsByIdBySuperAdmin/${encodeURIComponent(userId)}`);
    return res.data; // { success, data: { ...doctorDetails } }
  } catch (error) {
    throw error.response?.data || error;
  }
};
