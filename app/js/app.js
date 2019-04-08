function get_json(){
  $.get("./app/json/site.json", function(data){
  alert(JSON.stringify(data));
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
