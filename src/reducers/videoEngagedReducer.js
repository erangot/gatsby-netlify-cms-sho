
const videoEngagedReducer = (state = {
    isEngaged:false}, action) => 
{ 
      switch(action.type)
         {
            case 'GET_ENGAGED':
             state = {
                ...state, isEngaged:action.payload.isEngaged
            }
            break;
            default:
            state={};
        
         }

         return state;
}

export default videoEngagedReducer