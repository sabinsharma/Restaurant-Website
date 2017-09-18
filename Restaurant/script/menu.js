//ANDRE THE GIANT - MINI MENU

alert("Welcome to our menu! Click on the kind of food you're looking for to see our delicious mini options! Click on any item to read a description and see a picture!");

$(document).ready(function(){

	//Menu Items and H4 hidden as default
	$(".MenuItems").hide();

	//Click event added to h2
	$("h2").click(function(){

		//Slide out next item for 1 second
		$(this).next(".MenuItems").slideToggle(1000);
	});

	//Patagraph background changed on hover
	$(".MenuItems").hover(
		function(){
			$(this).css( {"background":"white", "color":"black"} );
		},
		function(){
			$(this).css( {"background":"black","color":"white"} );
	});
	
	//Hide menu description as default
	$(".individual-items").hide();
	
	//Add click event to h3
	$("h3").click(function(){
		$(this).next(".individual-items").slideToggle(1000);
	});
	
	$(".individual-items").hover(
		function(){
			$(this).css( {"background":"white", "color":"black"} );
		},
		function(){
			$(this).css( {"background":"white","color":"black"} );
	});
	
	
	
	$(".individual-drinkitems").hide();
	
	$("h5").click(function(){
		$(this).next(".individual-drinkitems").slideToggle(1000);
	});
	$(".individual-drinkitems").hover(
		function(){
			$(this).css( {"background":"white", "color":"black"} );
		},
		function(){
			$(this).css( {"background":"black","color":"white"} );
	});
	
	
	

});