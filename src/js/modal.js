import {
  qla,
  eventsContainer,
  ql,
  pages,
  l,
  wrapper,
  modal,
} from "./globalVAR.js"

export const renderModal = (events) => {
  // if()

  return events
    .then((apiData) => {
      // console.group(apiData)
      
      l("apiData modal")
      l(apiData)
      const markup = apiData
        .map((event) => {
          return `
          <div class="div-modal" id="${event.id}" style="display:none">
          <div class="imgRound">
           <img src="${event.images[0].url}" alt="" style="border-radius:50%" width="120" height="150"/> 
        </div>
          <svg class="close">
          <use href="./src/svg/symbol.svg#icon-close"></use>
        </svg>
        
          <ul  class="modal-list modal-list__row" >
          <li class="modal-list__img">
            <img src="${event.images[3].url}" alt="" class="modal-list__img"  />
          </li>
          <li>
            <ul class="modal-list">
              <li class="modal-list__info">
                <span class="modal-list__title">INFO</span>
                <p class="modal-list__text modal-list__text-width">
                  ${event.info}
                </p>
              </li>
              <li class="modal-list__when">
                <span class="modal-list__title">WHEN</span>
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
                  ${event.price[0].type}  ${event.price[0].min}-${event.price[0].max} ${event.price[0].currency} 
                </p>
                <a href="${event.ticketUrl}" target="_blank"><button class="btn-buy">BUY TICKETS</button></a>
                <p
                  class="
                    modal-list__text
                    modal-list__text-width
                    modal-list__text--label
                  "
                >
                ${event.price[0].type}  ${event.price[0].min}-${event.price[0].max} ${event.price[0].currency}
                </p>
                
                <a href="${event.ticketUrl}" target="_blank"><button class="btn-buy">BUY TICKETS</button></a>
                <button id="${event.authorId}" class="btn-author">MORE FROM THIS AUTHOR</button>
                
              </li>
            </ul>
          </li>
        </ul> 
        </div>`
        })

        .join("")

      wrapper.innerHTML = markup
      return events
    })
    .then((events) => {
      const modalEvents = qla(".event")
      const modalId = qla(".div-modal")
      const closeEvt = qla(".close")

      modalEvents.forEach((eve) => {
        eve.addEventListener("click", (e) => {
          const body = ql("body").classList.add("over")
          modal.classList.remove("is-hidden")
          modalId.forEach((elm) => {
            if (elm.getAttribute("id") === e.currentTarget.getAttribute("id")) {
              let val = elm.getAttribute("id")
              let span = ql(`.div-modal[id=${val}]`)
              span.style.display = "flex"

              modal.addEventListener("click", (event) => {
                if (
                  event.target.matches(".close") ||
                  !event.target.closest(".wrapper")
                ) {
                  closeModal()
                }
                false
              })
              const closeModal = () => {
                modal.classList.add("is-hidden")
                span.style.display = "none"
                const body = ql("body").classList.remove("over")
              }
            }
          })
        })
      })
    })
}
