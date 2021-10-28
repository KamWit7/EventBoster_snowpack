import { eventsContainer } from "./globalVAR"

export const renderGallery = (events) => {
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
