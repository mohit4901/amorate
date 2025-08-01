document.addEventListener('DOMContentLoaded', function() {
    // Select all step sections
    const steps = [
        'step1', 'step2', 'step3', 'step4', 'step5',
        'step6', 'step7', 'step8', 'step9', 'step10'
    ].map(id => document.getElementById(id));
    let currentStepIndex = 0; // Keep track of the current active step

    // Select all "Next" buttons and the "Show Size Chart" button
    const nextButtons = {
        'next1': document.getElementById('next1'),
        'next2': document.getElementById('next2'),
        'next3': document.getElementById('next3'),
        'next4': document.getElementById('next4'),
        'next5': document.getElementById('next5'),
        'next7': document.getElementById('next7'), // No next6, as step6 is clickable text
        'next8': document.getElementById('next8'),
        'calculateSize': document.getElementById('calculateSize')
    };

    // Select elements for Step 1 (Bra Size)
    const toggleMeasuringTapeBtn = document.getElementById('toggleMeasuringTape');
    const measuringTapeSection = document.getElementById('measuringTapeSection');
    const bandSizeInput = document.getElementById('bandSize');
    const cupSizeInput = document.getElementById('cupSize');
    const measureUnderbustInput = document.getElementById('measureUnderbust');
    const measureOverbustInput = document.getElementById('measureOverbust');
    
    // Select radio button groups for various steps
    const underwireRadios = document.querySelectorAll('input[name="underwire"]');
    const strapFitRadios = document.querySelectorAll('input[name="strapFit"]');
    const bandFitRadios = document.querySelectorAll('input[name="bandFit"]');
    const bandFitSuggestionsDiv = document.getElementById('bandFitSuggestions');
    const bandSuggestionText = document.getElementById('bandSuggestionText');
    const cupFitRadios = document.querySelectorAll('input[name="cupFit"]');
    const breastShapeIntro = document.getElementById('breastShapeIntro'); // Clickable text for step 6
    const breastFirmnessRadios = document.querySelectorAll('input[name="breastFirmness"]');
    const breastFullnessRadios = document.querySelectorAll('input[name="breastFullness"]');
    const breastGapRadios = document.querySelectorAll('input[name="breastGap"]');
    const startOverButton = document.getElementById('startOver'); // Button to restart the guide
    const braSizeResultDiv = document.getElementById('braSizeResult');

    // Function to update the state (active/inactive) of a "Next" button
    function updateNextButton(buttonId, condition) {
        const button = nextButtons[buttonId];
        if (button) {
            if (condition) {
                button.classList.remove('next-button-inactive');
                button.classList.add('next-button-active');
                button.disabled = false; // Enable the button
            } else {
                button.classList.remove('next-button-active');
                button.classList.add('next-button-inactive');
                button.disabled = true; // Disable the button
            }
        }
    }

    // Function to show a specific step
    function showStep(index) {
        // Hide all steps first
        steps.forEach((step, i) => {
            step.classList.remove('active', 'slide-in');
            step.style.display = 'none'; // Ensure it's hidden for animation
        });

        // Show the target step with a slide-in animation
        currentStepIndex = index;
        const targetStep = steps[currentStepIndex];
        if (targetStep) {
            targetStep.style.display = 'block'; // Make it visible before animation
            setTimeout(() => { // Allow display:block to apply before starting animation
                targetStep.classList.add('active', 'slide-in');
            }, 10); // Small delay to ensure CSS transition/animation triggers
        }
    }

    // Event listener for "Don't know size?" button
    toggleMeasuringTapeBtn.addEventListener('click', function() {
        measuringTapeSection.classList.toggle('hidden'); // Toggle visibility
        // If measuring tape section is shown, clear band/cup size inputs
        if (!measuringTapeSection.classList.contains('hidden')) {
            bandSizeInput.value = '';
            cupSizeInput.value = '';
        } else {
            // If hidden, clear measuring tape inputs
            measureUnderbustInput.value = '';
            measureOverbustInput.value = '';
        }
        // Re-evaluate next1 button state after toggling
        checkStep1Completion();
    });

    // Function to check completion for Step 1
    function checkStep1Completion() {
        let isCompleted = false;
        // Check if band and cup sizes are entered
        const hasBraSize = bandSizeInput.value.trim() !== '' && cupSizeInput.value.trim() !== '';
        // Check if measuring tape values are entered
        const hasMeasurements = measuringTapeSection.classList.contains('hidden') === false &&
                                measureUnderbustInput.value.trim() !== '' &&
                                measureOverbustInput.value.trim() !== '';

        isCompleted = hasBraSize || hasMeasurements;
        updateNextButton('next1', isCompleted);
    }

    // Event listeners for Step 1 inputs
    bandSizeInput.addEventListener('input', checkStep1Completion);
    cupSizeInput.addEventListener('input', checkStep1Completion);
    measureUnderbustInput.addEventListener('input', checkStep1Completion);
    measureOverbustInput.addEventListener('input', checkStep1Completion);

    // Initial state for Step 1 button
    checkStep1Completion();

    // Event listener for Next button in Step 1
    nextButtons.next1.addEventListener('click', function() {
        if (!this.disabled) {
            showStep(1); // Show Step 2
            updateNextButton('next2', false); // Disable next button for step 2 initially
        }
    });

    // Event listener for Step 2 (Underwire) radio buttons
    underwireRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateNextButton('next2', true); // Enable next button once an option is selected
        });
    });

    // Event listener for Next button in Step 2
    nextButtons.next2.addEventListener('click', function() {
        if (!this.disabled) {
            showStep(2); // Show Step 3
            updateNextButton('next3', false); // Disable next button for step 3 initially
        }
    });

    // Event listener for Step 3 (Strap Fit) radio buttons
    strapFitRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateNextButton('next3', true); // Enable next button once an option is selected
        });
    });

    // Event listener for Next button in Step 3
    nextButtons.next3.addEventListener('click', function() {
        if (!this.disabled) {
            showStep(3); // Show Step 4
            updateNextButton('next4', false); // Disable next button for step 4 initially
            bandFitSuggestionsDiv.classList.add('hidden'); // Hide suggestions initially
        }
    });

    // Event listener for Step 4 (Band Fit) radio buttons
    bandFitRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const selectedValue = this.value;
            let suggestion = '';
            bandFitSuggestionsDiv.classList.remove('hidden'); // Show suggestions div

            // Logic for band fit suggestions
            if (selectedValue === 'diggingIn') {
                suggestion = 'Try loosening your hook.';
            } else if (selectedValue === 'ridesUp' || selectedValue === 'spillBelow') {
                suggestion = 'Try tightening your hook.';
            } else if (selectedValue === 'fitsFine') {
                suggestion = 'Great! Your band fits well.';
                bandFitSuggestionsDiv.classList.add('hidden'); // Hide if fit is fine
            }
            bandSuggestionText.textContent = suggestion;
            updateNextButton('next4', true); // Enable next button once an option is selected
        });
    });

    // Event listener for Next button in Step 4
    nextButtons.next4.addEventListener('click', function() {
        if (!this.disabled) {
            showStep(4); // Show Step 5
            updateNextButton('next5', false); // Disable next button for step 5 initially
        }
    });

    // Event listener for Step 5 (Cup Fit) radio buttons
    cupFitRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateNextButton('next5', true); // Enable next button once an option is selected
        });
    });

    // Event listener for Next button in Step 5
    nextButtons.next5.addEventListener('click', function() {
        if (!this.disabled) {
            showStep(5); // Show Step 6 (Breast Shape Intro)
        }
    });

    // Event listener for Step 6 (Breast Shape Intro) clickable text
    breastShapeIntro.addEventListener('click', function() {
        showStep(6); // Show Step 7
        updateNextButton('next7', false); // Disable next button for step 7 initially
    });

    // Event listener for Step 7 (Breast Firmness) radio buttons
    breastFirmnessRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateNextButton('next7', true); // Enable next button once an option is selected
        });
    });

    // Event listener for Next button in Step 7
    nextButtons.next7.addEventListener('click', function() {
        if (!this.disabled) {
            showStep(7); // Show Step 8
            updateNextButton('next8', false); // Disable next button for step 8 initially
        }
    });

    // Event listener for Step 8 (Breast Fullness) radio buttons
    breastFullnessRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateNextButton('next8', true); // Enable next button once an option is selected
        });
    });

    // Event listener for Next button in Step 8
    nextButtons.next8.addEventListener('click', function() {
        if (!this.disabled) {
            showStep(8); // Show Step 9
            updateNextButton('calculateSize', false); // Disable size chart button initially
        }
    });

    // Event listener for Step 9 (Breast Gap) radio buttons
    breastGapRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateNextButton('calculateSize', true); // Enable size chart button once an option is selected
        });
    });

    // ZIVAME-STYLE CALCULATOR LOGIC
    function getBraSizeFromMeasurements() {
        const underbust = parseFloat(measureUnderbustInput.value);
        const overbust = parseFloat(measureOverbustInput.value);

        if (isNaN(underbust) || isNaN(overbust) || overbust <= underbust) {
            return null; // Return null if measurements are invalid
        }

        // Band Size Calculation: Round the underbust measurement to the nearest even number
        let bandSize = Math.round(underbust);
        if (bandSize % 2 !== 0) {
            bandSize = bandSize + 1;
        }

        // Cup Size Calculation: Based on the difference between overbust and underbust
        const cupDifference = overbust - underbust;
        let cupSizeLetter = '';

        if (cupDifference <= 1) {
            cupSizeLetter = 'A';
        } else if (cupDifference <= 2) {
            cupSizeLetter = 'B';
        } else if (cupDifference <= 3) {
            cupSizeLetter = 'C';
        } else if (cupDifference <= 4) {
            cupSizeLetter = 'D';
        } else if (cupDifference <= 5) {
            cupSizeLetter = 'DD';
        } else if (cupDifference <= 6) {
            cupSizeLetter = 'E';
        } else if (cupDifference <= 7) {
            cupSizeLetter = 'F';
        } else if (cupDifference <= 8) {
            cupSizeLetter = 'G';
        } else {
            cupSizeLetter = 'H+'; // For larger sizes
        }

        return `${bandSize}${cupSizeLetter}`;
    }

    // Event listener for "Get My Bra Size" button
    nextButtons.calculateSize.addEventListener('click', function() {
        if (!this.disabled) {
            let recommendedSize = null;
            const hasMeasurements = measureUnderbustInput.value.trim() !== '' && measureOverbustInput.value.trim() !== '';

            if (hasMeasurements) {
                // If measurements were entered, use the calculator
                recommendedSize = getBraSizeFromMeasurements();
            } else if (bandSizeInput.value.trim() !== '' && cupSizeInput.value.trim() !== '') {
                // If a current bra size was entered, provide a different message
                recommendedSize = `${bandSizeInput.value.trim()}${cupSizeInput.value.trim()}`;
            }

            // Display the result
            braSizeResultDiv.innerHTML = ''; // Clear previous content
            if (recommendedSize) {
                braSizeResultDiv.innerHTML = `<p class="size">${recommendedSize}</p>`;
            } else {
                braSizeResultDiv.innerHTML = `<p class="size">We need your measurements to calculate your size. Please go back to Step 1 and use the measuring tape guide.</p>`;
            }

            showStep(9); // Show Step 10 (Result)
        }
    });

    // Event listener for "Start Over" button
    startOverButton.addEventListener('click', function() {
        // Reset all form inputs and radio selections
        bandSizeInput.value = '';
        cupSizeInput.value = '';
        measureUnderbustInput.value = '';
        measureOverbustInput.value = '';
        measuringTapeSection.classList.add('hidden'); // Hide measuring tape section

        // Uncheck all radio buttons
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });

        // Hide band suggestions
        bandFitSuggestionsDiv.classList.add('hidden');

        // Reset all next buttons to inactive
        for (const key in nextButtons) {
            updateNextButton(key, false);
        }

        // Show the first step again
        showStep(0);
        checkStep1Completion(); // Re-evaluate step 1 button state
    });

    // Initial setup: Ensure only the first step is visible on load
    showStep(0);

    // Image Carousel Logic (Slideshow with continuous scroll)
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselImages = Array.from(carouselTrack.children);
    const imageCount = carouselImages.length;
    let currentImageIndex = 0;
    const scrollInterval = 3000; // 3 seconds

    if (carouselTrack && imageCount > 0) {
        // Set the initial width of the track based on the number of images
        carouselTrack.style.width = `${imageCount * 100}%`;

        // Function to scroll the carousel
        function scrollCarousel() {
            currentImageIndex++;

            // Reset the position to create the "infinite loop" effect
            // We use a small delay and disable/re-enable the transition to avoid a visible jump
            if (currentImageIndex >= imageCount - 1) {
                // First, perform the scroll to the last (duplicate) image
                const translateValue = -currentImageIndex * (100 / imageCount);
                carouselTrack.style.transform = `translateX(${translateValue}%)`;

                // Then, after the transition, snap back to the start
                setTimeout(() => {
                    carouselTrack.style.transition = 'none';
                    currentImageIndex = 0;
                    carouselTrack.style.transform = `translateX(0)`;
                }, 700); // The delay should match the transition time in your CSS
            } else {
                // Normal scroll
                carouselTrack.style.transition = 'transform 0.7s ease-in-out';
                const translateValue = -currentImageIndex * (100 / imageCount);
                carouselTrack.style.transform = `translateX(${translateValue}%)`;
            }
        }

        // Start the slideshow
        setInterval(scrollCarousel, scrollInterval);
    }
});

    // Get all the buttons by their common class
    const buttons = document.querySelectorAll('.color-button');

    // Define a list of colors to cycle through
    const colors = [
        '#4CAF50', '#F44336', '#2196F3', '#FFEB3B', '#9C27B0'
    ];

    let colorIndex = 0;
    let buttonIndex = 0;

    // Function to change the color of the buttons sequentially, one by one
    function changeColors() {
        // Get the current button to be updated
        const currentButton = buttons[buttonIndex];
        
        // Get the new color from the colors array
        const newColor = colors[colorIndex];
        const newBorderColor = changeColorBrightness(newColor, -20); // Darken the color for the border

        // Apply the new colors to the current button
        currentButton.style.backgroundColor = newColor;
        currentButton.style.borderColor = newBorderColor;

        // Increment the indices for the next iteration
        colorIndex = (colorIndex + 1) % colors.length;
        buttonIndex = (buttonIndex + 1) % buttons.length;
    }

    // Helper function to change the brightness of a hex color
    function changeColorBrightness(hex, percent) {
        let f = parseInt(hex.slice(1), 16),
            t = percent < 0 ? 0 : 255,
            p = percent < 0 ? percent * -1 : percent,
            R = f >> 16,
            G = f >> 8 & 0x00FF,
            B = f & 0x0000FF;

        return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
    }

    // Set an interval to call the changeColors function every 500ms (0.5 seconds)
    setInterval(changeColors, 500);

    // Add click event listeners to each button
    document.getElementById('btn-399').addEventListener('click', () => {
        window.location.href = 'under399.html'; // Opens 'under399.html'
    });

    document.getElementById('btn-599').addEventListener('click', () => {
        window.location.href = 'under599.html'; // Opens 'under599.html'
    });

    document.getElementById('btn-799').addEventListener('click', () => {
        window.location.href = 'under799.html'; // Opens 'under799.html'
    });

    // Mobile Menu Toggle
    function toggleMobileMenu() {
        const navList = document.getElementById('navList');
        navList.classList.toggle('active');
    }