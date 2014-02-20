define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/Activities.html',
], function ( $, _, Backbone, Template ) {
	var ActivitiesView = Backbone.View.extend({
		template: _.template(Template),

		events: {
			"click .button ": "activitySelected"
		 },

		initialize: function () { },

		render: function () {
			this.$el.html(this.template({baseUrl: "#"+Backbone.history.fragment.replace("activities", "activity/")}));
			return this;
		},

		activitiySelected: function ( eventName ) {
			eventName.preventDefault();
			// var id = Backbone.history.fragment;
			// id = id.replace("age", "");
			// window.location = "#" + id + $("#age").val() + "/activities";
			return false;
		}
	});

	return ActivitiesView;
});