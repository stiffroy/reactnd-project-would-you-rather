import {addAnswerToQuestion} from './questions'
import {saveQuestionAnswer} from '../utils/api'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER'

function addAnswerToUser(authUser, qid, answer) {
    return {
        type: ADD_ANSWER_TO_USER,
        authUser,
        qid,
        answer
    }
}

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export function handleAnswerQuestion(authUser, qid, answer) {
    return dispatch => {
        dispatch(addAnswerToUser(authUser, qid, answer))
        dispatch(addAnswerToQuestion(authUser, qid, answer))

        return saveQuestionAnswer(authUser, qid, answer).catch(e => {
            console.warn('Error in handleAnswerQuestion:', e)
        })
    }
}