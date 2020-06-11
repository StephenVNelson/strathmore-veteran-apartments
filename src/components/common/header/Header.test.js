import React from 'react'
import Header from './Header'
import { shallow } from 'enzyme'

const setup = () => {
  return shallow(<Header />)
}

describe("Header interactivity tests", () => {
  // test("does not have explanation on first render", () => {
  //   const wrapper = setup()
  //   expect(wrapper.exists('.explanation')).toBe(false)
  // })
  test("changes the state after info button is clicked", () => {
    const mockStateChange = jest.fn()
    React.useState = jest.fn(() => ["none", mockStateChange])
    const wrapper = setup()
    wrapper.find('.info__circle').simulate('click')
    expect(mockStateChange).toHaveBeenCalled()
  })
  // test("has an explanation if ancilary is set to info", () => {
  //   React.useState = jest.fn(() => ["info", jest.fn()])
  //   const wrapper = setup()
  //   expect(wrapper.exists('.explanation')).toBe(true)
  // })
})