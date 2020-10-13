import React from 'react'
import Posts from '../post/posts'

var Home = () => (
    <div>

        <div className='jumbotron'>
            <h2>Home Page</h2>
            <p className="lead" >Wellcome to React Frontend</p>

        </div>
        <div className="container">
            <Posts />
        </div>

    </div>
)

export default Home