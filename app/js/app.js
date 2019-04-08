function get_json(){
  $.get("./app/json/site.json", function(data){
    var main = $("main")[0];
    var span = $("<span/>");
    $(span).text(JSON.stringify(data));
    $(main).append(span);
    set_title(data);
    set_navs(data);
    set_logo(data);
    set_sections(data);
  });
}
function set_title(data){
  $("site-title").text(data["site-title"]);
}
function set_navs(data){
 $.each(data["content-sections"], function(key, value){
   console.log(key);
   var link = $("<a/>");
   link.text(value["section"]);
   $(".nav").append(link);
 });
}
function set_logo(data){
  var len_nav = $(".nav").children.length;
  var half_len_nav = Math.floor(len_nav/2);
  var image = $("<img/>");
  $(image).attr("src",data["site-logo"]);
  $(image).addClass("heading-logo");
  $(".nav").children().eq([half_len_nav - 1]).after(image);
}
function set_sections(data){
  var main = $("main")[0];
  $.each(data["content-sections"], function(key, value){
    var div = $("<div/>");
    var card = $("<div/>");
    var span_heading = $("<span/>");
    var span_paragraphs = $("<span/>");
    $(div).addClass("section");
    $(card).addClass("card");
    $(span_heading).text(value["section"]);
    $.each(value["paragraphs"], function(key, value){
      var p = $("<p/>");
      var heading = $("<span/>");
      heading.addClass("heading");
      heading.text(value["heading"]);
      if(value["content"].length == 1){
        p.text(value["content"]);
      }else{
        $.each(value["content"], function(key, value){
          var contact_card = $("<div/>");
          var phone_number = $("<span/>");
          var email = $("<span/>");
          phone_number.text("phone number:\t\t" + value["phone-number"]);      
          email.text=("email:\t\t" + value["email"]);
          contact_card.addClass("card");
          contact_card.append(heading);
          contact_card.append(phone_number);
          contact_card.append(email);
        });
      }
      $(span_paragraphs).append(p);
    });
    $(card).append(span_heading);
    $(card).append(span_paragraphs);
    $(div).append(card);
    $(main).append(div);
  });
}
$(document).ready(function(){
  get_json();
});
