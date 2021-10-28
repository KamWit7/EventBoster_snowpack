// UTILITIES
const ql = (selector) => document.querySelector(selector)
const qla = (selector) => document.querySelectorAll(selector)
const l = (s) => console.log(s)
// UTILITIES END

// PAGINATION
const SIZE = 24

const pagesChildren = [...qla(".page")]
const dots = ql(".page-dots")
// PAGINATION END

// GALLERY
const eventsContainer = ql(".events > .container")
// GALLERY END

// MODAL
const wrapper = ql(".wrapper")
const modal = ql(".modal")
// MODAL END

export {
  SIZE,
  l,
  eventsContainer,
  pagesChildren,
  dots,
  wrapper,
  modal,
}
