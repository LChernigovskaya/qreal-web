INSERT INTO users (username, password, enabled) VALUES ('user', '$2a$04$eWY0Czs5avEcJTDVRcB66.8n5mQmMnRCCTi6P/9oNAncfzyb8.D7e', TRUE);
INSERT INTO folders (folder_id, foldername, folder_parent) VALUES (1, 'root', '');
INSERT INTO user_roles (username, ROLE) VALUES ('user', 'ROLE_USER');