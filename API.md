# Sprachdialogsysteme API Documentation
Stand: 26. Mai 2014

API für den Server des Infosystems der THM im Rahmen des Faches _Sprachdialogsysteme_ im Sommersemester 2014 an der Technischen Hochschule Mittelhessen.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Add Report: Start Call](#add-report-start-call)
  - [Target](#target)
  - [Parameters](#parameters)
  - [Response](#response)
    - [Erfolgreich Eintrag angelegt und bekannte ANI](#erfolgreich-eintrag-angelegt-und-bekannte-ani)
    - [Fehlende oder fehlerhafte Parameter](#fehlende-oder-fehlerhafte-parameter)
- [Add Report: Menu Choice](#add-report-menu-choice)
  - [Target](#target-1)
  - [Parameters](#parameters-1)
  - [Response](#response-1)
    - [Erfolgreich angelegt](#erfolgreich-angelegt)
    - [Fehlende oder fehlerhafte Parameter](#fehlende-oder-fehlerhafte-parameter-1)
- [Add Report: End Call](#add-report-end-call)
  - [Target](#target-2)
  - [Parameters](#parameters-2)
  - [Response](#response-2)
    - [Erfolgreich angelegt](#erfolgreich-angelegt-1)
    - [Fehlende oder fehlerhafte Parameter](#fehlende-oder-fehlerhafte-parameter-2)
- [Check Matrikelnummer](#check-matrikelnummer)
  - [Target](#target-3)
  - [Parameters](#parameters-3)
  - [Response](#response-3)
    - [Matrikelnummer gefunden](#matrikelnummer-gefunden)
    - [Matrikelnummer nicht gefunden](#matrikelnummer-nicht-gefunden)
- [ClassInfo](#classinfo)
  - [Target](#target-4)
  - [Parameters](#parameters-4)
  - [Response](#response-4)
    - [Kurs gefunden](#kurs-gefunden)
    - [Kurs nicht gefunden](#kurs-nicht-gefunden)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Add Report: Start Call

Erstelle Logeintrag für Event: Start Call

### Target

`POST /reports/start`

### Parameters

| Name    | Type         | Description|
| ------------- |:-------------:| -----:|
| callId      | string | **Required** ID of the Call |
| timestamp | string | **Required** Timestamp of the Report |
| ani      | string  | **Required** ANI of the Call |

### Response

#### Erfolgreich Eintrag angelegt und bekannte ANI

```json
{
    "status": "ok",
    "name": "Max Mustermann"
}
```

#### Fehlende oder fehlerhafte Parameter

```json
{
    "status": "not_ok",
    "name": ""
}
```

## Add Report: Menu Choice

Erstelle Logeintrag für Menüauswahl-Event:

### Target

`POST /reports/menu`

### Parameters

| Name    | Type         | Description|
| ------------- |:-------------:| -----:|
| callId      | string | **Required** ID of the Call |
| timestamp | string | **Required** Timestamp of the Report |
| choice | string  | **Required** Menu-Choice |

### Response

#### Erfolgreich angelegt

```json
{
    "status": "ok"
}
```

#### Fehlende oder fehlerhafte Parameter

```json
{
    "status": "not_ok"
}
```

## Add Report: End Call

Erstelle Logeintrag für End-Call-Event:

### Target

`POST /reports/end`

### Parameters

| Name    | Type         | Description|
| ------------- |:-------------:| -----:|
| callId      | string | **Required**. ID of the Call |
| timestamp | string | **Required** Timestamp of the Report |

### Response

#### Erfolgreich angelegt

```json
{
    "status": "ok"
}
```

#### Fehlende oder fehlerhafte Parameter

```json
{
    "status": "not_ok"
}
```

## Check Matrikelnummer

Prüfe Matrikelnummer auf Gültigkeit und gebe Name zurück.

### Target

`GET /matrikelnummer`

### Parameters

| Name    | Type         | Description|
| ------------- |:-------------:| -----:|
| callId      | string | **Required**. ID of the Call |
| matrikelnummer | string | **Required**. Matrikelnummer of the User |

### Response

#### Matrikelnummer gefunden

```json
{
    "status": "ok",
    "name": "Max Mustermann"
}
```

#### Matrikelnummer nicht gefunden

```json
{
    "status": "not_ok",
    "name": ""
}
```

## ClassInfo

Gebe Informationen zu Kurs anhand von KursID. 

### Target

`GET /class`

### Parameters

| Name    | Type         | Description|
| ------------- |:-------------:| -----:|
| callId      | string | **Required**. ID of the Call |
| classId | string | **Required**. ID of the class |

### Response

#### Kurs gefunden

```json
{
    "status": "ok",
    "classId": "MM14",
    "classTitle": "Konzeption von Sprachdialogsystemen und Realisierung von Sprachportalen",
    "description": "Vorlesung: Architektur und Komponenten von Voice Plattformen (Voice Engines und Prozesse), Konzeptionierung eines Voice-User-Interfaces (Dialogstrukturen, Prompting und Persona Design), Dialog Implementierung (VoiceXML, Grammatikerstellung, Audioaufbereitung) Konzeption und Aufbau eines Sprachportals, Dynamische Dialoge mit Content aus Datenbank, Planung und Management von Sprachprojekten Ausblick auf multimodale Interaktionssysteme. Praktikum: Programmierung eines Sprachdialogs in VoiceXML; Realisierung eines Sprachportals mit dynamischen Content aus Datenbank."
}
```

#### Kurs nicht gefunden

```json
{
    "status": "not_ok",
    "classId": "",
    "classTitle": "",
    "description": ""
}
```
