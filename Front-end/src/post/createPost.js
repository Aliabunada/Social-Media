import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { isAuth } from '../cores/menu'
import { createPost } from './postapi'


class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            body: '',
            photo: '',
            error: '',
            user: {},
            loading: false,
            fileSize: 0,
            redirectToProfile : false


        }
    }

    componentDidMount() {
        this.postData = new FormData();
        this.setState({ user: isAuth().user });
    }

    handleChange = name => event => {
        this.setState({ error: "", loading: false });
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        const fileSize = name === 'photo' ? event.target.files[0].size : 0 || undefined;
        this.postData.set(name, value)
        this.setState({ [name]: value, fileSize })
    }



    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true })

        if (this.isValid()) {
            const id = isAuth().user._id
            const token = isAuth().token;
            createPost(id, token, this.postData).then(data => {

                if (data.error) {

                    this.setState({ error: data.error, loading: false });
                } else {
                    this.setState({
                        title: '',
                        body: '',
                        photo: '',
                        loading: false,
                        redirectToProfile: true
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
        const { title, body, error, loading,user,redirectToProfile } = this.state;
        if (redirectToProfile) {
            return <Redirect to={`/user/${user._id}`} />

        }

        return (
            <div className="container">
                <h2 className='mt-5 mb-5'>Create new Post</h2>
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

                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Create Post</button>

                </form>
            </div>
        )
    }
}

export default CreatePost
