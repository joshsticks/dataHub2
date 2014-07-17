define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/NonComparableActivity.html',
	'text!activities.txt',
	'chart'
], function ( $, _, Backbone, Template, ActivitiesJSON, chart ) {
	var MindView = Backbone.View.extend({
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
			this.$el.find("#results-table thead tr").html("<th>Visit #</th><th>Biometric</th><th>Result</th>");
			var user = Backbone.history.fragment.replace(/\/.*/, "");
			$.ajax({
            			type: "POST",
            			url: "/ImprovingGroundsService/ImprovingGroundsService.asmx/GetExhibitSessions",
            			data: {userId:  user, exhibitTypeId: activity.activityId},
            			dataType:  this.typeOfData,
            			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            			success: function ( response ) { 
            				var sessions = $(response).find("ExhibitSessions").children();
            				var count = 0;
            				_.each(sessions, function (session) {
            					count++;
            					bpmLow = $(session).find("Biometrics").attr("BPMLow");
            					bpmHigh = $(session).find("Biometrics").attr("BPMHigh");
            					bpmStart = $(session).find("Biometrics").attr("BPMStart");
            					bpmFinish = $(session).find("Biometrics").attr("BPMFinish");
            					tempLow = $(session).find("Biometrics").attr("TemperatureLow");
            					tempHigh = $(session).find("Biometrics").attr("TemperatureHigh");
            					tempStart = $(session).find("Biometrics").attr("TemperatureStart");
            					tempFinish = $(session).find("Biometrics").attr("TemperatureFinish");
            					self.$el.find("#results-table tbody").append("<tr><td rowspan='9'>"+count+"</td><td>BPM Low</td><td>"+bpmLow+"</td></tr>");
            					self.$el.find("#results-table tbody").append("<tr><td>BPM High</td><td>"+bpmHigh+"</td></tr>");
            					self.$el.find("#results-table tbody").append("<tr><td>BPM Start</td><td>"+bpmStart+"</td></tr>");
            					self.$el.find("#results-table tbody").append("<tr><td>BPM Finish</td><td>"+bpmFinish+"</td></tr>");
            					self.$el.find("#results-table tbody").append("<tr><td>Temp Low</td><td>"+tempLow+"</td></tr>");
            					self.$el.find("#results-table tbody").append("<tr><td>Temp High</td><td>"+tempHigh+"</td></tr>");
            					self.$el.find("#results-table tbody").append("<tr><td>Temp Start</td><td>"+tempStart+"</td></tr>");
            					self.$el.find("#results-table tbody").append("<tr><td>Temp Finish</td><td>"+tempFinish+"</td></tr>");
            					self.$el.find("#results-table tbody").append("<tr><td colspan='1'>---------------------</td></tr>");
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

	return MindView;
});