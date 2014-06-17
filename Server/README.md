# SDIAppServer

Server for Sprachdialogsysteme, Medieninformatik Master, SS2014, Technische Hochschlue Mittelhessen

## Prerequisites

* [node.js](http://nodejs.org/)
* mySQL Database

* Zusätzlich unter Windows:
  * [Python 2.7.x](https://www.python.org/)
  * [git](http://www.git-scm.com/) mit CMD Integration

## Install

* Clone Repo
* `cd` to this directory (/Server)
* `npm install`, to install dependencies
* create mySQL Database called *sdi*
* enter mySQL Account-data in line 8 of server.js

## Start

* `node server.js`
* see how the tables in the database apppear
* try some requests as shown in API Doc