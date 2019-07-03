const videoCommentsReducer = (state = {}  , action) => {
    switch(action.type)
      { 
         case "GET_COMMENTS":
               state = action.payload.comments
          break;
          default:
             return state;
      }
   return state;
 }
 
 
 
 export default videoCommentsReducer
 
  