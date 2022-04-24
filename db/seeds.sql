INSERT INTO department (name)
VALUES 
('Engineering'),
('Human Resources'),
('Software Dev.');

INSERT INTO role (title, salary, department_id)
VALUES 
('Engineer', '90000.0', 1),
('HR Representative', '85000.0', 2),
('Developer', '90000.0', 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Smith', 1, NULL),
('Jane', 'Doe', 3, 1),
('Kevin', 'Schmidt', 2, 1);