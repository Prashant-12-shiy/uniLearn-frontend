"use client";
import React, { useEffect, useState } from "react";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useDeleteMessage, useGetMessage } from "@/services/api/messageApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Trash } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

const Page = () => {
  const isAdmin = cookies.get("admin");
  const router = useRouter();
  const { data: MessageData } = useGetMessage();
  const { mutate: deleteMessageMutation } = useDeleteMessage();
  const queryClient = useQueryClient();
  // console.log(MessageData);
  



  const handleDeleteMessage = (id) => {
    try {
      deleteMessageMutation(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getAllMessage"] });
        },
      });
    } catch (error) {
      console.error("Error deleting message:", error.message);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;

  // Calculate the total number of pages
  const totalPages = Math.ceil(MessageData?.length / messagesPerPage);

  // Slice the messages array to show only messages for the current page
  const currentMessages = MessageData?.slice(
    (currentPage - 1) * messagesPerPage,
    currentPage * messagesPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="mx-10">
      <section className="w-full">
        <h2 className="text-3xl text-black dark:text-white">Message Section</h2>
        <Table>
          <TableHeader>
            <TableRow className="w-full">
              <TableHead className="w-[15vw]">Name</TableHead>
              <TableHead className="w-[15vw]">Email</TableHead>
              <TableHead className="w-[60vw] text-center">Message</TableHead>
              <TableHead className="w-[60vw] text-center">Date/Time</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentMessages?.map((message) => {
              return (
                <TableRow key={message._id}>
                  <TableCell className="w-[15vw] text-black dark:text-white">{message.name}</TableCell>
                  <TableCell className="w-[15vw] text-black dark:text-white">{message.email}</TableCell>
                  <TableCell className="w=[60vw]  text-black dark:text-white text-center">
                    {" "}
                    {message.message}
                  </TableCell>
                  <TableCell className="w=[60vw]  text-black dark:text-white text-center">
                  {format(new Date(message.createdAt), "MM/dd -- hh:mm:ss a")}
                  </TableCell>
                  <TableCell className="text-center">
                    {" "}
                    <Trash
                      onClick={() => handleDeleteMessage(message._id)}
                      className="w-4 h-4 cursor-pointer text-black dark:text-white hover:text-red-500"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div className="flex justify-between items-center mt-4 text-black dark:text-white">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded disabled:bg-gray-200"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded disabled:bg-gray-200"
        >
          Next
        </button>
      </div>
      </section>
    </div>
  );
};

export default Page;
