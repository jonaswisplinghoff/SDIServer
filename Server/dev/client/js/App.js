/**
 * Created by atabaksahraei on 24.06.14.
 */

var sdiReport = angular.module('sdiReport', []);


function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('http://0.0.0.0:8080/reports')
        .success(function(data) {
            $scope.reports = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


/*    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };*/

}
/*
var request = $.ajax({
        type: "POST",
        dataType: "jsonp",
        contentType: 'application/json',
        //async: false,
        cache: true,
        jsonpCallback : 'myCallback',
        url: "http://0.0.0.0:8080/reports"
    });

    request.done(function (response, status, xhr) {
        console.info("success");
        $('#results').append(response.myKey);

    });
    request.fail(function (xhr, ajaxOptions, thrownError) {
        console.info("error: ", thrownError);
    })
    request.always(function () {
        console.info("finished");
    });

    function myCallback(a)
    {
        console.info("callback");
    }
*/