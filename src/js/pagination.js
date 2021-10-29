import {
  API_KEY,
  SIZE,
  l,
  pagesChildren,
  dotsEnd,
  dotsStart,
} from "./globalVAR"
import { renderGallery } from "./gallery"

let page = 0
const setPage = (pageNumber) => (page = pageNumber)
const showEnd = () => {
  dotsEnd.style.display = "none" // no ends bots
  for (let i = 0; i < pagesChildren.length; i++) {
    pagesChildren[i].textContent = 24 + i
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
    l(
      page.textContent == number
        ? page.classList.add("focusPage")
        : page.classList.remove("focusPage")
    )
  })
}

async function apiCall() {
  return fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&size=${SIZE}&page=${page}`
  )
    .then((pages) => {
      return pages.json()
    })
    .catch((error) => {
      console.log(error)
    })
}

function processedApiDate(apiCall) {
  return apiCall().then((apiResults) => {
    l("Raw data:")
    l(apiResults)
    const events = apiResults._embedded.events.map((e, idx) => {
      if (!("priceRanges" in e)) {
        l("no priceRanges " + idx)
      }

      return {
        images: e.images, // image array {10}
        eventName: e.name, // ivent name
        date: e.dates.start.localDate,
        time: e.dates.start.localTime,
        timezone: e.dates.timezone, // data start
        place: e._embedded.venues[0].name,
        info: e.info,
        ticketUrl: e.url,
        price:
          "priceRanges" in e
            ? e.priceRanges
            : [{ type: "No ticket left", currency: "?", min: 0, max: 0 }],
      }
    })
    return events
  })
}

const changePage = (nr) => {
  setPage(nr)
  renderGallery(processedApiDate(apiCall))

  let number = nr + 1

  dotsEnd.style.display = "flex" // show end dots
  if (number >= 26) {
    showEnd() // set end value 24 25 ... 29
    showStartDots(number) // set comback to first page 1 ...
  } else if (number > 3) {
    for (let i = 0; i < pagesChildren.length - 1; i++) {
      pagesChildren[i].textContent = number - 2 + i
    }
    showStartDots(number) // set comback to first page 1 ...
  } else {
    dotsStart.style.display = "none"
    for (let i = 0; i < pagesChildren.length - 1; i++) {
      pagesChildren[i].textContent = i + 1
    }
  }

  focusOnCurentPage(number)
}

const pageClick = () => {
  pagesChildren.forEach((page) => {
    page.addEventListener("click", () => {
      let pageNumber = page.textContent
      changePage(pageNumber - 1)
      l(`Page nr: ${pageNumber}`)
    })
  })
}

renderGallery(processedApiDate(apiCall))
pageClick()

//modalShows(processedApiDate(apiCall))

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
