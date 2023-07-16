import { combineReducers } from 'redux'
import sampleReducer from './sampleReducer'
import user from './user'

export default combineReducers({
  sampleReducer,
  user
})