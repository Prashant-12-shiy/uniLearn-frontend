// import dotenv from 'dotenv';

// dotenv.config();

export const ENDPOINT = {

    BASEURL: process.env.NEXT_PUBLIC_BASEURL,

    GET_UNIVERSITY: '/api/getUniversity',
    GET_UNIVERSITY_BYID: "/api/getUniversity/",
    ADD_UNIVERSITY: "/api/newUniversity",

    ADD_COURSE: '/api/addCourse',
    GET_COURSEBYID: "/api/getCourse/",
    GET_ALLCOURSE: "/api/getAllCourse",

    ADD_SUBJECT: "/api/addSubject",
    GET_SUBJECT: "/api/getSubject/",


    ADD_NOTES: "/api/addNote",
    GET_NOTE: "/api/getNote/",


    ADD_PAST_QUESTION: "/api/addPastQuestion",
    GET_PAST_QUESTION: "/api/getPastQuestions",

    GET_CATAGORIES: "/api/getAllCatagories",

    SEND_MESSAGE: "/api/sendMessage",
    GET_MESSAGE: "/api/getMessage",
    DELETE_MESSAGE: "/api/deleteMessage/",


    GRADE_MCQ: "/api/grade-mcqs"
}
