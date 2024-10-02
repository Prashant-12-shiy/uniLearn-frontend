import { ENDPOINT } from "../endPoints";
import { useQuery,useMutation } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../axiosInstance";

const { GET_SUBJECT, BASEURL,ADD_SUBJECT } = ENDPOINT;

const addSubject = async (data) => {
  try {
    const response = await axiosInstance.post(ADD_SUBJECT, data);

    return response.data.data;
  } catch (error) {
    console.error("Error adding subject:", error.message);
    // throw error
  }
}

export const useAddSubject = () => {
  const mutation = useMutation({
    mutationFn: addSubject,
    onSuccess: (data) => {
      console.log("Added university:", data);
    },
    onError: (error) => {
      console.error("Error adding university:", error.message);
    },
  })

  return mutation;
};

const getSubjects = async (id) => {
  try {
    const response = await axiosInstance.get(GET_SUBJECT + id);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching subjects:", error.message);
    // throw error
  }
};

export const useGetSubjects =  (id) => {
  return useQuery({
    queryKey: ["getSubjects"],
    queryFn: () => getSubjects(id),
    onError: (error) => {
      console.error("Error fetching data:", error.message);
    },
  })
};
