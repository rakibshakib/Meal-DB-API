const mealInput = document.getElementById('meal-input');
const searchMeal = document.getElementById('search-meal');
const foodDetails = document.getElementById('food-details');
const getFoodApi = () => {
    const mealInputValue = mealInput.value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInputValue}`
    fetch(url).then(res => res.json()).then(data => showSearchMeal(data.meals));
    mealInput.value = '';
}
const showSearchMeal = data => {
    searchMeal.innerHTML = '';
    data.forEach(meal => {
        const { idMeal, strMeal, strMealThumb, strCategory } = meal;
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <img src="${strMealThumb}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
            <h5 class="card-title">${strMeal}</h5>
            <p class="card-text">${strCategory}</p>
            <button class="btn btn-primary" onclick="getFoodDetails(${idMeal})">See Meal Details</button>
        </div>
        `
        searchMeal.appendChild(div);
    });
}

const getFoodDetails = (id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url).then(res => res.json()).then(data => showFoodDetails(data.meals[0]));
}
const showFoodDetails = data => {
    foodDetails.innerHTML = ''
    const { strMeal, strMealThumb, strInstructions, strCategory} = data;
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${strMealThumb}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
            <h5 class="card-title text-primary"> ${strMeal} </h5>
            <p class="card-text text-primary">${strCategory}</p>
            <p class="card-text text-primary">${strInstructions.slice(0, 100)}</p>
        </div>
        `
    foodDetails.appendChild(div);
}