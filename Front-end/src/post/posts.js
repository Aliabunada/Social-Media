import React, { Component } from 'react'
import { list } from './postapi';
import { Link } from 'react-router-dom';
import defualtpost from '../images/sky.jpg';
class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        list()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    this.setState({ posts: data })
                }
            })
    }
    render() {
        const { posts} = this.state;
        return (

            <div className="container">
                <h2 className='mt-5 mb-5'>{!posts.length ? "Loading..":"Recent Posts"}</h2>
                <div className='row'>
                    {posts.map((post, i) => (
                        <div className="card col-md-4 " key={i}>
                            <div className="card-body">
                                <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                                    alt={post.title} onError={(i) => { i.target.src = defualtpost }}
                                    style={{ objectFit: "auto", height: '200px', width: 'auto' }}
                                    className="img-thunbnail mb-3"
                                />
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.body.substring(0, 100)}</p>
                                <br />
                                <p className="font-italic mark"> Posted by <Link to={`${post.postedBy ? `user/${post.postedBy._id}` : ''}`}>{post.postedBy ? post.postedBy.name : ' Unknown'}</Link> on {new Date(post.created).toDateString()} </p>
                                <Link to={`/post/${post._id}`} className="btn btn-raised btn-sm btn-primary">Read more..</Link>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        )
    }
}

export default Posts
