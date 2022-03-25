import React from 'react';

const AlbumTitle = (props) => {
    return (
        <div className="Item-title">
              <h2>{props.name}</h2>
              <h4><span>{props.type}, </span>{props.artist}</h4>
        </div>
    );
};

export default AlbumTitle;
