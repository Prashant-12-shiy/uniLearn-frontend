import axios from "axios";
import { ENDPOINT } from "../endPoints";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const {GET_CATAGORIES} = ENDPOINT;

const getCategories = async() => {
    try {
        const response = await axiosInstance.get(GET_CATAGORIES);

        return response.data.data;
    } catch (error) {
        console.error(error.message);
    }
};

export const useGetAllCategories = () => {
    return useQuery({
        queryKey: ["getAllCategories"],
        queryFn: getCategories,
        onError: (error) => {
            console.error("Error fetching data:", error.message);
        },
    });
 };