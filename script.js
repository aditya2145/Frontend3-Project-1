const setTimeBtn = document.getElementById("setTimeBtn");
const timersList = document.getElementById("timers-list");

// Function to format time
function formatTime(totalSeconds) {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours} : ${minutes} : ${seconds}`;
}

// Function to create a new timer
function addNewTimer(totalSeconds) {
    // Clear the "no timers" message
    if (timersList.textContent.trim() === "You have no timers currently!") {
        timersList.textContent = "";
    }

    // Create timer container
    const timerContainer = document.createElement("div");
    timerContainer.className = "timeSetter-container";

    // Add timer display
    const timeLeft = document.createElement('span');
    timeLeft.textContent = 'Time Left:';
    const timeDisplay = document.createElement("span");
    timeDisplay.classList.add("time-display");
    timeDisplay.style.fontSize = '2rem'
    timeDisplay.textContent = formatTime(totalSeconds);

    // Add stop/delete button
    const stopButton = document.createElement("button");
    stopButton.classList.add("stop-button");
    stopButton.textContent = "Delete";
    stopButton.classList.add('setTimeBtn');

    // Append elements to the timer container
    timerContainer.append(timeLeft);
    timerContainer.appendChild(timeDisplay);
    timerContainer.appendChild(stopButton);
    timersList.appendChild(timerContainer);

    // Timer countdown logic
    const timerInterval = setInterval(() => {
        totalSeconds--;

        if (totalSeconds > 0) {
            timeDisplay.textContent = formatTime(totalSeconds);
        } else {
            clearInterval(timerInterval);

            // Change UI when timer is up
            timeLeft.textContent = '';
            timerContainer.style.backgroundColor = '#F0F757';
            timeDisplay.textContent = "Timer Is Up!";
            timeDisplay.style.color = 'black';
            timeDisplay.style.fontSize = '2rem';
            stopButton.textContent = "Stop";
            stopButton.style.backgroundColor = '#34344A';
            stopButton.style.color = 'white';

            // Play alert sound
            const audio = new Audio("beep.mp3");
            audio.play();

            stopButton.addEventListener("click", () => {
                timerContainer.remove();
                if (timersList.children.length === 0) {
                    timersList.textContent = "You have no timers currently!";
                }
            });
        }
    }, 1000);

    // Stop/delete button functionality
    stopButton.addEventListener("click", () => {
        clearInterval(timerInterval);
        timerContainer.remove();
        if (timersList.children.length === 0) {
            timersList.textContent = "You have no timers currently!";
        }
    });
}

// Set Time Button Click
setTimeBtn.addEventListener("click", () => {
    const hour = parseInt(document.getElementById("hour").value) || 0;
    const minute = parseInt(document.getElementById("minute").value) || 0;
    const second = parseInt(document.getElementById("second").value) || 0;

    const totalSeconds = hour * 3600 + minute * 60 + second;

    if (totalSeconds > 0) {
        addNewTimer(totalSeconds);
    } else {
        alert("Please enter a valid time!");
    }

    // Clear input fields
    document.getElementById("hour").value = "";
    document.getElementById("minute").value = "";
    document.getElementById("second").value = "";
});
