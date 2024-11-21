import axios from "axios";
import { ENDPOINT } from "../endPoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { GET_UNIVERSITY, GET_UNIVERSITY_BYID, ADD_UNIVERSITY } = ENDPOINT;
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
    // console.log("Data being sent:", data);   

    const response = await axiosInstance.post(ADD_UNIVERSITY, data);

    return response.data.data;
  } catch (error) {
    console.error(
      "Error adding university:",
      error.response?.data || error.message
    );
    throw error?.response?.data || error; // Optionally re-throw the error
  }
};

export const useAddUniversity = () => {
  const mutation = useMutation({
    mutationFn: addUniversity,

    onSuccess: () => {
      toast.success("University added successfully!");
    },
    onError: (response) => {
      toast.error(response?.message);
    },
  });
  return mutation;
};

const deleteUniversity = async (id) => {
  try {

    const response = await axiosInstance.delete("/api/deleteUniversity/" + id);

    return response.data.data;
  } catch (error) {
    console.error(
      "Error deleting university:",
      error.response?.data || error.message
    );
    throw error?.response?.data || error; // Optionally re-throw the error
  }
};

export const useDeleteUniversity = () => {
  const mutation = useMutation({
    mutationFn: deleteUniversity,

    onSuccess: () => {
      toast.success("University deleted successfully!");
    },
    onError: (response) => {
      toast.error(response?.message);
    },
  });
  return mutation;
};


const updateUniversity = async ({id, data}) => {
  try {

    const response = await axiosInstance.patch("/api/updateUniversity/" + id, data);

    return response.data.data;
  } catch (error) {
    console.error(
      "Error deleting university:",
      error.response?.data || error.message
    );
    throw error?.response?.data || error; // Optionally re-throw the error
  }
};

export const useUpdateUniversity = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUniversity,
    onSuccess: () => {
      toast.success("University updated successfully!");
      queryClient.invalidateQueries({queryKey: ["getUniversity"]});
    },
    onError: (response) => {
      toast.error(response?.message);
    },
  });
  return mutation;
};


