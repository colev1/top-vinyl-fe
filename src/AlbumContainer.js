import React from 'react';
import './AlbumContainer.css';

export const AlbumContainer = ({albums}) => {
  
  const displayAlbumInfo = (id) => {
    
  }

  let albumsDisplay = albums.map(album => 
    <div key={album.id} className='album' onClick={displayAlbumInfo(album.id)}>
      <h1> {album.album} </h1>
      <h3> {album.artist} </h3>
      <p> {album.genre} </p>
    </div>
  )

  return (
    <div className='albums-container'>
      {albumsDisplay}
    </div>
  )
}
