const videoAnalyticsReducer = (state = {}  , action) => {
    switch(action.type)
      { 
         case "GET_ANALYTICS":
               state = action.payload.analytics
          break;
          default:
          return state;
      }
   return state;
 }
 
 
 
 export default videoAnalyticsReducer
 
  