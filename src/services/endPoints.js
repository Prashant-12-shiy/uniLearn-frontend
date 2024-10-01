// import dotenv from 'dotenv';

// dotenv.config();

export const ENDPOINT = {

    BASEURL: process.env.NEXT_PUBLIC_BASEURL,

    GET_UNIVERSITY: '/api/getUniversity',
    GET_UNIVERSITY_BYID: "/api/getUniversity/",
    ADD_UNIVERSITY: "/api/newUniversity",


    GET_COURSEBYID: "/api/getCourse/",

    GET_SUBJECT: "/api/getSubject/",

    ADD_NOTES: "/api/addNote",

    ADD_PAST_QUESTION: "/api/addPastQuestion",
    GET_PAST_QUESTION: "/api/getPastQuestions",
}
