import React from 'react';
import Appbar from '../components/Appbar';

const CreateQuiz = ({user}) => {
    return (
        <div className = "appheader">
            <Appbar user = {user}/>
        </div>
    );
};

export default CreateQuiz;