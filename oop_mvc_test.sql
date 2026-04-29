-- Database: oop_mvc_test

-- Table structure for table users

CREATE TABLE users (
  id int(11) NOT NULL,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table users

INSERT INTO users (id, name, email) VALUES
(1, 'John Doe', 'john@example.com'),
(2, 'Alice Smith', 'alice@example.com'),
(3, 'Michael Brown', 'michael@example.com'),
(4, 'Sophia Lee', 'sophia@example.com'),
(5, 'David Wilson', 'david@example.com');

-- Indexes for table users

ALTER TABLE users
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY email (email);

-- AUTO_INCREMENT for table users

ALTER TABLE users
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

COMMIT;
