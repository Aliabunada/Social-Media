import React from 'react'
import { Redirect } from 'react-router-dom'

class Signin extends React.Component {
    constructor() {
        super()
        this.state = {

            email: '',
            password: '',
            error: '',
            redirectToRefer: false,
            loading: false
        }
    }

    auth = (data, next) => {
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
    }
    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true })
        const { email, password } = this.state;
        const user = {
            email,
            password
        }
        this.signin(user).then(data => {
          
            if (data.error) {
                this.setState({ error: data.error, loading: false })
            }
            else {
                ;
                this.auth(data, () => {
                    this.setState({ redirectToRefer: true })
                })

            }
        })
    }

    signin = user => {
      
        return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
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
            .catch(error => {
                console.log(error)
            })
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value })


    }
    render() {
        const { email, password, error, redirectToRefer, loading } = this.state
        if (redirectToRefer) {
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <h2 className='mt-5 mb-5'>Signin</h2>

                <div className='alert alert-danger' style={{ display: error ? "" : "none" }}>
                    {error}
                </div>

                {loading ? (<div className="jumbotron   text-center">
                    <h2>Loading...</h2>
                </div>) : ("")}
                <form>

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

export default Signin;