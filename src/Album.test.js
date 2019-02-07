import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import Album from './Album.js'

describe('Album', () => {
  let mockId
  let mockToggle
  let wrapper

  beforeEach(() => {
    mockId = 1
    mockToggle = jest.fn()
    wrapper = shallow(<Album albumId={ mockId } tiggleDisplay={ mockToggle } />)
  })

  it('should match the snapshot', () => {
    
    expect(wrapper).toMatchSnapshot()
  })

  it('should render a vinyl container', () => {
    
    expect(wrapper.find('.vinyl-container').length).toEqual(1)
  })

  it('should call fetchTrack if there is an albumid in props', () => {
    const spyFetchTracks = jest.spyOn(wrapper.instance(), 'fetchTracks')
    const spyFetchAlbum = jest.spyOn(wrapper.instance(), 'fetchAlbum')

    wrapper.instance().componentDidMount()

    expect(spyFetchTracks).toHaveBeenCalled()
    expect(spyFetchAlbum).toHaveBeenCalled()
  })

  describe('fetchTracks', () => {
    it('should call fetch with the correct params', () => {
      const mockTracks = [{name: 'this track'}]
      const mockUrl = 'https://top-vinyl.herokuapp.com/api/v1/albums/1/tracks'
      window.fetch = jest.fn().mockImplementation(
        () => Promise.resolve({
          json: () => Promise.resolve(mockTracks),
          ok: true
        })
      )
      
      wrapper.instance().fetchTracks()

      expect(window.fetch).toHaveBeenCalledWith(mockUrl)
    })
  })

  describe('fetchAlbum', () => {
    it('should call fetch with the correct params', () => {
      const mockAlbum = [{name: 'this album'}]
      const mockUrl = 'https://top-vinyl.herokuapp.com/api/v1/albums/1'
      window.fetch = jest.fn().mockImplementation(
        () => Promise.resolve({
          json: () => Promise.resolve(mockAlbum),
          ok: true
        })
      )
      
      wrapper.instance().fetchAlbum()

      expect(window.fetch).toHaveBeenCalledWith(mockUrl)
    })
  })

  describe('displayTracks', () => {
    const mockTracks = [{name: 'this track'}]
    const mockId = 1
    const mockToggle = jest.fn()
    const wrapper = shallow(<Album albumId={ mockId } tiggleDisplay={ mockToggle } />)
    
    wrapper.instance().displayTracks(mockTracks)

    expect(wrapper.state().tracks).toEqual(mockTracks)
  })
})