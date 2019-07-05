const videoEngagedAction = (shortId,userUUID) => async (dispatch) => {

        
     const respObj = await fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=getEngagedForShortIdUser&shortId=${shortId}&ownerId=${userUUID}`)
    .then(response => {
      if(!response.ok) { throw response }
      return response.json();
    })
    .then(data => {
        return data[0][0]
    }).catch(err => {
        return err
    });
   
    return(dispatch(
        {
            type:'GET_ENGAGED',
            payload:{isEngaged:respObj}
        }
    ))
}
export default videoEngagedAction