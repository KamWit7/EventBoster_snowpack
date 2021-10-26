// console.log("modal window")
const modalShow = document.querySelectorAll('.event');
const modal = document.querySelector('.wrapper')
const backdrop = document.querySelector('.backdrop')
const body = document.querySelector('body')
// console.log(modalShow)

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
