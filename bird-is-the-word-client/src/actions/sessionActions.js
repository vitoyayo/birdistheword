
const API_URL = process.env.REACT_APP_API_URL

/* Action Creators */

export const authenticationRequest = () => {
  return{
    type: 'AUTHENTICATION_REQUEST'
  }
}

export const setCurrentUser = user => {
  return{
    type: 'AUTHENTICATION_SUCCESS',
    user
  }
}

export const logOut = (router) => {
  return {
    type: 'LOG_OUT'
  }
  router.history.replace('/')
}

/* Async Actions*/

export const logInUser = (user, router) => {
  return dispatch => {
    dispatch(authenticationRequest())
    return fetch(`${API_URL}/auth`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user })
  })
    .then(response => response.json())
    .then(body => {
      const slug = body.user.username
      localStorage.setItem('jwt', body.token)
      dispatch(setCurrentUser(body.user))
      router.history.replace(`/users/${slug}`)
     
    })
    .catch(error => {
      error => (console.log(error))
      // throw new SubmissionError(error)
    })
  }
}

export const signUpUser = (user, router) => {
  return dispatch => {
    dispatch(authenticationRequest())
    return fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user })
    })
    .then(response => response.json())
    .then(body => {
      const slug = body.user.username
      localStorage.setItem('jwt', body.token)
      // dispatch(reset('signup'))
      dispatch(setCurrentUser(body.user))
      router.history.replace(`/welcome`)
      
    })
    .catch(error => {
      error => (console.log(error))
      // throw new SubmissionError(error)
    })
  }
}