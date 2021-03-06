// UTILITIES
const ql = (selector) => document.querySelector(selector)
const qla = (selector) => document.querySelectorAll(selector)
const l = (s) => console.log(s)
// UTILITIES END

// PAGINATION
const API_KEY = "n3gAEgr8rYbG16Dkj0pCwG8eHAa4A1eM"
const SIZE = 24
const eventSearch = ql("#event-serch")
const chooseCountry = ql("#choose-country")
const dropDown = ql(".drop-down")
const pagesChildren = [...qla(".page")]
const dotsEnd = ql(".page-dots")
const dotsStart = ql(".page-dots--start")
const pages = ql(".pages")
const navButton = ql(".nav-button")


const DEFAULT_API_RESPONSE = [
  {
    authorId: "",
    images: [
      {
        ratio: "",
        url: "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png",
        width: "",
        height: "",
        fallback: "",
      },
      {
        ratio: "",
        url: "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png",
        width: "",
        height: "",
        fallback: "",
      },
      {
        ratio: "",
        url: "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png",
        width: "",
        height: "",
        fallback: "",
      },
      {
        ratio: "",
        url: "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png",
        width: "",
        height: "",
        fallback: "",
      },
    ],
    id: "a",
    eventName: "No event name",
    date: "No event date ",
    time: "No Event time",
    timezone: "No Event timezone",
    place: "No event place",

    info: "No Event info",
    ticketUrl: "No Event url",
    price: [
      { type: "Go to the website to check", currency: "", min: "", max: "" },
    ],
  },
]
// PAGINATION END

// GALLERY
const eventsContainer = ql(".events > .container")
// GALLERY END

// MODAL
const wrapper = ql(".wrapper")
const modal = ql(".modal")
// MODAL END

// FORM COUNTRY/SERCH

const country = {
  default: "",
  US: "America",
  AD: "Andorra",
  AI: "Anguilla",
  AR: "Argentina",
  AU: "Australia",
  AT: "Austria", // page 1 problem
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BH: "Bahrain",
  BB: "Barbados",
  BE: "Belgium",
  BM: "Bermuda",
  BR: "Brazil",
  BG: "Bulgaria",
  CA: "Canada",
  CL: "Chile",
  CN: "China",
  CO: "Colombia",
  CR: "Costa Rica",
  HR: "Croatia",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EE: "Estonia",
  FO: "Faroe Islands",
  FI: "Finland",
  FR: "France",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GB: "Great Britain",
  GR: "Greece",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  IE: "Ireland",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  KR: "Korea, Republic of",
  LV: "Latvia",
  LB: "Lebanon",
  LT: "Lithuania",
  LU: "Luxembourg",
  MY: "Malaysia",
  MT: "Malta",
  MX: "Mexico",
  MC: "Monaco",
  ME: "Montenegro",
  MA: "Morocco",
  NL: "Netherlands",
  AN: "Netherlands Antilles",
  NZ: "New Zealand",
  ND: "Northern Ireland",
  NO: "Norway",
  PE: "Peru",
  PL: "Poland",
  PT: "Portugal",
  RO: "Romania",
  RU: "Russian Federation",
  LC: "Saint Lucia",
  SA: "Saudi Arabia",
  RS: "Serbia",
  SG: "Singapore",
  SK: "Slovakia",
  SI: "Slovenia",
  ZA: "South Africa",
  ES: "Spain",
  SE: "Sweden",
  CH: "Switzerland",
  TW: "Taiwan",
  TH: "Thailand",
  TT: "Trinidad and Tobago",
  TR: "Turkey",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  UY: "Uruguay",
  VE: "Venezuela",
}

// FORM COUNTRY/SERCH END

export {
  API_KEY,
  SIZE,
  l,
  eventsContainer,
  eventSearch,
  pages,
  pagesChildren,
  dotsEnd,
  dotsStart,
  wrapper,
  modal,
  qla,
  ql,
  DEFAULT_API_RESPONSE,
  country,
  chooseCountry,
  dropDown,
  navButton,
}
