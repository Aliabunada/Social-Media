import React from 'react'
import { Link } from 'react-router-dom'

class Signup extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            error: '',
            open : false
        }
    }

    clickSubmit = event => {
        event.preventDefault()
        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password
        }
            this.signup(user).then(data =>{
               console.log(data)
                if(data.err) this.setState({error:data.err})
                
                else
                 this.setState({
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    open : true
                 })
            })
    }

    signup = user => {

       return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
            method: 'Post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                return response.json()
            })
            .catch(err => {
               console.log(err)
            })
    }

    handleChange = name => event => {
        this.setState({error:""});
        this.setState({ [name]: event.target.value })
    }
    render() {
        const { name, email, password,error,open } = this.state
        return (
            <div className="container">
                <h2 className='mt-5 mb-5'>Signup</h2>

                <div className='alert alert-danger' style={{display : error ? "" : "none"}}>
                    {error}
                </div>

                <div className='alert alert-info' style={{display : open ? "" : "none"}}>
                    New account is created Successfully, Please <Link to ="/signin">SiginIn</Link>
                </div>
               
               
                <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input onChange={this.handleChange('name')} type='text' className="form-control" value={name} />

                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange('email')} type='email' className="form-control" value={email} />

                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange('password')} type='password' className="form-control" value={password} />
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>

                </form>

            </div>
        )
    }
}

export default Signup;