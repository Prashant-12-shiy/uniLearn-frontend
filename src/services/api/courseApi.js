import axios from "axios";
import { ENDPOINT } from "../endPoints";
import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
const { BASEURL, ADD_COURSE, GET_COURSEBYID, GET_ALLCOURSE } = ENDPOINT;
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const addCourse = async (data) => {
  try {
    const response = await axiosInstance.post(ADD_COURSE, data);
    return response.data.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const useAddCourse = () => {
  const mutation = useMutation({
    mutationFn: addCourse,

    onSuccess: () => {
      toast.success("Course added successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

const getCourse = async (id) => {
  try {
    const response = await axiosInstance.get(GET_COURSEBYID + id);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching course:", error.message);
  }
};

export const useGetCourse = (id) => {
  return useQuery({
    queryKey: ["getCourse"],
    queryFn: () => getCourse(id),
    onError: (error) => {
      console.error("Error fetching data:", error.message);
    },
  });
};




const getAllCourse = async () => {
  try {
    const response = await axiosInstance.get(GET_ALLCOURSE);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching course:", error.message);
  }
};

export const useGetAllCourse = () => {
  return useQuery({
    queryKey: ["getAllCourse"],
    queryFn: getAllCourse,
    onError: (error) => {
      console.error("Error fetching data:", error.message);
    },
  });
};
