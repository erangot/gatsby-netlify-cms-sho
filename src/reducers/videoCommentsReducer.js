const videoCommentsReducer = (state = {comments:''}  , action) => {

   switch(action.type)
      { 
         
         case "GET_COMMENTS":
                state = {...state, comments:action.payload.comments}
          break;
          default:
             return state;
      }
   return state;
 }
 
 
 
 export default videoCommentsReducer
 
  