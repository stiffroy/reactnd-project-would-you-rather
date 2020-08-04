import {
    _getUsers,
    _getQuestions,
    _saveQuestionAnswer,
    _saveQuestion
} from "./_DATA"

export function getInitialData() {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }))
}

export function saveQuestionAnswer(authUser, qid, answer) {
    return _saveQuestionAnswer({ authedUser: authUser, qid, answer });
}

export function createNewQuestion(optionOneText, optionTwoText, author) {
    return _saveQuestion({ optionOneText, optionTwoText, author })
}