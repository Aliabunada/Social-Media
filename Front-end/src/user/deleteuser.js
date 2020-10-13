import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { isAuth, signout } from '../cores/menu'
import { remove } from './userapi';

export class DeleteUser extends Component {

state={
    redirect:false
}

    deleteAccount = () => {
        let answer = window.confirm("Are You sure Delete Your Account?")
        if (answer) {
            const token = isAuth().token
            const userId = this.props.userId
            remove(userId, token)
                .then((response) => {
                    if(response.error){

                    } else{
                        signout(()=>{console.log('User is Deleted')})
                        this.setState({ redirect:true})
                    }

                })

        }

    }
    render() {
        if(this.state.redirect){
            return <Redirect to ="/"/>
        }
        return (

            <button className="btn btn-raised btn-danger" onClick={this.deleteAccount}>
                Delete Profile
            </button>

        )
    }
}

export default DeleteUser
