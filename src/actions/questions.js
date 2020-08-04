import {ADD_ANSWER_TO_USER} from "./users";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTIONS'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function addAnswerToQuestion(authUser, qid, answer) {
    return {
        type: ADD_ANSWER_TO_QUESTION,
        authUser,
        qid,
        answer
    }
}