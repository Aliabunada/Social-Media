import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { isAuth } from '../cores/menu'
import { read } from './userapi'
import defualtImage from '../images/avatar.png'
import DeleteUser from "./deleteuser"
import FollowProfile from './followProfile'
import ProfileTaps from './profileTaps'
import {listbyUser} from '../post/postapi'
export class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: { following: [], followers: [] },
            redirectToSignin: false,
            following: false,
            error: '',
            posts : []
        }
    }
    componentDidMount() {
        const id = window.location.pathname.replace('/user/', "")
        this.init(id)
    }

    componentWillReceiveProps(nextProps) {
        const id = nextProps.match.params.id
        this.init(id)
    }


    init = id => {
        const token = isAuth().token;
        read(id, token).then(data => {     // this is for then of the then
            if (data.error) {
                this.setState({ redirectToSignin: true })

            } else {
                let following = this.checkFollow(data);
                this.setState({ user: data, following })
                this.loadposts(data._id,token)
            }
        })
    }

    loadposts= (id,token)=>{
        listbyUser(id,token).then((data)=>{
            if(data.error){
                console.log(data.error);
            }
            this.setState({posts:data})
        })
    }

    checkFollow = user => {
        const jwt = isAuth();
        let match = user.followers.find(follower => {

            return follower._id === jwt.user._id
        })
        return match;
    }

    clickFollowbtn = callApi => {
        const id = isAuth().user._id;
        const token = isAuth().token;

        callApi(id, token, this.state.user._id)
            .then(data => {
                if (data.error) {
                    this.setState({ error: data.error });
                }
                else {
                    this.setState({ user: data, following: !this.state.following })
                }
            })

    }

   
    render() {
        const { redirectToSignin, user,posts } = this.state
        if (redirectToSignin) {
            return <Redirect to="/signin" />
        }
        const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : defualtImage

        return (
            <div className="container">
                <h2 className='mt-5 mb-5'>Profile</h2>
                <div className="row">
                    <div className="col-md-4" >

                        <img className="img-thumbnail" onError={(i) => { i.target.src = defualtImage }} style={{ height: '300px', width: 'auto' }} src={photoUrl} alt={`${user.name}`}></img>

                    </div>

                    <div className="col-md-8" >
                        <div className="lead mt-2">
                            <p> Hello {user.name} </p>
                            <p>Email : {user.email} </p>
                            <p>{`Joined ${new Date(user.created).toDateString()}`} </p>

                        </div>
                        {isAuth().user && isAuth().user._id === user._id ? (
                            <div className="d-inline-block mt-5">
                                <Link className="btn btn-raised btn-info mr-5"
                                    to={`/new/post`}>Create Post</Link>

                                  <Link className="btn btn-raised btn-success mr-5"
                                    to={`/user/edit/${user._id}`}
                                >Edit Profile</Link>
                                <DeleteUser userId={user._id} />
                            </div>
                        ) : <FollowProfile onBtnClick={this.clickFollowbtn} following={!this.state.following} />}
                    </div>
                </div>
                <div className="row" >
                    <div className="col md-12 mt-5 mb-5"  >
                        <hr />
                        <p className="lead"> {user.about}</p>
                        <hr />
                        
                        <ProfileTaps followers = {user.followers} following = {user.following} posts ={posts}/>
                 
                    </div>

                </div>
            </div>
        )
    }
}

export default Profile
