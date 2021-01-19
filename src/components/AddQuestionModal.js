import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button, Icon } from "@material-ui/core";
// import AddQuestionCard from "./AddQuestionCard"
import "./AddQuestionCard.css";
import { DeleteRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    width: "80%",
    borderRadius: "10px",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    margin: "5px",
  },
}));

export default function AddQuestionModal({
  titleRef = "",
  opType = "radio",
  opArray = [""],
  addQuestionHandle,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [optionType, setOptionType] = useState(opType);
  const optionsRef = useRef(null);

  const [optionsArray, setOptionsArray] = useState([]);
  const titleField = useRef(titleRef);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const addQuestionCallBack = () => {
    const tempArr = [...optionsArray];
    tempArr[optionsArray.length - 1] = optionsRef.current.value;
    addQuestionHandle(titleField.current.value, optionType, tempArr);
    setOpen(false);
  };

  const addOption = () => {
    const arr = [...optionsArray];
    arr.push(optionsRef.current.value);
    optionsRef.current.value = "";
    setOptionsArray(arr);
  };
  const handleTypeChange = (e) => setOptionType(e.target.value);
  const deleteHandler = (index) => {
    console.log("Index : ", index);
    const temp = [...optionsArray]; /* .filter((op, i) => index !== i)] */
    temp.splice(index, 1);
    setOptionsArray(temp);
  };

  useEffect(() => {
    if (!open) {
      setOptionsArray([]);
      setOptionType("radio");
    }
  }, [open]);

  console.log("OPtions Array : ", optionsArray);
  return (
    <div className={classes.root}>
      <Button color="secondary" variant="contained" onClick={handleOpen}>
        Add Question
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        disableEnforceFocus={true}
      >
        <div className={classes.paper}>
          <div className="questionCard">
            <div id="title">Question:</div>
            <input
              autoFocus
              ref={titleField}
              className="question"
              type="text"
              placeholder="Type Question Here"
            />
            <select
              id="select"
              placeholder="Select"
              onChange={handleTypeChange}
            >
              <option className="selectOp" value="radio">
                Single Choice
              </option>
              <option className="selectOp" value="check">
                Multiple choices
              </option>
            </select>

            <div className="option-div">
              <div className="options" id="one-op">
                {optionsArray.length > 0
                  ? optionsArray.map((option, ind) => (
                      <div className="option" key={ind}>
                        <input
                          disabled={true}
                          className="radio-in"
                          type={optionType === "radio" ? "radio" : "checkbox"}
                          name="option"
                        />
                        <div className="add-op">{option}</div>
                        <Icon
                          className="delete-icon"
                          onClick={() => {
                            deleteHandler(ind);
                          }}
                        >
                          <DeleteRounded />
                        </Icon>
                      </div>
                    ))
                  : null}
              </div>
            </div>

            <div className="add-op">
              <input
                className="radio-in"
                type={optionType === "radio" ? "radio" : "checkbox"}
                name="option"
              />
              <input
                ref={optionsRef}
                className="op-text"
                type="text"
                placeholder={`Option ${optionsArray.length + 1}`}
              />
              <input
                type="submit"
                className="add-btn"
                value="+ Add"
                onClick={addOption}
              />
            </div>
          </div>
          <div className={classes.buttons}>
            <Button
              className={classes.button}
              variant="contained"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              className={classes.button}
              color="secondary"
              variant="contained"
              onClick={addQuestionCallBack}
            >
              Add Question
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
