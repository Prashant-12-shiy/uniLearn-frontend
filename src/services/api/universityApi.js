import axios from "axios";
import { ENDPOINT } from "../endPoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";


const {  GET_UNIVERSITY, GET_UNIVERSITY_BYID, ADD_UNIVERSITY } = ENDPOINT;
// Ensure this is set in .env and properly retrieved
// console.log(secretKey)

const getUniversity = async () => {
  try {
    const response = await axiosInstance.get(GET_UNIVERSITY);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching universities:", error);
  }
};

export const useGetUniversity = () => {
  return useQuery({
    queryKey: ["getUniversity"],
    queryFn: getUniversity,
    onError: (error) => {
      console.error("Error fetching data:", error.message);
    },
  });
};

const getUniversityById = async (id) => {
  const response = await axiosInstance.get(GET_UNIVERSITY_BYID + id);

  return response.data.data;
};

export const useGetUniversityById = (id) => {
  return useQuery({
    queryKey: ["getUniversityById"],
    queryFn: () => getUniversityById(id),
    onError: (error) => {
      console.error("Error fetching data:", error.message);
    },
  });
};


const addUniversity = async (data) => {
  try {
    console.log('Data being sent:', data); // Log the data

    const response = await axiosInstance.post(ADD_UNIVERSITY, data);

    return response.data.data;
  } catch (error) {
    console.error("Error adding university:", error.response?.data || error.message);
    throw error; // Optionally re-throw the error
  }
}

export const useAddUniversity = () => {
  const mutation = useMutation({
    mutationFn: addUniversity,
    onSuccess: (data) => {
      console.log("Added university:", data);
    },
    onError: (error) => {
      console.error("Error adding university:", error.message);
    },
  })
  return mutation
}