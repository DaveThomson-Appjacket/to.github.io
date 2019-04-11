function get_json(){
  $.get("./app/json/site.json", function(data){
    set_title(data);
    set_navs(data);
    set_logo(data);
    set_sections(data);
    set_map();
  });
}
function set_map(){
  var image = $("<img/>");
  image.attr("src","https://maps.googleapis.com/maps/api/staticmap?center=Manhattan,New+York,NY&zoom=13&size=800x600&maptype=roadmap&markers=color:red%7Clabel:TO%7C40.7534846, -73.9720523&key=AIzaSyAte4Xiod-xNtnin6kSE1n1wHkvF9RtECo");
  var main = $('main')[0];
	$(image).css({"left":"0","bottom":"0"});
  $(main).append($(image));
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
  var canvas = $("<div/>");
	console.log($(main).width());
	console.log($(main).height());
  $(canvas).width($(main).width()).height("100%");
	$(canvas).addClass("canvas");
  //$(canvas).css("background-color","rgba(255, 255, 255, 0.5)");
	$(main).append(canvas);
  $(main).css({"background-image":"url(./app/images/new-york-city-336475_1920.jpg)"});

	$(canvas).css({"justify-content":"center"});
  $.each(data["content-sections"], function(key, value){
    var row = $("<div/>");
	$(row).width("100%");
	  var div = $("<div/>");
    var span_heading = $("<h1/>");
    var span_paragraphs = $("<div/>");
    
    $(row).addClass("container").addClass("row");
        (main).append(canvas);
    $(span_heading).text(value["section"]);

	  $(span_heading).css("color","white");

    var current_row = $("<div/>");
    $(current_row).addClass("row");
    $.each(value["paragraphs"], function(key, value){
	    var outer_key = key;
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
        $(heading).css("color","white");
        if(heading.text() != ""){
          contact_card.append(heading);
        }
	      contact_card.append("</br>");
        $.each(value["content"], function(key, value){
          var item = $("<span/>");
		$(item).css("color","white");
          if(value["item-title"] == ""){
            item.text(value["item-content"]);
          }else{
		  if(value["item-title"]=="email" || value["item-title"]=="general email address"){
			  var link = $("<a/>");
			  $(link).attr("href","mailto:"+value["item-content"]+"");
			  $(link).text(value["item-content"]);

			  item.text(value["item-title"] + ":\t\t");
			  $(item).append(link); 
		  }else{
            		item.text(value["item-title"] + ":\t\t" + value["item-content"]);      
		  }
          }
	//$(contact_card).css({"border-width":"thin","border-color":"black","border-style":"solid"});
	  switch(outer_key){
		case 0:
		case 3:
			  //$(contact_card).addClass("bg-secondary");
			  break;
		case 1:
		case 2:
			  //$(contact_card).addClass("bg-info");
			  break;
		case 4:
			  //$(contact_card).addClass("bg-warning");
			  break;
		default:
			  $(contact_card).addClass("");
	  }
          contact_card.append(item);
		contact_card.append("</br>");
		contact_card.addClass("content-with-padding");
        });
        if((key-1) % 2 != 0){
          $(current_row).append(contact_card)
        }else {
          $(current_row).append(contact_card)
          $(span_paragraphs).append(current_row);
          current_row = $("<div/>");
          $(current_row).addClass("row");
	}
        $(span_paragraphs).append(current_row);
        
        //$(span_paragraphs).append(current_row);
      }
      });
	  $(div).css("background-color","rgba(0, 0, 0, 0.7)");
    $(div).append(span_heading);
    $(div).append(span_paragraphs);
	  $(div).addClass("content-with-padding");
	  var div2 = $("<div/>");
	  //$(div2).css("background-color","rgba(255, 255, 255, 0.5)");
	  $(div2).append(div);
	  $(div2).addClass("content-with-padding");
    $(row).append(div2);
    $(canvas).append(row);
	  $(canvas).addClass("content-section");
  });
}
$(document).ready(function(){
  get_json();
});
