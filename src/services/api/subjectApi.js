import { ENDPOINT } from "../endPoints";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../axiosInstance";

const { GET_SUBJECT, BASEURL } = ENDPOINT;

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
