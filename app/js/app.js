function get_json(){
  $.get("./app/json/site.json", function(data){
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
      if(value["content"].length == 1){
        var span = $("<span/>");
        $.each(value["content"], function(key, value){
          var item = $("<p/>");
          if(value["item-title"] == ""){
            item.text(value["item-content"]);
          }else{
            item.text(value["item-title"] + ":\t\t" + value["item-content"]);      
            span.append(item);
          }
        });
        $(span_paragraphs).append(span);
      }else{
        var heading = $("<span/>");
        heading.addClass("heading");
        heading.text(value["heading"]);
        var contact_card = $("<div/>");
        contact_card.addClass("card");
        contact_card.append(heading);
        $.each(value["content"], function(key, value){
          var item = $("<span/>");
          item.text(value["item-title"] + ":\t\t" + value["item-content"]);      
          contact_card.append(item);
        });
        $(span_paragraphs).append(contact_card);
      }
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
