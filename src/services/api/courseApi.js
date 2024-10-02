import axios from "axios";
import { ENDPOINT } from "../endPoints";
import { useQuery , useMutation} from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
const { BASEURL, ADD_COURSE, GET_COURSEBYID } = ENDPOINT;


const addCourse = async (data) => {
  try {
    const response = await axiosInstance.post( ADD_COURSE, data);
    return response.data.data;
  } catch (error) {
    console.error("Error Adding Course" + error);
  }
};

export const useAddCourse = () => {
  const mutation = useMutation({
    mutationFn: addCourse
  });

  return mutation
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
