import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import AlbumContainer from './AlbumContainer.js'
import Album from './Album.js'

describe('AlbumContainer', () => {
  let mockDelete
  let mockToggle
  let wrapper
  let mockAlbums

  beforeEach(() => {
    mockDelete = jest.fn()
    mockToggle = jest.fn()
    mockAlbums = [{
      album: 'This Album',
      artist: 'This Artist',
      year: '1991',
      rating: '3.33',
      genre: 'Pop'
    }]
    wrapper = shallow(<AlbumContainer
      albums={ mockAlbums }
      deleteAlbum={ mockDelete }
      toggleDisplay={ mockToggle }
      displayTracks={ false }
      />)
  })

  it('should match the snapshot', () => {
    
    expect(wrapper).toMatchSnapshot()
  })

  it('should render albums if props.displayTracks is false', () => {

    expect(wrapper.find('.albums-container').length).toBe(1)
  })

  it('should render an Album component if the displayTracks is true', async () => {
    await wrapper.setProps({
      displayTracks: true
    })
    
    expect(wrapper.find(Album).length).toBe(1)
  })


  it('displayAlbumInfo should setState and should call toggleDisplay', () => {
    wrapper.instance().displayAlbumInfo(5)

    expect(wrapper.state().albumId).toEqual(5)
    expect(mockToggle).toHaveBeenCalled()
  })
})