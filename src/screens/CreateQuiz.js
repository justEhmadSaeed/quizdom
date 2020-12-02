import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CreateQuiz.css";
import Appbar from "../components/Appbar";
import AddQuestionCard from "../components/AddQuestionCard";

const CreateQuiz = ({ user }) => {
  const [NoOfQuestions, setNoOfQuestions] = useState(1);
  const [tempArray, setTempArray] = useState([1]);

  const handleAdd = () => {
    let arr = [...tempArray];
    let n = NoOfQuestions;
    n++;
    setNoOfQuestions(n);
    arr.push(n);
    setTempArray(arr);
    console.log(NoOfQuestions, tempArray);
  };
  return (
    <div id="main-body">
      <div className="appheader">
        <Appbar user={user} />
      </div>
      <div id="create-quiz-body">
        {tempArray.map((n) => (
          <AddQuestionCard key={n} qNo={n} />
        ))}
        <input id="add-btn" type="submit" onClick={handleAdd} value="+" />
      </div>
      <Link to={user.id + "/created-succesfully"}>
        <input id="create-btn" type="submit" />
      </Link>
    </div>
  );
};

export default CreateQuiz;
