'use strict';

angular.module('2048App')
  .service('ScoreManager', ['$http', function ($http) {

    var fakeStorage = {
      _data: {},

      setItem: function (id, val) {
        return this._data[id] = String(val);
      },

      getItem: function (id) {
        return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
      },

      removeItem: function (id) {
        return delete this._data[id];
      },

      clear: function () {
        return this._data = {};
      }
    };

    function LocalScoreManager() {
      var manager = this;

      function localStorageSupported() {
        var testKey = "test";
        var storage = window.localStorage;

        try {
          storage.setItem(testKey, "1");
          storage.removeItem(testKey);
          return true;
        } catch (error) {
          return false;
        }
      }

      var storage = localStorageSupported() ? window.localStorage : window.fakeStorage;

      var privateScore = 0;

      /**
       * @ngdoc
       * @propertyOf 2048App.service:ScoreManager
       * @name 2048App.service:ScoreManager#score
       * @description The current score.
       */
      Object.defineProperty(manager, 'score', {
        get: function() {
          return privateScore;
        },
        set: function(newScore) {
          privateScore = newScore;
          return privateScore;
        }
      });

      var best;

      /**
       * @ngdoc
       * @propertyOf 2048App.service:ScoreManager
       * @name 2048App.service:ScoreManager#best
       * @description The user's best score.
       */
      Object.defineProperty(manager, 'best', {
        get: function() {
          if(!best)
            best = storage.getItem('best') || 0;
          return best;
        },
        set: function(newScore) {
          best = newScore;
          storage.setItem('best', best);
          return best;
        }
      });
    }

    return new LocalScoreManager();
  }]);
