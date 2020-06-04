import React from 'react'
import { RoommateConfirmation } from './RoommateConfirmation';
import { mount } from 'enzyme'
import { newSession, newProspect } from '../../../../../tools/mockData'

function makeProspects(number) {
  return [...new Array(number)].map((_, i) => ({ ...newProspect, fields: { ...newProspect.fields, name: `name${i}` } }))
}

function render(args) {
  const defaultProps = {
    prospects: makeProspects(3),
    prospect: { ...newProspect },
    bedrooms: 2,
    updateSession: jest.fn(),
    session: { ...newSession, roommates: [...new Array(5)].map(() => ({ sex: "male" })) }
  }
  const props = { ...defaultProps, ...args }
  return mount(<RoommateConfirmation {...props} />)
}
it("should have roommateSlots that equals the totalRoommates - prospects - 1", () => {
  const wrapper = render()
  const roommates = wrapper.find(".roommate-slot")
  expect(roommates.length).toEqual(5)
})
it("should have prospects slots", () => {
  const wrapper = render()
  const roommates = wrapper.find(".prospect")
  expect(roommates.length).toEqual(3)
  const firstName = roommates.first().find(".resident__title").text()
  console.log("FIRST NAME: ", firstName)
  expect(firstName).toBe("NAME0")
})