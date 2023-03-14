import { combineReducers } from 'redux';
import countries from './reducer';

    const rootReducer = combineReducers({
        country: countries
    });

    export default rootReducer;