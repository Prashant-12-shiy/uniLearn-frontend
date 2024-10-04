import axios from "axios";
import { ENDPOINT } from "../endPoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { ADD_NOTES, GET_NOTE } = ENDPOINT;
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

const getNote = async (id) => {
  try {
    const response = await axiosInstance.get(GET_NOTE + id);

    return response.data.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const useGetNote = (id) => {
  return useQuery({
    queryKey: ["getNote"],
    queryFn: () => getNote(id),
    onError: (error) => {
      console.error(error.message);
    },
  });
};
