import { countrys, dropDown, navButton, eventSearch, l } from "./globalVAR"
import { changePage } from "./pagination"

const getKeyByValue = (object, value) =>
  Object.keys(object).find((key) => object[key] === value)

const closeChooseCountry = () =>
  navButton.parentNode.parentNode.classList.toggle("closed")

export const createCountrySerch = (setCountryCode) => {
  navButton.addEventListener("click", closeChooseCountry)

  Object.values(countrys).forEach((curentCountry) => {
    const lastItem = document.createElement("li")
    const link = document.createElement("a")
    link.href = "#start"

    if (curentCountry !== countrys["default"]) {
      link.innerText = curentCountry
      lastItem.append(link)
      dropDown.append(lastItem)
      lastItem.addEventListener("click", () => {
        setCountryCode(getKeyByValue(countrys, curentCountry))

        navButton.innerText = curentCountry // set choosen country
        closeChooseCountry()
        changePage(0)
      })
    }
  })
}

export const createKeywordSerch = (setKeyword, setIdVen) => {
  eventSearch.addEventListener("keydown", (event) => {
    const reset = ""
    setKeyword(eventSearch.value)
    setIdVen(reset)
    changePage(0)
  })
}
