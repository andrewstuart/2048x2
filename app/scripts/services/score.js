'use strict';

angular.module('2048App')
  .provider('ScoreManager', function () {
    var storageType = 'local';

    this.storageType = function(newType) {
      //Getter & setter
      return storageType = newType || storageType;
    };

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
      this.key     = "bestScore";

      var supported = this.localStorageSupported();
      this.storage = supported ? window.localStorage : window.fakeStorage;
    }

    LocalScoreManager.prototype.localStorageSupported = function () {
      var testKey = "test";
      var storage = window.localStorage;

      try {
        storage.setItem(testKey, "1");
        storage.removeItem(testKey);
        return true;
      } catch (error) {
        return false;
      }
    };

    LocalScoreManager.prototype.get = function () {
      return this.storage.getItem(this.key) || 0;
    };

    LocalScoreManager.prototype.set = function (score) {
      this.storage.setItem(this.key, score);
    };

    this.$get = function() {
      var storageTypes = {
        local: new LocalScoreManager()
      };

      return storageTypes[storageType];
    };
  });
