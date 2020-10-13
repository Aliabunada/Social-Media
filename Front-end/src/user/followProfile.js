import React, { Component } from 'react'
import { follow, unFollow } from './userapi'
class FollowProfile extends Component {

    followClick = () => {
        this.props.onBtnClick(follow)
    }


    unFollowClick = () => {
        this.props.onBtnClick(unFollow)
    }
    render() {
        return (
            <div className="d-inline-block mt-5">
                {this.props.following ?
                    (<button className="btn btn-success btn-raised mr-5" onClick={this.followClick} > Follow</button>) :
                    (<button className="btn btn-warning btn-raised " onClick={this.unFollowClick} > UnFollow</button>)}


            </div>
        )
    }
}

export default FollowProfile
