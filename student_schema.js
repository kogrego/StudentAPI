var mongoose = require('mongoose'),
	schema = mongoose.Schema,
	studentSchema;

var schema_name = new schema({
	id: Number,
	name: String,
	avg: Number,
	year:Number
}, {collection: 'StudentGrades'});

studentSchema = mongoose.model('studentSchema', schema_name);

module.exports = studentSchema;
