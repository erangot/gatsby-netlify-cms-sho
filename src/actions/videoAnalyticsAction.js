const videoAnalyticsAction = (shortId) => async (dispatch) => {

   const respObj =  await fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=getVideoStatistics&shortId=${this.state.video.shortId}`)
    .then(response => {
     if(!response.ok) { throw response }
     return response.json();
    })
    .then(data2 => {
      return data2
    }).catch(err => {   
   });
   console.log(respObj)
    return(dispatch(
        {
            type:'GET_ANALYTICS',
            payload:{analytics:respObj}
        }
    ))
 }
 export default videoAnalyticsAction