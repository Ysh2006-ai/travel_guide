document.addEventListener('DOMContentLoaded', function () {
    const calculateBtn = document.getElementById('calculate-btn');
    const totalCostElement = document.getElementById('total-cost');

    calculateBtn.addEventListener('click', function () {
        // Get input values
        const accommodation = parseFloat(document.getElementById('accommodation').value) || 0;
        const transportation = parseFloat(document.getElementById('transportation').value) || 0;
        const food = parseFloat(document.getElementById('food').value) || 0;
        const activities = parseFloat(document.getElementById('activities').value) || 0;
        const days = parseInt(document.getElementById('days').value) || 0;

        // Calculate total cost
        const totalCost = (accommodation + transportation + food + activities) * days;

        // Display the result
        totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
    });
});