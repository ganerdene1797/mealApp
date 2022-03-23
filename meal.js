//getting my required elements
const inputBox = document.querySelector(".inputMeal input");
const addMealBtn = document.querySelector(".inputMeal button");
const mealsList = document.querySelector(".mealsList");

inputBox.onkeyup = () => {
  let userData = inputBox.value; //getting user input value
  if (userData.trim() != 0) {
    //if uservalues aren't only spaces
    addMealBtn.classList.add("active"); //to activate the button
  } else {
    addMealBtn.classList.remove("active"); //to deactivate the button
  }
};

//when user clicks addMealBtn
showMeals();
addMealBtn.onclick = () => {
  let userData = inputBox.value;
  let getLocalStorage = localStorage.getItem("Meals"); //getting local storage
  if (getLocalStorage == null) {
    //if local storage is null or empty 
    //listArr dotor meals ee list-lew.
    listArr = []; //blank array  
  } else {
    listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
  }
  listArr.push(userData);
  localStorage.setItem("Meals", JSON.stringify(listArr));
  showMeals();
  inputBox.value = "";
};

function showMeals() {
  let getLocalStorage = localStorage.getItem("Meals");
  if (getLocalStorage == null) {
    //if local storage is null or empty
    listArr = []; //blank array
  } else {
    listArr = JSON.parse(getLocalStorage); //transforming JSON string into a js object
  }

  let newMeal = "";
  let totalCalor = 0;
  listArr.forEach((element, index) => {
    newMeal += `
      <table class="meal-${index}">
        <tr>
          <th>${element}</th>
          <th><span></span></th>
        </tr> 
        <tr>
          <td colspan="2" style="text-align: center;"><button onclick="deleteMeal(${index})">Delete Meal</button></td>
        </tr>
        <tr>
          <td colspan="2" style="text-align: center;"><button onclick="addIngredient(${index})">add Ingredient</button></td>
        </tr>
        <tr>
          <td><input type="text" placeholder=" ingredient"></td>
          <td><input type="number" placeholder=" calorie"></td>
        </tr> 
      </table>
    <br> 
    `;
  });
  mealsList.innerHTML = newMeal;

  const mealsNumber = document.querySelector(".mealsNumber");
  mealsNumber.textContent = listArr.length; //showing Total number of meals
  const mealsNames = document.querySelector(".mealsNames");
  let mealsString = '';
  listArr.forEach(element => {
    mealsString += ` ${element}`;
  });
  mealsString += '.';
  mealsNames.textContent = mealsString;
}

function deleteMeal(index) {
  let getLocalStorage = localStorage.getItem("Meals");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1);
  //after deleting the meal
  localStorage.setItem("Meals", JSON.stringify(listArr));
  showMeals();
}

function addIngredient(index) {
  const tableToAdd = document.querySelector('table.meal-' + index);
  tableToAdd.innerHTML += `
  <tr>
    <td><input type="text" placeholder=" ingredient"></td>
    <td><input type="number" placeholder=" calorie"></td>
  </tr>
  `;
};