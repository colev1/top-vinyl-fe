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
    let tracks = this.state.tracks.map(track => {
      return (
        <li key={track.id} className='track'> 
          <h4 className='track-name'> {track.name} <span className='track-duration'> {track.duration} </span></h4>
          <button className='delete-track-btn' onClick={()=> this.deleteTrack(track.id)}> delete</button>
        </li>
      )
    })

    return (
      <div className='vinyl-container'>
        <section className='track-container'>
          <article className='album-info'>
            <h1 className='album-name'> {album} </h1>
            <p className='artist'> by: {artist} </p>
            <p className='album-genre'> genre: {genre} </p>
          </article>
          <article className='track-list'>
            <ul> {tracks} </ul>
          </article>
        </section>
        <form onSubmit={(e) => this.addNewTrack(e, id)}> add a track:
          <input placeholder='name' onChange={this.handleChange}
          name='name' 
          value={this.state.name} />
          <input placeholder='duration' 
          name='duration'
          onChange={this.handleChange} value={this.state.duration} />
          <button type='submit'> submit </button>
        </form>
        <button className='view-albums-button' onClick={() => this.props.toggleDisplay()}>View All Ablums</button>
      </div>
    )
  }
}

export default Album;