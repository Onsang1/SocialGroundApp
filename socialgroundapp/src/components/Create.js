import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
// import textField
import { Mention, MentionsInput } from 'react-mentions';
import { getUsers } from '../api/mock_api';
import face from '../icons/face.png';

function CreateComment(postId) {
  const [body, setBody] = useState('');
  const [name] = useState('xinyuesh');
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [users, setUsers] = useState([]);
  const handleChange = (e) => {
    setValue(e.target.value);
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
  const fetchUserList = async () => {
    let i;
    // let obj;
    const res = await getUsers();
    // console.log(typeof (res));
    const userArray = [];
    // res.forEach(item => console.log(item));
    // console.log(res);
    // console.log(res.data);
    // const usersArray = [];
    // res.data.users((item) => userArray.push({
    //   id: item.id,
    //   display: item.username,
    // }));
    for (i = 0; i < res.length; i += 1) {
      // obj = { id: res[i].id, display: res[i].username };
      userArray.push({ id: res[i].id, display: res[i].username });
    // console.log(res[0].username);
    // console.log(usersArray);
    // console.log(res.type);
    // setUsers(res[0]);
    }
    // console.log(JSON.stringify(userArray));
    console.log(typeof (userArray));
    setUsers(userArray);
    console.log(userArray);
  };
  useEffect(() => {
    fetchUserList()
      .catch(console.err);
  }, []);
  //  fake user data for testing; seems it needs display as parameter
  // const UserList = [
  //   {
  //     id: 'isssdds',
  //     username: 'dkj ee',
  //   },
  //   {
  //     id: 'dkfj',
  //     username: 'superwomna',
  //   },
  // ];
  // console.log(UserList.type);

  return (

    <form className="form-input">
      <div className="smily-face">
        <img src={face} className="happy-face-icon" alt="happy-face-icon" />
      </div>
      {/* <TextField
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
      /> */}
      <MentionsInput
        className="mentions"
        placeholder="Add a comment Here and Mention people using '@' "
        id="inpt"
        value={value}
        onChange={handleChange}
      >
        <Mention
          id="SuggestionList"
          // data={UserList}
          data={users}
          trigger="@"
          // style={{overflow-y: scroll;}}
        />
      </MentionsInput>
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
