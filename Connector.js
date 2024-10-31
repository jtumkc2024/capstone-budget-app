const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "password",
	database: "database",
	port: "3306"
});

connection.connect((err)=> {
	if(err) {
		throw err;
	} else {
		console.log("connected.");
		//registerUser("user1", "pass", "test@test.com");
		//loginUser("user1", "pass");
	}
});

function registerUser(username, password, email) {
    try {
        const [result] = connection.execute(
            'INSERT INTO User (username, password, email) VALUES (?, ?, ?)',
            [username, password, email]
        );
        console.log('User registered:', result);
    } catch (error) {
        console.error('Error registering user:', error);
    } finally {
        connection.end();
    }
}

function loginUser(username, password) {

    try {
        const [rows] = connection.execute(
            'SELECT user_id, username FROM User WHERE username = ? AND password = ?',
            [username, password]
        );
        if (rows.length > 0) {
            console.log('Login successful:', rows[0]);
            return rows[0];
        } else {
            console.log('Invalid username or password.');
            return null;
        }
    } catch (error) {
        console.error('Error logging in user:', error);
    } finally {
        connection.end();
    }
}

function addProject(userId, projectTitle, projectDescription, goal, renewable, priority, deadline) {
    try {
        const [result] = connection.execute(
            'INSERT INTO Project (user_id, project_title, project_description, project_goal, current_amount, renewable, priority, deadline) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [userId, projectTitle, projectDescription, goal, goal, renewable, priority, deadline]
        );
        console.log('Project added:', result);
    } catch (error) {
        console.error('Error adding project:', error);
    } finally {
        connection.end();
    }
}