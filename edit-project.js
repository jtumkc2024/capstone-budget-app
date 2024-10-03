// Created by Shazia Kanwal

// Wait for the DOM to load before executing the script
window.onload = function() {
    // Example data (replace this with actual data from a backend in a real application)
    const projectData = {
        title: "Sample Project",
        description: "This is a description of the sample project.",
        goal: "Complete the project in Q4",
        deadline: "2024-12-31",
        priority: "3",
        renewal: true
    };

    // Pre-fill the form fields with the project data
    document.getElementById('projectTitle').value = projectData.title;
    document.getElementById('projectDescription').value = projectData.description;
    document.getElementById('projectGoal').value = projectData.goal;
    document.getElementById('projectDeadline').value = projectData.deadline;
    document.getElementById('projectPriority').value = projectData.priority;
    document.getElementById('projectRenewal').checked = projectData.renewal;
}

// Handle the Delete Button
document.getElementById('deleteButton').addEventListener('click', function() {
    if (confirm("Are you sure you want to delete this project?")) {
        // Logic to delete the project (This is a placeholder)
        alert("Project Deleted!");
        // You can add actual deletion logic here (e.g., an API call to the backend)
    }
});

// Handle the Update Form Submission
document.getElementById('projectForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission

    // Collect the updated project details from the form
    const updatedProject = {
        title: document.getElementById('projectTitle').value,
        description: document.getElementById('projectDescription').value,
        goal: document.getElementById('projectGoal').value,
        deadline: document.getElementById('projectDeadline').value,
        priority: document.getElementById('projectPriority').value,
        renewal: document.getElementById('projectRenewal').checked
    };

    // Logic to update the project (This is a placeholder)
    console.log("Updated Project:", updatedProject);
    alert("Project Updated Successfully!");

    // You can add actual update logic here (e.g., an API call to the backend)
});
