const progressWheel = document.querySelector(".progressWheel");
const progressWheelValue = document.querySelector(".progressWheel__value");

function enableProgressWheel() {
    progressWheel.setAttribute("role", "progressWheel");
    progressWheel.setAttribute("aria-valuenow", 2190);
    progressWheel.setAttribute("aria-live", "polite");
    progressWheelValue.textContent = progressWheel.ariaValueNow;
}

enableProgressWheel();
