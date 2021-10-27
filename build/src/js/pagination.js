// import { API_KEY } from "./globalVAR"
const API_KEY = "n3gAEgr8rYbG16Dkj0pCwG8eHAa4A1eM"
let size = 24
let page = 0

const ql = (selector) => document.querySelector(selector)
const qla = (selector) => document.querySelectorAll(selector)
const l = (s) => console.log(s)


const eventsContainer = ql(".events > .container")
const pagesChildren = [...qla(".page")]
const dots = ql(".page-dots")

//////MODAL

const modalShows = () =>{
  setTimeout(() => {
    const modalShow = qla('.events > .container > .event');
const wrapper = ql('.wrapper');
l(modalShow);
wrapper.addEventListener('click', renderModal)

  }, 3000)
  modalShows(processedApiDate(apiCall))
}

const renderModal = (events) =>{
  events.then((apiInfo) => {
    const markup = apiInfo
      .map((event)=>
        `<span>${this.eventName}</span>
        `.join(""),
        wrapper.innerHTML = markup
      )

})
}


///////

const nextPage = (pageNumber) => (page = pageNumber)
const changePage = (nr) => {
  nextPage(nr)
  renderGallery(processedApiDate(apiCall))

  let number = nr + 1

  dots.style.display = "flex"

  if (number >= 26) {
    dots.style.display = "none"
    for (let i = 0; i < pagesChildren.length; i++) {
      pagesChildren[i].textContent = 24 + i
    }
  } else if (number > 3) {
    for (let i = 0; i < pagesChildren.length - 1; i++) {
      // if (number > 4) {
      //   pagesChildren[0].textContent = 1
      //   pagesChildren[0].classList.add('dots-for-one')
      // }
      pagesChildren[i].textContent = number - 2 + i
    }
  } else {
    for (let i = 0; i < pagesChildren.length - 1; i++) {
      pagesChildren[i].textContent = i + 1
    }
  }
}

async function apiCall() {
  return fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&size=${size}&page=${page}`
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
    console.log(apiResults)
    const events = apiResults._embedded.events.map((e) => {
      return {
        images: e.images, // image array {10}
        eventName: e.name, // ivent name
        date: e.dates.start.localDate,
        time: e.dates.start.localTime,
        timezone: e.dates.timezone, // data start
        place: e._embedded.venues[0].name,
        info: e.info,
        ticketUrl: e.url,
     // price: e.priceRanges.min,
        
      }
    })
    return events
  })
}
///////////////////////////////


const renderGallery = (events) => {
  l(events)
  events.then((apiInfo) => {
    const markup = apiInfo
      .map(
        (event) => `
    <ul class="event">
          <li class="event__img">
          <img
          src='${event.images[1].url}'
          alt="Sports event"
          />
          </li>
          <li class="event__title"><h2>${event.eventName}</h2></li>
          <li class="event__start"><span>${event.date}</span></li>
          <li class="event__place">
          <svg><use href="./src/svg/symbol.svg#icon-pin"></use></svg>
          <span class="location">${event.place}</span>
          </li>
          </ul>
          `
      )
      .join("")
    eventsContainer.innerHTML = markup
  })
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
