import { wrapper, processedApiDate } from "./globalVAR"

console.log(wrapper)

const renderModal = await ((events) => {
  console.log("aa")
  events.then((api) => {
    const mark = api
      .map(
        (event) => `
        <span>${event.eventName}</span>`
      )
      .join("")

    wrapper.innerHTML = mark
  })
})
const findEvent = () => {
  setTimeout(() => {
    const modalEvt = qla(".event")
    console.log(modalEvt)
    modalEvt.forEach((item) => {
      item.addEventListener("click", (item) => {
        modal.classList.remove("is-hidden")
        console.log(item.currentTarget)
      })
    })
  }, 1000)
}
renderModal(processedApiDate(apiCall))
findEvent()

/* // console.log("modal window")
const modalShow = document.querySelectorAll('.event');
const modal = document.querySelector('.wrapper')
const backdrop = document.querySelector('.backdrop')
const body = document.querySelector('body')
console.log(modalShow)

function openModal(){
    modal.classList.add('wrapper-active');
    backdrop.classList.remove('is-hidden')
    body.classList.add('over')
}

function closeModal(){
    modal.classList.remove('wrapper-active');
    backdrop.classList.add('is-hidden')
    body.classList.remove('over')
}

modalShow.forEach(event =>{
    event.addEventListener('click', openModal)
})

backdrop.addEventListener('click', closeModal)
 */
