import React, { Component } from 'react';
import {AlbumContainer} from './AlbumContainer'
import './App.css';

class App extends Component {
  constructor () {
    super()
    this.state = {
      albums: [],
      error: ''
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

  render() {
    return (
      <div className="App">
        <AlbumContainer albums={this.state.albums} />
      </div>
    );
  }
}

export default App;
