#!/bin/sh

curl -X GET "http://0.0.0.0:8080/reports/start?callId=123&timestamp=2014-01-27T12:15:11&ani=0800111110"
curl -X GET "http://0.0.0.0:8080/reports/menu?callId=123&timestamp=2014-01-27T12:15:11&choice=asd"
curl -X GET "http://0.0.0.0:8080/reports/menu?callId=123&timestamp=2014-01-27T12:15:11&choice=asdf"
curl -X GET "http://0.0.0.0:8080/reports/end?callId=123&timestamp=2014-01-27T12:15:11"

curl -X GET "http://0.0.0.0:8080/reports/start?callId=1234&timestamp=2014-02-27T12:15:11&ani=0800111111"
curl -X GET "http://0.0.0.0:8080/reports/menu?callId=1234&timestamp=2014-02-27T12:15:11&choice=asd"
curl -X GET "http://0.0.0.0:8080/reports/end?callId=1234&timestamp=2014-02-27T12:15:11"

curl -X GET "http://0.0.0.0:8080/reports/start?callId=12345&timestamp=2014-03-27T12:15:11&ani=0800111112"
curl -X GET "http://0.0.0.0:8080/reports/menu?callId=12345&timestamp=2014-03-27T12:15:11&choice=asd"
curl -X GET "http://0.0.0.0:8080/reports/menu?callId=12345&timestamp=2014-03-27T12:15:11&choice=asdf"
curl -X GET "http://0.0.0.0:8080/reports/end?callId=12345&timestamp=2014-03-27T12:15:11"

curl -X GET "http://0.0.0.0:8080/reports/start?callId=123456&timestamp=2014-04-27T12:15:11&ani=0800111113"
curl -X GET "http://0.0.0.0:8080/reports/menu?callId=123456&timestamp=2014-04-27T12:15:11&choice=asd"
curl -X GET "http://0.0.0.0:8080/reports/end?callId=123456&timestamp=2014-04-27T12:15:11"