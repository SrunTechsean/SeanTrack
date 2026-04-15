const progressWheel = document.querySelector(".progress-ring");
const progressWheelValue = document.querySelector(".progress-ring__value");

function enableProgressWheel() {
    progressWheel.setAttribute("role", "progressWheel");
    progressWheel.setAttribute("aria-valuenow", 2190);
    progressWheel.setAttribute("aria-live", "polite");
    progressWheelValue.textContent = progressWheel.ariaValueNow;
}

enableProgressWheel();
