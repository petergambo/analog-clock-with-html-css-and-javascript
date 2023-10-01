// Select the parent container element to access clock elements
const clockContainer = document.getElementById("clock").children;

// Initialize the clock
function initClock() {
    // Set the initial counter value
    let count = 3;

    clockContainer[4].textContent = count

    // Start a countdown timer with intervals of 1 second
    for (let index = 1; index <= count; index++) {
        setTimeout(() => {
            console.log(count);

            // Update the counter value and log it
            clockContainer[4].textContent = count - 1;
            count--;
            

            // Check if the counter has completed
            if (count === 0) {
                console.log("Counter completed");
                // Remove the counter element
                clockContainer[4].remove();
                // Start the clock
                runClock();
            }
        }, index * 1000);
    }
}

// Run the clock
function runClock() {
    // Get the current date and time
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    // Update the clock hands initially
   updateClockHands(hour, min, sec);

    // Update the clock hands every second
    setInterval(() => {

        // Handle second, minute, and hour changes
        if (sec === 59 && min === 59) {
            hour++;
            min = 0;
            sec = 0;
        } else if (sec === 59) {
            min++;
            sec = 0;
        } else {
            sec++;
        }

        // Update the clock hands
        updateClockHands(hour, min, sec);
    }, 1000);
}

// Convert time value to CSS degree
function timeToCssDeg(val) {
    return `rotate(${(val / 60) * 360}deg)`;
}

// Update the clock hands
function updateClockHands(hour, min, sec) {
    // Calculate the second, minute, and hour hand rotations
    const secRotation = (sec / 60) * 360;
    const minRotation = ((min + sec / 60) / 60) * 360;
    const hourRotation = ((hour % 12 + min / 60) / 12) * 360;

    // Update the CSS rotations
    clockContainer[3].style.transform = `rotate(${secRotation}deg)`;
    clockContainer[2].style.transform = `rotate(${minRotation}deg)`;
    clockContainer[1].style.transform = `rotate(${hourRotation}deg)`;
}

// Call the initClock function when the page loads
window.onload = initClock;
