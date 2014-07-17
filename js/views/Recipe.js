define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/NonComparableActivity.html',
	'text!activities.txt',
	'chart'
], function ( $, _, Backbone, Template, ActivitiesJSON, chart ) {
	var RecipeView = Backbone.View.extend({
		template: _.template(Template),
		activities: JSON.parse(ActivitiesJSON),

		events: {
			"click #me": "meSelected",
			"click #compare": "compareSelected",
			"click #exit": "exitClicked",
			"click #back": "backClicked"
		 },

		initialize: function () { },

		render: function () {
			var self = this;
			var id = Backbone.history.fragment.replace(/^.*\/activity\//, "");
			var activity = _.where( this.activities, {id: id})[0];

			var trimmed =Backbone.history.fragment.replace(/^[0-9]+\//, "");
			trimmed = trimmed.replace(/\/activity\/.*/, "");
			var gender = trimmed.replace(/^[0-9]+\//, "");
			var age = trimmed.replace(/\/[0-9]+/, "");
			this.$el.html(this.template( {displayName: activity.displayName, age: age, gender: gender} ));
			this.$el.find("h3").html("Your Recipes");
			var user = Backbone.history.fragment.replace(/\/.*/, "");
			$.ajax({
            			type: "POST",
            			url: "/ImprovingGroundsService/ImprovingGroundsService.asmx/GetExhibitSessions",
            			data: {userId:  user, exhibitTypeId: activity.activityId},
            			dataType:  this.typeOfData,
            			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            			success: function ( response ) { 
            				var sessions = $(response).find("ExhibitSessions").children();
            				_.each(sessions, function (session) {
            					recipeName = $(session).find("recipeName").text();
            					servings = $(session).find("servings").text()
            					ingredients = $(session).find("ingredients").children();
            					directions = $(session).find("directions").children();
            					self.$el.find("#results-table").replaceWith("<div id='recipes'></div>");
            					self.$el.find("#recipes").append("<hr />");
            					self.$el.find("#recipes").append("<h4>"+recipeName+" Servings: "+servings+"</h4>");
            					self.$el.find("#recipes").append("<img class='food-image' src=images/recipe_"+recipeName.replace(/ /g, "")+".jpg>");
            					self.$el.find("#recipes").append("<h5>Ingredients</h5>");
            					self.$el.find("#recipes").append("<ul id='ingredients"+$(session).attr("SessionId").replace("{","").replace("}","")+"'></ul>");
            					_.each(ingredients, function (ingredient) {
            						var text = "";
            						if ( $(ingredient).find("healthyUsed").text() == "true" ) {
            							text = $(ingredient).find("healthy").find("quantity").text() + " " + $(ingredient).find("healthy").find("item").text();
            						} else {
            							text = $(ingredient).find("normal").find("quantity").text() + " " + $(ingredient).find("normal").find("item").text()
            						}
            						self.$el.find("#ingredients"+$(session).attr("SessionId").replace("{","").replace("}","")).append("<li>"+text+"</li>");
            					});

            					self.$el.find("#recipes").append("<h5>Directions</h5>");
            					self.$el.find("#recipes").append("<ol id='directions"+$(session).attr("SessionId").replace("{","").replace("}","")+"'></ol>");
            					_.each(directions, function (direction) {
            						var text = "";
            						text = new XMLSerializer().serializeToString(direction).replace("<step>","").replace("</step>","");
            						self.$el.find("#directions"+$(session).attr("SessionId").replace("{","").replace("}","")).append("<li>"+text+"</li>");
            					});
            					
            				});
            			},
            			error: function ( data ) {
            				alert("Failed to retrieve exhibit session data");
            			}
        			});

			return this;
		},

		meSelected: function ( eventName ) {
			eventName.preventDefault();
			window.location = "#" + Backbone.history.fragment + "/me";
			return false;
		},

		compareSelected: function ( eventName ) {
			eventName.preventDefault();
			window.location = "#" + Backbone.history.fragment + "/compare";
			return false;
		},

		exitClicked: function ( eventName ) {
			eventName.preventDefault();
			window.location = "#";
			return false;
		},

		backClicked: function ( eventName ) {
			eventName.preventDefault();
			window.location = "#" + Backbone.history.fragment.replace(/\/activity\/.*/, "/activities");
			return false;
		}
	});

	return RecipeView;
});