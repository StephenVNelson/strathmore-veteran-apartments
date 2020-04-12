const companies = [
  {
    id: "recgSs3DfAgSFwOg2",
    fields: {
      Buildings: [
        "rec5edxXSSe7oc2Hq",
        "reck7V8hEG3AIj4tH"
      ],
      "Holding Deposit": 1500,
      Name: "Greystone Management Group",
      "App Fee": 40
    },
    createdTime: "2020-04-06T23:59:34.000Z"
  }
]

const buildings = [
  {
    "id": "rec5edxXSSe7oc2Hq",
    "fields": {
      "State": "CA",
      "Address": "11090 Strathmore Dr.",
      "Name": "Strathmore Arms",
      "Zip Code": 90024,
      "City": "Los Angeles",
      "Cross Street 1": "Strathmore Dr.",
      "Close To": [
        "UCLA",
        "Westwood Village",
        "I-405"
      ],
      "Companies": [
        "recgSs3DfAgSFwOg2"
      ],
      "Cross Street 2": "Veteran Ave."
    },
    "createdTime": "2020-04-07T00:03:02.000Z"
  },
  {
    "id": "reck7V8hEG3AIj4tH",
    "fields": {
      "State": "CA",
      "Address": "714 Veteran Ave.",
      "Name": "714 Veteran",
      "Zip Code": 90024,
      "City": "Los Angeles",
      "Cross Street 1": "Strathmore Dr.",
      "Close To": [
        "UCLA",
        "Westwood Village",
        "I-405"
      ],
      "Companies": [
        "recgSs3DfAgSFwOg2"
      ],
      "Cross Street 2": "Veteran Ave."
    },
    "createdTime": "2020-04-07T00:03:02.000Z"
  }
]

const apartments = [
  {
    "id": "rec4rboScqsuCxgZ9",
    "fields": {
      "SqFt": 450,
      "Available": "2020-04-10",
      "Rent": 2195,
      "Lease End": "2020-09-18",
      "Roommate Group": [
        "recGB8gr38rg2sbU7"
      ],
      "Unit": "23",
      "Bedrooms": 1,
      "Lease In Months": 5
    },
    "createdTime": "2020-04-10T21:47:37.000Z"
  },
  {
    "id": "recIHIY2m4zd17qR4",
    "fields": {
      "SqFt": 450,
      "Available": "2020-06-30",
      "Rent": 2350,
      "Unit": "12",
      "Bedrooms": 1,
      "Lease In Months": 12
    },
    "createdTime": "2020-04-07T00:03:12.000Z"
  },
  {
    "id": "recPGm3DFcMPwyWeA",
    "fields": {
      "SqFt": 450,
      "Available": "2020-04-10",
      "Rent": 2125,
      "Lease End": "2020-09-11",
      "Roommate Group": [
        "recEJSAP4tmM5umrp"
      ],
      "Unit": "1",
      "Bedrooms": 1,
      "Lease In Months": 5
    },
    "createdTime": "2020-04-10T21:15:22.000Z"
  },
  {
    "id": "recPuKE1KkPqc8yKl",
    "fields": {
      "SqFt": 450,
      "Available": "2020-07-07",
      "Rent": 2240,
      "Lease End": "2020-06-30",
      "Roommate Group": [
        "recpNIGxcyQZEjaYp"
      ],
      "Unit": "25",
      "Bedrooms": 1,
      "Lease In Months": 2
    },
    "createdTime": "2020-04-07T00:03:12.000Z"
  },
  {
    "id": "recTpSWMbLK6wKtFn",
    "fields": {
      "SqFt": 450,
      "Available": "2020-04-10",
      "Rent": 2215.5,
      "Lease End": "2020-09-21",
      "Roommate Group": [
        "recsy28mj820VXh9b"
      ],
      "Unit": "6",
      "Bedrooms": 1,
      "Lease In Months": 5
    },
    "createdTime": "2020-04-10T21:24:04.000Z"
  },
  {
    "id": "recWnFQ2wVJbUDARL",
    "fields": {
      "SqFt": 450,
      "Available": "2020-04-10",
      "Rent": 2000,
      "Lease End": "2020-08-17",
      "Unit": "17",
      "Bedrooms": 1,
      "Lease In Months": 4
    },
    "createdTime": "2020-04-11T20:23:51.000Z"
  },
  {
    "id": "recYF2PCUNYNfvzMp",
    "fields": {
      "SqFt": 450,
      "Available": "2020-07-30",
      "Rent": 2350,
      "Unit": "24",
      "Bedrooms": 1,
      "Lease In Months": 12
    },
    "createdTime": "2020-04-07T00:03:12.000Z"
  },
  {
    "id": "recYK50SikFYsth62",
    "fields": {
      "SqFt": 450,
      "Available": "2020-04-10",
      "Rent": 2215.5,
      "Lease End": "2020-09-19",
      "Unit": "2",
      "Bedrooms": 1,
      "Lease In Months": 5
    },
    "createdTime": "2020-04-10T21:53:58.000Z"
  },
  {
    "id": "receLHjzIAbcbeymy",
    "fields": {
      "SqFt": 450,
      "Available": "2020-04-10",
      "Rent": 2240,
      "Lease End": "2020-09-19",
      "Unit": "18",
      "Bedrooms": 1,
      "Lease In Months": 5
    },
    "createdTime": "2020-04-11T20:25:29.000Z"
  }
]

const roommateGroups = [
  {
    "id": "recEJSAP4tmM5umrp",
    "fields": {
      "Apartments": [
        "recPGm3DFcMPwyWeA"
      ],
      "RM low": 3,
      "MI Start": "2020-04-10",
      "Prospects": [
        "rec5wnrgrmtn6dQuf",
        "recwpjsxRuVGz8Yes"
      ],
      "RM hi": 3,
      "MI End": "2020-05-10",
      "Name": "Irma Ramos, Selina Vargas"
    },
    "createdTime": "2020-04-10T21:17:05.000Z"
  },
  {
    "id": "recGB8gr38rg2sbU7",
    "fields": {
      "Apartments": [
        "rec4rboScqsuCxgZ9"
      ],
      "RM low": 3,
      "MI Start": "2020-04-10",
      "Prospects": [
        "recw3BGYLI39rNf6w",
        "recS6V7HSpdmbdNQm"
      ],
      "RM hi": 3,
      "MI End": "2020-05-10",
      "Name": "Tashi Rush, Julia Bartolome"
    },
    "createdTime": "2020-04-10T21:49:09.000Z"
  },
  {
    "id": "recpNIGxcyQZEjaYp",
    "fields": {
      "Apartments": [
        "recPuKE1KkPqc8yKl"
      ],
      "RM low": 3,
      "MI Start": "2020-04-10",
      "Prospects": [
        "recJQ01gZ6pes7Knc",
        "recx1ePHsgDRsf0ew"
      ],
      "RM hi": 3,
      "MI End": "2020-05-10",
      "Name": "Julia Robinson, Andrea Robinson"
    },
    "createdTime": "2020-04-10T21:52:28.000Z"
  },
  {
    "id": "recsy28mj820VXh9b",
    "fields": {
      "Apartments": [
        "recTpSWMbLK6wKtFn"
      ],
      "RM low": 3,
      "MI Start": "2020-04-10",
      "Prospects": [
        "recj1dSJCGo7xH07L",
        "recBdb2EU7BeEbFpe"
      ],
      "RM hi": 3,
      "MI End": "2020-05-10",
      "Name": "Aylin Carranza, Ariana Desouza"
    },
    "createdTime": "2020-04-10T21:35:17.000Z"
  }
]

const prospects = [
  {
    "id": "rec5wnrgrmtn6dQuf",
    "fields": {
      "Sex": "Female",
      "Roommate Groups": [
        "recEJSAP4tmM5umrp"
      ],
      "Name": "Irma Ramos"
    },
    "createdTime": "2020-04-10T21:17:50.000Z"
  },
  {
    "id": "recBdb2EU7BeEbFpe",
    "fields": {
      "Sex": "Female",
      "Roommate Groups": [
        "recsy28mj820VXh9b"
      ],
      "Name": "Ariana Desouza"
    },
    "createdTime": "2020-04-10T21:37:03.000Z"
  },
  {
    "id": "recJQ01gZ6pes7Knc",
    "fields": {
      "Sex": "Female",
      "Roommate Groups": [
        "recpNIGxcyQZEjaYp"
      ],
      "Name": "Julia Robinson"
    },
    "createdTime": "2020-04-10T21:51:06.000Z"
  },
  {
    "id": "recS6V7HSpdmbdNQm",
    "fields": {
      "Sex": "Female",
      "Roommate Groups": [
        "recGB8gr38rg2sbU7"
      ],
      "Name": "Julia Bartolome"
    },
    "createdTime": "2020-04-10T21:48:39.000Z"
  },
  {
    "id": "recj1dSJCGo7xH07L",
    "fields": {
      "Sex": "Female",
      "Roommate Groups": [
        "recsy28mj820VXh9b"
      ],
      "Name": "Aylin Carranza"
    },
    "createdTime": "2020-04-10T21:36:13.000Z"
  },
  {
    "id": "recw3BGYLI39rNf6w",
    "fields": {
      "Sex": "Female",
      "Roommate Groups": [
        "recGB8gr38rg2sbU7"
      ],
      "Name": "Tashi Rush"
    },
    "createdTime": "2020-04-10T21:48:25.000Z"
  },
  {
    "id": "recwpjsxRuVGz8Yes",
    "fields": {
      "Sex": "Female",
      "Roommate Groups": [
        "recEJSAP4tmM5umrp"
      ],
      "Name": "Selina Vargas"
    },
    "createdTime": "2020-04-10T21:18:12.000Z"
  },
  {
    "id": "recx1ePHsgDRsf0ew",
    "fields": {
      "Sex": "Female",
      "Roommate Groups": [
        "recpNIGxcyQZEjaYp"
      ],
      "Name": "Andrea Robinson"
    },
    "createdTime": "2020-04-10T21:51:19.000Z"
  }
]

module.exports = {
  companies,
  buildings,
  apartments,
  roommateGroups,
  prospects
}