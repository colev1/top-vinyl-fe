import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import AlbumContainer from './AlbumContainer.js'
const path = require('path');
const dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath})

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

  describe('fetchAlbums', () => {
    it('should call fetch with the correct params and fire addAlbums', async () => {
      const mockAlbums = {albums: [{name: 'This Albun'}, {name: 'That Album'}]}
      window.fetch = jest.fn().mockImplementation(
        () => Promise.resolve({
          json: () => Promise.resolve(mockAlbums),
          ok: true
        })
      )
      const mockUrl = 'https://top-vinyl.herokuapp.com/api/v1/albums'
      const wrapper = shallow(<App />)

      await wrapper.instance().fetchAlbums()

      expect(window.fetch).toHaveBeenCalledWith(mockUrl)
    })
  })

  describe('addAlbums', () => {
    it('should set state', () => {
      const wrapper = shallow(<App />)
      const mockAlbums = [{name: 'This Album'}, {name: 'That Album'}]

      wrapper.instance().addAlbums(mockAlbums)

      expect(wrapper.state().albums).toEqual(mockAlbums)
    })
  })

  describe('deleteAlbum', () => {
    it('should call fetch with the correct params', async () => {
      const mockDeletedId = {id: 1}
      const mockMethod = {
        method: 'DELETE'
      }
      const mockId = 1
      const wrapper = shallow(<App />)
      window.fetch = jest.fn().mockImplementation(
        () => Promise.resolve({
          json: () => Promise.resolve(mockDeletedId),
          ok: true
        })
        )
      const mockUrl = 'https://top-vinyl.herokuapp.com/api/v1/albums/1'
        
      wrapper.instance().deleteAlbum(mockId)

      expect(window.fetch).toHaveBeenCalledWith(mockUrl, mockMethod)
    })
  })

  describe('handleChange', () => {
    it('should set state of artist', () => {
      const wrapper = shallow(<App />)
      const event = {
        target: {
          name: 'artist',
          value: 'Beyonce'
        }
      }
      const expected = 'Beyonce'

      wrapper.instance().handleChange(event)

      expect(wrapper.state().artist).toEqual(expected)
    })

    it('should set state of year', () => {
      const wrapper = shallow(<App />)
      const event = {
        target: {
          name: 'year',
          value: '1999'
        }
      }
      const expected = '1999'

      wrapper.instance().handleChange(event)

      expect(wrapper.state().year).toEqual(expected)
    })

    it('should set state of album', () => {
      const wrapper = shallow(<App />)
      const event = {
        target: {
          name: 'album',
          value: 'New Album'
        }
      }
      const expected = 'New Album'

      wrapper.instance().handleChange(event)

      expect(wrapper.state().album).toEqual(expected)
    })

    it('should set state of genre', () => {
      const wrapper = shallow(<App />)
      const event = {
        target: {
          name: 'genre',
          value: 'Pop'
        }
      }
      const expected = 'Pop'

      wrapper.instance().handleChange(event)

      expect(wrapper.state().genre).toEqual(expected)
    })

    it('should set state of rating', () => {
      const wrapper = shallow(<App />)
      const event = {
        target: {
          name: 'rating',
          value: '3.33'
        }
      }
      const expected = '3.33'

      wrapper.instance().handleChange(event)

      expect(wrapper.state().rating).toEqual(expected)
    })
  })

  describe('handleSubmit', () => {
    it('should call fetch with the correct params', () => {
      const wrapper = shallow(<App />)
      const mockAlbum = {
        name: 'This Album'
      }
      const mockNewAlbum = {
        id: 27
      }
      const mockEvent = {
        preventDefault: () => {}
      }
      const mockOptions = {
        method: 'POST',
        body: JSON.stringify(mockAlbum),
        headers: {
          "Content-Type": "application/json"
        }
      }
      window.fetch = jest.fn().mockImplementation(
        () => Promise.resolve({
          json: () => Promise.resolve(mockNewAlbum),
          ok: true
        })
      )

      wrapper.instance().handleSubmit(mockEvent)
    })
  })

  describe('displayNewAlbums', () => {
    it('should call fetchAlbums and setState', () => {
      const wrapper = shallow(<App />)
      const spy = jest.spyOn(wrapper.instance(), 'fetchAlbums')
      wrapper.instance().forceUpdate()
      
      wrapper.setState({
        album: 'this'
      })
      wrapper.instance().displayNewAlbums()

      expect(wrapper.state().album).toEqual('')
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('toggleDisplay', () => {
    it('should set the state of displayTracks to the opposite', () => {
      const wrapper = shallow(<App />)

      wrapper.instance().toggleDisplay()

      expect(wrapper.state().displayTracks).toEqual(true)

      wrapper.instance().toggleDisplay()

      expect(wrapper.state().displayTracks).toEqual(false)
    })
  })

  describe('routeHome', () => {
    it('should change the state of displayTracks to false', () => {
      const wrapper = shallow(<App />)

      wrapper.setState({
        displayTracks: true
      })

      wrapper.instance().routeHome()

      expect(wrapper.state().displayTracks).toEqual(false)
    })
  })
})