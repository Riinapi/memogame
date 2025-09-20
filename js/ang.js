var app = angular.module('myApp', []);

    app.controller('myCtrl', function ($scope) {
         // alustus
      $scope.show = false;
      $scope.GameStarted = false;
      $scope.GameEnded = false;

        // ohjeiden näyttäminen
      $scope.howPlay = function () {
        $scope.show = !$scope.show;
      };
     
        // pelin aloitus
      $scope.startGame = function () {
        $scope.GameStarted = true;
      };

        // pelin lpetus  
      $scope.endGame = function () {
        $scope.GameEnded = true;
        $scope.GameStarted = false;
      };
    });

    // ajastin
    app.controller('TimerClock', function ($scope, $interval) {
    // alustus
      $scope.seconds = 0;
      $scope.minutes = 0;
      $scope.Timer = '00:00';

      var timeHandler;

        // ajan laskun aloitus 
      function startTimer() {
        timeHandler = $interval(function () {
          $scope.seconds++;

          if ($scope.seconds === 60) {
            $scope.seconds = 0;
            $scope.minutes++;
          }

          $scope.Timer = ('0' + $scope.minutes).slice(-2) + ':' + ('0' + $scope.seconds).slice(-2);
        }, 1000); // ajan muoto 
      }

        // ajan laskun lopetus
      $scope.stopTimer = function () {
        if (angular.isDefined(timeHandler)) {
            $interval.cancel(timeHandler);
        }
      }

        // pelin käynnistämisen/lopetuksen seuranta
      $scope.$watch('GameStarted', function (newValue) {
        if (newValue) {
          startTimer();
        } else {
          $scope.stopTimer();
        }
      });
    })