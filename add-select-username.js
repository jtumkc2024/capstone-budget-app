// Function to generate SQL for inserting a new user
function createInsertUserSQL(username, password, email) {
    return `
    INSERT INTO User (username, password, email)
    VALUES ('${username}', '${password}', '${email}');
    `;
}

// Function to generate SQL for selecting a user by username
function createSelectUserSQL(username) {
    return `
    SELECT * FROM User
    WHERE username = '${username}';
    `;
}
