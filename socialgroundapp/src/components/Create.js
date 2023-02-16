import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import SendIcon from '@mui/icons-material/Send';
import { TextField, Button } from '@mui/material';
import face from '../icons/face.png';

function CreateComment(postId) {
  const [body, setBody] = useState('');
  const [name] = useState('xinyuesh');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = () => {
    // e.preventDefault();
    if (body.length !== 0) {
      const comment = { body, name, postId };
      // clear the input box (just in case)
      fetch('http://localhost:8000/comments/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment),
      }).then(() => {
        // history.go(-1);
        setBody('');
        document.getElementById('inpt').value = '';
        navigate('/Feed');
      });
    }
  };

  return (

    <form className="form-input">
      <div className="smily-face">
        <img src={face} className="happy-face-icon" alt="happy-face-icon" />
      </div>
      <TextField
        sx={{ marginLeft: 1, marginRight: 2 }}
        required
        maxRows={4}
        variant="outlined"
        fullWidth
        onChange={handleChange}
        placeholder="Type"
        id="inpt"
        label="Add a comment"
        multiline
      />
      <Button
        sx={{ marginRight: 3 }}
        variant="contained"
        size="small"
        endIcon={<SendIcon />}
        type="submit"
        onClick={handleSubmit}
      >
        Send
      </Button>
    </form>
  );
}

export default CreateComment;
