var restify = require('restify');
var orm = require("orm"); 

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser({mapParams: true}));

server.post('/reports/start', function (req, res, next) {
   console.log('log startcall');
   console.log('id: ' + req.params.callId);
   console.log('timestamp: ' + req.params.timestamp);
   console.log('ani: ' + req.params.ani);

   if(typeof req.params.callId != "undefined" && 
   		typeof req.params.timestamp != "undefined" && 
   		typeof req.params.ani != "undefined"){	

   		if(req.params.ani === "12345"){

   			res.send(200, '{"status": "ok", "name": "Max Mustermann"}');
	   	}
   }
   else{
	   		res.send(200, '{"status": "not_ok", "name": ""}');
   }
   
   next();
});

server.post('/reports/menu', function (req, res, next) {
   console.log('log menuchoice');
   res.send(201, '{}')
   next();
});

server.post('/reports/end', function (req, res, next) {
   console.log('log endcall');
   res.send(201, '{}')
   next();
});

server.get('/matrikelnummer', function (req, res, next) {
   console.log('get name for matrikelnummer: ' + req.params.matrikelnummer);
   if(typeof req.params.matrikelnummer != "undefined"){
   	res.send(200, '{"name": "Max Mustermann"}')
   }
   else{
   	res.send(404, '');
   }
   next();
});

server.get('/class', function (req, res, next) {
   console.log('get class for id: ' + req.params.classId);
   if(typeof req.params.classId != "undefined"){
   	if(req.params.classId === "123"){
   		res.send(200, '{"classId": "MM14", "classTitle": "Konzeption von Sprachdialogsystemen und Realisierung von Sprachportalen", "description": "Vorlesung: Architektur und Komponenten von Voice Plattformen (Voice Engines und Prozesse), Konzeptionierung eines Voice-User-Interfaces (Dialogstrukturen, Prompting und Persona Design), Dialog Implementierung (VoiceXML, Grammatikerstellung, Audioaufbereitung) Konzeption und Aufbau eines Sprachportals, Dynamische Dialoge mit Content aus Datenbank, Planung und Management von Sprachprojekten Ausblick auf multimodale Interaktionssysteme. Praktikum: Programmierung eines Sprachdialogs in VoiceXML; Realisierung eines Sprachportals mit dynamischen Content aus Datenbank."}')
   	}
   	else{
   		res.send(204, '');
   	}
   }
   else{
   	res.send(404, '');
   }
   next();
});


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
