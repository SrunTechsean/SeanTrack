const root = document.querySelector(":root");
const meal = document.querySelector(".meal");
const progressWheel = document.querySelector(".progress-ring");
const progressWheelValue = document.querySelector(".progress-ring__value");

// Grab Modal form element
const modal = {
    modalDialog: document.querySelector(".modal"),
    modalForm: document.querySelector(".modal-form"),
    mealTypeInput: document.querySelector("#meal-type"),
    mealNameInput: document.querySelector("#meal-name"),
    mealCaloriesInput: document.querySelector("#calories"),
    mealProteinInput: document.querySelector("#protein"),
    mealFatInput: document.querySelector("#fat"),
    mealCarbsInput: document.querySelector("#carbs"),
};

// Log Section logic
const logs = document.querySelector(".meal");
const state = {
    goal: 3000,
    proteinGoal: 130,
    fatGoal: 100,
    carbsGoal: 400,
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    entries: [],
};

// Macros List so that updateConsumed funct easily loop through macros and not the state obj with properties other than macros
const macrosList = ["calories", "protein", "fat", "carbs"];

const icon = {
    breakfast: `<svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="26"
                                    height="26"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon icon--breakfast"
                                    aria-hidden="true"
                                >
                                    <circle cx="12" cy="12" r="4" />
                                    <path d="M12 2v2" />
                                    <path d="M12 20v2" />
                                    <path d="m4.93 4.93 1.41 1.41" />
                                    <path d="m17.66 17.66 1.41 1.41" />
                                    <path d="M2 12h2" />
                                    <path d="M20 12h2" />
                                    <path d="m6.34 17.66-1.41 1.41" />
                                    <path d="m19.07 4.93-1.41 1.41" />
                                </svg>`,
    lunch: `<svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="26"
                                    height="26"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon icon--breakfast"
                                    aria-hidden="true"
                                >
                                    <circle cx="12" cy="12" r="4" />
                                    <path d="M12 2v2" />
                                    <path d="M12 20v2" />
                                    <path d="m4.93 4.93 1.41 1.41" />
                                    <path d="m17.66 17.66 1.41 1.41" />
                                    <path d="M2 12h2" />
                                    <path d="M20 12h2" />
                                    <path d="m6.34 17.66-1.41 1.41" />
                                    <path d="m19.07 4.93-1.41 1.41" />
                                </svg>`,
    dinner: `<svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="icon icon--dinner"
                                aria-hidden="true"
                            >
                                <path
                                    d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
                                />
                            </svg>`,
    snack: `<svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="icon icon--snack"
                                aria-hidden="true"
                            >
                                <path d="M12 6.528V3a1 1 0 0 1 1-1h0" />
                                <path
                                    d="M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21"
                                />
                            </svg>`,
    custom: `<svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="icon icon--custom"
                                aria-hidden="true"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M8 12h8" />
                                <path d="M12 8v8" />
                            </svg>`,
    edit: `<svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon edit__icon"
                                >
                                    <title>Edit</title>
                                    <path
                                        d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
                                    />
                                    <path d="m15 5 4 4" />
                                </svg>`,
    remove: `<svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon trash__icon"
                                >
                                    <title>Delete</title>
                                    <path d="M10 11v6" />
                                    <path d="M14 11v6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                    <path d="M3 6h18" />
                                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>`,
};

loadEntries();

function loadEntries() {
    // Ensure that the parse data is valid
    try {
        const storedEntries = localStorage.getItem("SeanTrack-entries");
        if (storedEntries) {
            const parsed = JSON.parse(storedEntries);
            state.entries = Array.isArray(parsed) ? parsed : [];
        } else {
            state.entries = [];
        }
    } catch (e) {
        console.error("Failed to parse entries from localStorage", e);
        state.entries = [];
    }
}

function addMeal(mealType, mealName, calories, protein, fat, carbs) {
    const newEntry = {
        id: crypto.randomUUID(),
        mealType: mealType,
        mealName: mealName,
        calories: calories,
        protein: protein,
        fat: fat,
        carbs: carbs,
    };
    state.entries.push(newEntry);
    updateConsumed(state);
    saveEntries();
}

// addMeal("dinner", "Chicken", 200);

function saveEntries() {
    localStorage.setItem("SeanTrack-entries", JSON.stringify(state.entries));
}

// Remove item when click on trashcan icon
meal.addEventListener("click", (e) => {
    const remove = e.target.closest(".trash__icon");
    if (!remove) return;

    const mealItem = e.target.closest(".meal__item");
    if (!mealItem) return;

    const entryID = mealItem.dataset.id;
    removeEntries(entryID);

    // Re-render the display
    updateUI();
});

// Help me debug sth i forgot
// removeEntries(JSON.parse(localStorage.getItem("SeanTrack-entries"))[0].id);
function removeEntries(id) {
    state.entries = state.entries.filter((entry) => entry.id !== id);
    saveEntries();
    updateConsumed(state);
}

// Parameter macros store the string of Calories, Protein, Fat, Carbs
function getConsumed(macros) {
    return state.entries.reduce((total, entry) => total + entry[macros], 0);
}

// This function Update any macros listed in the global state object
function updateConsumed(state) {
    for (const macros of macrosList) {
        // Ignore properties that do not need to be updated
        state[macros] = getConsumed(macros);
    }
}

function renderMeal() {
    logs.innerHTML = "";
    state.entries.forEach((entry) => {
        // Create the Meal Item
        const mealItem = document.createElement("li");
        mealItem.classList.add("meal__item");
        mealItem.dataset.id = entry.id;

        // Add the infos into the list
        mealItem.innerHTML = `
            ${icon[entry.mealType.toLowerCase()]}
            <div class="meal__info">
                <p class="meal__type">${capitalize(entry.mealType)}</p>
                <p class="meal__name">${entry.mealName}</p>
            </div>
            <p class="meal__macros">${entry.calories} kcal</p>
            ${icon.edit}
            ${icon.remove}
`;

        // add that itme into the log
        logs.append(mealItem);
    });
}

function renderProgressSection() {
    const badge = document.querySelector(".badge");
    const statValue = document.querySelector(".stat__value");
    const statLabel = document.querySelector(".stat__label");

    const remainingCal = state.goal - state.calories;

    // Render Calorie Goal Badge
    badge.textContent = `Goal: ${state.goal} kcal`;

    // Render the stats
    if (remainingCal < 0) {
        statValue.textContent = `${Math.abs(remainingCal)}`;
        statValue.style.setProperty("color", "var(--red)");
        statLabel.textContent = "OVER YOUR GOAL!";
    } else {
        statValue.textContent = `${remainingCal}`;
        statValue.style.setProperty("color", "var(--primary)");
        statLabel.textContent = "Remaining";
    }

    // Add attribute so the progressWheel renders
    progressWheel.setAttribute("role", "progressWheel");
    progressWheel.setAttribute("aria-valuenow", state.calories);
    progressWheel.setAttribute("aria-live", "polite");
    progressWheelValue.textContent = progressWheel.ariaValueNow;

    root.style.setProperty("--cal-progress", `${percentageCalculator(state.goal, state.calories)}%`);
}

function renderMacros() {
    // Get the prgress bar
    const proteinProgress = document.querySelector(".macros__bar--protein");
    const fatProgress = document.querySelector(".macros__bar--fat");
    const carbsProgress = document.querySelector(".macros__bar--carbs");

    // Get the macros target text
    const proteinGoal = document.querySelector(".macros__target--protein");
    const fatGoal = document.querySelector(".macros__target--fat");
    const carbsGoal = document.querySelector(".macros__target--carbs");

    // Get the macros current progress text
    const proteinCurrent = document.querySelector(".macros__current--protein");
    const fatCurrent = document.querySelector(".macros__current--fat");
    const carbsCurrent = document.querySelector(".macros__current--carbs");

    // Input the percentage of it compare to 100%
    proteinProgress.value = percentageCalculator(state.proteinGoal, state.protein);
    fatProgress.value = percentageCalculator(state.fatGoal, state.fat);
    carbsProgress.value = percentageCalculator(state.carbsGoal, state.carbs);

    // Set the taget Goal
    proteinGoal.textContent = state.proteinGoal;
    fatGoal.textContent = state.fatGoal;
    carbsGoal.textContent = state.carbsGoal;

    // Set the macros current progress
    proteinCurrent.textContent = state.protein;
    fatCurrent.textContent = state.fat;
    carbsCurrent.textContent = state.carbs;
}

// Dialog Section
const addButton = document.querySelector(".quick-add__body");

modal.modalDialog.addEventListener("click", (e) => {
    if (e.target.closest(".close")) {
        modal.modalDialog.close();
    }
});

// Open Modal
addButton.addEventListener("click", (e) => {
    const openButton = e.target.closest(".meal-btn");
    if (!openButton) return;

    // Get meal label which is the mealType so that it automatically put that into the value of the mealType select value
    const label = openButton.querySelector(".meal-btn__label").textContent;
    modal.mealTypeInput.value = label;

    modal.modalDialog.showModal();
});

// Listen for submit inside form
modal.modalForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const mealType = modal.mealTypeInput.value.toLowerCase();
    const name = modal.mealNameInput.value.trim();
    const calories = Number(modal.mealCaloriesInput.value);
    const protein = Number(modal.mealProteinInput.value);
    const fat = Number(modal.mealFatInput.value);
    const carbs = Number(modal.mealCarbsInput.value);

    addMeal(mealType, name, calories, protein, fat, carbs);
    updateUI();

    modal.modalForm.reset();
    modal.modalDialog.close();
});

// A function to update the entire UI without me needing to call every render function
function updateUI() {
    renderMacros();
    renderMeal();
    renderProgressSection();
}

// After refresh, Since my state object give macros value of 0, I need to Update the Consumed again to show the correct macros
updateConsumed(state);
updateUI();

// Calculate the percentage of amount compare to the total
// This is for values in progres bar and (--cal-progress) for progress wheel
function percentageCalculator(total, amount) {
    return ((amount * 100) / total).toFixed(2);
}

// Helper function so that meal__type breakfast become Breakfast
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
