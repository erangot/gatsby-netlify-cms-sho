import {createStore, combineReducers, applyMiddleware} from "redux"
import userReducer from "./userReducer"
import videoDetailsReducer from './videoDetailsReducer'
import thunk from 'redux-thunk'

export default createStore(combineReducers({userReducer,videoDetailsReducer}),applyMiddleware(thunk));