document.addEventListener('DOMContentLoaded', function () {
    const generateBtn = document.getElementById('generate-checklist');
    const checklistOutput = document.getElementById('checklist-output');

    // Sample packing list data
    const packingLists = {
        beach: ["Swimwear", "Sunscreen", "Sunglasses", "Beach towel", "Flip flops", "Hat"],
        mountains: ["Hiking boots", "Warm clothing", "Backpack", "Water bottle", "First aid kit", "Snacks"],
        city: ["Comfortable shoes", "Daypack", "Camera", "Travel guide", "Umbrella", "Charger"]
    };

    generateBtn.addEventListener('click', function () {
        // Get user inputs
        const destination = document.getElementById('destination').value.toLowerCase();
        const duration = parseInt(document.getElementById('duration').value) || 1;

        // Generate packing list based on destination
        let checklist = [];
        if (packingLists[destination]) {
            checklist = packingLists[destination];
        } else {
            checklist = ["No specific packing list found for your destination. Try 'Beach', 'Mountains', or 'City'."];
        }

        // Adjust checklist based on trip duration
        if (duration > 7) {
            checklist.push("Extra clothing", "Laundry bag");
        } else if (duration > 3) {
            checklist.push("Extra pair of shoes");
        }

        // Display the checklist
        checklistOutput.innerHTML = checklist.map(item => `<li>${item}</li>`).join('');
    });
});