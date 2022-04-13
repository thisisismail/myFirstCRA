/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useState, useEffect} from 'react';
import './styles/styleButton.css';
import './styles/styleaddPlaylistButton.css';

const AddPlaylistButton = ({uri, title, setSelectedsongURI, selectedsongURI, setSelectedsongTitle, selectedsongTitle}) => {
  const btnOn = {backgroundColor: "rgb(100, 120, 237)", color: "rgb(255, 255, 255)"};
  const btnOff = {backgroundColor: "rgb(229, 233, 240)"};

  const [btnstatus, setBtnstatus] = useState(false);
  const [btnmessage, setBtnmessage] = useState("select");
  const [btncolor, setBtncolor] = useState(btnOff);

  useEffect(() => {
    if(btnstatus){
      setBtnmessage('selected');
      setBtncolor(btnOn);
      setSelectedsongURI(selectedsongURI.concat(uri));
      setSelectedsongTitle(selectedsongTitle.concat(title));
    }else{
      setBtnmessage('select');
      setBtncolor(btnOff);
      setSelectedsongURI(selectedsongURI.slice(0, -1)); //need improvement for deleting item from the state
      setSelectedsongTitle(selectedsongTitle.slice(0, -1)); //need improvement for deleting item from the state
    }
  }, [btnstatus])

  const clickHandler = () => {
    setBtnstatus(!btnstatus);
    console.log(uri+' '+title);
  }

  return(
    <div className='Item-button addPlaylist'>
          <button style={btncolor} onClick={() => {clickHandler()}}>{btnmessage}</button>
    </div>
  );
}

export default AddPlaylistButton;

