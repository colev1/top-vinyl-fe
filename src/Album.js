import React, {Component} from 'react';

class Album extends Component {
  constructor(props) {
    super(props)
    this.state = {
      album: {},
      tracks: [],
      name: '',
      duration: ''
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

  addNewTrack = (e, albumId) => {
    e.preventDefault()
    let trackRequest = {
      name: this.state.name,
      duration: this.state.duration
    }
    fetch(`http://localhost:3000/api/v1/albums/${albumId}/tracks`, {
      method: 'POST',
      body: JSON.stringify(trackRequest),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(result => this.fetchTracks())
    .catch(error => console.log(error))
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
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
        <form onSubmit={(e) => this.addNewTrack(e, id)}> add a track:
          <input placeholder='name' onChange={this.handleChange}
          name='name' 
          value={this.state.name} />
          <input placeholder='duration' 
          name='duration'
          onChange={this.handleChange} value={this.state.duration} />
          <button type='submit'> submit </button>
        </form>
      </div>
    )
  }
}

export default Album;