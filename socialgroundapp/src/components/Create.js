import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import { Mention, MentionsInput } from 'react-mentions';
import { addCommentToPost, createComment, getUsers } from '../api/mock_api';
import face from '../icons/face.png';

function CreateComment(postId) {
  // const [body, setBody] = useState('');
  const [name] = useState('xinyuesh');
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [users, setUsers] = useState([]);
  const postIdStr = JSON.stringify(postId);
  const postid = postIdStr.substring(postIdStr.indexOf(':') + 1, postIdStr.length - 1);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  // change fetch (below) to axios: shouldn't have API request in
  // small component (call API in top component instead)
  // 1. change to axios
  // 1. put this logic inside the activity feed page
  // 2. pass down the function in activity feed page from post to create
  // 3. comment rather than writing the API request inside the comment

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.length !== '') {
      const commentData = await createComment(name, value);
      const resp = await addCommentToPost(postid, commentData.id);
      if (resp) {
        setValue('');
        document.getElementById('inpt').value = '';
        navigate('/Feed');
      }
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
