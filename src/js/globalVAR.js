// UTILITIES
const ql = (selector) => document.querySelector(selector)
const qla = (selector) => document.querySelectorAll(selector)
const l = (s) => console.log(s)
// UTILITIES END

// PAGINATION
const API_KEY = "n3gAEgr8rYbG16Dkj0pCwG8eHAa4A1eM"
const SIZE = 24

const pagesChildren = [...qla(".page")]
const eventsChildren = [...qla(".event")]

const dotsEnd = ql(".page-dots")
const dotsStart = ql(".page-dots--start")
const pages = ql(".pages")
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
  eventsChildren,
  pages,
  pagesChildren,
  dotsEnd,
  dotsStart,
  wrapper,
  modal,
  qla,
  ql,
}
