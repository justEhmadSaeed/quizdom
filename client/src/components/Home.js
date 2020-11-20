import React from 'react'
import './Home.css'

const Home = ()=> {
    return (
        <div id = "Home">
            <span id = "logo">
                <b>Quiz</b>dom
            </span>
            <span id = "login-card">
                <label>Q</label>
                <button>Sign-in with Google</button>
                <button>Sign-in with Facebook</button>
                <button>Sign-in with Email</button>
            </span>
        </div>
    )
}

export default Home;