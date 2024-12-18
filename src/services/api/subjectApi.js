import { ENDPOINT } from "../endPoints";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { GET_SUBJECT, BASEURL, ADD_SUBJECT } = ENDPOINT;

const addSubject = async (data) => {
  try {
    const response = await axiosInstance.post(ADD_SUBJECT, data);

    return response.data.data;
  } catch (error) {
    // toast.error(error.message);
    throw error?.response?.data || error;
  }
};

export const useAddSubject = () => {
  const mutation = useMutation({
    mutationFn: addSubject,
    onSuccess: () => {
      toast.success("Subject added successfully!");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

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

export const useGetSubjects = (id) => {
  return useQuery({
    queryKey: ["getSubjects"],
    queryFn: () => getSubjects(id),
      staleTime: Infinity, // Keeps the data fresh indefinitely (no refetching on component mount)
      cacheTime: Infinity, // Keeps the data in the cache even after unmounting
      refetchOnMount: false, // Prevent refetching on component mount
      refetchOnWindowFocus: false, // Prevent refetching when window gains focus
      refetchOnReconnect: false, // Prevent refetching after reconnecting
    onError: (error) => {
      console.error("Error fetching data:", error.message);
    },
    
  });
};
