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
        throw error?.response?.data || error;
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

 const getCategory = async(id) => {
    try {
        const response = await axiosInstance.get("/api/getCategory/" + id);

        return response.data.data;
    } catch (error) {
        throw error?.response?.data || error;
    }
};

export const useGetCategory = (id) => {
    return useQuery({
        queryKey: ["getCategory", id], // Include `id` in queryKey for caching
        queryFn: () => getCategory(id), // Pass `id` to the API call
        enabled: !!id, // Ensure the query only runs when `id` is truthy
        onError: (error) => {
            console.error("Error fetching data:", error.message);
        },
    });
};
