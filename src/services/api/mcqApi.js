import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { ENDPOINT } from "../endPoints";
import { toast } from "react-toastify";

const { GRADE_MCQ } = ENDPOINT;

const addMcq = async (data) => {
  try {
    const response = await axiosInstance.post("/api/addMcq", data);

    return response.data
  } catch (error) {
    console.log(error?.message);
    
  }
}

export const useAddMcq = () => {
  const mutation = useMutation({
      mutationFn: addMcq,
      onSuccess: (data) => {
         toast.success("MCQ Added")
          return data;
      },
      onError: (error) => {
          alert("Error submitting your answer: " + error.message);
      }
  })
  return mutation;
}



const GradeMcq = async (answers) => {
  try {
    const response = await axiosInstance.post(GRADE_MCQ, {answers});

    return response.data;
  } catch (error) {
    console.log(error?.message);
  }
};

export const useGradeMcq = () => {
    const mutation = useMutation({
        mutationFn: GradeMcq,
        onSuccess: (data) => {
           toast.success("Your answer has been submitted successfully!")

            return data;
        },
        onError: (error) => {
            alert("Error submitting your answer: " + error.message);
        }
    })
    return mutation;
}

