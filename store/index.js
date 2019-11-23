import {createStore, combineReducers, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'

import business from './reducers/business'

const reducers = combineReducers({
    business
})

export default createStore(reducers, applyMiddleware(ReduxThunk));

