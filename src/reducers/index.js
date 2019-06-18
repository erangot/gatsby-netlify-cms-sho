
   import { combineReducers } from 'redux';
  
  

   const userReducer = (state = {
      status:false,
      username:""
   }, action) => {
      switch(action.type)
        {
           case "SIGN_IN":
                 state = { 
                  ...state, status:action.payload.status, username:action.payload.username
               
                 };
            break;

            case "SIGN_OUT":
                  state = { 
                  ...state, status:action.payload.status, username:""
                  };
             break;


        }
     return state;
  }


   export default combineReducers({
     user:userReducer
   })