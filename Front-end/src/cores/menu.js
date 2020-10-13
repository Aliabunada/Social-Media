import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const helperfun = (history, path) => {

    if (history.location.pathname === path) return { color: "#ff9900" }

}

export const isAuth = () => {
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    }
    else {
        return false;
    }
}
export const signout = (next) => {
    if (typeof window !== undefined) localStorage.removeItem('jwt')
    next()
    return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
        method: 'GET',
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}


const Menu = (props) => {
    return (

        <div>

            <ul className="nav nav-tabs bg-dark ">
                <li className="nav-item">
                    <Link className="nav-link" to="/" style={helperfun(props.history, "/")} > Home </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/users" style={helperfun(props.history, "/users")} > Users </Link>
                </li>
                
                <li className="nav-item">
                            <Link to={`/new/post`} className="nav-link" style={helperfun(props.history, `/new/post`)}>
                                Create Post
                            </Link>
                        </li>

                {!isAuth() && (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup" style={helperfun(props.history, "/signup")} >Signup </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/signin" style={helperfun(props.history, "/signin")} >Signin </Link>
                        </li>
                    </>

                )}

                {isAuth() && (
                    <>
                        <li className="nav-item">
                            <Link to={`/findpeople`} className="nav-link" style={helperfun(props.history, `/findpeople`)}>
                                Find People
                            </Link>
                        </li>

                       

                        <li className="nav-item">
                            <Link to={`/user/${isAuth().user._id}`} className="nav-link" style={helperfun(props.history, `/user/${isAuth().user._id}`)}>

                                {`${isAuth().user.name}'s profile`}

                            </Link>
                        </li>
                        <li className="nav-item ml-auto mr-3 nav-flex-icons">
                            <Link to=""
                                className="nav-link"
                                style={helperfun(props.history, "/signout"), { cursor: 'pointer', color: '#fff', }
                                }
                                onClick={() => { signout(() => props.history.push('/')) }}  /// بدنا نغير ضغطة الزر ونخليها تستدعي الميثود
                            > signout </Link>
                        </li>

                    </>
                )}
            </ul>

        </div>

    )
}
export default withRouter(Menu)

