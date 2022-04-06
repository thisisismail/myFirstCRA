import React from 'react';
import {useState, useEffect} from 'react';
import './styles/styleButton.css';
import './styles/styleaddPlaylistButton.css';

const AddPlaylistButton = ({uri, setSelectsong, selectsong}) => {
  const btnOn = {backgroundColor: "rgb(100, 120, 237)", color: "rgb(255, 255, 255)"};
  const btnOff = {backgroundColor: "rgb(229, 233, 240)"};

  const [btnstatus, setBtnstatus] = useState(false);
  const [btnmessage, setBtnmessage] = useState("select");
  const [btncolor, setBtncolor] = useState(btnOff);

  useEffect(() => {
    btnstatus ? setBtnmessage('selected') : setBtnmessage('select');
    btnstatus ? setBtncolor(btnOn) : setBtncolor(btnOff);
    btnstatus ? setSelectsong(selectsong.concat(uri)) : setSelectsong(selectsong);
  }, [btnstatus])

  const clickHandler = () => {
    setBtnstatus(!btnstatus);
    console.log(uri);
  }

  return(
    <div className='Item-button addPlaylist'>
          <button style={btncolor} onClick={() => {clickHandler()}}>{btnmessage}</button>
    </div>
  );
}

export default AddPlaylistButton;

