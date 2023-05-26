# Sample Student CRUD API

This project is build using Express.js and MongoDB.
This project has a sample student CRUD API having functionalities:

1) You can give a range of total_marks to filter the list of students
2) You can give a range of percentage to filer the list of students
3) You can give grade to filter the list of students
4) You can add new students and it will automatically calculate total_marks, percentage and grade
5) You can update students and it will automatically calculate updated total_marks, percentage and grade
6) You can delete students

The results from get api sorts using roll number.

## Procedure to run the project:
1) npm install
2) add database url in .env file and port.
3) npm run start
4) Add few students using create student api.
