import React from 'react';
import Appbar from './reuseable-components/Appbar';
import CreatedQuizCard from './reuseable-components/CreatedQuizCard';

const UserDashboard = ({user}) => {
    return (
        <div>
            <Appbar user = {user}/>
            <CreatedQuizCard title = "Quiz Title" responses = '23'  questions = '50' isOpen ='open'/>
        </div>
    );
};

export default UserDashboard;