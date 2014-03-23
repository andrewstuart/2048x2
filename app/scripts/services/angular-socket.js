'use strict';

angular.module('AngularSocket',[])
  .provider('AngularSocket', function() {
    this.$get = ['$rootScope', '$q', function($rootScope, $q) {
      function SocketFactory() {
        var socketFactory = this;
        var socketList = {};

        function Socket(url) {
          var socket = this;
          var eventHandlers = {};

          /**
           * @ngdoc
           * @methodOf AngularSocket.object:Socket
           * @name AngularSocket.object:Socket#on
           * @description Registers a handler with the Socket that will be fired if the server sends an event with that name.
           */

          socket.on = function(event, handler) {
            var handlers = eventHandlers[event] = eventHandlers[event] || [];
            handlers.push(handler);
          };

          function emitFromRemote(event, data) {
            //Default handlers again.
            eventHandlers[event] = eventHandlers[event] || [];
            //Visit each handler and apply all arguments (except the name)
            eventHandlers[event].forEach(function(handler) {
              handler(data);
            });
          }

          var webSocket = new WebSocket(url);

          var ready = false;
          var waiting = [];

          webSocket.onopen = function() {
            waiting.forEach(function(fn) {
              fn();
            });
            ready = true;
          };

          webSocket.onmessage = function(event) {
            var data;
            $rootScope.$apply(function() {
              try {
                data = JSON.parse(event.data);
                if(data.Name && data.Data || data.name && data.data) {
                  emitFromRemote(data.Name, data.Data);
                } else {
                  emitFromRemote('_event', event);
                }
              } catch (parseError) {
                emitFromRemote('_event', event);
              }
            });
          };

          /**
           * @ngdoc
           * @methodOf AngularSocket.object:Socket
           * @name AngularSocket.object:Socket#emit
           * @description Emits an event and returns a promise that will be resolved with the data returned from the server.
           */

          socket.emit = function(name, data) {
            var deferred = $q.defer();

            function send() {
              var oldMessageHandler = webSocket.onmessage;

              webSocket.onmessage = function(data) {
                try {
                  data = JSON.parse(data.data);
                  deferred.resolve(data) ;
                } catch (e) {
                  deferred.reject(data.data || e);
                } finally {
                  webSocket.onmessage = oldMessageHandler;
                }
              };

              webSocket.send(JSON.stringify({name: name, data: data}));
            }

            if(ready) {
              send();
            } else {
              waiting.push(send);
            }

            return deferred.promise;
          };


        }

        socketFactory.get = function(name, url) {
          if(!name) {
            throw 'You cannot get a socket with no name.';
          } else if(socketList[name]) {
            return socketList[name];
          } else if (name && url) {
            return socketList[name] = new Socket(url);
          } else if (!url) {
            throw 'No socket exists with name ' + name + '. Please provide a URL.';
          }
        };

      }
      return new SocketFactory();
    }];
  });
