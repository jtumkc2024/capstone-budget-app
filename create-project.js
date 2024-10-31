// Created by Shazia Kanwal

// Wait for the DOM to load before attaching the event listener
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('projectForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect values from form inputs
        const title = document.getElementById('projectTitle').value;
        const description = document.getElementById('projectDescription').value;
        const goal = document.getElementById('projectGoal').value;
        const deadline = document.getElementById('projectDeadline').value;
        const priority = document.getElementById('projectPriority').value;
        const renewal = document.getElementById('projectRenewal').checked;

        // Validate form fields (optional but recommended)

	if(!title && !goal) {
		alert('The project needs at least a title and a goal!');
		return;
	}
	else if(!title) {
		alert('Please enter in a title.');
		return;
	}
	else if(!goal) {
		alert('Please enter in a goal');
		return;
	}
	
	//import {addProject} from 'SQLStatements.js';
	//addProject(userId, title, description, renewal, priority, deadline);

        // Simulate form submission (You can replace this with an API call to your backend)
        //console.log({
        //    title,
        //    description,
        //    goal,
        //    deadline,
        //    priority,
        //    renewal
        //});

        // Provide user feedback
        alert("Project Created Successfully!");

	window.location.href = 'dashboard.html';
        // Reset the form after submission
        form.reset();
	return;
    });
});
