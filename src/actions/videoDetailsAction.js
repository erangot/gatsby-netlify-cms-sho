const videoDetailsAction = (shortId) => async (dispatch) => {

       
    try
    {
        const respObj =  await fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=getDetailsFromShortId&shortId=${shortId}`)
         .then(response => {
          if(!response.ok) { throw response }
          return response.json();
         })
         .then(data1 => {
             console.log(data1)
          return { 
                videoTitle:data1[0][0].title, 
                videoDesc:data1[0][0].description, 
                createdOn:data1[0][0].createdOn, 
                visibility:data1[0][0].visibility, 
                shortUrlId: data1[0][0].shortUrlId
            }
         }).catch(err => {
            Promise.resolve(err)
        });
        
         console.log(respObj)
        return(dispatch(
            {
                type:'GET_DETAILS', 
                payload:{respObj}
            }
        ))
    }
    catch(error)
    {
        console.log(error)
    }
}
export default videoDetailsAction