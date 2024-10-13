CREATE TABLE User (
    user_id INT(10) UNSIGNED AUTO_INCREMENT, -- 10 digit integer, automatically increments
    username VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE Project (
    project_id INT(6) UNSIGNED AUTO_INCREMENT, -- 6 digit integer, automatically increments
    user_id INT(10) UNSIGNED NOT NULL, -- Foreign key linking to the User table
    project_title VARCHAR(256) NOT NULL,
    project_description LONGTEXT,
    renewable BOOLEAN,
    priority TINYINT(1), -- 1 digit integer for priority
    deadline DATE,
    PRIMARY KEY (project_id, user_id), -- Composite primary key
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE -- If user is deleted, projects are deleted too
);

CREATE TABLE Card (
    user_id INT(10) UNSIGNED NOT NULL, -- Foreign key linking to the User table
    card_number BIGINT(16) UNSIGNED, -- 16 digit integer for card number
    PRIMARY KEY (card_number),
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE -- If user is deleted, card is deleted too
);

CREATE TABLE MockupBank (
    card_number BIGINT(16) UNSIGNED NOT NULL, -- 16 digit integer for card number
    card_owner VARCHAR(256) NOT NULL,
    expiration INT(4) UNSIGNED, -- 4 digit integer for expiration (MMYY format)
    security_code SMALLINT(3) UNSIGNED, -- 3 digit integer for security code
    PRIMARY KEY (card_number, expiration, security_code), -- Composite primary key
    FOREIGN KEY (card_number) REFERENCES Card(card_number) ON DELETE CASCADE -- If card is deleted, mockup bank record is deleted too
);

