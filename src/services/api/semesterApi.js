import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance"
import { toast } from "react-toastify";
const addSemester = async(data) => {
    try {
        const response = await axiosInstance.post("/api/addSemester", data);

        return response.data;
    } catch (error) {
        throw new Error(error.response.data.data || "Error while adding Semester")
    }
}

export  const useAddSemester = () => {
    const mutation = useMutation({
        mutationFn: addSemester,
        onSuccess: () => {
            toast.success("New Semester Added")
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    return mutation
}