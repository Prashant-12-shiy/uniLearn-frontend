import axios from "axios";
import { ENDPOINT } from "../endPoints";
import { useMutation, useQuery } from "@tanstack/react-query";
const { BASEURL, ADD_NOTES } = ENDPOINT;

const secretKey = "Manga2023@"

const addNotes = async (data) => {
  const response = await axios.post(BASEURL + ADD_NOTES, data, {
    headers: { "x-secret-key": secretKey },
    'Content-Type': 'multipart/form-data',
  });

  return response.data.data;
};

export const useAddNotes = () => {
  const mutation = useMutation({
    mutationFn: addNotes,
  });

  return mutation;
};


