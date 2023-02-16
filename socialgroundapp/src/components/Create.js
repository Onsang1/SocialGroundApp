import React,{ useState } from "react";
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import face from "../icons/face.png"
import { TextField, Button } from '@material-ui/core';
import useStyles from '../style/PostStyles';


const CreateComment = (postId) => {
  const [body, setBody] = useState('');
  const [name, setName] = useState('xinyuesh');
  const navigate = useNavigate();
  const classes = useStyles();

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = {body, name, postId };
    fetch('http://localhost:8000/comments/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment)
    }).then(() => {
      // history.go(-1);
      navigate('/Feed');
    })
  }

  return (

    <form className="form-input">
    <div className="smily-face">
      <img src={face}  className = "happy-face-icon" alt= "happy-face-icon"/>
    </div>
    <TextField className={classes.input}
      required
      maxRows={4}
      variant="outlined"
      fullWidth
      onChange={handleChange}
      placeholder="Type"
      id="outlined-textarea"
      label="Add a comment"
      multiline
    />
    <Button className={classes.sendButton}
      variant="contained"
      size="small"
      endIcon={<SendIcon />}
      type="submit"
      onClick = {handleSubmit}
    >
    Send
    </Button>
  </form>
  );
}


export default CreateComment;