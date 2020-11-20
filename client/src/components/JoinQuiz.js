import React from 'react';
import './JoinQuiz.css';
import {Link} from 'react-router-dom'

const JoinQuiz = () => {
    return (
        <div id = "join-quiz">
            <label>Enter Quiz Code</label>
            <input type="text"/>
            <button>Join Quiz</button>
        </div>
    );
};

export default JoinQuiz;