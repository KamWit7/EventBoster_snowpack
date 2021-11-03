import { qla, eventsContainer, ql, pages, l, wrapper } from "./globalVAR.js";

export const renderGallery = (events) => {
  console.log(events);
  return events
    .then((apiInfo) => {
      l("apiInfo");
      l(apiInfo);
      const markup = apiInfo //undf.map()
        .map((event) => {
          // console.log(event.id)
          return `<ul id= "${event.id}" class="event event--is-hidden">
          <li class="event__img">
          <img
          src='${event.images[0].url}'
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
          `;
        })
        .join("");
      eventsContainer.innerHTML = markup;
      return events;
    })
    .then((events) => {
      setTimeout(() => {
        const loadingBox = ql(".loading-box");
        loadingBox.style.display = "inline-block";
      }, 0);

      setTimeout(() => {
        const eventsChildren = [...qla(".event")];
        const loadingBox = ql(".loading-box");

        eventsChildren.forEach((eve) => {
          eve.classList.remove("event--is-hidden"); // all events
        });

        pages.classList.remove("pages--is-hidden"); // show next pages
        loadingBox.style.display = "none";
      }, 350);
      return events;
    })

    .catch((er) => {
      l(`error in renderGallery: ${er}`);
    })
    .finally(() => {
      // pages.classList.remove("pages--is-hidden")
    });
};


