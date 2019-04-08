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
    var row = $("<div/>");
    var div = $("<div/>");
    var span_heading = $("<span/>");
    var span_paragraphs = $("<span/>");
    
    $(row).addClass("row");
  
    $(span_heading).text(value["section"]);
    var current_row = $("<div/>");
    $(current_row).addClass("row");
    $.each(value["paragraphs"], function(key, value){
      if(value["content"].length == 1){
        /*
        var span = $("<span/>");
        $.each(value["content"], function(key, value){
          var item = $("<p/>");
          console.log("." + value["item-content"] + ".");
          if(value["item-title"] == ""){
            item.text(value["item-content"]);
          }else{
            item.text(value["item-title"] + ":\t\t" + value["item-content"]);      
            span.append(item);
          }
        });
        $(span_paragraphs).append(span);
        */
      }else{
        
        var heading = $("<span/>");
        heading.addClass("heading");
        heading.text(value["heading"]);
        
        var contact_card = $("<div/>");
        contact_card.addClass("col");
        
        if(heading.text() != ""){
          contact_card.append(heading);
        }
        
        $.each(value["content"], function(key, value){
          var item = $("<span/>");
          if(value["item-title"] == ""){
            item.text(value["item-content"]);
          }else{
            item.text(value["item-title"] + ":\t\t" + value["item-content"]);      
          }
          contact_card.append(item);
        });
        console.log("Key is: " + key);
        if((key-1) % 2 != 0){
          $(current_row).append(contact_card)
          $(current_row).css("background-color",".bg-secondary");
        }else {
          console.log("%2 key is: " + key);
          $(current_row).css("background-color",".bg-info";
          $(current_row).append(contact_card)
          $(span_paragraphs).append(current_row);
          current_row = $("<div/>");
          $(current_row).addClass("row");
          //$(current_row).append(contact_card); 
        } 
        $(span_paragraphs).append(current_row);
        
        //$(span_paragraphs).append(current_row);
      }
    });
    $(div).append(span_heading);
    $(div).append(span_paragraphs);
    $(row).append(div);
    $(main).append(row);
  });
}
$(document).ready(function(){
  get_json();
});
