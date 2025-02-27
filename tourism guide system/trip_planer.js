document.addEventListener('DOMContentLoaded', function () {
    const generateBtn = document.getElementById('generate-itinerary');
    const itineraryOutput = document.getElementById('itinerary-output');

    // Sample data for itinerary suggestions
    const activities = {
        hiking: ["Day 1: Hike in the mountains", "Day 2: Explore nature trails"],
        museums: ["Day 1: Visit the art museum", "Day 2: Tour the history museum"],
        food: ["Day 1: Food tour in the city", "Day 2: Cooking class"],
        beach: ["Day 1: Relax at the beach", "Day 2: Water sports"],
        shopping: ["Day 1: Visit local markets", "Day 2: Explore malls"]
    };

    generateBtn.addEventListener('click', function () {
        // Get user inputs
        const interests = document.getElementById('interests').value.toLowerCase();
        const budget = parseFloat(document.getElementById('budget').value) || 0;
        const days = parseInt(document.getElementById('days').value) || 1;

        // Generate itinerary based on interests
        let itinerary = [];
        if (activities[interests]) {
            itinerary = activities[interests].slice(0, days);
        } else {
            itinerary = ["No specific activities found for your interests. Try 'hiking', 'museums', 'food', 'beach', or 'shopping'."];
        }

        // Adjust itinerary based on budget
        if (budget < 50) {
            itinerary.push("Note: Your budget is low. Consider free or low-cost activities.");
        } else if (budget > 200) {
            itinerary.push("Note: Your budget allows for premium experiences.");
        }

        // Display the itinerary
        itineraryOutput.innerHTML = itinerary.map(item => `<p>${item}</p>`).join('');
    });
});