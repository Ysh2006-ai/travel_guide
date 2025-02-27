document.addEventListener('DOMContentLoaded', function () {
    const checkRestrictionsBtn = document.getElementById('check-restrictions');
    const restrictionsOutput = document.getElementById('restrictions-output');
    const checkVaccinationBtn = document.getElementById('check-vaccination');
    const vaccinationOutput = document.getElementById('vaccination-output');
    const healthForm = document.getElementById('health-form');
    const healthOutput = document.getElementById('health-output');
    const checkEmergencyBtn = document.getElementById('check-emergency');
    const emergencyOutput = document.getElementById('emergency-output');
    const checkInsuranceBtn = document.getElementById('check-insurance');
    const insuranceOutput = document.getElementById('insurance-output');

    // Sample data
    const travelRestrictions = {
        usa: "COVID-19 vaccination proof required. Mask mandate in public places.",
        france: "PCR test required for unvaccinated travelers. Health pass needed for public spaces.",
        japan: "Quarantine for 14 days required for all travelers."
    };

    const vaccinationRequirements = {
        usa: "COVID-19 vaccination proof required for entry.",
        france: "Full vaccination or negative PCR test required.",
        japan: "No specific vaccination requirements, but quarantine is mandatory."
    };

    const emergencyContacts = {
        usa: "Emergency: 911",
        france: "Emergency: 112",
        japan: "Emergency: 119"
    };

    const insuranceRecommendations = {
        usa: "Recommended: Comprehensive health insurance with COVID-19 coverage.",
        france: "Recommended: Travel insurance with medical coverage.",
        japan: "Recommended: Insurance covering quarantine and medical expenses."
    };

    // Check travel restrictions
    checkRestrictionsBtn.addEventListener('click', function () {
        const destination = document.getElementById('destination').value.toLowerCase();
        restrictionsOutput.textContent = travelRestrictions[destination] || "No restrictions found for this destination.";
    });

    // Check vaccination requirements
    checkVaccinationBtn.addEventListener('click', function () {
        const destination = document.getElementById('vaccination-destination').value.toLowerCase();
        vaccinationOutput.textContent = vaccinationRequirements[destination] || "No vaccination requirements found for this destination.";
    });

    // Handle pre-existing conditions form submission
    healthForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const condition = document.getElementById('condition').value;
        const medications = document.getElementById('medications').value;
        const allergies = document.getElementById('allergies').value;

        const careTips = [
            `Condition: ${condition}`,
            `Medications: ${medications}`,
            `Allergies: ${allergies || "None"}`,
            "Care Tips:",
            "- Carry your medications in their original packaging.",
            "- Keep a doctor's note for your condition.",
            "- Inform your travel companions about your condition.",
            allergies ? `- Avoid exposure to ${allergies}.` : ""
        ];

        healthOutput.innerHTML = careTips.map(tip => `<p>${tip}</p>`).join('');
    });

    // Check emergency contacts
    checkEmergencyBtn.addEventListener('click', function () {
        const destination = document.getElementById('emergency-destination').value.toLowerCase();
        emergencyOutput.textContent = emergencyContacts[destination] || "No emergency contacts found for this destination.";
    });

    // Check travel insurance recommendations
    checkInsuranceBtn.addEventListener('click', function () {
        const destination = document.getElementById('insurance-destination').value.toLowerCase();
        insuranceOutput.textContent = insuranceRecommendations[destination] || "No insurance recommendations found for this destination.";
    });
});