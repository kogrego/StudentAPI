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
            var tempJson = null;
            this.data.forEach(function(entry) {
                if(entry.id == id){
                    tempJson = entry;
                }
            });
           if (tempJson == null){
            tempJson = {'Error': 'Wrong Id',
                        'status':false,
                       'ShowAll': 'to see the list of students => path: getAllStudentsGrades'};
            }
            this.json = tempJson;
        });

        this.on(eventsConfig.GETTOPBYYEAR, function(year) {
            var jsonGrades = this.data;
            var topCount = 0;
            var tempJson = [];
            jsonGrades.forEach(function(grade){
            		if(grade.year == year){
            			if(topCount >= 3){
            				if(grade.avg > tempJson[tempJson.length - 1].avg){
            					tempJson.pop();
            					tempJson.push(grade);
            				}
            			}
            			else{
            				tempJson.push(grade);
            				topCount++;
            			}
            			tempJson.sort(function(a, b) {
            				return b.avg - a.avg;
            			});
            		}
            });
            if(tempJson == null){ 
                tempJson = {'Error':'cannot find any students in year: ' + year,'status':false};
            }
            this.json = tempJson;
        });
    }

    getGrades() {
        this.emit(eventsConfig.GETGRADES);
        return this.data;
    }

    geGradeById(id) {
       this.emit(eventsConfig.GETGRADEBYID,id);
       return this.json;
    }

    getTopGradesByYear(year) {
        this.emit(eventsConfig.GETTOPBYYEAR,year);
        return this.json;
    }
}
module.exports = Grades;