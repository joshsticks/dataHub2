define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/Activities.html',
], function ( $, _, Backbone, Template ) {
	var ActivitiesView = Backbone.View.extend({
		template: _.template(Template),

		initialize: function () { },

		events: {
			"click #exit": "exitClicked"
		 },

		render: function () {
			this.$el.html(this.template({baseUrl: "#"+Backbone.history.fragment.replace("activities", "activity/")}));
			return this;
		},

		exitClicked: function ( eventName ) {
			eventName.preventDefault();
			window.location = "#";
			return false;
		},
	});

	return ActivitiesView;
});