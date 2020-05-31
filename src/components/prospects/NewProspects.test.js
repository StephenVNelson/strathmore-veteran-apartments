import React from 'react'
import { NewProspects } from './NewProspects';
import { mount } from 'enzyme'
import { newRoommateGroup, newProspect, apartments } from '../../../tools/mockData'

function render(args) {
  const defaultProps = {
    session: {
      id: apartments[0].id,
      roommates: [],
      roommateGroup: newRoommateGroup,
      prospect: { ...newProspect, fields: { ...newProspect.fields, name: "Fred" } }
    },
    errors: {},
    updateSession: jest.fn()
  }
  const props = { ...defaultProps, ...args }
  return mount(<NewProspects {...props} />)
}
describe("Inputs reflect state", () => {
  it("changes the name", () => {
    const wrapper = render()
    const name = wrapper.find("input[name='name']")
    expect(name.props().value).toBe("Fred");
  })
})