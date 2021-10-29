import { qla, eventsContainer, ql } from "./globalVAR"

export const renderGallery = (events) => {
  events
    .then((apiInfo) => {
      const markup = apiInfo
        .map(
          (event) => `
    <ul class="event event--is-hidden">
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
      //  loadingBox.style.display = "inline-block"
      eventsContainer.innerHTML = markup
    })
    .then(() => {
      setTimeout(() => {
        const loadingBox = ql(".loading-box")
        loadingBox.style.display = "inline-block"
      }, 0)

      setTimeout(() => {
        const eventsChildren = [...qla(".event")]
        const loadingBox = ql(".loading-box")

        eventsChildren.forEach((eve) => {
          eve.classList.remove("event--is-hidden")
        })
        loadingBox.style.display = "none"
      }, 750)
    })
}
