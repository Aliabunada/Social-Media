import React, { Component } from 'react'
import { findPeople, follow } from './userapi';
import { Link } from 'react-router-dom';
import {isAuth} from '../cores/menu'
import defualtImage from '../images/avatar.png'
class FindUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            error : '',
            open: false

        }
    }
    componentDidMount() {
      
        findPeople(isAuth().user._id,isAuth().token)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {

                    this.setState({ users: data })
                }
            })
    }

    clickFollow = (user,i)=>{
        follow(isAuth().user._id,isAuth().token,user._id)
        .then(data => {
            if (data.error) {
                this.setState({ error: data.error });
            }
            else {
                let a =  this.state.users;
                a.splice(i,1)
                this.setState({ users: a, open:true, followingMessage:`following ${user.name}` })
            }
        })
    }

    render() {      
        const {open, followingMessage} = this.state;
        return (
            <div className="container">
                <h2 className='mt-5 mb-5'>Find People</h2>
       {open && (<div className="alert alert-success">{open&&<p>{followingMessage}</p>}</div>)}
                <div className='row'> 

                    {this.state.users.map((user, i) => (
                        <div className="card col-md-4 " key={i}>
                         
                            <img className="img-thumbnail" onError={(i)=>{i.target.src = defualtImage}} style={{ objectFit: "auto", height: '200px', width: 'auto' }} src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} alt={`${user.name}`}></img>
                            <div className="card-body">
                                <h5 className="card-title">{user.name}</h5>
                                <p className="card-text">{user.email}</p>
                                <Link to={`/user/${user._id}`} className="btn btn-raised btn-sm btn-primary">View Profile</Link>
                                <button className="btn btn-raised btn-info float-right btn-sm" onClick={()=>{this.clickFollow(user,i)}}> Follow</button>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        )
    }
}


export default FindUser
