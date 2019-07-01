const videoDetailsReducer = (state = {}, action) => 
{ 

    switch(action.type)
         {
            case 'GET_DETAILS':
            return state = {...state , 
                videoTitle: action.payload.videoTitle,
                videoDesc: action.payload.videoDesc,
                visibility: action.payload.visibility,
                shortUrlId: action.payload.shortUrlId
            }
            break;
            default:
            return state;
        
         }

         return state;
}

export default videoDetailsReducer