// Created by Shazia Kanwal

// Wait for the DOM to load before attaching the event listener
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('projectForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect values from form inputs
        const title = document.getElementById('projectTitle').value.trim();
        const description = document.getElementById('projectDescription').value.trim();
        const goal = document.getElementById('projectGoal').value.trim();
        const deadline = document.getElementById('projectDeadline').value;
        const priority = document.getElementById('projectPriority').value;
        const renewal = document.getElementById('projectRenewal').checked;

        // Validate form fields (optional but recommended)
        if (!title || !description || !goal || !deadline) {
            alert('Please fill in all required fields.');
            return;
        }

        // Simulate form submission (You can replace this with an API call to your backend)
        console.log({
            title,
            description,
            goal,
            deadline,
            priority,
            renewal
        });

        // Provide user feedback
        alert("Project Created Successfully!");

        // Reset the form after submission
        form.reset();
    });
});
