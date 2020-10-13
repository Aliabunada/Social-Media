import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { isAuth } from '../cores/menu'
import { read, update,updatelocalStorage } from './userapi'
import defualtImage from '../images/avatar.png'

export class UpdateProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            email: '',
            about: '',
            password: '',
            error: '',
            redirectToProfile: false,
            fileSize: 0,
            loading: false

        }
    }

    componentDidMount() {
        this.userData = new FormData();
        const id = this.props.match.params.id
        this.init(id)
    }

    handleChange = name => event => {
        this.setState({ error: "" ,loading:false});
        
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        const fileSize = name === 'photo' ? event.target.files[0].size : 0 ||undefined;
        this.userData.set(name, value)
        this.setState({ [name]: value, fileSize })
    }

    init = userId => {
        const token = isAuth().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToProfile: true })
            }
            else {
                this.setState({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    error: "",
                    about : data.about
                   
                })
            }
        })
    }

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true })

        if (this.isValid()) {
            const id = this.props.match.params.id
            const token = isAuth().token;

            update(id, token, this.userData).then(data => {
            
                if (data.error) {
                  
                    this.setState({ error: data.error , loading:false});
                } else {
                    updatelocalStorage(data,()=>{ 
                        this.setState({
                        redirectToProfile: true

                    });})
                }
            })
        }

    }

    isValid = () => {
       
        const { name, email, password, fileSize } = this.state;

        if (fileSize > 100000) {
            this.setState({ error: 'The file size should be less than 100kb',loading:false })
            return false
        }

        if (name.length === 0) {
            this.setState({ error: 'Name is required',loading:false })
            return false
        }
        if (email.length === 0) {
            this.setState({ error: 'Email is required',loading:false })
            return false
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email)) {
            this.setState({ error: 'A valid Email is required',loading:false })
            return false
        }
        if (password.length >= 1 && password.length <= 5) {
            this.setState({ error: 'Password must be at least 6 characters long',loading:false })
            return false
        }
        return true
    }


    render() {
        const { id, name, email, about,password, redirectToProfile, error, loading } = this.state;
        if (redirectToProfile) {
            return <Redirect to={`/user/${id}`} />
            
        }
        const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}`: defualtImage

        return (
            <div className="container">
                <h2 className='mt-5 mb-5'>Edit Profile</h2>
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
                </div>) :("")}

                <img className="img-thumbnail" onError={(i)=>{i.target.src = defualtImage}} style={{height:'200px', width:'auto'}} src={photoUrl} alt={`${name}`}></img>

                <form>
                    <div className="form-group">
                        <label className="text-muted">  Profile Photo</label>
                        <input onChange={this.handleChange('photo')} type='file' className="form-control" accept="image/*" />

                    </div>

                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input onChange={this.handleChange('name')} type='text' className="form-control" value={name} />

                    </div>

                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange('email')} type='email' className="form-control" value={email} />

                    </div>

                    <div className="form-group">
                        <label className="text-muted">About</label>
                        <textarea onChange={this.handleChange('about')} type='text' className="form-control" value={about} />

                    </div>

                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange('password')} className="form-control" value={password} />
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update</button>

                </form>
            </div>
        )
    }
}

export default UpdateProfile
