import {createStore, combineReducers, applyMiddleware} from "redux"
import userReducer from "./userReducer"
import videoDetailsReducer from './videoDetailsReducer'
import videoEngagedReducer from './videoEngagedReducer'
import videoCommentsReducer from './videoCommentsReducer'
import videoAnalyticsReducer from './videoCommentsReducer'
import thunk from 'redux-thunk'

export default createStore(combineReducers({userReducer,videoDetailsReducer,videoEngagedReducer,videoCommentsReducer,videoAnalyticsReducer}),applyMiddleware(thunk));