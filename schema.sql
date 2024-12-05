CREATE DATABASE IF NOT EXISTS ResumeDB;
USE ResumeDB;


CREATE TABLE `Skills` (
  `skill_id` INT AUTO_INCREMENT PRIMARY KEY,
  `description` TEXT,
  `skill_name` VARCHAR(255),
  `proficiency` VARCHAR(50)
);

CREATE TABLE `Experience` (
  `experience_id` INT AUTO_INCREMENT PRIMARY KEY,
  `job_title` VARCHAR(255),
  `company_name` VARCHAR(255),
  `start_date` DATE,
  `end_date` DATE,
  `description` TEXT
);

CREATE TABLE `Projects` (
  `project_id` INT AUTO_INCREMENT PRIMARY KEY,
  `project_name` VARCHAR(255),
  `project_description` TEXT
);

CREATE TABLE `Education` (
  `education_id` INT AUTO_INCREMENT PRIMARY KEY,
  `institution_name` VARCHAR(255),
  `degree` VARCHAR(255),
  `graduation_date` DATE
);

CREATE TABLE `Interests` (
  `interest_id` INT AUTO_INCREMENT PRIMARY KEY,
  `interest` VARCHAR(255),
  `description` TEXT
);

CREATE TABLE `Awards` (
  `award_id` INT AUTO_INCREMENT PRIMARY KEY,
  `award_name` VARCHAR(255),
  `award_description` TEXT,
  `date_earned` DATE
);

CREATE TABLE `Template` (
  `template_id` INT AUTO_INCREMENT PRIMARY KEY,
  `template_description` TEXT
);

CREATE TABLE `User` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255),
  `email` VARCHAR(255) UNIQUE,
  `address` TEXT,
  `phone` VARCHAR(50),
  `github_link` VARCHAR(255),
  `portfolio_link` VARCHAR(255),
  `linkedin_link` VARCHAR(255)
);

CREATE TABLE `Resume` (
  `resume_id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT,
  `template_id` INT,
  FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`),
  FOREIGN KEY (`template_id`) REFERENCES `Template`(`template_id`)
);

-- User-Specific Tables (Normalizing Many-to-Many Relationships)

CREATE TABLE `user_skills` (
  `user_id` INT,
  `skill_id` INT,
  PRIMARY KEY (`user_id`, `skill_id`),
  FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`),
  FOREIGN KEY (`skill_id`) REFERENCES `Skills`(`skill_id`)
);

CREATE TABLE `user_experience` (
  `user_id` INT,
  `experience_id` INT,
  PRIMARY KEY (`user_id`, `experience_id`),
  FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`),
  FOREIGN KEY (`experience_id`) REFERENCES `Experience`(`experience_id`)
);

CREATE TABLE `user_projects` (
  `user_id` INT,
  `project_id` INT,
  PRIMARY KEY (`user_id`, `project_id`),
  FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`),
  FOREIGN KEY (`project_id`) REFERENCES `Projects`(`project_id`)
);

CREATE TABLE `user_education` (
  `user_id` INT,
  `education_id` INT,
  PRIMARY KEY (`user_id`, `education_id`),
  FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`),
  FOREIGN KEY (`education_id`) REFERENCES `Education`(`education_id`)
);

CREATE TABLE `user_interests` (
  `user_id` INT,
  `interest_id` INT,
  PRIMARY KEY (`user_id`, `interest_id`),
  FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`),
  FOREIGN KEY (`interest_id`) REFERENCES `Interests`(`interest_id`)
);

CREATE TABLE `user_awards` (
  `user_id` INT,
  `award_id` INT,
  PRIMARY KEY (`user_id`, `award_id`),
  FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`),
  FOREIGN KEY (`award_id`) REFERENCES `Awards`(`award_id`)
);

-- Indexes for better query performance
CREATE INDEX idx_user_email ON `User`(`email`);
CREATE INDEX idx_resume_user_id ON `Resume`(`user_id`);
CREATE INDEX idx_resume_template_id ON `Resume`(`template_id`);
CREATE INDEX idx_experience_company_name ON `Experience`(`company_name`);
CREATE INDEX idx_awards_date_earned ON `Awards`(`date_earned`);