export var read = (userid, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userid}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {   //this is for fethc fun
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}


export var list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: 'GET',
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}


export var findPeople = (userid, token) => {

    return fetch(`${process.env.REACT_APP_API_URL}/user/findpeople/${userid}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
  
    })
        .then(response => {
               return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}


export var follow = (userid, token,followId) => {

    return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userid , followId})
    })
        .then(response => {
               return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}

export var unFollow = (userid, token,unfollowId) => {

    return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userid , unfollowId})
    })
        .then(response => {
               return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}



export var remove = (userid, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userid}`, {
        method: 'DELETE',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {   //this is for fethc fun
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}


export var update = (userid, token,user) => {
    console.log( 'user update ',user)
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userid}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: user
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}

export var updatelocalStorage = (user,next)=>{
    if(typeof window !== undefined){
    if(localStorage.getItem('jwt'))
    {
        let auth = JSON.parse(localStorage.getItem('jwt'));
        auth.user = user
        localStorage.setItem('jwt',JSON.stringify(auth));
        next();
    }
}
}