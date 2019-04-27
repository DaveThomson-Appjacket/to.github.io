function get_json(){
  $.get("./app/json/site.json", function(data){
	  stuff(data);
  });
}
function stuff(data){
	set_title(data);
    	set_navs(data);
    	set_logo(data);
	set_about(data);
	set_contact(data);
    	//set_sections(data);
    	//set_map();
}
function set_about(data){
	var content_sections = data["content-sections"];
	$.each(content_sections, function(key, value){
		if(value["section"] == "about"){
			var div = $("<div/>");
			var body = $("<h1/>");

			$(div).addClass("container").addClass("about-section");
			$(body).addClass("container").addClass("about-section");
			$(div).append($(body));

			$(".about").append($(div));

			var section_details = value["section-details"][0];
			var content = section_details["content"];
			var item = content[0];
			//$(heading).text("about");
			$(body).text(item["item-content"])
		}
	});
	$(".about").width($("nav").width()).height($(window).height());
}
function set_contact(data){
	var content_sections = data["content-sections"];
        $.each(content_sections, function(key, value){
                if(value["section"] == "contact"){
                        var div = $("<div/>");
			var row = $("<div/>");
                        var body = $("<h1/>");

                        $(row).addClass("row");
                        $(body).addClass("container").addClass("about-section");
                        $(div).append($(body));

                        $(".contact").append($(div));

                        var section_details = value["section-details"];
                        var content = section_details["content"];
                        var item = content[0];
                        //$(heading).text("about");
                        $(body).text(item["item-content"])
			$.each(section_details, function(){
				$(body).text(item["item-content"])

			});
                }
        });
        $(".contact").width($("nav").width()).height($(window).height());
}
function set_map(){
}
function set_title(data){
  $("site-title").text(data["site-title"]);
}
function set_navs(data){
 $.each(data["content-sections"], function(key, value){
   console.log(key);
   var link = $("<a/>");
   link.text();
   $(".nav").append(link);
 });
}
function set_logo(data){
  		var len_nav = $(".nav").children.length;
  		var half_len_nav = Math.floor(len_nav/2);
  		var div = $("<div/>");
  		$(div).addClass("d-flex");
  		$(div).addClass("justify-content-center");
  		var wrapper = $("<div/>");
  		$(wrapper).addClass("brand");
  		var image = $("<img/>");
  		$(image).attr("src",data["site-logo"]);
  		$(image).addClass("heading-logo");
  		$(wrapper).append($(image));
  		$(div).append($(wrapper));
  		var insertion_point = $(".nav").children()[half_len_nav];
  		$(insertion_point).before(div);
}
function set_sections(data){
  //var main = $(".about");
  var canvas = $("<div/>");
//	console.log($(main).width());
//	console.log($(main).height());
  $(canvas).width($(main).width()).height($(window).height());
	$(canvas).addClass("canvas");
  //$(canvas).css("background-color","rgba(255, 255, 255, 0.5)");
	$(main).append(canvas);
	$(main).addClass("main-class");
  //////$(main).css({"background-image":"url(./app/images/new-york-city-336475_1920.jpg)"});

	////$(canvas).css({"justify-content":"center"});
  $.each(data["content-sections"], function(key, value){
    var row = $("<div/>");
	$(row).width("100%");
	  var div = $("<div/>");
    var span_heading = $("<h1/>");
    var span_paragraphs = $("<div/>");
    
    $(row).addClass("container").addClass("row");
        ////(main).append(canvas);
    $(span_heading).text(value["section"]);

	  $(span_heading).css("color","white");

    var section_name = "";

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
	    section_name = "about";
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
	  //$(canvas).addClass("content-section");
  });
}
function set_onscroll_sticky_header(){
	window.onscroll = function() {cleanupSticky()};

	// Get the navbar
	var navbar = $(".nav-scroller.py-1.mb-2")[0];

	// Get the offset position of the navbar
	var sticky = $(navbar).position().top;

	console.log(sticky);

	// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
	function cleanupSticky() {
	  if (window.pageYOffset >= sticky) {
	    $(navbar).addClass("sticky");
	  } else {
	    $(navbar).removeClass("sticky");
	  }
	}
}
$(document).ready(function(){
  get_json();
  //set_onscroll_sticky_header();
});
window.onload = function(){
	console.log($(".heading-logo").height());
	$(".navbar").height($(".heading-logo").height());
};
