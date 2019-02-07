import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import AlbumContainer from './AlbumContainer.js'

describe('App', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it('should match the snapshot', () => {
    
    expect(wrapper).toMatchSnapshot()
  })

  it('should render an album container', () => {

    expect(wrapper.find(AlbumContainer).length).toEqual(1)
  })

  it('should call routeHome and change the state if the header is clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'routeHome')
    wrapper.instance().forceUpdate()

    wrapper.find('.title').simulate('click')

    expect(spy).toHaveBeenCalled()
    expect(wrapper.state().displayTracks).toBe(false)
  })

  it('should fire handleChange on change of the album input', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleChange')
    const event = {
      target: {
        name: 'album',
        value: 'New Album'
      }
    }
    const expected = 'New Album'
    wrapper.instance().forceUpdate()

    wrapper.find('.album-input').simulate('change', event)

    expect(spy).toHaveBeenCalled()
  })

  it('should fire handleChange on change of the artist input', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleChange')
    const event = {
      target: {
        name: 'artist',
        value: 'Beyonce'
      }
    }
    const expected = 'Beyonce'
    wrapper.instance().forceUpdate()

    wrapper.find('.artist-input').simulate('change', event)

    expect(spy).toHaveBeenCalled()
  })

  it('should fire handleChange on change of the genre input', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleChange')
    const event = {
      target: {
        name: 'genre',
        value: 'Pop'
      }
    }
    const expected = 'Pop'
    wrapper.instance().forceUpdate()

    wrapper.find('.genre-input').simulate('change', event)

    expect(spy).toHaveBeenCalled()
  })

  it('should fire handleChange on change of the year input', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleChange')
    const event = {
      target: {
        name: 'year',
        value: '2011'
      }
    }
    const expected = '2011'
    wrapper.instance().forceUpdate()

    wrapper.find('.year-input').simulate('change', event)

    expect(spy).toHaveBeenCalled()
  })

  it('should fire handleChange on change of the rating input', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleChange')
    const event = {
      target: {
        name: 'rating',
        value: 3.24
      }
    }
    const expected = 3.24
    wrapper.instance().forceUpdate()

    wrapper.find('.rating-input').simulate('change', event)

    expect(spy).toHaveBeenCalled()
  })

  it('should fire handleSubmit on submit of form', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit')
    const event = {
      preventDefault: jest.fn()
    }
    wrapper.instance().forceUpdate()

    wrapper.find('.album-form').simulate('submit', event)

    expect(spy).toHaveBeenCalled()
  })

  describe('componentDidMount', () => {
    it('should fire fetchAlbums', () => {
      const wrapper = shallow(<App />)
      const spy = jest.spyOn(wrapper.instance(), 'fetchAlbums')
      wrapper.instance().forceUpdate()

      wrapper.instance().componentDidMount()

      expect(spy).toHaveBeenCalled()
    })
  })
})