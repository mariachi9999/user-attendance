const axios = require("axios");

const URL_ATTENDANCE = "http://localhost:3000/attendance/";

export const getAttendance = async (user_id: string) => {
  try {
    return await axios.get(URL_ATTENDANCE + user_id);
  } catch (error) {
    console.error(error);
  }
};
