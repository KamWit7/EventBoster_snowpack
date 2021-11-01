// UTILITIES
const ql = (selector) => document.querySelector(selector)
const qla = (selector) => document.querySelectorAll(selector)
const l = (s) => console.log(s)
// UTILITIES END

// PAGINATION
const API_KEY = "n3gAEgr8rYbG16Dkj0pCwG8eHAa4A1eM"
const SIZE = 24

const eventSearch = ql("#event-serch")

const pagesChildren = [...qla(".page")]

const dotsEnd = ql(".page-dots")
const dotsStart = ql(".page-dots--start")
const pages = ql(".pages")

// processedApiDate CONST
const DEFAULT_PLACE = "No info :("
const DEFAULT_PRICE = [
  { type: "No ticket left", currency: "?", min: 0, max: 0 },
]
const DEFAULT_API_RESPONSE = [{
  images: [
    { ratio: "", url: "", width: "", height: "", fallback: "" },
    { ratio: "", url: "", width: "", height: "", fallback: "" },
    { ratio: "", url: "", width: "", height: "", fallback: "" },
    { ratio: "", url: "", width: "", height: "", fallback: "" },
    { ratio: "", url: "", width: "", height: "", fallback: "" },
    { ratio: "", url: "", width: "", height: "", fallback: "" },
  ],
  eventName: "no event name",
  date: "no event date ",
  time: "",
  timezone: "",
  place: "",

  info: "",
  ticketUrl: "",
  price: [{ type: "", currency: "?", min: 0, max: 0 }],
}]
// PAGINATION END

// GALLERY
const eventsContainer = ql(".events > .container")
// GALLERY END

// MODAL
const wrapper = ql(".wrapper")
const modal = ql(".modal")
// MODAL END

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
  DEFAULT_PLACE,
  DEFAULT_PRICE,
  DEFAULT_API_RESPONSE,
}
