import { ENDPOINT } from "../endPoints";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { BASEURL, ADD_PAST_QUESTION, GET_PAST_QUESTION } = ENDPOINT;

const secretKey = "Manga2023@";

const addPastQuestion = async (data) => {
  try {
    const response = await axiosInstance.post(ADD_PAST_QUESTION, data);

    return response.data.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

export const useAddPastQuestion = () => {
  const mutation = useMutation({
    mutationFn: addPastQuestion,
    onSuccess: () => {
      toast.success("Past Question added successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

// const getPastQuestion = async (id) => {
//     try {
//         const response = await axios.get(BASEURL + GET_PAST_QUESTION )
//     } catch (error) {

//     }
// }
