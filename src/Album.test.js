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
})