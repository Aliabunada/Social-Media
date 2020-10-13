import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './cores/Home'

import Menu from './cores/menu'
import Signup from './auth/Signup'
import Signin from './auth/Signin'
import PrivateRoute from './auth/privateRouter'
import Profile from './user/profile'
import Users from './user/users'
import UpdateProfile from './user/updateProfile'
import FindUser from './user/findUser'
import CreatePost from './post/createPost'
import SinglePost from './post/SinglePost'
import EditPost from './post/EditPost'
var MainRouter = ({ match }) => (

    <div >
        <Menu />
        <Switch>
            <Route exact path="/" >      <Home /> </Route>
            <Route exact path="/post/:postId" component={SinglePost} render={(props) => <SinglePost {...props} />} />
            <Route exact path="/signup" ><Signup /> </Route>
            <Route exact path="/signin" ><Signin /> </Route>
            <PrivateRoute exact path="/user/:id" component={Profile} render={(props) => <Profile {...props} />} />
            <Route exact path="/users" >   <Users /> </Route>
            <PrivateRoute exact path="/user/edit/:id" component={UpdateProfile} render={(props) => <UpdateProfile {...props} />} />
            <PrivateRoute exact path="/findpeople" component={FindUser} render={(props) => <FindUser {...props} />} />
            <PrivateRoute exact path="/new/post" component={CreatePost} render={(props) => <CreatePost {...props} />} />
            <PrivateRoute exact path="/edit/post/:postId" component={EditPost} render={(props) => <EditPost {...props} />} />

        </Switch>
    </div>
)

export default MainRouter