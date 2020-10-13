import React, { Component } from 'react'
import { list } from './userapi';
import defualtImage from '../images/avatar.png'
import { Link } from 'react-router-dom';
class Users extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
    }
    componentDidMount() {
        list()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {

                    this.setState({ users: data })
                }
            })
    }
    render() {
        
      
        return (
            <div className="container">
                <h2 className='mt-5 mb-5'>Users</h2>

                <div className='row'>

                    {this.state.users.map((user, i) => (
                        <div className="card col-md-4 " key={i}>
                         
                            <img className="img-thumbnail" onError={(i)=>{i.target.src = defualtImage}} style={{ objectFit: "auto", height: '200px', width: 'auto' }} src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} alt={`${user.name}`}></img>
                            <div className="card-body">
                                <h5 className="card-title">{user.name}</h5>
                                <p className="card-text">{user.email}</p>
                                <Link to={`/user/${user._id}`} className="btn btn-raised btn-sm btn-primary">View Profile</Link>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        )
    }
}

export default Users
