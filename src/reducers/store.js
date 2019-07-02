import {createStore, combineReducers, applyMiddleware} from "redux"
import userReducer from "./userReducer"
import videoDetailsReducer from './videoDetailsReducer'
import videoEngagedReducer from './videoEngagedReducer'
import thunk from 'redux-thunk'

export default createStore(combineReducers({userReducer,videoDetailsReducer,videoEngagedReducer}),applyMiddleware(thunk));