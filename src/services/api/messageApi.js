import axiosInstance from "@/services/axiosInstance";
import { ENDPOINT } from "@/services/endPoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const { SEND_MESSAGE, GET_MESSAGE, DELETE_MESSAGE } = ENDPOINT;


const sendMessage = async (data) => {
  const response = await axiosInstance.post(SEND_MESSAGE, data);
  return response.data.data;
};

export const useSendMessage = () => {
  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      toast.success("Message sent successfully!", {
        position: "top-center",
        toastId: "sendMessage",
      });
    },
    onError: () => {
      toast.error("Failed to send message, please try again later!", {
        position: "top-center",
      });
    },
  });

  return mutation;
};

const getMessage = async () => {
  const response = await axiosInstance.get(GET_MESSAGE);
  return response.data.data;
};

export const useGetMessage = () => {
  return useQuery({
    queryKey: ["getAllMessage"],
    queryFn: getMessage,
    onError: (error) => {
      console.error("Error fetching data:", error.message);
    },
  });
};

const deleteMessage = async (id) => {
  const response = await axiosInstance.delete(`${DELETE_MESSAGE}${id}`);
  return response.data.data;
};

export const useDeleteMessage = () => {
    const mutation = useMutation({
      mutationFn: deleteMessage,
      onSuccess: () => {
        toast.success("Message deleted successfully!", {
          position: "top-center",
          toastId: 2,
        });
      },
      onError: () => {
        toast.error("Failed to delete message, please try again later!", {
          position: "top-center",
        });
      },
    });

    return mutation;
}