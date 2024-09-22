import axios from "axios";
import { ENDPOINT } from "../endPoints";
import { useQuery } from "@tanstack/react-query";
const {BASEURL, GET_COURSEBYID} = ENDPOINT;

const getCourse = async (id) => {
    try {
        const response = await axios.get(BASEURL + GET_COURSEBYID + id);
        
        return response.data.data;
    } catch (error) {
        console.error('Error fetching course:', error.message);
    }
}

export const useGetCourse = (id) => {
    return useQuery({
        queryKey: ['getCourse'],
        queryFn: () =>  getCourse(id),
        onError: (error) => {
            console.error('Error fetching data:', error.message);
        }
    })
}