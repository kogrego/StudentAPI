# StudentAPI

Hello,
This is a simple API for student average grade.
the base URL to use the API is https://studentsapi.herokuapp.com<br>
the server returns a JSON object containing the data you requested or error information.

### Get all students data

Use https://studentsapi.herokuapp.com/getGrades to get the average grades of all students 

### Get student data by id

Use https://studentsapi.herokuapp.com/getGradeById/{id} to get student average grade by id (currenty, only the id 0-11 are present in the DB).

### Get top 3 student in a selected year

Use https://studentsapi.herokuapp.com/getTopGradesByYear/{year} (currenty, only the years 2012, 2013, 2014 are present in the DB).
