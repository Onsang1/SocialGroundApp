import React, {useState } from 'react'
import userProfile from "../icons/userProfile.png"
import {createFollow, deleteFollow} from "../api/mock_api"



function Follow(props) {

  const [FollowStatus, setFollowStatus] = useState(false)
  const [FollowId, setFollowId] = useState('');

  //TO DO: fetch actual follow entry ID from db
  const handleOnClick = async(e) => {
    // update the state to trigger rerendering
    // TO DO:  link item.id 
    if (FollowStatus == false) {
      await createFollow(props.follower,props.following);
      // setFollowId(props.following);
    }
    //TO DO: Fix deleteFollow
    // if (FollowStatus == true) {
    //   await deleteFollow(FollowId);
    // }
    setFollowStatus(!FollowStatus)

  };
  
  return (
    <button className='submit-button' type='submit' onClick={handleOnClick} >
      <div className='button-label'> {FollowStatus? "Unfollow": "Follow"}</div>
    </button>
  )
}

function List(props) {

  const filteredData = props.users.filter((el) => {
  //if no input the return the original
    if (props.input === '') {
      return el;
    } else {//return the item which contains the user input
      return el.username.toLowerCase().includes(props.input)
    }
  })


  return ( 
      <ul>
        {filteredData.map((user) => (
          <li key={user.id}>
            <div className="user-info-area"> 
              <div className='left'>
                <img src={userProfile} className= "profile-icon"></img>
              </div>
              <div className='middle'>
                <p className='username'> {user.username}</p>
              </div>
              <div className='right'>
                <Follow 
                following = {user.username}
                follower = {props.current}
                follow = {props.follows}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    
  )
}

export default List