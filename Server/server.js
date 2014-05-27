var restify = require('restify');
var orm = require("orm"); 

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser({mapParams: true}));

var db = orm.connect({
    host     : "localhost",
    database : "sdi",
    user     : "root",
    password : "root",
    protocol : "mysql",
    socketPath: '/var/run/mysqld/mysqld.sock',
    port     : "8889",
    query    : {
    pool: true,
    debug: true
    }
});



server.post('/reports/start', function (req, res, next) {
   console.log('log startcall');
   console.log('id: ' + req.params.callId);
   console.log('timestamp: ' + req.params.timestamp);
   console.log('ani: ' + req.params.ani);

   if(typeof req.params.callId != "undefined" && 
   		typeof req.params.timestamp != "undefined" && 
   		typeof req.params.ani != "undefined"){	

   		if(req.params.ani === "12345"){

   			res.send('{"status": "ok", "name": "Max Mustermann"}');
	   	}
   }
   else{
	   		res.send('{"status": "not_ok", "name": ""}');
   }
   
   next();
});

server.post('/reports/menu', function (req, res, next) {
   console.log('log menuchoice');
   console.log('id: ' + req.params.callId);
   console.log('timestamp: ' + req.params.timestamp);
   console.log('choice: ' + req.params.choice);

   if(typeof req.params.callId != "undefined" && 
   		typeof req.params.timestamp != "undefined" && 
   		typeof req.params.choice != "undefined"){	
   		
   			//TODO: If erfolgreich angelegt
   			res.send('{"status": "ok"}');
   }
   else{
	   		res.send('{"status": "not_ok"}');
   }
   
   next();
});

server.post('/reports/end', function (req, res, next) {
   console.log('log end');
   console.log('id: ' + req.params.callId);
   console.log('timestamp: ' + req.params.timestamp);

   if(typeof req.params.callId != "undefined" && 
   		typeof req.params.timestamp != "undefined"){	
	   		
	   		//TODO: If erfolgreich angelegt
   			res.send('{"status": "ok"}');
	   	
   }
   else{
	   		res.send('{"status": "not_ok"}');
   }
   
   next();
});

server.get('/matrikelnummer', function (req, res, next) {
   console.log('log matrikelnummer');
   console.log('id: ' + req.params.callId);
   console.log('matrikelnummer: ' + req.params.matrikelnummer);

   if(typeof req.params.callId != "undefined" && 
   		typeof req.params.matrikelnummer != "undefined"){	

   		if(req.params.matrikelnummer === "12345"){
   			res.send('{"status": "ok", "name": "Max Mustermann"}');
	   	}
	   	else{
		   	res.send('{"status": "not_ok", "name": ""}');
	   	}
   }
   else{
	   		res.send('{"status": "not_ok", "name": ""}');
   }
   
   next();});

server.get('/class', function (req, res, next) {
   console.log('log class');
   console.log('id: ' + req.params.callId);
   console.log('matrikelnummer: ' + req.params.classId);

   if(typeof req.params.callId != "undefined" && typeof req.params.classId != "undefined"){	
	   	if(req.params.classId === "123"){
	   		res.send('{"classId": "MM14", "classTitle": "Konzeption von Sprachdialogsystemen und Realisierung von Sprachportalen", "description": "Vorlesung: Architektur und Komponenten von Voice Plattformen (Voice Engines und Prozesse), Konzeptionierung eines Voice-User-Interfaces (Dialogstrukturen, Prompting und Persona Design), Dialog Implementierung (VoiceXML, Grammatikerstellung, Audioaufbereitung) Konzeption und Aufbau eines Sprachportals, Dynamische Dialoge mit Content aus Datenbank, Planung und Management von Sprachprojekten Ausblick auf multimodale Interaktionssysteme. Praktikum: Programmierung eines Sprachdialogs in VoiceXML; Realisierung eines Sprachportals mit dynamischen Content aus Datenbank."}')
	   	}
	   	else{
		   	res.send('{"status": "not_ok", "classId": "", "classTitle": "", "description": ""}');
	   	}
   }
   else{
   		res.send('{"status": "not_ok", "classId": "", "classTitle": "", "description": ""}');
   }
   next();
});


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
