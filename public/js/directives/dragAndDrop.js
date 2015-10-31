/**
 * Created by ой on 31.10.2015.
 */

module.exports = function (app) {
  app.directive('dragAndDrop', function () {
      return {
          restrict:'E',
          templateUrl:'js/directives/dragNdrop.html',
            scope:{
                movie:'='
            },
          link: function (scope, elem, attrs) {
              var input = elem.find('input[type=file]');
              input.bind('change', function (e) {
                  scope.movie.poster = e.target.files[0];
                  handleFiles(e.target.files[0]);
              });

              elem.bind('dragenter', function (e) {
                  e.stopPropagation();
                  e.preventDefault();
              });
              elem.bind('dragleave', function (e) {
                  e.stopPropagation();
                  e.preventDefault();
              });
              elem.bind('dragover', function(e){
                  e.stopPropagation();
                  e.preventDefault();
                  $('#drag-n-drop').addClass('over')
              });
              elem.bind('dragleave', function(e){
                  e.stopPropagation();
                  e.preventDefault();
                  $('#drag-n-drop').removeClass('over')
              });
              elem.bind('drop', function(e){
                  e.stopPropagation();
                  e.preventDefault();

                  var dt = e.originalEvent.dataTransfer;
                  var files = dt.files;
                  $('#drag-n-drop').removeClass('over');

                  scope.movie.poster = files[0];
                  handleFiles(files[0])
              });

              function handleFiles(file){
                  var fl = new FileReader();
                  fl.readAsDataURL(file);
                  fl.onload = function (e) {
                      var img = $('<img src="'+ e.target.result+'">')
                          .css({
                              width:'100%',
                              height:'100%',
                              position:'absolute',
                              top:'0'
                          });
                      $('#drag-n-drop').find('h2').hide();
                      $('#drag-n-drop').append(img).find('input').hide();


                  }
              }

          }
      }
  })
};