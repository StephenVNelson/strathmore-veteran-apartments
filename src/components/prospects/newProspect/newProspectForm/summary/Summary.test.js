import React from 'react'
import { Summary } from './Summary';
import { mount } from 'enzyme'

function render(args) {
  const defaultProps = {
    history: {},
    apartment: {
      id: 123,
      fields: {
        sqft: 1125,
        available: "2020-04-10",
        Images: [],
        rent: 2500,
        leaseEnd: "2021-04-10",
        roommateGroup: [123],
        unit: "C",
        building: ["123"],
        bedrooms: 2,
        leaseInMonths: 12
      }
    },
    session: {
      id: 123,
      roommates: [
        { sex: "other" },
        { sex: "other" },
        { sex: "other" },
        { sex: "other" }
      ],
      roommateMax: 5,
      roommateGroup: {
        "id": null,
        "fields": {
          "apartment": [123],
          "prospects": [],
          "roommateTotal": 5,
          "genderPreference": "female"
        }
      },
      prospect: {
        "id": null,
        "fields": {
          "name": "",
          "phone": "",
          "email": "",
          "sex": "other",
          "roommateGroup": [123],
        }
      }
    }
  }
  const props = { ...defaultProps, ...args }
  return mount(<Summary {...props} />)
}
it("reflect correct data", () => {
  const wrapper = render()
  const values = wrapper.find(".summary-box--value")
  const rent = values.at(0).text()
  const rooms = values.at(1).text()
  const residents = values.at(2).find(".svg-inline--fa").length
  const resPerRoom = values.at(3).text()
  const utilities = values.at(4).text()
  const duration = values.at(5).text()
  const leaseStart = values.at(6).text()
  expect(rent).toBe("$500");
  expect(rooms).toBe("2");
  expect(residents).toBe(5);
  expect(resPerRoom).toBe("2.5");
  expect(utilities).toBe("$30");
  expect(duration).toBe("12 Mo.");
  expect(leaseStart).toBe(Date().split(" ").splice(1, 2).join(" "));
})