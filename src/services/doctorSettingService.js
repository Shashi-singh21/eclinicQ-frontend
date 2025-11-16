import axios from "../lib/axios";

// GET Doctor Basic Info
export const getMyBasicInfo = async () => {
  try {
    const res = await axios.get(
      "/doctors/my-account/personal-info/basic-info"
    );

    // Backend response:
    // { success, message, data: {...}, errors, meta, timestamp }

    return res.data;  
  } catch (error) {
    throw error.response?.data || error;
  }
};

// UPDATE Doctor Basic Info
export const updateMyBasicInfo = async (payload) => {
  try {
    const res = await axios.put(
      "/doctors/my-account/personal-info/basic-info",
      payload
    );

    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
