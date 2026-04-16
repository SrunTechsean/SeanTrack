const root = document.querySelector(":root");
const progressWheel = document.querySelector(".progress-ring");
const progressWheelValue = document.querySelector(".progress-ring__value");

// Log Section logic
const logs = document.querySelector(".meal");
const state = {
    goal: 3000,
    consumed: 0,
    entries: [],
};

loadEntries();

function loadEntries() {
    const storedEntries = localStorage.getItem("SeanTrack-entries");
    state.entries = storedEntries ? JSON.parse(storedEntries) : [];
}

function addMeal(mealType, name, calories) {
    const newEntry = {
        id: crypto.randomUUID(),
        mealType: mealType,
        name: name,
        calories: calories,
    };
    state.entries.push(newEntry);
    saveEntries();
}

addMeal("Breakfast", "Chicken", 200);

function saveEntries() {
    localStorage.setItem("SeanTrack-entries", JSON.stringify(state.entries));
}

function getConsumeCalories() {
    return state.entries.reduce((total, entry) => total + entry.calories, 0);
}

function updateConsumed() {
    state.consumed = getConsumeCalories();
}
updateConsumed();

console.log(getConsumeCalories());

function renderMeal() {
    logs.innerHTML = "";
    state.entries.forEach((entry) => {
        // Create all the element inside the log list
        const mealItem = document.createElement("li");
        mealItem.classList.add("meal__item");

        const mealInfo = document.createElement("div");
        mealInfo.classList.add("meal__info");

        const mealType = document.createElement("p");
        mealType.classList.add("meal__type");
        mealType.textContent = entry.mealType;

        const mealName = document.createElement("p");
        mealName.classList.add("meal__name");
        mealName.textContent = entry.name;

        const mealCal = document.createElement("p");
        mealCal.classList.add("meal__macros");
        mealCal.textContent = `${entry.calories} kcal`;

        const lineBreak = document.createElement("hr");
        lineBreak.classList.add("line-break");

        mealItem.append(mealInfo, mealCal);
        mealInfo.append(mealType, mealName);

        // add that itme into the log
        logs.append(mealItem, lineBreak);
    });
}

renderMeal();

function enableprogressWheel() {
    progressWheel.setAttribute("role", "progressWheel");
    progressWheel.setAttribute("aria-valuenow", getConsumeCalories());
    progressWheel.setAttribute("aria-live", "polite");
    progressWheelValue.textContent = progressWheel.ariaValueNow;

    root.style.setProperty("--cal-progress", `${getConsumeCalories()}%`);
}

enableprogressWheel();
