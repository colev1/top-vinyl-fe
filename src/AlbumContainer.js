import React, {Component} from 'react';
import Album from './Album'
import './AlbumContainer.css';

class AlbumContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayTracks: false,
      albumId: null
    }
  }

  displayAlbumInfo = (id) => {
    console.log(id)
    this.setState({
      displayTracks: true,
      albumId: id
    })
  }
  
  render () {
  let albumsDisplay = this.props.albums.map(album => {
    return <div key={album.id} 
    className='album' 
    onClick={() => this.displayAlbumInfo(album.id)}>
      <h1> {album.album} </h1>
      <h3> {album.artist} </h3>
      <p> {album.genre} </p>
    </div>
    }
  )

  if(this.state.displayTracks) {
   return (
      <Album albumId={this.state.albumId}/>
   ) 
  } else {
    return (
      <div className='albums-container'>
        {albumsDisplay}
      </div>
    )
    }
  }
}

export default AlbumContainer;