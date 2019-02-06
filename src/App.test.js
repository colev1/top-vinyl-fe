import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import AlbumContainer from './AlbumContainer.js'

describe('App', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<App />)
    
    expect(wrapper).toMatchSnapshot()
  })

  it('should render an album container', () => {
    const wrapper = shallow(<App />)

    expect(wrapper.find(AlbumContainer).length).toEqual(1)
  })

  it('should change the state if the header is clicked', () => {
    const wrapper = shallow(<App />)
    const spy = jest.spyOn(wrapper.instance(), 'routeHome')
    wrapper.instance().forceUpdate()

    wrapper.find('.title').simulate('click')

    expect(spy).toHaveBeenCalled()
    expect(wrapper.state().displayTracks).toBe(false)
  })
})