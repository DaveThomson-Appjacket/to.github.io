function get_json(){
  $.get("./app/json/site.json", function(data){
    var div = $("<div/>");
    $(div).text = JSON.stringify(data);
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
