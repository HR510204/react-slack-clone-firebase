import * as actionTypes from '../actions/types'
import { combineReducers } from 'redux'

const initialUserState = {
  currentUser: null,
  loading: true,
  currentChannel: null
}
const user_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        loading: false
      }
    case actionTypes.CLEAR_USER:
      return {
        currentUser: null,
        loading: false
      }
    case actionTypes.SET_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel
      }
    default:
      return state
  }
}
const rootReducer = combineReducers({
  user: user_reducer
})
export default rootReducer
