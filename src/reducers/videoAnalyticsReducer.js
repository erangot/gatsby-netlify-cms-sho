const videoAnalyticsReducer = (state = {analytics:''}  , action) => {

  console.log(action)
    switch(action.type)
      { 
         case "GET_ANALYTICS":
           state = {...state, analytics:action.payload.analytics}
          break;
          default:
          return state;
      }
   return state;
 }
 
 
 
 export default videoAnalyticsReducer
 
  