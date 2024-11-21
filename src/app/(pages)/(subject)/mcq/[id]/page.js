"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useGetSubjects } from "@/services/api/subjectApi";
import { Form, useForm } from "react-hook-form";
import { useGradeMcq } from "@/services/api/mcqApi";
import { ToastContainer } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const Page = () => {
  const { register, handleSubmit, reset } = useForm();
  const [score, setScore] = useState();
  const params = useParams();
  const { id } = params;
  const { data: subjectData } = useGetSubjects(id);
  const mcqQuestions = subjectData?.subject?.mcqQuestions;
  const { mutate: gradeMcqMutation } = useGradeMcq();
  const [results, setResults] = useState([]);
  const queryClient = useQueryClient();


  function onSubmit(data) {
    try {
      // Transform the data to the required format
      const answers = Object.entries(data).map(([key, value]) => ({
        id: key, // Extracting the question ID from the name
        selectedAnswer: value,
      }));

      gradeMcqMutation(answers, {
        onSuccess: (data) => {
    
          const feedback = data.feedback.map((question) => {
            const userAnswer = answers.find((answer) => answer.id === question.id);
            return {
              id: question.id,
              correct: question.correct,
              correctAnswer: question.correctAnswer,
              selectedAnswer: userAnswer ? userAnswer.selectedAnswer : null,
            };
          });
          setResults(feedback); // Set feedback in state
          setScore(data.score);
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  function handleReset() {
    reset(); // Reset form input values
    setResults([]); // Clear feedback state
    setScore();
    queryClient.invalidateQueries({ queryKey: ["getSubjects"]})

    window.scrollTo({ top: 0, behavior: "smooth" });
  }


  return (
    <div className="mx-10 mt-8 max-md:mx-2">
      {mcqQuestions?.length !== 0 ? <><h1 className="text-center mb-5 text-5xl dark:text-white text-black font-semibold max-md:text-2xl">
        Choose The Answers
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {mcqQuestions?.map((question, index) => {
            const result = results.find((res) => res.id === question._id);
            return (
              <div key={index} className="mb-6">
                <label className="block font-semibold text-lg max-md:text-base max-md:mb-1 text-black dark:text-white">
                  {index + 1}. {question.question}
                </label>
                {question.options.map((option, i) => {
                  const isSelected = result?.selectedAnswer === option;
                  const isCorrect = result?.correctAnswer === option;
                  return (
                    <div key={i} className="flex items-center max-md:text-sm mb-1 text-black dark:text-white">
                      <input
                        type="radio"
                        {...register(question._id)} // Register the radio group
                        value={option} // Set value to option
                        className="mr-2"
                        disabled={!!result} // Disable input after submission
                      />
                      <label
                        className={`${
                          result
                            ? isCorrect
                              ? "text-green-600 font-semibold"
                              : isSelected
                              ? "text-red-600 font-semibold"
                              : ""
                            : ""
                        }`}
                      >
                        {option}
                        {result && isCorrect && " (Correct)"}
                        {result && isSelected && !isCorrect && " (Your answer)"}
                      </label>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

       {score && <p className="text-2xl">Total Score: <span className="text-red-700"> {score}</span> </p>}   <br/> <br/>
        <button
          type="submit"
          className="mt-4 p-2 mr-8 bg-blue-500 rounded text-black dark:text-white hover:scale-110 transition-all ease-in-out hover:-translate-y-1"
          disabled={results.length > 0} // Disable button if results are shown
        >
          Submit Answers
        </button>

        <button
            type="button"
            className="p-2 px-4 bg-gray-500 rounded text-black dark:text-white hover:scale-110 transition-all ease-in-out hover:-translate-y-1"
            onClick={handleReset}
          >
            Reset
          </button>
      </form></> : <p className="text-black dark:text-white">No MCQ</p>}
      

      {/* <div className="mt-4">
        {results.map((result, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded ${
              result.correct ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
            }`}
          >
            Question {index + 1}:{" "}
            {result.correct
              ? " Correct!"
              : ` Incorrect! You selected: "${result.selectedAnswer}". The correct answer is: "${result.correctAnswer}".`}
          </div>
        ))}
      </div> */}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Page;
