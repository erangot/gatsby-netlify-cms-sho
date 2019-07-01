const videoDetailsAction = (shortId) => async (dispatch) => {

        let data;
        const respObj =  await fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=getDetailsFromShortId&shortId=${shortId}`)
         .then(response => {
          if(!response.ok) { throw response }
          return response.json();
         })
         .then(data1 => {
             data = data1;
         }).catch(err => {
                 
        });
        console.log(data)
        return(dispatch(
            {
                type:'GET_DETAILS', 
                payload:{
                    videoTitle: data[0][0].title,
                    videoDesc: data[0][0].description,
                    visibility: data[0][0].visibility,
                    shortUrlId: data[0][0].shortUrlId
                  }
            }
        ))
}
export default videoDetailsAction