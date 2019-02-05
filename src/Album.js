import React, {Component} from 'react';

class Album extends Component {
  constructor(props) {
    super(props)
    this.state = {
      album: {},
      tracks: []
    }
  }

  componentDidMount() {
    if(this.props.albumId) {
      console.log(this.props.albumId)
      this.fetchTracks()
      this.fetchAlbum()
    }
  }

  fetchTracks = () => {
    const { albumId } = this.props; 
    fetch(`http://localhost:3000/api/v1/albums/${albumId}/tracks`)
      .then(response => response.json())
      .then(tracks => this.displayTracks(tracks))
      .catch(error => console.log(error))
  }

  fetchAlbum = () => {
    const { albumId } = this.props; 
    fetch(`http://localhost:3000/api/v1/albums/${albumId}`)
      .then(response => response.json())
      .then(album => {this.setState({album})})
      .catch(error => console.log(error))
  }

  displayTracks = (tracks) => {
    this.setState({tracks})
  }

  deleteTrack = (id) => {
    fetch(`http://localhost:3000/api/v1/tracks/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(result => this.fetchTracks())
    .catch(error => console.log(error))
  }


  render() {
    const {album, genre, artist, id} = this.state.album;
    let tracks = this.state.tracks.map(track => <li key={track.id}> {track.name} <button onClick={()=> this.deleteTrack(track.id)}> delete</button></li>)
    return (
      <div>
        <h1> {album} </h1>
        <p> genre: {genre} </p>
        <p> artist: {artist} </p>
        <h2> TRACKS </h2>
        <ul> {tracks} </ul>
      </div>
    )
  }
}

export default Album;