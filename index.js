var express = require('express'),
	http = require('http'),
    app = express(),
	port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
	db = mongoose.connect('mongodb://db_usr:db_pass@ds013172.mlab.com:13172/studentgrades'),
 	db_schema = require('./student_schema'),
	Grades = require('./studetGrades_modules'),
	StudentGrades = null,
	jsonData;

mongoose.connection.once('open', function(){
	db_schema.find({}, function(err, data){
		console.log("connected to mongoDB");
		if(err != null){
			StudentGrades = new Grades(data); 
		}
		else{
			console.log(err);
		}
		mongoose.disconnect(); 
	});
});

app.get('/getGrades', function(req, res){
	res.status(200).json(StudentGrades.getGrades());
});

app.get('/getGradeById/:id', function(req, res){
	jsonData = StudentGrades.geGradeById(req.params.id);
	if (jsonData.status == false){
		res.set('header-getGradeById',"wrong id!");
		res.status(400).json(jsonData);
	}
	else 
		res.status(200).json(jsonData);
});

app.get('/getTopGradesByYear/:year', function(req, res){
	jsonData = StudentGrades.getTopGradesByYear(req.params.year);
	if (tempJson.status == false){
		res.set('header-TopGradesByYear',"cannot find any studnet in that year!");
		res.status(400).json(jsonData);
	}
	else 
		res.status(200).json(jsonData);
});

app.get('/', function(req, res){
	res.status(400).json({'Error' : 'path not exists, please look at the api',
			  'api': 'https://github.com/kogrego/StudentAPI'});
	});


app.all('*', function(req,res){
	res.status(400).json({'Error' : 'path not exists, please look at the api',
			  'api': 'https://github.com/kogrego/StudentAPI'});
});

http.createServer(app).listen(port);
console.log('server is listening on port' + port);
