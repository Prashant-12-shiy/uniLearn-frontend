import axios from "axios";
import { ENDPOINT } from "../endPoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
const { ADD_NOTES } = ENDPOINT;
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const addNotes = async (data) => {
  try {
    const response = await axiosInstance.post(ADD_NOTES, data);

    return response.data.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const useAddNotes = () => {
  const mutation = useMutation({
    mutationFn: addNotes,
    onSuccess: () => {
      toast.success("Note added successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
