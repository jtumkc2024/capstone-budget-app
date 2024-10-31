function createProject(title, description, goal, date) {

	const projectDiv = document.createElement("div");
	projectDiv.setAttribute("style", "border-radius: 25px");

	const projectTitle = document.createElement("h5");
	projectTitle.innerHTML = title;
		//project.getTitle();
	projectTitle.setAttribute("style", "color:#237536; margin:10px");
	projectTitle.setAttribute("class", "border-bottom border-success");

	const projectDescription = document.createElement("p");
	projectDescription.innerHTML = description;
		//project.getDescription();
	projectDescription.setAttribute("style", "margin:10px");

	const goalAnnouncement = document.createElement("p");
	goalAnnouncement.innerHTML = "Remaining goal balance:";
	goalAnnouncement.setAttribute("style", "margin:10px");
	goalAnnouncement.setAttribute("class", "border-bottom");

	const projectGoal = document.createElement("p");
	projectGoal.innerHTML = "$" + goal;
		//project.getGoal();
	projectGoal.setAttribute("style", "margin:10px");

	const deadlineAnnouncement = document.createElement("p");
	deadlineAnnouncement.innerHTML = "Project will expire on:";
	deadlineAnnouncement.setAttribute("style", "margin:10px");
	deadlineAnnouncement.setAttribute("class", "border-bottom");

	const projectDeadline = document.createElement("p");
	projectDeadline.innerHTML = date;
		//project.getDeadline();
	projectDeadline.setAttribute("style", "margin:10px");
	
	const editProject = document.createElement("a");
	editProject.innerHTML = "Edit Project";
	editProject.setAttribute("role", "button");
	editProject.setAttribute("href", "Project-edit.html");
	editProject.setAttribute("class", "btn btn-info");
	editProject.setAttribute("style", "margin:10px");
	
	const pledge = document.createElement("button");
	pledge.innerHTML = "Pledge";
	pledge.setAttribute("class", "btn btn-light");
	pledge.setAttribute("style", "margin:10px");


	projectDiv.id = "projectDiv";
	projectDiv.appendChild(projectTitle);
	projectDiv.appendChild(projectDescription);
	projectDiv.appendChild(goalAnnouncement);
	projectDiv.appendChild(projectGoal);
	if(date != " ") {
		projectDiv.appendChild(deadlineAnnouncement);
		projectDiv.appendChild(projectDeadline);
	}
	projectDiv.appendChild(pledge);
	projectDiv.appendChild(editProject);

	document.getElementById("project_area").appendChild(projectDiv);

}

function addCardInfo(latestTransaction) {
	const cardDiv = document.createElement("div");
	const latestTrans = document.createElement("h4");
	latestTrans.innerHTML = latestTransaction;
	cardDiv.setAttribute("class", "d-flex justify-content-center");
	latestTrans.setAttribute("style", "color:#237536");
	cardDiv.appendChild(latestTrans);

	document.getElementById("card_area").appendChild(cardDiv);
}

addCardInfo("$50");

createProject("TITLE", "These are the project spaces! the 'pledge' button is non functioning but will be implemented very soon!", "1000", "NOV 10");
createProject("This is a larger title demo", "Descriptions will be stored in the database as a long string, so they'll be able to display here too!", "1000", "JAN 30");
createProject("More info", "Since descriptions are optional (as well as deadlines) a project without a deadline or description will look like that >", "50", "NOV 15");
createProject("TITLE2", " ", "20", " ");