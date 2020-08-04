import {createNewQuestion} from "../utils/api"
import {addQuestionToUser} from "./users"

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTIONS'

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

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

export function handleAddQuestion(optionOne, optionTwo, authUser) {
    return dispatch => {
        return createNewQuestion(optionOne, optionTwo, authUser).then(
                question => {
                    dispatch(addQuestion(question))
                    dispatch(addQuestionToUser(question))
                }
            ).catch(e => {
            console.warn('Error in handleAddQuestion:', e)
        })
    }
}