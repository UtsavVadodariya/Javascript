    document.getElementById("searchBtn").addEventListener("click", function () {
        const search = document.getElementById("searchItem").value;

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
            .then((res) => res.json())
            .then((json) => {
                console.clear();
                console.log(json);

                let mainDiv1 = document.getElementById("mainDiv");
                mainDiv1.innerHTML = "";

                if (json.meals) {
                    json.meals.forEach((meal) => {
                        let recipeDiv = document.createElement("div");
                        recipeDiv.className = "item_div";
                        recipeDiv.innerHTML = `
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <p id="text-${meal.idMeal}" class="text-[25px] font-bold">${meal.strMeal}</p>
                        <h1 class="text-[18px] text-[#4a4a4a] mt-3"><span class="font-bold">${meal.strArea}</span> Dish</h1>
                        <p class="text-[18px] text-[#4a4a4a] mt-3">Belongs to <span class="font-bold">${meal.strCategory}</span> Category</p>
                        `;

                        const input1 = document.createElement("input");
                        input1.className = "input_box";

                        const addButton = document.createElement("button");
                        addButton.innerText = "Edit";
                        addButton.className = "btn2";

                        const updateButton = document.createElement("button");
                        updateButton.innerText = "Update";
                        updateButton.className = "btn1";

                        const deleteButton = document.createElement("button");
                        deleteButton.innerText = "Delete";
                        deleteButton.className = "btn3"; 

                        recipeDiv.append(input1, addButton, updateButton, deleteButton);
                        mainDiv1.append(recipeDiv);

                        addButton.addEventListener("click", function () {
                            input1.value = meal.strMeal;
                            const newValue = input1.value;
                            input1.style.display = "block";
                            localStorage.setItem("added_value", newValue);
                        });

                        updateButton.addEventListener("click", function () {
                            const newValue = input1.value;
                            input1.style.display = "none";

                            document.getElementById(`text-${meal.idMeal}`).innerText = newValue;
                            localStorage.setItem("updated_value", newValue);
                        });

                        deleteButton.addEventListener("click", function () {
                            recipeDiv.remove();
                        });

                    });
                } else {
                    mainDiv1.innerHTML = "No results found.";
                }
            })
            .catch(err => {
                console.log("Error", err);
            });
    });
