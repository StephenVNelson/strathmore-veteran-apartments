import React from 'react'
import { shallow } from 'enzyme'
import ApartmentsList from './ApartmentsList';
import Apartment from './apartment/Apartment'
import { mockData } from '../../../tools/mockData'
import { storeFactory, recordify } from '../../../tools/testUtils'

const setup = () => {
  const initialState = recordify(mockData)

  const store = storeFactory(initialState)
  return shallow(<ApartmentsList store={store} />).dive().dive()
}

describe("<ApartmentsList/>", () => {

  test("Should return true", () => {
    expect(true).toBe(true)
  })

  describe("apartment filters", () => {

    test("Should return all apartments", () => {
      const wrapper = setup()
      expect(wrapper.find(Apartment)).toHaveLength(10)
    })

    test.skip("lists an apartment if there is no roommate Group", () => {

    })

    test.skip("Does not list an apartment if the roommate group is full", () => {

    })

    test.skip("Lists an apartment that has a roommate group that is not full", () => {

    })

    test.skip("Lists an apartment if it has one filled roommate group and one partially filled roommate group", () => {

    })



  })


})

