import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://codecamp-70d45-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const cartInDB =ref(database, "cart")

const inputFieldEl = document.getElementById('input-field')
const addToCartBtn = document.getElementById('add-button')
const shoppingList = document.getElementById('shoppingList')

addToCartBtn.addEventListener('click', () => {
 addToList()
})
  
inputFieldEl.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    addToList()
  }
})

function addToList () {
  const inputValue = inputFieldEl.value

  push(cartInDB, inputValue)

  clearInputField()
}

function clearInputField () {
  inputFieldEl.value = ``
}

function displayShoppingList (itemValue, itemID) {

  let newEl = document.createElement('li')
  newEl.textContent = itemValue
  newEl.id 
  shoppingList.append(newEl)

  newEl.addEventListener('click', () => {

    let itemDBlocation = ref(database, `cart/${itemID}`)
    remove(itemDBlocation)
  })

}

onValue(cartInDB, function(snapshot) {

  if (snapshot.exists()) {
    shoppingList.innerHTML = "";
  const shoppingListArray = Object.entries(snapshot.val())

  shoppingListArray.forEach((item) => {
    const itemID = item[0]
    const itemValue = item [1]
    
    displayShoppingList(itemValue, itemID)
  })
  } else {
    shoppingList.innerHTML = "Noch keine Lebensmittel..."
  }

  
})



