angular.module('buttons',[])
  .controller('buttonCtrl',ButtonCtrl)
  .factory('buttonApi',buttonApi)
  .constant('apiUrl','http://localhost:1337'); // CHANGED for the lab 2017!

function ButtonCtrl($scope,buttonApi){
   $scope.buttons=[]; //Initially all was still
   $scope.users=[];
   $scope.transactionState=[];
   $scope.total=0;
   $scope.errorMessage='';
   $scope.isLoading=isLoading;
   $scope.refreshButtons=refreshButtons;
   $scope.buttonClick=buttonClick;
   $scope.transactionVoid=transactionVoid;
   $scope.returnTotal=returnTotal;
   $scope.deleteButtonClick=deleteButtonClick;
   $scope.refreshUsers=refreshUsers;
   $scope.userClick=userClick;
   $scope.logOut=logOut;
   $scope.loggedIn=false;
   $scope.currentuser=0;
   $scope.getMax=getMax;
   $scope.max=0;
   $scope.saleClick=saleClick;
   $scope.getReceipt=getReceipt;

   var loading = false;

   function isLoading(){
    return loading;
   }
  function refreshButtons(){
    loading=true;
    $scope.errorMessage='';
    buttonApi.getButtons()
      .success(function(data){
         $scope.buttons=data;
         loading=false;
      })
      .error(function () {
          $scope.errorMessage="Unable to load Buttons:  Database request failed";
          loading=false;
      });
 }

 function getMax(){
   loading=true;
   $scope.errorMessage='';
   buttonApi.getMax()
     .success(function(data){
        $scope.max=data[0].max;
        if($scope.max == null){
          $scope.max = 0;
        } else {
          $scope.max = $scope.max + 1;
        }
        loading=false;
     })
     .error(function () {
         $scope.errorMessage="Unable to load Buttons:  Database request failed";
         loading=false;
     });
}

 function refreshUsers(){
   loading=true;
   $scope.errorMessage='';
   buttonApi.getUsers()
     .success(function(data){
        $scope.users=data;
        loading=false;
     })
     .error(function () {
         $scope.errorMessage="Unable to load Buttons:  Database request failed";
         loading=false;
     });
}

function checkIfLoggedIn() {
  loading=true;
  $scope.errorMessage='';
  buttonApi.checkIfLoggedIn()
      .success(function(data){
        console.log(data);
        $scope.loggedIn=data.length>0;
        if($scope.loggedIn){
          $scope.currentuser=data[0].id;
        }
        loading=false;
      }).
      error(function() {
        $scope.errorMessage="Failed to check if a user is logged in";
        loading=false;
      })
}

  function saleClick($event){
     $scope.errorMessage='';
     $scope.getReceipt();
     buttonApi.clickSale($scope.currentuser, $scope.max)
        .success(function(){})
        .error(function(){$scope.errorMessage="Unable click";});
     // returnTotal();
     refreshTransaction();
     $scope.max = $scope.max + 1;
//     $scope.total = 0;
     console.log($scope.total)
     transactionVoid($event);
     console.log($scope.total)
  }

  function buttonClick($event){
     $scope.errorMessage='';
     buttonApi.clickButton($event.target.id, $scope.currentuser)
        .success(function(){})
        .error(function(){$scope.errorMessage="Unable click";});
     returnTotal();
     refreshTransaction();
  }

  function userClick($event){
    $scope.loggedIn = true;
     $scope.errorMessage='';
     buttonApi.clickUser($event.target.id)
        .success(function(){})
        .error(function(){$scope.errorMessage="Unable click";});
    checkIfLoggedIn();
  }

  function logOut() {
    $scope.loggedIn = false;
    buttonApi.removeUsers().success(function(){}).error(function(){$scope.errorMessage="Failed to log out"});
    $scope.currentuser=0;
  }

  function deleteButtonClick($event){
     $scope.errorMessage='';
     buttonApi.deleteTransaction($event.target.id)
        .success(function(){})
        .error(function(){$scope.errorMessage="Unable click";});
     returnTotal();
     refreshTransaction();
  }

  function refreshTransaction(){
    loading=true;
    $scope.errorMessage='';
    buttonApi.getTransaction()
      .success(function(data){
         $scope.transactionState=data;
         loading=false;
      })
      .error(function () {
          $scope.errorMessage="Unable to load Buttons:  Database request failed";
          loading=false;
      });
 }

  function transactionVoid($event){
        $scope.errorMessage='';
        buttonApi.transactionVoid()
          .success(function(data){
             loading=false;
             console.log("success")
          })
          .error(function () {
              //$scope.errorMessage="Failed to truncate";Item Name |
              loading=false;
          });
          $scope.total = 0;
          refreshTransaction();
  }

  function returnTotal(){
    loading=true;
    $scope.errorMessage='';
    buttonApi.getTotal()
      .success(function(data){
         $scope.total=data;
         loading=false;
      })
      .error(function () {
          $scope.errorMessage="Unable to load Buttons:  Database request failed";
          loading=false;
      });
  }

  function getReceipt() {
    $scope.errorMessage = '';
    buttonApi.getReceipt().success(function(data){
      console.log("Data:")
      console.log(data);
      var total = 0;
      for(var i = 0; i < data.length; i++) {
        total += data[i]["Total for item"];
      }

      totalObj = {};
      totalObj["Total Cost"] = total;

      data.push(totalObj);

      console.log(data);
      console.log("Converting to JSON");
      var jsonObj = JSON.parse(JSON.stringify(data));
      console.log("Converted to json, setting dataStr");
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonObj));
      var dlAnchorElem = document.getElementById('downloadAnchorElem');
      dlAnchorElem.setAttribute("href", dataStr);
      dlAnchorElem.setAttribute("download", "receipt.json");
      dlAnchorElem.click();
    })
  }

  returnTotal();
  refreshTransaction();
  refreshButtons();  //make sure the buttons are loaded
  refreshUsers();
  checkIfLoggedIn();
  getMax();
}

function buttonApi($http,apiUrl){
  return{
    getButtons: function(){
      var url = apiUrl + '/buttons';
      return $http.get(url);
    },
    getMax: function(){
      var url = apiUrl + '/max';
      return $http.get(url);
    },
    getUsers: function(){
      var url = apiUrl + '/user';
      return $http.get(url);
    },
    clickButton: function(id, user){
      var url = apiUrl+'/click?id='+id+'&user='+user;
//      console.log("Attempting with "+url);
      return $http.get(url); // Easy enough to do this way
    },
    clickSale: function(user, max){
      var url = apiUrl+'/addprevious?user='+user+'&max='+max;
//      console.log("Attempting with "+url);
      return $http.get(url); // Easy enough to do this way
    },
    clickUser: function(id){
      var url = apiUrl+'/clickuser?id='+id;
//      console.log("Attempting with "+url);
      return $http.get(url); // Easy enough to do this way
    },
    transactionVoid: function(){
      var url = apiUrl + '/void';
      return $http.get(url);
    },
    getTotal: function(){
      var url = apiUrl + '/total';
      return $http.get(url);
    },
    getTransaction: function(){
      var url = apiUrl + '/transaction';
      return $http.get(url);
    },
    deleteTransaction: function(id){
      var url = apiUrl + '/deleteclick?id=' +id;
      return $http.get(url);
    },
    removeUsers: function(){
      var url = apiUrl + '/removeUsers';
      return $http.get(url);
    },
    checkIfLoggedIn: function(){
      var url = apiUrl + '/checkIfLoggedIn';
      return $http.get(url);
    },
    getReceipt: function(){
      var url = apiUrl + '/getReceipt';
      return $http.get(url);
    }
 };
}
