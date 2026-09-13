-- AI Placement Preparation Platform — MySQL schema
CREATE DATABASE IF NOT EXISTS placement_platform;
USE placement_platform;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('STUDENT','ADMIN') DEFAULT 'STUDENT',
  target_role VARCHAR(100) DEFAULT NULL,
  target_company VARCHAR(100) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dsa_topics (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE dsa_problems (
  id INT PRIMARY KEY AUTO_INCREMENT,
  topic_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  difficulty ENUM('EASY','MEDIUM','HARD') NOT NULL,
  examples JSON,
  starter_code TEXT,
  FOREIGN KEY (topic_id) REFERENCES dsa_topics(id)
);

CREATE TABLE submissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  problem_id INT NOT NULL,
  language VARCHAR(30),
  code TEXT,
  status ENUM('ACCEPTED','ATTEMPTED') DEFAULT 'ATTEMPTED',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (problem_id) REFERENCES dsa_problems(id)
);

CREATE TABLE aptitude_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE aptitude_questions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT NOT NULL,
  question TEXT NOT NULL,
  option_a VARCHAR(255) NOT NULL,
  option_b VARCHAR(255) NOT NULL,
  option_c VARCHAR(255) NOT NULL,
  option_d VARCHAR(255) NOT NULL,
  correct_option CHAR(1) NOT NULL,
  FOREIGN KEY (category_id) REFERENCES aptitude_categories(id)
);

CREATE TABLE test_attempts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  score INT,
  total INT,
  taken_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE resumes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  file_url VARCHAR(500),
  target_role VARCHAR(100),
  overall_score DECIMAL(5,2),
  ai_feedback TEXT,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE student_progress (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT UNIQUE NOT NULL,
  dsa_score INT DEFAULT 0,
  aptitude_score INT DEFAULT 0,
  core_cs_score INT DEFAULT 0,
  interview_score INT DEFAULT 0,
  resume_score INT DEFAULT 0,
  readiness_score INT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE readiness_tests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  score INT NOT NULL,
  total INT NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  status VARCHAR(50) NOT NULL,
  category_breakdown JSON,
  weak_topics JSON,
  taken_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE company_playlists (
  id INT PRIMARY KEY AUTO_INCREMENT,
  company_name VARCHAR(100) NOT NULL,
  logo_url VARCHAR(255),
  description TEXT,
  pattern_info JSON,
  dsa_playlists JSON,
  aptitude_playlists JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- sample seed data
INSERT INTO dsa_topics (name, description) VALUES
('Arrays', 'Array manipulation and traversal problems'),
('Strings', 'String processing problems'),
('Linked List', 'Singly/doubly linked list problems');

INSERT INTO dsa_problems (topic_id, title, description, difficulty, examples, starter_code) VALUES
(1, 'Two Sum', 'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.',
 'EASY', '[{"input":"[2,7,11,15], target=9","output":"[0,1]"}]',
 'class Solution {\n  public int[] twoSum(int[] nums, int target) {\n    // write your code here\n  }\n}');

INSERT INTO aptitude_categories (name) VALUES ('Quantitative'), ('Logical Reasoning'), ('Verbal');

INSERT INTO aptitude_questions (category_id, question, option_a, option_b, option_c, option_d, correct_option) VALUES
(1, 'A train travels 60 km in 1.5 hours. What is its speed?', '30 km/h', '40 km/h', '45 km/h', '50 km/h', 'C');

