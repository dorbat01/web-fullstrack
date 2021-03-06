(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


MenuDataService.$inject = ['$q', '$http', 'ApiBasePath']
function MenuDataService($q, $http, ApiBasePath) {
  var service = this;

  // List of shopping items
  var items = [];
  var categories = [];

  service.getCategoryName = function (categoryShortName) {
    var found = "";
    for (var i = 0; i < categories.length; i++) {
            console.log(categories[i].short_name, i);
      if (categories[i].short_name.trim() === categoryShortName) {
        found = categories[i].name;
        return found;
      }
    }
    return found;
  };

  service.getItems = function (categoryShortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: categoryShortName
      }
    });

    return response;
  };

  service.getCategories = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    });

    return response;
  };

  service.getAllCategories = function () {
    var deferred = $q.defer();
    var promise = service.getCategories();

    promise.then(function (result) {
      categories = result.data;
      console.log(categories);
      deferred.resolve(categories);
    })
    .catch(function (error) {
      console.log(error);
      deferred.reject(response);
    })
    return deferred.promise;
  }

  service.getItemsForCategory = function (categoryShortName) {
    var deferred = $q.defer();
    var promise = service.getItems(categoryShortName);

    promise.then(function (result) {
      items = result.data.menu_items;
      console.log(items);
      deferred.resolve(items);
    })
    .catch(function (error) {
      console.log(error);
      deferred.reject(response);
    })
    return deferred.promise;
  };
}

})();
