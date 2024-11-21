import axiosInstance from "../axiosInstance"
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";


const adminLogin = async (data) => {
    try {
        const response = await axiosInstance.post("/api/auth/login", data, {
            withCredentials: true, // Correct way to include cookies
        });

        return response.data;
    } catch (error) {
        // Ensure you handle error response properly
        const errorMessage = error.response?.data?.message || "An error occurred";
        throw new Error(errorMessage);
    }
};


export const useAdminLogin = () => {
    const mutation = useMutation({
        mutationFn: adminLogin,
        onSuccess: () => {
            toast.success("Logged In")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return mutation
}