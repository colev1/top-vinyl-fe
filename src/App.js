import React, { Component } from 'react';
import AlbumContainer from './AlbumContainer'
import './App.css';
import vinyl from './vinyl.png'

class App extends Component {
  constructor () {
    super()
    this.state = {
      albums: [],
      error: '',
      album: '',
      genre: '',
      rating: '',
      artist: '',
      year: '',
      displayTracks: false
    }
  }

  componentDidMount = () => {
    this.fetchAlbums()
  }

  fetchAlbums = () => {
    fetch('http://localhost:3000/api/v1/albums')
      .then(response => response.json())
      .then(result => this.addAlbums(result))
      .catch(error => console.log(error))
  }

  addAlbums = (albums) => {
    this.setState({
      albums
    })
  }

  deleteAlbum = (id) => {
    fetch(`http://localhost:3000/api/v1/albums/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(result => this.fetchAlbums())
    .catch(error => console.log(error))
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {artist, genre, year, album} = this.state;
    const rating = parseInt(this.state.rating)
    const requestBody = {artist, genre, year, rating, album};
    fetch('http://localhost:3000/api/v1/albums', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(result => this.displayNewAlbums())
    .catch(error => console.log(error))
  }

  displayNewAlbums = () => {
    this.fetchAlbums()
    this.setState({
      album: '',
      genre: '',
      rating: '',
      artist: '',
      year: ''
    })
  }

  toggleDisplay = () => {
    this.setState({
      displayTracks: !this.state.displayTracks
    })
  }

  routeHome = () => {
    this.setState({
      displayTracks: false
    })
  }


  render() {
    let {album, artist, year, genre, rating} = this.state;
    return (
      <div className="App">
        <h1 className='title' onClick={this.routeHome}> <img src={vinyl} alt='Vinyl'/> TOP VINYL </h1>
        <form onSubmit={(e) => this.handleSubmit(e)}> 
          add a new album:
          <input placeholder='album name' 
          name="album"
          value={album}
          onChange={this.handleChange} />
          <input placeholder='artist'
          name="artist"
          value={artist}
          onChange={this.handleChange} />
          <input placeholder='genre'
          name="genre"
          value={genre}
          onChange={this.handleChange} />
          <input placeholder='year'
          name="year"
          value={year}
          onChange={this.handleChange} />
          <input placeholder='rating'
          name="rating"
          value={rating}
          onChange={this.handleChange} />
          <button type="submit"
          > 
          add new album </button>
        </form>
        <AlbumContainer albums={this.state.albums} 
        deleteAlbum={this.deleteAlbum}
        toggleDisplay={this.toggleDisplay}
        displayTracks={this.state.displayTracks} 
        />
      </div>
    );
  }
}

export default App;
