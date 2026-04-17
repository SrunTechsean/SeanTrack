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

if (state.entries.length === 0) {
    addMeal("dinner", "Chicken", 200);
}

function saveEntries() {
    localStorage.setItem("SeanTrack-entries", JSON.stringify(state.entries));
}

function removeEntries() {
    locaStorage;
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

        // MealType Icon
        const mealIcon = document.createElement("span");
        mealIcon.innerHTML = icon[entry.mealType.toLowerCase()];

        // Container for mealtype and mealname
        const mealInfo = document.createElement("div");
        mealInfo.classList.add("meal__info");

        const mealType = document.createElement("p");
        mealType.classList.add("meal__type");
        mealType.textContent = entry.mealType;

        const mealName = document.createElement("p");
        mealName.classList.add("meal__name");
        mealName.textContent = entry.name;

        // Calorie of the Meal
        const mealCal = document.createElement("p");
        mealCal.classList.add("meal__macros");
        mealCal.textContent = `${entry.calories} kcal`;

        // Edit Icon and Remove Icon
        const edit = document.createElement("span");
        edit.innerHTML = icon.edit;

        const remove = document.createElement("span");
        remove.innerHTML = icon.remove;

        mealItem.append(mealIcon, mealInfo, mealCal, edit, remove);
        mealInfo.append(mealType, mealName);

        // add that itme into the log
        logs.append(mealItem);
    });
}

renderMeal();

function renderProgressSection() {
    const badge = document.querySelector(".badge");
    const statValue = document.querySelector(".stat__value");
    const statLabel = document.querySelector(".stat__label");

    const remainingCal = state.goal - state.consumed;

    // Render Calorie Goal Badge
    badge.textContent = `Goal: ${state.goal} kcal`;

    // Render the stats
    if (remainingCal < 0) {
        statValue.textContent = `${Math.abs(remainingCal)}`;
        statValue.style.setProperty("color", "var(--red)");
        statLabel.textContent = "OVER YOUR GOAL!";
    } else {
        statValue.textContent = `${remainingCal}`;
    }

    // Add attribute so the progressWheel renders
    progressWheel.setAttribute("role", "progressWheel");
    progressWheel.setAttribute("aria-valuenow", state.consumed);
    progressWheel.setAttribute("aria-live", "polite");
    progressWheelValue.textContent = progressWheel.ariaValueNow;

    root.style.setProperty("--cal-progress", `${percentageCalculator(state.goal, state.consumed)}%`);
}

renderProgressSection();

function percentageCalculator(total, amount) {
    return ((amount * 100) / total).toFixed(2);
}

// localStorage.removeItem("SeanTrack-entries");
