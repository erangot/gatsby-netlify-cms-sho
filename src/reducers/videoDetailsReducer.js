const videoDetailsReducer = (state = {
    videoTitle: '',
    videoDesc: '',
    createdOn: '',
    visibility: '',
    shortUrlId: '',
}, action) => 
{ 
    switch(action.type)
         {
            case 'GET_DETAILS':
             state = {
                ...state, 
                videoTitle:action.payload.respObj.videoTitle,
                videoDesc:action.payload.respObj.videoDesc,
                createdOn:action.payload.respObj.createdOn,
                visibility:action.payload.respObj.visibility,
                shortUrlId:action.payload.respObj.shortUrlId,
            }
            break;
            default:
            return state;
        
         }

         return state;
}

export default videoDetailsReducer

