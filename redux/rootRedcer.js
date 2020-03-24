/**
 * Created by yuxichan on 2020.2.18.
 */
import { combineReducers } from 'redux'
import userReducer from './reducers/users'

const reducer = combineReducers({
  userReducer,
})

export default reducer