define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/Login.html',
], function ( $, _, Backbone, Template ) {
	var LoginView = Backbone.View.extend({
		template: _.template(Template),

		events: {
			"submit #login-form": "submitForm",
			"click #submit-button": "submitForm"
		},

		initialize: function () { },

		render: function () {
			this.$el.html(this.template(/*pass in a models attributes*/));
			return this;
		},

		submitForm: function ( eventName ) {
			eventName.preventDefault();
			window.location = "#" + $("#code").val() + "/age";
			return false;
		}
	});

	return LoginView;
});