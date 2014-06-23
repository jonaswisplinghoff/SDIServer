var restify = require('restify');
var orm = require("orm"); 

var server = restify.createServer();
	server.use(restify.queryParser());
	server.use(restify.bodyParser({mapParams: true}));

var db = orm.connect("mysql://root:root@localhost:3306/sdi");

db.on("connect", function (err) {
    if (err) {
        console.log("Something is wrong with the connection", err);
        return;
    }

    console.log("Database connected!");
    
});

// !MODELS

var Student = db.define('student', {
  id      : { type: "serial", key: true },
  name    : String,
  surname : String,
  matrikelnummer: {type: "text", unique: true},
  ani: {type: "text", unique: true}
}, {
  methods : {
    getFullName: function () {
      return this.name + " " + this.surname;
    }
  }
});

var Course = db.define('course', {
	id		:{type: "serial", key: true},
	classId	: String,
	classTitle: String,
	classDescription: { type: "text" }
}, {
  methods:{
	getClassId: function (){
		return this.classId;
	},
	getClassTitle: function() {
		return this.classTitle;
	},
	getClassDescription: function() {
		return this.classDescription;
	}
  }
});

var Log = db.define('log', {
	id		: {type: "serial", key: true},
	callId	: { type: "number"},
	timestamp: { type: "date", time: true },
	event: { type: "enum", values: [ "start", "menu", "end" ] },
	choice: String
}, {
	methods:{
		
	}
});

// !SETUP DATABASE

db.drop(function(){
	Student.sync(function(){
		var newStudent ={};
		newStudent.name = "Max";
		newStudent.surname = "Mustermann";
		newStudent.matrikelnummer = "123456";
		newStudent.ani = "0800111111";
		Student.create(newStudent, function(err, results){
			if (err) {
		    	console.log("Something is wrong with the student creation", err);
		    	return;
			}
		});
	});
	Course.sync(function(){
		var newCourse = {};
		newCourse.classId = "MM14";
		newCourse.classTitle = "Konzeption von Sprachdialogsystemen und Realisierung von Sprachportalen";
		newCourse.classDescription = "Vorlesung: Architektur und Komponenten von Voice Plattformen (Voice Engines und Prozesse), Konzeptionierung eines Voice-User-Interfaces (Dialogstrukturen, Prompting und Persona Design), Dialog Implementierung (VoiceXML, Grammatikerstellung, Audioaufbereitung) Konzeption und Aufbau eines Sprachportals, Dynamische Dialoge mit Content aus Datenbank, Planung und Management von Sprachprojekten Ausblick auf multimodale Interaktionssysteme. Praktikum: Programmierung eines Sprachdialogs in VoiceXML; Realisierung eines Sprachportals mit dynamischen Content aus Datenbank.";
		Course.create(newCourse, function(err, results){
			if (err) {
		    	console.log("Something is wrong with the course creation", err);
		    	return;
			}
		});
	});
    Log.sync(function(){});
}); 

// !REQUEST HANDLER

// TODO: check incoming timestamps for valid format 

server.post('/reports/start', function (req, res, next) {
   console.log('POST /reports/start callId: ' + req.params.callId + ' timestamp: ' + req.params.timestamp + ' ani: ' + req.params.ani);
   res.contentType = 'json';
   var response = {};

   if(typeof req.params.callId != "undefined" && 
   		typeof req.params.timestamp != "undefined" && 
   		typeof req.params.ani != "undefined"){	

	   	var newLog = {};
	   	newLog.callId = req.params.callId;
	   	newLog.timestamp = req.params.timestamp;
	   	newLog.event = "start";
	   	Log.create(newLog, function(err, results) {
			if (err) {
		    	console.log("Something is wrong with the log creation", err);
		    	return;
			}
		});

		Student.find({ani:req.params.ani}, function(err, persons){
			if (err) {
		    	console.log("Something is wrong with the connection", err);
		    	return;
			}
			if(persons.length == 1){
				response.status = "ok";
				response.name = persons[0].getFullName();
				res.send(response);
			}
			else{
				response.status = "ok";
				response.name = "";
				res.send(response);
			}
		});
   }
   else{
   		response.status = "not_ok";
   		response.name = "";
   		res.send(response);
   }
   next();
});

server.post('/reports/menu', function (req, res, next) {
   console.log('POST /reports/menu callId: ' + req.params.callId + ' timestamp: ' + req.params.timestamp + ' choice: ' + req.params.choice);
   res.contentType = 'json';
   var response = {};

   if(typeof req.params.callId != "undefined" && 
   		typeof req.params.timestamp != "undefined" && 
   		typeof req.params.choice != "undefined"){	
   		
   		var newLog = {};
	   	newLog.callId = req.params.callId;
	   	newLog.timestamp = req.params.timestamp;
	   	newLog.event = "menu";
	   	newLog.choice = req.params.choice;
	   	Log.create(newLog, function(err, results) {
			if (err) {
		    	console.log("Something is wrong with the log creation", err);
		    	return;
			}
		});
		response.status = "ok";
		res.send(response);
   }
   else{
   		response.status = "not_ok";
   		res.send(response);
   }
   next();
});

server.post('/reports/end', function (req, res, next) {
   console.log('POST /reports/end callId: ' + req.params.callId + ' timestamp: ' + req.params.timestamp);
   res.contentType = 'json';
   var response = {};

   if(typeof req.params.callId != "undefined" && 
   		typeof req.params.timestamp != "undefined"){	
	   		
	   		var newLog = {};
		   	newLog.callId = req.params.callId;
		   	newLog.timestamp = req.params.timestamp;
		   	newLog.event = "end";
		   	Log.create(newLog, function(err, results) {
				if (err) {
			    	console.log("Something is wrong with the log creation", err);
			    	return;
				}
			});
   			response.status = "ok";
   			res.send(response);	
   }
   else{
	   		response.status = "not_ok";
	   		res.send(response);
   }
   next();
});

server.get('/matrikelnummer', function (req, res, next) {
   console.log('GET /matrikelnummer id: ' + req.params.callId + ' matrikelnummer: ' + req.params.matrikelnummer);
   res.contentType = 'json';
   var response = {};

   if(typeof req.params.callId != "undefined" && 
   		typeof req.params.matrikelnummer != "undefined"){	

	   	Student.find({matrikelnummer: req.params.matrikelnummer}, function(err, persons){
			if (err) {
		    	console.log("Something is wrong with the connection", err);
		    	return;
			}
			if(persons.length == 1){
				response.status = "ok";
				response.name = persons[0].getFullName();
				res.send(response);
			}
			else{
				response.status = "ok";
				response.name = "";
				res.send(response);
			}
		});
   }
   else{
   		response.status = "not_ok";
		response.name = "";
		res.send(response);
   }
   next();
});


server.get('/class', function (req, res, next) {
   console.log('GET /class callId: ' + req.params.callId + ' classId: ' + req.params.classId);
   res.contentType = 'json';
   var response = {};

   if(typeof req.params.callId != "undefined" && typeof req.params.classId != "undefined"){	
   
   		Course.find({classId: req.params.classId}, function(err, classes){
	   		if (err) {
		    	console.log("Something is wrong with the connection", err);
		    	return;
			}
	   		if(classes.length == 1){
	   			response.status = "ok";
	   			response.classId = classes[0].getClassId();
	   			response.classTitle = classes[0].getClassTitle();
	   			response.description = classes[0].getClassDescription();
	   			res.send(response);
	   		}
	   		else{
	   			response.status = "not_ok";
	   			response.classId = "";
	   			response.classTitle = "";
	   			response.description = "";
	   			res.send(response);
		   	}
   		});
   }
   else{
   		response.status = "not_ok";
		response.classId = "";
		response.classTitle = "";
		response.description = "";
		res.send(response);
   }
   next();
});


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
