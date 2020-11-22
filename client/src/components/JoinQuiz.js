import React from 'react';
import './JoinQuiz.css';
import Appbar from "./reuseable-components/Appbar";
import {Link} from 'react-router-dom'

const JoinQuiz = ({user}) => {
    return (
        <div id="join-quiz">
            <Appbar user={user} />  
            <div id = "join-quiz-div">
            <div id="logo-name"><b style={{fontweight : 600}}>Quiz</b>dom</div>
            <input type="text" placeholder="Enter Quiz Code" />
            <button className = "join-button">Join Quiz</button>
            </div>
        </div>
    );
};

export default JoinQuiz;