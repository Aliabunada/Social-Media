export var createPost = (userid, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userid}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}

export var list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: 'GET',
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}

export var listbyUser = (userid, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/by/${userid}`, {
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

export var singlepost = postId => {
    console.log(' hi from singlepost api');
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: 'GET',
    })
        .then(response => {
            console.log(response);
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}



export var removePost = (postid, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postid}`, {
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

export var updatePost = (postid, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postid}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}

export var like = (userId, token, postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/like`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId })
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}
export var unlike = (userId, token, postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/unlike`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId })
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}