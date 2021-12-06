import { renderGallery } from "./gallery.js"
import { renderModal } from "./modal.js"
import {
  API_KEY,
  SIZE,
  l,
  pagesChildren,
  dotsEnd,
  dotsStart,
  pages,
  ql,
  qla,
  eventSearch,
  DEFAULT_API_RESPONSE,
} from "./globalVAR.js"
import { createCountrySerch, createKeywordSerch } from "./searchEvents.js"

let page = 0
let totalPages = 0
let keyword = ""
let countryCode = ""
let idVen = ""

const setPage = (pageNumber) => (page = pageNumber)
const setTotalPages = (allPages) => (totalPages = allPages - 1)
const setKeyword = (formValue) => (keyword = formValue)
const setCountryCode = (code) => (countryCode = code)
const setIdVen = (ven) => (idVen = ven)

async function apiCall() {
  return fetch(
    idVen === ""
      ? `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&keyword=${keyword}&apikey=${API_KEY}&size=${SIZE}&page=${page}`
      : `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&keyword=${keyword}&apikey=${API_KEY}&size=${SIZE}&page=${page}&venueId=${idVen}`
  )
    .then((pages) => {
      return pages.json()
    })
    .catch((error) => {
      console.log(`apiCall error: ${error}`)
    })
}

function processedApiDate(apiCall) {
  return apiCall()
    .then((apiResults) => {
      if (!("_embedded" in apiResults)) {
        l("no _embedded in apiResults")
        setTotalPages(1)
        return DEFAULT_API_RESPONSE
      }

      setTotalPages(apiResults.page.totalPages)
      const {
        authorId: DEFAULT_AUTHOR_ID,
        images: DEFAULT_IMG,
        id: DEFAULT_ID,
        eventName: DEFAULT_EVENT_NAME,
        date: DEFAULT_DATE,
        time: DEFAULT_TIME,
        timezone: DEFAULT_TIMEZONE,
        place: DEFAULT_PLACE,

        info: DEFAULT_INFO,
        ticketUrl: DEFAULT_URL,
        price: DEFAULT_PRICE,
      } = DEFAULT_API_RESPONSE[0]

      return apiResults._embedded.events.map((e) => {
        return {
          authorId:
            "_embedded" in e
              ? e._embedded.venues[0].id ?? DEFAULT_AUTHOR_ID
              : DEFAULT_AUTHOR_ID,
          id: `a${e.id}` ?? DEFAULT_ID,
          images: e.images ?? DEFAULT_IMG,
          eventName: e.name ?? DEFAULT_EVENT_NAME,
          date: e.dates.start.localDate ?? DEFAULT_DATE,
          time: e.dates.start.localTime ?? DEFAULT_TIME,
          timezone: e.dates.timezone ?? DEFAULT_TIMEZONE,
          place:
            "_embedded" in e
              ? e._embedded.venues[0].name ?? DEFAULT_PLACE
              : DEFAULT_PLACE,
          info: e.info ?? DEFAULT_INFO,
          ticketUrl: e.url ?? DEFAULT_URL,
          price: e.priceRanges ?? DEFAULT_PRICE,
        }
      })
    })
    .catch((er) => {
      l(`error in processedApiDate: ${er}`)
    })
}

const showEnd = (lastPage) => {
  dotsEnd.style.display = "none" // no ends bots
  let start = lastPage - pagesChildren.length
  for (let i = 0; i < pagesChildren.length; i++) {
    pagesChildren[i].textContent = start + i + 1
  }
}
const showStartDots = (number) => {
  if (number > 4) {
    dotsStart.style.display = "flex"
    pagesChildren[0].textContent = 1
  }
}
const focusOnCurentPage = (number) => {
  pagesChildren.forEach((page) => {
    page.textContent == number
      ? page.classList.add("focusPage")
      : page.classList.remove("focusPage")
  })
}

const setLastPageInPages = (totalPages) => {
  let lastPage = 0
  if (totalPages >= 29) {
    lastPage = 29
    pagesChildren[pagesChildren.length - 1].textContent = lastPage
  } else {
    lastPage = totalPages
    pagesChildren[pagesChildren.length - 1].textContent = totalPages
  }
  return lastPage // no more then 29 pages
}

export const changePage = (
  pageNumber,
  processedEvent = processedApiDate(apiCall)
) => {
  setPage(pageNumber)

  renderGallery(processedEvent).then(() => {
    let lastPage = setLastPageInPages(totalPages)

    dotsEnd.style.display = "flex" // show end dots

    if (lastPage > 6) {
      //restart when last page was smaler then 6
      pagesChildren.forEach((page) => {
        page.style.display = "flex"
      })
      dotsStart.style.display = "flex"
      dotsEnd.style.display = "flex"
    }

    if (lastPage < 6) {
      dotsStart.style.display = "none"
      dotsEnd.style.display = "none"
      for (let i = 0; i < pagesChildren.length; i++) {
        if (lastPage > i) pagesChildren[i].textContent = i + 1
        else {
          pagesChildren[i].style.display = "none"
        }
      }
    } else if (pageNumber > lastPage - 3) {
      showEnd(lastPage) // set end value 24 25 ... 29
      showStartDots(pageNumber) // set comback to first page 1 ...
    } else if (pageNumber > 3) {
      for (let i = 0; i < pagesChildren.length - 1; i++) {
        pagesChildren[i].textContent = pageNumber - 2 + i
      }
      showStartDots(pageNumber) // set comback to first page 1 ...
    } else {
      dotsStart.style.display = "none"

      for (let i = 0; i < pagesChildren.length - 1; i++) {
        pagesChildren[i].textContent = i + 1
      }
    }
    // reload site
    pages.classList.add("pages--is-hidden")
    focusOnCurentPage(pageNumber)
    const modals = renderModal(processedEvent)
    l("modal" + modals)
    authorEvents(modals)
  })
}

const pageClick = () => {
  pagesChildren.forEach((page) => {
    page.addEventListener("click", () => {
      let pageNumber = page.textContent
      changePage(pageNumber)
    })
  })
}

function authorEvents(modal) {
  modal.then(() => {
    const btnAuthors = [...qla(".btn-author")]
    const modal = ql(".modal")
    btnAuthors.forEach((btn) => {
      btn.addEventListener("click", () => {
        idVen = btn.id
        l("idVen " + idVen)
        modal.classList.add("is-hidden")
        const body = ql("body").classList.remove("over")
        changePage(0)
      })
    })
  })
}

const createHomePage = (processedEvent = processedApiDate(apiCall)) => {
  renderGallery(processedEvent)
  const modalEvents = renderModal(processedEvent)
  authorEvents(modalEvents)
  pageClick()
  focusOnCurentPage(1)
}

// FORM
createKeywordSerch(setKeyword, setIdVen)
createCountrySerch(setCountryCode)
// FORM END

createHomePage()

////////////////////////////////////////////////////////////////////////////
// console.log(`apiResults:`)
// console.log(apiResults)
// console.log("image")
// console.log(apiResults._embedded.events[0].images) // tablica img
// console.log("name")
// console.log(apiResults._embedded.events[0].name)
// console.log("data")
// console.log(apiResults._embedded.events[0].dates.start.localDate)
// console.log("place 1")
// console.log(apiResults._embedded.events[0]._embedded.venues[0].name)
// // console.log("place 2")
// console.log(apiResults._embedded.events[0]._embedded.venues[0].address.line1)

// page._embedded.events[0].images - obrazek (jest kilka, który wybrać?)
// page._embedded.events[0].name - nazwa eventu
// page._embedded.events[0].dates.start.localDate - dzień rozpoczęcia
// page._embedded.events[0]._embedded.venues.adress.line1 - geo lokalizacja ?
// page._embedded.events[0]._embedded.venues[0].name - nazwa lokalizacjid ?
