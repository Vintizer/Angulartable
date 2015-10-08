/**
 * Created by vintizer on 06.10.15.
 */
angular.module('myApp', ['firebase'])
  .controller('MainCtrl', MainCtrl)
  .service('mainService', mainSrv)
  .filter('eyesColor',function eyesColorFilter() {
    return function (user, radioModel) {
      var returnUser = [];
      user.forEach(function(item){
        if (radioModel[item.eyeColor]) {
          returnUser.push(item);
        }
      });
      return returnUser;
    }
  });

function MainCtrl($scope, mainService){
  var mc = this;
  mc.order = {};
  mc.reverse = false;
  mc.usersList = mainService.getUser();
  mc.orderBy = function(name) {
    if (mc.order[name] === '' || !mc.order[name]){
      mc.order = {};
      mc.reverse = false;
      mc.order[name] = name;
    } else if (!mc.reverse){
      mc.reverse = true;
    } else {
      mc.reverse = false;
      mc.order[name] = '';
    }
    mc.orderedBy = mc.order[name];
  };
    mc.radioModel = {
      brown: true
    };

  mc.changeCheckColor = function(color){
      mc.radioModel[color] = !mc.radioModel[color];
    }
}
function mainSrv($firebaseArray){
  this.getUser =  function(){
    return $firebaseArray(new Firebase("https://ngtable.firebaseio.com/"));
  }
}
