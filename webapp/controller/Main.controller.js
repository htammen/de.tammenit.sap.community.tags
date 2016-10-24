sap.ui.define([
	"de/tammenit/sap/community/tags/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	'sap/m/Dialog',
	'sap/m/Button',
	'sap/m/Text',
	"de/tammenit/sap/community/tags/util/formatter",
	'sap/m/MessagePopover',
	'sap/m/MessagePopoverItem',
	'sap/m/MessageToast'
	], function (BaseController, JSONModel, Dialog, Button, Text, Formatter, MessagePopover, MessagePopoverItem, MessageToast) {
	"use strict";

	return BaseController.extend("de.tammenit.sap.community.tags.controller.Main", {
		formatter: Formatter,
		
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
				var json;
				// if current model data is already filtered reread complete data. Otherwise filter would have been
				// applied to already filtered data
				if(this._filteredData) {
					oModel.loadData('./model/tags.json', null, false);
				}
				json = oModel.getData();
				this._filteredData = false;
				var filteredJson = json.filter(function (row) {
					if (regExp.test(row.field2) || regExp.test(row.field3) || regExp.test(row.field4) || regExp.test(row.field5)) {
						return true;
					} else {
						return false;
					}
				});
				if (filteredJson.length > 0) {
					this._filteredData = true;
					oModel.setData(filteredJson);
				} else {
					sap.ui.getCore().getMessageManager().addMessages(
						new sap.ui.core.message.Message({
							message: "No tag found for search string '" + sQuery + "`",
							type: sap.ui.core.MessageType.Error,
							processor: this.getMessageProcessor()
						})
					);
					MessageToast.show("No tag found for search string '" + sQuery + "`");
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
		
		onMessagesButtonPress: function(oEvent) {
			var oMessagesButton = oEvent.getSource();
			if (!this._messagePopover) {
				this._messagePopover = new MessagePopover({
					items: {
						path: "message>/",
						template: new MessagePopoverItem({
							description: "{message>description}",
							type: "{message>type}",
							title: "{message>message}"
						})
					}
				});
				this._messagePopover.attachAfterClose(function(oEvt) {
					sap.ui.getCore().getMessageManager().removeAllMessages();	
				});
				this._messagePopover.attachItemSelect(function(oEvt) {
					var item = oEvt.getParameter("item");
					this.removeItem(item);
				});
				oMessagesButton.addDependent(this._messagePopover);
			}
			this._messagePopover.toggle(oMessagesButton);
		},
		
		onMessageItemSelected: function(oEvent) {
			var source = oEvent.getSource();
		}

	});
});