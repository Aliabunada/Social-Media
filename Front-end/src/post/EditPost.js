import React, { Component } from 'react'
import { singlepost } from './postapi'
import { isAuth } from '../cores/menu'
import { updatePost } from './postapi'
import { Redirect } from 'react-router-dom'
import defualtpost from '../images/sky.jpg';
class EditPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id : '',
            title: '',
            body: '',
            error: '',
            redirectToprofile: false,
            fileSize: 0,
            loading: false

        }

    }
    componentDidMount() {
        this.postData = new FormData();
        const postId = this.props.match.params.postId
        singlepost(postId).then(data => {
            if (data.error) {
                this.setState({ redirectToprofile: true })
            } else {

                this.setState({
                    id : data._id,
                    title: data.title,
                    body: data.body,
                    error: ''
                })
            }
        })
    }

    handleChange = name => event => {
        this.setState({ error: "", loading: false });
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        const fileSize = name === 'photo' ? event.target.files[0].size : 0
        this.postData.set(name, value)
        this.setState({ [name]: value, fileSize })
    }



    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true })

        if (this.isValid()) {
            const id = this.state.id
            const token = isAuth().token;
            updatePost(id, token, this.postData).then(data => {

                if (data.error) {
                    this.setState({ error: data.error, loading: false });
                } else {
                    this.setState({
                        title: '',
                        body: '',
                        photo: '',
                        loading: false,
                       redirectToprofile: true
                    })
                }
            })
        }

    }

    isValid = () => {
        const { body, title, fileSize } = this.state;
        if (fileSize > 100000) {
            this.setState({ error: 'The file size should be less than 100kb', loading: false })
            return false
        }
        if (title.length === 0) {
            this.setState({ error: 'Title is required', loading: false })
            return false
        }
        if (body.length === 0) {
            this.setState({ error: 'Body is required', loading: false })
            return false
        }

        return true
    }



    render() {
        const { title, body, error, loading,redirectToprofile,id } = this.state;
        if (redirectToprofile) {
            return <Redirect to={`/user/${isAuth().user._id}`} />
        }
        return (
            <div className="container">
                <h1 className="mt-5 mb-5">Update Post</h1>
                {error.message ? (
                    <div className='alert alert-danger' style={{ display: error.message ? "" : "none" }}>
                        {error.message}
                    </div>
                ) : (
                        <div className='alert alert-danger' style={{ display: error ? "" : "none" }}>
                            {error}
                        </div>
                    )}

                {loading ? (<div className="jumbotron   text-center">
                    <h2>Loading...</h2>
                </div>) : ("")}

                <img src={`${process.env.REACT_APP_API_URL}/post/photo/${id}?${new Date().getTime()}`}
                            alt={title} 
                            onError={(i) => { i.target.src = defualtpost }}
                            style={{ objectFit: "inherit", maxHeight: '400px', width: 'auto', }}
                            className="img-thunbnail mb-4 "
                        />
                <form>
                    <div className="form-group">
                        <label className="text-muted">Post Photo</label>
                        <input onChange={this.handleChange('photo')} type='file' className="form-control" accept="image/*" />

                    </div>

                    <div className="form-group">
                        <label className="text-muted">Title</label>
                        <input onChange={this.handleChange('title')} type='text' className="form-control" value={title} />

                    </div>

                    <div className="form-group">
                        <label className="text-muted">Body</label>
                        <textarea onChange={this.handleChange('body')} type='text' className="form-control" value={body} />

                    </div>

                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update Post</button>

                </form>
            </div>
        )
    }
}

export default EditPost
