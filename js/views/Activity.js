define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/Activity.html',
	'text!activities.json'
], function ( $, _, Backbone, Template, ActivitiesJSON ) {
	var ActivityView = Backbone.View.extend({
		template: _.template(Template),
		activities: JSON.parse(ActivitiesJSON),

		events: {
			"click #me": "meSelected",
			"click #compare": "compareSelected"
		 },

		initialize: function () { },

		render: function () {
			var id = Backbone.history.fragment.replace(/^.*\/activity\//, "");
			var activity = _.where( this.activities, {id: id})[0];
			this.$el.html(this.template( {displayName: activity.displayName} ));
			return this;
		},

		meSelected: function ( eventName ) {
			eventName.preventDefault();
			// var id = Backbone.history.fragment;
			// id = id.replace("age", "");
			// window.location = "#" + id + $("#age").val() + "/activities";
			return false;
		},

		compareSelected: function ( eventName ) {
			eventName.preventDefault();
			// var id = Backbone.history.fragment;
			// id = id.replace("age", "");
			// window.location = "#" + id + $("#age").val() + "/activities";
			return false;
		}
	});

	return ActivityView;
});