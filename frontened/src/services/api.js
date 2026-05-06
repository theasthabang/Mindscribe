import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";


const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export const getCurrentUser = async (dispatch) => {
  try {
    const result = await axios.get(
      serverUrl + "/api/user/currentuser",
      { ...getAuthHeader(), withCredentials: true }
    );
    dispatch(setUserData(result.data));
  } catch (error) {
    console.log(error);
  }
};

export const generateNotes = async (payload) => {
  const result = await axios.post(
    serverUrl + "/api/notes/generate-notes",
    payload,
    { ...getAuthHeader(), withCredentials: true }
  );
  return result.data;
};

export const downloadPdf = async (result) => {
  try {
    const response = await axios.post(
      serverUrl + "/api/pdf/generate-pdf",
      { result },
      { ...getAuthHeader(), responseType: "blob", withCredentials: true }
    );
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ExamNotesAI.pdf";
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error("PDF download failed");
     
  }
};