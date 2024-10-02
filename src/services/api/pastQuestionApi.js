import { ENDPOINT } from "../endPoints";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";


const {BASEURL, ADD_PAST_QUESTION, GET_PAST_QUESTION} = ENDPOINT;

const secretKey = "Manga2023@"

const addPastQuestion = async (data) => {
    try {
      const response =  await axiosInstance.post( ADD_PAST_QUESTION, data);

      return response.data.data;
    } catch (error) {
        console.error('Error adding past question:', error.message);
    }
}

export const useAddPastQuestion = () => {
    const mutation =  useMutation({
        mutationFn: addPastQuestion
    });

    return mutation;
 
}

// const getPastQuestion = async (id) => {
//     try {
//         const response = await axios.get(BASEURL + GET_PAST_QUESTION )
//     } catch (error) {
        
//     }
// }