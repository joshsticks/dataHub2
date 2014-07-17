define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/NonComparableActivity.html',
	'text!activities.txt',
	'chart'
], function ( $, _, Backbone, Template, ActivitiesJSON, chart ) {
	var YogaView = Backbone.View.extend({
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
			this.$el.find("#results-table thead tr").html("<th>Yoga Level</th><th>Seconds Held</th>");
			var user = Backbone.history.fragment.replace(/\/.*/, "");
			$.ajax({
            			type: "POST",
            			url: "/ImprovingGroundsService/ImprovingGroundsService.asmx/GetExhibitSessions",
            			data: {userId:  user, exhibitTypeId: activity.activityId},
            			dataType:  this.typeOfData,
            			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            			success: function ( response ) { 
            				var sessions = $(response).find("ExhibitSessions").children();
            				var level = null;
            				var secondsHeld = null;
            				_.each(sessions, function (session) {
            					level = $(session).find("Yoga").attr("Level");
            					secondsHeld = $(session).find("Yoga").attr("SecondsHeld");
            					self.$el.find("#results-table tbody").append("<tr><td>"+level+"</td><td>"+secondsHeld+"</td></tr>")
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

	return YogaView;
});