/*
 * Made by Fausto Arturo Guerrero Velez
 * Under Licence Pending
 */

(function($, w, u){

		function openPanel(element){
			var data = $(element).data("sideSlidePanel");

			var isLeft= data.parentDiv.is(".left");

			data.openned = true;

			data.parentDiv.addClass("open");//.css(isLeft?"left":"right", 0);

			data.iconOpen.removeClass(data.options.outterPanelUpIconClass).addClass(data.options.outterPanelDownIconClass);
		}

		function closePanel(element){
			var data = $(element).data("sideSlidePanel");

			var isLeft= data.parentDiv.is(".left");

			data.openned = false;

			data.parentDiv.removeClass("open");//.css(isLeft?"left":"right", -700);

			data.iconOpen.removeClass(data.options.outterPanelDownIconClass).addClass(data.options.outterPanelUpIconClass);
		}

		function togglePanel(element){
			if(!$(element).data("sideSlidePanel").openned){
				openPanel(element);
			}else{
				closePanel(element);
			}
		}

		function getChangeText(element){
			var data = $(element).data("sideSlidePanel");
			return function(text){
				data.outterPanelTextContainer.text(text);
			};
		}

		$.fn.sideSlidePanel=function(options){
			if(!$(this).data("sideSlidePanel")){
				var options=$.extend(true, {}, $.fn.sideSlidePanel.defaults, options);

				var isLeft=options.orientation=="left";

				var parentDiv=$("<div class='side-slide-panel'>");
					var outterPanel=$('<div class="outter-panel">').appendTo(parentDiv).click(function(){
						togglePanel($(this).siblings(".inner-panel"));
					});
						var outterPanelInnerDiv = $("<div>").appendTo(outterPanel);
							var outterPanelTextContainer = $('<span class="text">').appendTo(outterPanelInnerDiv).text(options.outterPanelText);
							var iconOpen = $(' <i class="fa icon-open"></i>').addClass(options.outterPanelUpIconClass);
							if(isLeft){
								outterPanelTextContainer.before(iconOpen);
							}else{
								outterPanelTextContainer.after(iconOpen);
							}
					var innerPanel= $(this).addClass("inner-panel").appendTo(parentDiv);

				if(isLeft){
					parentDiv.addClass("left");
				}

				if(options.outterPanelHeight){
					outterPanel.css("width", outterPanelHeight);
				}

				if(options.outterPanelWidth){
					outterPanel.css("width", outterPanelWidth);
				}

				if(options.outterPanelCustomStyle){
					outterPanel.css(options.outterPanelCustomStyle);
				}

				if(options.innerPanelCustomStyle){
					innerPanel.css(options.innerPanelCustomStyle);
				}


				var sideSlidePanel = {
					parentDiv:parentDiv,
					outterPanel:outterPanel,
					outterPanelInnerDiv:outterPanelInnerDiv,
					outterPanelTextContainer:outterPanelTextContainer,
					iconOpen:iconOpen,
					innerPanel:innerPanel,
					options:options
				};

				$(this).data("sideSlidePanel", sideSlidePanel);

				parentDiv.appendTo("body");


			}else{
				var data = $(this).data("sideSlidePanel");

				if(options=="open"){
					openPanel(data.outterPanel);
				}else if(options=="close"){
					closePanel(data.outterPanel);
				}else if(options=="toggle"){
					togglePanel(data.outterPanel);
				}else if(options=="changeText"){
					return getChangeText(data.outterPanel);
				}
			}
		};

		$.fn.sideSlidePanel.defaults={
			orientation:null,
			outterPanelText:"Open Panel",
			outterPanelWidth:null,
			outterPanelHeight:null,
			outterPanelUpIconClass:"fa-caret-square-o-up",
			outterPanelDownIconClass:"fa-caret-square-o-down",
			outterPanelCustomStyle:{
				color:"black",
				backgroundColor:"white"
			},
			innerPanelCustomStyle:null

		}

	})(jQuery, this);