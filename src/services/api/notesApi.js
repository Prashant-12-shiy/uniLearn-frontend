import axios from "axios";
import { ENDPOINT } from "../endPoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
const { ADD_NOTES } = ENDPOINT;

const secretKey = "Manga2023@"

const addNotes = async (data) => {
  const response = await axiosInstance.post(ADD_NOTES, data);

  return response.data.data;
};

export const useAddNotes = () => {
  const mutation = useMutation({
    mutationFn: addNotes,
  });

  return mutation;
};


