define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/Compare.html',
], function ( $, _, Backbone, Template ) {
	var CompareView = Backbone.View.extend({
		template: _.template(Template),

		events: {
			"click .button ": "activitySelected"
		 },

		initialize: function () { },

		render: function () {
			this.$el.html(this.template(/*pass in a models attributes*/));
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

	return CompareView;
});