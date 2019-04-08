function get_json(){
  $.get("./app/json/site.json", function(data){
    var main = $("main")[0];
    var span = $("<span/>");
    $(span).text(JSON.stringify(data));
    $(main).append(span);
    set_title(data);
    set_navs(data);
    set_logo(data);
  });
}
function set_title(data){
  $("site-title").text(data["site-title"]);
}
function set_navs(data){
 $.each(data["content-sections"], function(key, value){
   console.log(key);
   var section = value;
   var link = $("<a/>");
   link.text(value["section"]);
   var span = $("<span/>");
   span.text(section);
   $(".nav").append(link);
 });
}
function set_logo(data){
  var len_nav = $(".nav").children.length;
  var half_len_nav = Math.floor(len_nav/2);
  var image = $("<img/>");
  $(image).attr("src",data["site-logo"]);
  $(image).addClass("heading-logo");
  $(".nav").children().eq([half_len_nav - 1]).append(image);
}
function get_sections(){
}
$(document).ready(function(){
  get_json();
});
