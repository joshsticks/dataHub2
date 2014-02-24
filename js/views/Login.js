define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/Login.html',
], function ( $, _, Backbone, Template ) {
	var LoginView = Backbone.View.extend({
		template: _.template(Template),

		events: {
			"submit #login-form": "submitForm"
		},

		initialize: function () { },

		render: function () {
			this.$el.html(this.template(/*pass in a models attributes*/));
			return this;
		},

		submitForm: function ( eventName ) {
			eventName.preventDefault();
			$("#error").hide();
			if ( $("#code").val() != "") {
				window.location = "#" + $("#code").val() + "/age";
			} else {
				$("#error").show();
			}
			
			return false;
		}
	});

	return LoginView;
});