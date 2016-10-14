sap.ui.define([
	"de/tammenit/sap/community/tags/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	'sap/m/Dialog',
	'sap/m/Button',
	'sap/m/Text'
], function (BaseController, JSONModel, Dialog, Button, Text) {
	"use strict";

	return BaseController.extend("de.tammenit.sap.community.tags.controller.Main", {
		onInit: function () {
			var oModel = new JSONModel();
			oModel.loadData('./model/tags.json');
			this.getView().setModel(oModel);
		},

		onFilter: function (oEvent) {
			var sQuery = oEvent.getParameter("query");
			var oModel = this.getView().getModel();
			if (sQuery === "") {
				oModel.loadData('./model/tags.json');
			} else {
				var regExp = new RegExp(".*" + sQuery + ".*", "i");
				var json = oModel.getData();
				var filteredJson = json.filter(function (row) {
					if (regExp.test(row.field2) || regExp.test(row.field3) || regExp.test(row.field4) || regExp.test(row.field5)) {
						return true;
					} else {
						return false;
					}
				});
				if (filteredJson.length > 0) {
					oModel.setData(filteredJson);
				}
			}
		},

		onSemanticFaboriteButtonPress: function () {
			this._getDialog().open();
			/*
			var dialog = new Dialog({
				title: 'Default Message',
				type: 'Message',
				content: new Text({
					text: 'Build enterprise-ready web applications, responsive to all devices and running on the browser of your choice. That´s OpenUI5.'
				}),
				beginButton: new Button({
					text: 'OK',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function () {
					dialog.destroy();
				}
			});

			dialog.open();
			*/
		},

		onCloseDialog: function(oEvt) {
			this._getDialog().close();
		},

		_getDialog: function () {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("de.tammenit.sap.community.tags.view.About", this);
				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;
		},


	});
});