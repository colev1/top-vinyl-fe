import React, {Component} from 'react';
import Album from './Album'
import './AlbumContainer.css';

class AlbumContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albumId: null
    }
  }

  displayAlbumInfo = (id) => {
    this.setState({
      albumId: id
    })
    this.props.toggleDisplay();
  }

  
  render () {
  let albumsDisplay = this.props.albums.map(album => {
    return <div key={album.id} 
    className='album' >
      <h1 onClick={() => this.displayAlbumInfo(album.id)}> {album.album}  
      </h1>
      <h3> {album.artist} </h3>
      <p> {album.genre} </p>
      <button onClick={()=>this.props.deleteAlbum(album.id)}> delete </button>
    </div>
    }
  )

  if(this.props.displayTracks) {
   return (
      <Album albumId={this.state.albumId} />
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