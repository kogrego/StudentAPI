'use strict';

var EventEmitter = require('events').EventEmitter,
    express = require('express'),
    eventsConfig = require('./config').events;

class Grades extends EventEmitter {
    constructor(data) {
        super();
        this.json = null;
        this.data = data;

        this.on(eventsConfig.GETGRADES, function() {   
            if (this.data == null){
                this.data = data;
            }
        });

        this.on(eventsConfig.GETGRADEBYID, function(id) { 
            this.data.forEach(function(entry) {
                if(entry.studentId == id){
                    this.json = entry;
                }
            });
           if (this.json == null){
            this.json = {'Error': 'Wrong Id',
                        'status':false,
                       'ShowAll': 'to see the list of students => path: getAllStudentsGrades'};
            }
        });

        this.on(eventsConfig.GETTOPBYYEAR, function(year) {
            var jsonGrades = this.data;
            var len = jsonGrades.length;
            var limit = 0;
            var topCount = 0;
            var temp;
            jsonGrades.forEach(function(grade){
            		if(grade.year == year){
            			if(topCount >= 3){
            				temp.forEach(function(topGrade){
            					if(topGrade.avg < grade){
            						if(topGrade.avg == limit){
            							temp.remove(topGrade);
            							temp.add(grade);
            						}
            					}
            				})
            				temp.forEach(function(topGrade){
        						if(topGrade.avg < limit){
        							limit = topGrade.avg;
        						}
            				})
            			}
            			else{
            				temp.add(grade);
            				if(grade.avg < limit){
            					limit = grade.avg;
            				}
            				topCount++;
            			}
            			this.json = temp;
            		}
            })
            if(this.json == null){ // if we didnt find any students in the year
                this.json = {'Error':'cannot find any students in year: ' + year,'status':false};
            }
        });
    }

    getGrades() {
        this.emit(eventsConfig.GETGRADES);
            console.log('\nStudents list\n\n' + this.data);
        return this.data;
    }

    geGradeById(id) {
       this.emit(eventsConfig.GETGRADEBYID,id);
       if(this.data.status == false)
            console.log('\nStudent id @:'+ id +' \n\n' + this.json);
       return this.json;
    }

    getTopGradesByYear(year) {
        this.emit(eventsConfig.GETTOPBYYEAR,year);
        if(this.data.status == false)
            console.log('\nTop 3 students in year:'+ year +'\n\n'+this.json);
        return this.json;
    }
}
module.exports = Grades;