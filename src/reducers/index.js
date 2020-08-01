import { combineReducers } from 'redux'
import authUser from './authUser'
import users from './users'

export default combineReducers({
    authUser,
    users,
})