define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/Activity.html',
	'text!activities.txt',
	'chart'
], function ( $, _, Backbone, Template, ActivitiesJSON, chart ) {
	var LipServiceView = Backbone.View.extend({
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
			var id = Backbone.history.fragment.replace(/^.*\/activity\//, "");
			var activity = _.where( this.activities, {id: id})[0];

			var trimmed =Backbone.history.fragment.replace(/^[0-9]+\//, "");
			trimmed = trimmed.replace(/\/activity\/.*/, "");
			var gender = trimmed.replace(/^[0-9]+\//, "");
			var age = trimmed.replace(/\/[0-9]+/, "");
			this.$el.html(this.template( {displayName: activity.displayName, age: age, gender: gender} ));

			var user = Backbone.history.fragment.replace(/\/.*/, "");
			$.ajax({
            			type: "POST",
            			url: "/ImprovingGroundsService/ImprovingGroundsService.asmx/GetExhibitComparison",
            			data: {userId:  user, exhibitTypeId: activity.activityId, genderTypeId: gender, age: age, filters: ""},
            			dataType:  this.typeOfData,
            			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            			success: function ( response ) { 
            				var dataArray, labelArray =[ ];
					labelArray = $(response).find("DataPoint[Count!='0']").map(function()
					{
					      return $(this).attr("Inches");
					}) ;

					dataArray = $(response).find("DataPoint[Count!='0']").map(function()
					{
					      return $(this).attr("Count");
					}) ;

					var options = { 
						//Boolean - If we want to override with a hard coded scale
						scaleOverride : true,
	
						//** Required if scaleOverride is true **
						//Number - The number of steps in a hard coded scale
						scaleSteps : 3,
						
						//Number - The value jump in the hard coded scale
						scaleStepWidth :  Math.ceil(Math.max.apply(Math, dataArray), 3),
						
						//Number - The scale starting value
						scaleStartValue : 0,

						scaleFontColor : "#562147"
					}
            				var data = {
						labels : labelArray,
						datasets : [
							{
								fillColor : "rgba(86,33,71,0.5)",
								strokeColor : "rgba(86,33,71,1)",
								data : dataArray
							}
						]
					}

					var myScore = parseFloat($(response).find("ExhibitSession VerticalLeap").attr("HeightInches")).toFixed(1);
					var meIndex = $.inArray( myScore, labelArray);
					labelArray[meIndex] = "My Score " + labelArray[meIndex];
					$("#yourScore").text("My Score " + myScore + " Inches");

					var ctx = document.getElementById("myChart").getContext("2d");
					var mychart = new Chart(ctx).Bar(data, options);
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

	return LipServiceView;
});