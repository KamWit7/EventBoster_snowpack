;`use script`

import { renderGallery } from "./gallery.js"
import { renderModal } from "./gallery.js"
import {
  API_KEY,
  SIZE,
  l,
  pagesChildren,
  dotsEnd,
  dotsStart,
  pages,
  ql,
  eventSerch,
} from "./globalVAR.js"

let page = 0
let keyword = "Rock"
let totalPages = 0

const setPage = (pageNumber) => (page = pageNumber)

// form

eventSerch.addEventListener("keyup", () => {
  keyword = eventSerch.value
  l(`keyword: ${keyword}`)
  changePage(0)
})

// form end

async function apiCall() {
  return fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyword}&apikey=${API_KEY}&size=${SIZE}&page=${page}`
  )
    .then((pages) => {
      l("apiCALL")
      return pages.json()
    })
    .catch((error) => {
      console.log(`apiCall error: ${error}`)
    })
}

function processedApiDate(apiCall) {
  return apiCall()
    .then((apiResults) => {
      // niektóre strony nie posiadają danych D: start serching -> 'le' -> page -> 7 error
      if (!("_embedded" in apiResults)) {
        l("no _embedded in apiResults")
        l(apiResults)
        return {
          images: "no", // przemyśleć strukturę danych
          eventName: "no",
          date: "no",
          time: "no",
          timezone: "no",
          place: "",
          info: "no",
          ticketUrl: "no",
          price: "no",
        }
      }

      totalPages = apiResults.page.totalPages

      l(`totalPages processedApiDate: ${totalPages}`)
      l(apiResults)
      return apiResults._embedded.events.map((e) => {
        return {
          images: e.images, // image array {10}
          eventName: e.name, // ivent name
          date: e.dates.start.localDate,
          time: e.dates.start.localTime,
          timezone: e.dates.timezone, // data start
          place: e._embedded.venues[0].name,
          info: e.info,
          ticketUrl: e.url,
          id: e.id ,
         countryCode: e._embedded.venues[0].country.name,
          price:
            "priceRanges" in e
              ? e.priceRanges
              : [{ type: "No ticket left", currency: "?", min: 0, max: 0 }],
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
    //dance ?
    lastPage = 29
  } else {
    lastPage = totalPages
    pagesChildren[pagesChildren.length - 1].textContent = totalPages
  }

  return lastPage // no more then 29 pages
}

const changePage = (nr) => {
  setPage(nr)
  
  renderGallery(processedApiDate(apiCall)).then(() => {
    let number = nr + 1
    l(`totalPages changePage ${totalPages}`)
    l(`curentPgae changePage ${number}`)
    let lastPage = setLastPageInPages(totalPages)

    l(`totalPages setLastPageInPages ${setLastPageInPages(totalPages)}`)

    dotsEnd.style.display = "flex" // show end dots
    if (number > lastPage - 3) {
      showEnd(lastPage) // set end value 24 25 ... 29
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
    // reload site
    pages.classList.add("pages--is-hidden")
    focusOnCurentPage(number)
    renderModal(processedApiDate(apiCall))
  })
}

const pageClick = () => {
  pagesChildren.forEach((page) => {
    page.addEventListener("click", () => {
      let pageNumber = page.textContent
      changePage(pageNumber - 1)
    })
  })
}

renderGallery(processedApiDate(apiCall))
renderModal(processedApiDate(apiCall))
pageClick()
focusOnCurentPage(1)

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
