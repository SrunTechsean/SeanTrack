const logs = document.querySelector(".meal");
const state = {
    goal: 3000,
    entries: [],
};

function saveEntries() {
    localStorage.setItem("SeanTrack-entries", JSON.stringify(state.entries));
}

const entries = [
    {
        id: crypto.randomUUID(),
        mealType: "Breakfast",
        name: "Chicken and Rice",
        calories: 520,
    },
];

function renderMeal(entries) {
    for (entries in state.entries) {
        // Create all the element inside the log list
        const mealItem = document.createElement("li");
        mealItem.classList.add("meal__item");

        const mealInfo = document.createElement("div");
        mealInfo.classList.add("meal__info");

        const mealType = document.createElement("p");
        mealType.classList.add("meal__type");
        mealType.textContent = entries.mealType;

        const mealName = document.createElement("p");
        mealName.classList.add("meal__name");
        mealName.textContent = entries.name;

        const mealCal = document.createElement("p");
        mealCal.classList.add("meal__macros");
        mealCal.textContent = `${entries.calories} kcal`;

        mealItem.append(mealInfo, mealCal);
        mealInfo.append(mealType, mealName);

        // add that itme into the log
        logs.append(mealItem);
    }
}

renderMeal(state.entries);
