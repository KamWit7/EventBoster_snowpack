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
  eventSearch,
  DEFAULT_PLACE,
  DEFAULT_PRICE,
  DEFAULT_API_RESPONSE,
  country,
  chooseCountry,
} from "./globalVAR.js"

let page = 0
let totalPages = 0
let keyword = ""
let countryCode = ""

const setPage = (pageNumber) => (page = pageNumber)
const setTotalPages = (allPages) => (totalPages = allPages - 1)
const setKeyword = (formValue) => (keyword = formValue)

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value)
}

// form
eventSearch.addEventListener("keyup", () => {
  setKeyword(eventSearch.value)
  l(`keyword: ${keyword}`)
  changePage(0)
})

const dropDown = ql(".drop-down")

Object.values(country).forEach((curentCountry) => {
  const lastItem = document.createElement("li")
  const link = document.createElement("a")
  link.href = "#start"

  if (curentCountry != "") {
    link.innerText = curentCountry
    lastItem.append(link)
    // l("lastItem")
    // l(lastItem)
    dropDown.append(lastItem)
    lastItem.addEventListener(
      "click",
      () => {
        countryCode =
          getKeyByValue(country, curentCountry) ?? country["default"]
        l(curentCountry + " " + countryCode)
        l(curentCountry + " " + countryCode)
        ql(".nav-button").innerText = curentCountry
        ql(".nav-button").parentNode.parentNode.classList.toggle("closed")

        changePage(0)
        topFunction()
      },
      false
    )
  }
})

function topFunction() {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

// l(dropDown)

ql(".nav-button").addEventListener(
  "click",
  (event) => {
    ql(".nav-button").parentNode.parentNode.classList.toggle("closed")
  },
  false
)

// chooseCountry.addEventListener("keyup", () => {
//   let countryName = chooseCountry.value
//   countryCode = getKeyByValue(country, countryName) ?? country["default"]
//   l(`countryCode ${countryCode}`)
//   changePage(0)
// })

// form endz

async function apiCall() {
  return fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&keyword=${keyword}&apikey=${API_KEY}&size=${SIZE}&page=${page}`
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
      l(apiResults)
      if (!("_embedded" in apiResults)) {
        l("no _embedded in apiResults")
        setTotalPages(1)
        return DEFAULT_API_RESPONSE
      }

      setTotalPages(apiResults.page.totalPages)
      l(`totalPages processedApiDate: ${totalPages}`)

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

          images: e.images ?? "", // image array {10}
          eventName: e.name ?? "", // ivent name
          date: e.dates.start.localDate ?? "",
          time: e.dates.start.localTime ?? "",
          timezone: e.dates.timezone ?? "", // data start
          place:
            "_embedded" in e
              ? e._embedded.venues[0].name ?? DEFAULT_PLACE // .name ?
              : DEFAULT_PLACE,
          info: e.info ?? "",
          ticketUrl: e.url ?? "",
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


const changePage = (nr) => {
  setPage(nr)
  

const changePage = (pageNumber) => {
  setPage(pageNumber)

  renderGallery(processedApiDate(apiCall)).then(() => {
    l(`totalPages changePage ${totalPages}`)
    l(`pageNumber changePage ${pageNumber}`)
    let lastPage = setLastPageInPages(totalPages)

    l(`totalPages setLastPageInPages ${setLastPageInPages(totalPages)}`)

    dotsEnd.style.display = "flex" // show end dots

    if (lastPage > 6) {
      //restart when last page was smaler then 6
      pagesChildren.forEach((page) => {
        page.style.display = "flex"
      })
      dotsStart.style.display = "flex"
      dotsEnd.style.display = "flex"
    }

    l("lastPage: " + lastPage)
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

    focusOnCurentPage(number)
    renderModal(processedApiDate(apiCall))

    focusOnCurentPage(pageNumber)

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
