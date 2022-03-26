import React from 'react';
import PlayButton from '../Button/PlayButton';
import Tracks from '../Tracks';
import AlbumImage from './AlbumImage';
import AlbumTitle from './AlbumTitle';
import './styles/albumStyle.css';

const Album = (props) => { /* don't forget to put the props parameter in order to use props */
    return (
        <div className="Album-item">
          <AlbumImage
            image={props.image}
          />
          <PlayButton/>
          <AlbumTitle 
            name={props.name} 
            type={props.type}
            artist={props.artist}
          />
          <Tracks
            name={props.name} /**[variable from previous state]={props.[variable of the next state, can be a different name from this state]} */
          />
          <div></div>
        </div>
    );
};

export default Album;