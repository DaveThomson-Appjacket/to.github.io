function get_json(){
  $.get("./app/json/site.json", function(data){
    var div = $("<div/>");
    var span = $("<span/>");
    $(span).text = JSON.stringify(data);
    $(div).append(span);
    $("main").append(div);
  });
}
function get_title(){
}
function get_logo(){
}
function get_sections(){
}
$(document).ready(function(){
  get_json();
});
