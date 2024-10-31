const mysql = require('mysql2');

var connection = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "password",
	database: "database",
	port: "3306"
});

connection.connect((err)=> {
	if(err) {
		throw err
	} else {
		console.log("connected.")
	}
});

// Function to register a new user
export function registerUser(username, password, email) {
    const connection = mysql.createConnection(dbConfig);
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

// Function to login a user
export function loginUser(username, password) {
    const connection = mysql.createConnection(dbConfig);
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

// Function to add a project
export function addProject(userId, projectTitle, projectDescription, renewable, priority, deadline) {
    const connection = mysql.createConnection(dbConfig);
    try {
        const [result] = connection.execute(
            'INSERT INTO Project (user_id, project_title, project_description, renewable, priority, deadline) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, projectTitle, projectDescription, renewable, priority, deadline]
        );
        console.log('Project added:', result);
    } catch (error) {
        console.error('Error adding project:', error);
    } finally {
        connection.end();
    }
}

// Function to update project details
export function updateProject(userId, projectId, projectTitle, projectDescription, renewable, priority, deadline) {
    const connection = mysql.createConnection(dbConfig);
    try {
        const [result] = connection.execute(
            'UPDATE Project SET project_title = ?, project_description = ?, renewable = ?, priority = ?, deadline = ? WHERE project_id = ? AND user_id = ?',
            [projectTitle, projectDescription, renewable, priority, deadline, projectId, userId]
        );
        console.log('Project updated:', result);
    } catch (error) {
        console.error('Error updating project:', error);
    } finally {
        connection.end();
    }
}

// Function to delete a project
export function deleteProject(userId, projectId) {
    const connection = mysql.createConnection(dbConfig);
    try {
        const [result] = connection.execute(
            'DELETE FROM Project WHERE project_id = ? AND user_id = ?',
            [projectId, userId]
        );
        console.log('Project deleted:', result);
    } catch (error) {
        console.error('Error deleting project:', error);
    } finally {
        connection.end();
    }
}

// Function to update user settings (username, email, password)
export function updateUserSettings(userId, newUsername, newEmail, newPassword) {
    const connection = mysql.createConnection(dbConfig);
    try {
        const [result] = connection.execute(
            'UPDATE User SET username = ?, email = ?, password = ? WHERE user_id = ?',
            [newUsername, newEmail, newPassword, userId]
        );
        console.log('User settings updated:', result);
    } catch (error) {
        console.error('Error updating user settings:', error);
    } finally {
        connection.end();
    }
}

// Function to verify if a card exists in the bank database (MockupBank)
export function verifyCardExists(cardNumber) {
    const connection = mysql.createConnection(dbConfig);
    try {
        const [rows] = connection.execute(
            'SELECT card_number FROM MockupBank WHERE card_number = ?',
            [cardNumber]
        );
        if (rows.length > 0) {
            console.log('Card exists in MockupBank.');
            return true;
        } else {
            console.log('Card does not exist in MockupBank.');
            return false;
        }
    } catch (error) {
        console.error('Error verifying card:', error);
    } finally {
        connection.end();
    }
}

// Function to add a card (if it exists in the bank database)
export function addCard(userId, cardNumber) {
    const cardExists = verifyCardExists(cardNumber);
    if (cardExists) {
        const connection = mysql.createConnection(dbConfig);
        try {
            const [result] = connection.execute(
                'INSERT INTO Card (user_id, card_number) VALUES (?, ?)',
                [userId, cardNumber]
            );
            console.log('Card added to the Card table:', result);
        } catch (error) {
            console.error('Error adding card:', error);
        } finally {
            connection.end();
        }
    } else {
        console.log('Cannot add card. It does not exist in the MockupBank database.');
    }
}

// Function to delete a card from the card table
export function deleteCard(userId, cardNumber) {
    const connection = mysql.createConnection(dbConfig);
    try {
        const [result] = connection.execute(
            'DELETE FROM Card WHERE card_number = ? AND user_id = ?',
            [cardNumber, userId]
        );
        console.log('Card deleted from the Card table:', result);
    } catch (error) {
        console.error('Error deleting card:', error);
    } finally {
        connection.end();
    }
}

//export {registerUser};
//export {loginUser};
//export {addProject};
//export {updateProject};
//export {deleteProject};
//export {updateUserSettings};
//export {verifyCardExists};
//export {addCard};
//export {deleteCard};