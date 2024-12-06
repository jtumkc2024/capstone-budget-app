var transaction;
var id;

function generateID() {
	id = Math.floor(Math.random() * 101);
}

function createProject(title, description, goal, date, priority) {
	generateID();

	const projectDiv = document.createElement("div");
	projectDiv.setAttribute("style", "margin-top:15px; margin-bottom:15px");

	const projectTitle = document.createElement("h5");
	projectTitle.innerHTML = title;
		//project.getTitle();
	projectTitle.setAttribute("style", "color:#237536; margin:10px");
	projectTitle.setAttribute("class", "border-bottom border-success");

	const projectDescription = document.createElement("p");
	projectDescription.innerHTML = description;
		//project.getDescription();
	projectDescription.setAttribute("style", "margin:10px; height:50px");
	projectDescription.setAttribute("class", "overflow-auto");

	const goalAnnouncement = document.createElement("p");
	goalAnnouncement.innerHTML = "Remaining goal balance:";
	goalAnnouncement.setAttribute("style", "margin:10px");
	goalAnnouncement.setAttribute("class", "border-bottom");

	const projectGoal = document.createElement("p");
	projectGoal.innerHTML = goal;
	projectGoal.setAttribute("class", "text-center");
	projectGoal.setAttribute("style", "margin:10px");
	projectGoal.id = id+"goal";

	const deadlineAnnouncement = document.createElement("p");
	deadlineAnnouncement.innerHTML = "Project will expire on:";
	deadlineAnnouncement.setAttribute("style", "margin:10px");
	deadlineAnnouncement.setAttribute("class", "border-bottom");

	const projectDeadline = document.createElement("p");
	projectDeadline.innerHTML = date;
	projectDeadline.setAttribute("class", "text-center");
	projectDeadline.setAttribute("style", "margin:10px");
	
	const editProject = document.createElement("a");
	editProject.innerHTML = "Edit Project";
	editProject.setAttribute("role", "button");
	editProject.setAttribute("href", "Project-edit.html");
	editProject.setAttribute("class", "btn btn-info");
	editProject.setAttribute("style", "margin:10px");
	
	const pledge = document.createElement("button");
	pledge.innerHTML = "Pledge";
	pledge.setAttribute("class", "btn btn-secondary");
	pledge.setAttribute("style", "margin:10px");
	pledge.setAttribute("onclick", "pledge(" + id + ")");

	calculate(priority, transaction, projectDiv, id);

	projectDiv.id = "projectDiv";
	projectDiv.setAttribute("class", priority);
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
	transaction = latestTransaction;
	const cardDiv = document.createElement("div");
	const latestTrans = document.createElement("h4");
	latestTrans.innerHTML = latestTransaction;
	cardDiv.setAttribute("class", "d-flex justify-content-center");
	latestTrans.setAttribute("style", "color:#237536");
	cardDiv.appendChild(latestTrans);

	document.getElementById("card_area").appendChild(cardDiv);
}

function calculate(priority, latestTransaction, div, id) {
	const advice = document.createElement("p");
	const amount = document.createElement("p");
	advice.setAttribute("style", "margin:10px");
	amount.setAttribute("style", "margin:10px; font-weight: bold");
	advice.setAttribute("class", "text-center");
	amount.setAttribute("class", "text-center");

	amount.id = id+"advice";

	if(priority === "1")
	{
		advice.innerHTML = "Because this is a priority 1 project, we recommend setting aside this much from your latest incoming transaction:";
		amount.innerHTML = Math.round((parseInt(latestTransaction)/5) * 100) /100;
	}
	if(priority === "2")
	{
		advice.innerHTML = "Because this is a priority 2 project, we recommend setting aside this much from your latest incoming transaction: ";
		amount.innerHTML = Math.round((parseInt(latestTransaction)/7.5) * 100) /100;
	}
	if(priority === "3")
	{
		advice.innerHTML = "Because this is a priority 3 project, we recommend setting aside this much from your latest incoming transaction: ";
		amount.innerHTML = Math.round((parseInt(latestTransaction)/10) * 100) /100;
	}
	if(priority === "4")
	{
		advice.innerHTML = "Because this is a priority 4 project, we recommend setting aside this much from your latest incoming transaction: ";
		amount.innerHTML = Math.round((parseInt(latestTransaction)/12.5) * 100) /100;
	}
	if(priority === "5")
	{
		advice.innerHTML = "Because this is a priority 5 project, we recommend setting aside this much from your latest incoming transaction: ";
		amount.innerHTML = Math.round((parseInt(latestTransaction)/15) * 100) /100;
	}
	div.appendChild(advice);
	div.appendChild(amount);
}

function pledge(id) {
	const goal = document.getElementById(id+"goal").innerHTML;
	const amount = document.getElementById(id+"advice").innerHTML;
	console.log(goal - amount);
	const result = goal - amount;
	if(result === NaN)
	{
		console.log("ERROR - NaN");
	}
	else if(result <= 0)
	{
		document.getElementById(id+"advice").innerHTML = "Goal reached with " + ( Math.round((amount - goal) * 100) /100) + " leftover.";
		document.getElementById(id+"goal").innerHTML = "Goal reached!";
	}
	else {
		document.getElementById(id+"goal").innerHTML = result;
		document.getElementById(id+"advice").innerHTML = "Pledged!";
	}
}

addCardInfo("376");

createProject("TITLE", "These are the project spaces! the 'pledge' button is non functioning but will be implemented very soon!", "1000", "NOV 10", "1");
createProject("This is a larger title demo", "Descriptions will be stored in the database as a long string, so they'll be able to display here too!", "1000", "JAN 30", "3");
createProject("More info", "Since descriptions are optional (as well as deadlines) a project without a deadline or description will look like that >", "50", "NOV 15", "5");
createProject("TITLE2", " ", "20", " ", "2");
createProject("More info", " ", "50", "NOV 15", "4");
createProject("More info", " ", "50", "NOV 15", "4");

