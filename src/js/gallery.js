import { qla, eventsContainer, ql, pages, l, wrapper } from "./globalVAR.js";

export const renderGallery = (events) => {
  console.log(events);
  return events
    .then((apiInfo) => {
      l("apiInfo")
      l(apiInfo)
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
 export const renderModal = (events) => {
  return events
    .then((apiData) => {
      console.group(apiData);
      const markup = apiData
        .map((event) => {
          return `
          <svg class="close">
          <use href="./src/svg/symbol.svg#icon-close"></use>
        </svg>
        <div class="imgRound" >
           <img src="./src/images/temporary/pic.png" alt="" /></li> 
        </div>
          <ul id="${event.id}" class="modal-list modal-list__row" style="display:none">
          <li class="modal-list__img">
            <img src="${event.images[0].url}" alt="" width="200" height="200" style="border-radius:50px" />
          </li>
          <li>
            <ul class="modal-list">
              <li class="modal-list__info">
                <span class="modal-list__title">${event.eventName}</span>
                <p class="modal-list__text modal-list__text-width">
                  ${event.info}
                </p>
              </li>
              <li class="modal-list__when">
                <span class="modal-list__title">WHEn</span>
                <p class="modal-list__text">${event.time} ${event.timezone}</p>
              </li>
              <li class="modal-list__where">
                <span class="modal-list__title">WHERE</span>
                <p class="modal-list__text">${event.timezone}</p>
              </li>
              <li class="modal-list__who">
                <span class="modal-list__title">WHO</span>
                <p class="modal-list__text">${event.eventName}</p>
              </li>
              <li class="modal-list__prices">
                <span class="modal-list__title">PRICES</span>
                <p
                  class="
                    modal-list__text
                    modal-list__text-width
                    modal-list__text--label
                  "
                >
                  ${event.price[0].type}  ${event.price[0].min} ${event.price[0].max} ${event.price[0].currency} 
                </p>
                <button class="btn-buy">BUY TICKETS</button>
                <p
                  class="
                    modal-list__text
                    modal-list__text-width
                    modal-list__text--label
                  "
                >
                  VIP 1000-1500 UAH   
                </p>
                <button class="btn-buy">BUY TICKETS</button>

                <button class="btn-author">MORE FROM THIS AUTHOR</button>
              </li>
            </ul>
          </li>
        </ul> `
      
        })

        .join("");
      //console.log(wrapper)
      wrapper.innerHTML = markup;
      return events;
    })
    .then((events) => {
      console.log(events);
      //const evtapi = []
      //evtapi.push(event)
      // console.log(evtapi[0].id)
const modal = ql('.modal')
const closeEvt = ql('.close')
console.log(closeEvt)
      const evenat = qla(".event");
      console.log(evenat);
      const modalId = qla(".modal-list");

      evenat.forEach((eve) => {
        eve.addEventListener("click", (e) => {
          let evtVal = e.currentTarget.getAttribute("id");
          console.log(evtVal);
          
          modal.classList.remove('is-hidden')
          
          modalId.forEach((elm) => {
            if (elm.getAttribute("id") === e.currentTarget.getAttribute("id")) {
              //console.log(elm.getAttribute('id'))
              console.log("yes");
              // console.log(e.target.getAttribute('id'))
              //elm.target.style.display = "flex"
              let val = elm.getAttribute("id");//
              //val.style.display = "flex"
              console.log(val)
              let span = ql(`.modal .wrapper ul[id=${val}]`);
              console.log(span)
              span.style.display ="flex"
              console.log(closeEvt)
              closeEvt.addEventListener('click', () =>{
                console.log('aa')
                
              })
            }
          }); 
        });
      });
    });
}; 
//renderModal(processedApiDate(apiCall))
 