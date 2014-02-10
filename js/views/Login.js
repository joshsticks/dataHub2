define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/Login.html',
], function ( $, _, Backbone, Template ) {
	var LoginView = Backbone.View.extend({
		template: _.template(Template),

		events: {
			"click #something": "clickedSomething"
		},

		initialize: function () { },

		render: function () {
			this.$el.html(this.template(/*pass in a models attributes*/));
			return this;
		},

		clickedSubmit: function ( eventName ) {
			
		}
	});

	return LoginView;
});