const videoCommentsAction = (shortId) => async (dispatch) => {

   const respObj = await fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=getComments&shortUrl=${shortId}&orderBy=asc`)
    .then(response => {
      
     if(!response.ok) { throw response }
     return response.json();

    })
    .then(data => {
      //returning comments of the specific video
      return data
    }).catch(err => {


   });
   return(dispatch(
       {
           type:'GET_COMMENTS',
           payload:{comments:respObj}
       }
   ))
}
export default videoCommentsAction