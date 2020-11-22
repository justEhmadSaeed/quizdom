import React from 'react';
import Appbar from './reuseable-components/Appbar';

const CreateQuiz = ({user}) => {
    return (
        <div>
            <Appbar user = {user}/>
        </div>
    );
};

export default CreateQuiz;