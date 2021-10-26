import { API_KEY } from "./globalVAR"

let size = 24
let page = 0

const ql = (selector) => document.querySelector(selector)
const qla = (selector) => document.querySelectorAll(selector)
const l = (s) => console.log(s)

const eventsContainer = ql(".events > .container")
const pagesChildren = [...qla(".page")]

const nextPage = (pageNumber) => (page = pageNumber)
const changePage = (nr) => {
  nextPage(nr)
  renderGallery(processedApiDate(apiCall))

  let number = nr + 1
  if (number > 3) {

    for (let i = 0; i < pagesChildren.length - 1; i++) {
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
    const events = apiResults._embedded.events.map((e) => {
      return {
        images: e.images,
        eventName: e.name,
        date: e.dates.start.localDate,
        place: e._embedded.venues[0].name,
      }
    })
    return events
  })
}

const renderGallery = (events) => {
  l(events)
  events.then((apiInfo) => {
    const markup = apiInfo
      .map(
        (event, index) => `
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
          <span>${event.place}</span>
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

/////////////////////////////////////////////////////////////////////////////////////////////////////

// const SearchForm = document.querySelector("form#search-form");
// const inputSearch = document.querySelector("input[name='searchQuery']");
// const gallery = document.querySelector("div.gallery");
// const btnMore = document.querySelector("button.load-more");

// async function fetchPictures(inputSearchValue, page) {
//   try {
//     const response = await axios.get(
//       `https://pixabay.com/api/?key=${API_KEY}&q=${inputSearchValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
//     );
//     return response.data;
//   } catch (error) {
//     console.log("deklaracja fetchPictures ,async/await, error:", error.message);
//   }
// }

// async function showPictures(e) {
//   e.preventDefault();
//   gallery.innerHTML = "";
//   page = 1;
//   let inputSearchValue = inputSearch.value;
//   console.log("showData, inputSearchValue:", inputSearchValue);
//   fetchPictures(inputSearchValue, page)
//     .then((respData) => {
//       console.log("wywolanie fetchPictures respData", respData);
//       let picsInArray = respData.hits.length;
//       console.log("picsInArray", picsInArray);
//       const totalPages = Math.ceil(respData.totalHits / perPage);
//       console.log("totalPages", totalPages);

//       if (picsInArray === 0) {
//         Notiflix.Notify.warning(
//           "Sorry, there are no images matching your search query. Please try again."
//         );
//       } else {
//         renderGallery(respData);
//         Notiflix.Notify.success(
//           `Hooray! We found ${respData.totalHits} images.`
//         );
//         console.log("z elsa - page?", page);
//         if (page < totalPages) {
//           btnMore.style.display = "block";
//         }
//       }
//       const lightbox = new SimpleLightbox(".gallery a", {
//         captionsData: "alt",
//         captionDelay: 250,
//       });
//     })
//     .catch((error) => console.log(error));
// }

// const loadMore = () => {
//   btnMore.style.display = "none";
//   let inputSearchValue = inputSearch.value;
//   page += 1;
//   fetchPictures(inputSearchValue, page)
//     .then((respData) => {
//       renderGallery(respData);
//       btnMore.style.display = "block";
//       console.log("loadMore page?", page);

//       const totalPages = Math.ceil(respData.totalHits / perPage);
//       let picsInArray = respData.hits.length;
//       console.log("picsInArray", picsInArray);
//       if (picsInArray > 0) {
//         renderGallery(respData);
//         btnMore.style.display = "block";
//         console.log("loadeMore z ifa - page?", page);

//         if (page === totalPages) {
//           console.log("z if page === totalPages " + page);
//           btnMore.style.display = "none";
//           Notiflix.Notify.warning(
//             "We're sorry, but you've reached the end of search results."
//           );
//         } else if (page < totalPages) {
//           console.log("z if page < totalPages " + page);
//         }
//       }
//     })
//     .catch((error) => console.log(error));
// };

// SearchForm.addEventListener("submit", showPictures);
// btnMore.addEventListener("click", loadMore);
// btnMore.style.display = "none";

// const renderGallery = (respData) => {
//   const markup = respData.hits
//     .map(
//       (hit) =>
//         `<div class="photo-card gallery__item">
//         <a class="gallery__link" href=${hit.largeImageURL}>
//       <img class="gallery__image" src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
//       </a>
//       <div class="info">
//       <p class="info-item">
//       <b>Likes</b> ${hit.likes}
//       </p>
//       <p class="info-item">
//       <b>Views</b> ${hit.views}
//       </p>
//       <p class="info-item">
//       <b>Comments</b> ${hit.comments}
//       </p>
//       <p class="info-item">
//       <b>Downloads</b> ${hit.downloads}
//       </p>
//       </div>
//       </div>`
//     )
//     .join("");

//   gallery.innerHTML = markup;
// };

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
// page._embedded.events[0]._embedded.venues.address.line1 - geo lokalizacja
// page._embedded.events[0]._embedded.venues[0].name - nazwa lokalizacji
