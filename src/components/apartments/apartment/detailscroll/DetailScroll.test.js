import React from 'react'
import DetailScroll from './DetailScroll';
import { shallow } from 'enzyme';
import { apartments, roommateGroups } from '../../../../../tools/mockData'

const setup = () => {
  roommateGroups[0].fields.genderPreference = "male"
  return shallow(
    <DetailScroll
      apartment={apartments[0]}
      roommateGroup={roommateGroups[0]}
      jump={false}
      setScrollVisible={jest.fn()}
      scrollVisible={false}
      setCardMode={"photo"}
    />
  )
}

describe("DetailScroll tests", () => {
  test("the correct letter is added next to the gender symbol", () => {
    const wrapper = setup()
    expect(wrapper.find(".genderLetter").text()).toEqual("M")
  })
})
