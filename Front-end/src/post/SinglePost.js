import React, { Component } from 'react'
import { singlepost, removePost } from './postapi'
import { isAuth } from '../cores/menu'
import { Link, Redirect } from 'react-router-dom';
import defualtpost from '../images/sky.jpg';
class SinglePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: '',
            redirectToHome : false
        }
    }
    componentDidMount() {

        const postId = this.props.match.params.postId
        singlepost(postId).then((data) => {
            if (data.err) {
                console.log(data.err);
            }
            console.log(data);
            this.setState({ post: data })
        })
    }

    clickdelete = () => {
        let answer = window.confirm("Are You sure Delete Your Post?")
        if (answer) {
        const postId = this.props.match.params.postId
        const token = isAuth().token
        removePost(postId, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            }

            console.log(data);
            this.setState({redirectToHome : true})
        })
    }
}
    render() {
        const { post,redirectToHome } = this.state
        if(redirectToHome) return <Redirect to = "/" />
        return (
            <>

                {!post ? (<div className="jumbotron text-center">
                    <h2>Loading...</h2>
                </div>) : (<div className="container text-center">
                    <h1 className="display-2 mt-5 mb-5"> {post.title} </h1>
                    <div className="card-body ">
                        <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                            alt={post.title} onError={(i) => { i.target.src = defualtpost }}
                            style={{ objectFit: "inherit", maxHeight: '400px', width: 'auto', }}
                            className="img-thunbnail mb-4 "
                        />

                        <p className="card-text ">{post.body}</p>
                        <br />
                        <p className="font-italic mark"> Posted by{` `}
                        <Link to={`${post.postedBy ? `/user/${post.postedBy._id}` : ''}`}>{post.postedBy? post.postedBy.name : ' Unknown'}</Link> on {new Date(post.created).toDateString()} </p>
                        
                        
                        <div className="d-inline-blcok">

                            <Link to={`/`} className="btn btn-raised btn-sm btn-primary mr-5">Back to Posts </Link>
                            {isAuth().user && isAuth().user._id === post.postedBy._id ? (
                                <>
                                    <Link to={`/edit/post/${post._id}`} className="btn btn-raised btn-sm btn-warning mr-5">Update Post </Link>
                                    <button className="btn btn-raised btn-sm btn-danger" onClick={this.clickdelete  } >Delete Post </button>
                                </>) : ("")}

                        </div>

                    </div>
                </div>
                    )}

            </>
        )
    }
}

export default SinglePost
