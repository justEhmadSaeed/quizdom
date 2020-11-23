import React from "react";
import "./UserDashBoard.css";
import Appbar from "./reuseable-components/Appbar";
import CreatedQuizCard from "./reuseable-components/CreatedQuizCard";

const UserDashboard = ({ user }) => {
  return (
    <div>
      <Appbar user={user} />
      <div className="dash-body">
        <div className="heading">
          <div>Created </div>
          <div className="line"></div>
        </div>
        <div className="card-holder">
          <CreatedQuizCard
            title="Quiz 1"
            responses="23"
            questions="50"
            isOpen="open"
          />
          <CreatedQuizCard
            title="Quiz Title"
            responses="23"
            questions="50"
            isOpen="open"
          />
          <CreatedQuizCard
            title="Quiz Title"
            responses="23"
            questions="50"
            isOpen="open"
          />
          <CreatedQuizCard
            title="Quiz Title"
            responses="23"
            questions="50"
            isOpen="open"
          />
          <CreatedQuizCard
            title="Quiz Title"
            responses="23"
            questions="50"
            isOpen="open"
          />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
