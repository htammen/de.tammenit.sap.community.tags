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
	
	sap.ui.namespace("jQuery.sap.storage");
	sap.ui.namespace("jQuery.sap.storage.Type");

	return BaseController.extend("de.tammenit.sap.community.tags.controller.Main", {
		formatter: Formatter,
		
		onInit: function () {
			//var componentName = this.getOwnerComponent().getManifestObject().getComponentName(); // sap.ui.core.Component.getOwnerComponentFor(this).getManifestObject().getComponentName();
			//var modulePath = jQuery.sap.getModulePath(componentName);
			//this._FileName = modulePath + "/model/tags.json";
			//var oModel = new JSONModel();
			//oModel.loadData(this._FileName);
			//this.getView().setModel(oModel);

			var oViewModel = new JSONModel({
				qrCode: window.location.href
			});
			this.getView().setModel(oViewModel, "viewModel");
			
			var oRouter = this.getRouter();
			oRouter.getRoute("main").attachPatternMatched(function() {
				this.byId("searchField").focus();
			}, this);

			/*
			var storage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			storage.put("favorites", '{"favorites":[{"key": "eins", "tag", "eins"}, {"key": "zwei", "tag", "zwei"}]}');
			var str = storage.get("favorites");
			var json = JSON.parse(str);
			
			var oFavoriteModel = new JSONModel(json);
			this.getView().setModel(oFavoriteModel, "favModel");
			*/
		},

		onFilter: function (oEvent) {
			var sQuery = oEvent.getParameter("query");
			var oModel = this.getView().getModel();
			// remember the original model data the first time filter is invoced
			if(!this._originalModelData) {
				this._originalModelData = oModel.getData();
			}
			
			if (sQuery === "") {
				oModel.setData(this._originalModelData);
				//oModel.loadData(this._FileName);
			} else {
				var regExp = new RegExp(".*" + sQuery + ".*", "i");
				var json;
				// if current model data is already filtered reread complete data. Otherwise filter would have been
				// applied to already filtered data
				if(this._filteredData) {
					oModel.setData(this._originalModelData);
					//oModel.loadData(this._FileName, null, false);
				}
				json = oModel.getData().tags;
				this._filteredData = false;
				var filteredJson = json.filter(function (row) {
					if (regExp.test(row.name)) {
						return true;
					} else {
						return false;
					}
				});
				if (filteredJson.length > 0) {
					this._filteredData = true;
					var modelData = {};
					modelData.tags = filteredJson;
					oModel.setData(modelData);
				} else {
					sap.ui.getCore().getMessageManager().addMessages(
						new sap.ui.core.message.Message({
							message: "No tag found for search string '" + sQuery + "`",
							type: sap.ui.core.MessageType.Error,
							target: "/searchField/value",
							processor: this.getMessageProcessor()
						})
					);
					// var msgStrip = new sap.m.MessageStrip({
					// 	text: "No tag found for search string '" + sQuery + "`",
					// 	showIcon: true,
					// 	showCloseButton: true
					// });
					// this.getView().byId("toolbar").addContent(msgStrip);
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
		},
		
		/* =========== QR Code Dialog ================================ */
		onQRCode: function(oEvent) {
			this._getQRDialog().open();
		},

		_getQRDialog: function() {
			if (!this._oQRDialog) {
				this._oQRDialog = sap.ui.xmlfragment("de.tammenit.sap.community.tags.view.QRCodeDialog", this);
				this.getView().addDependent(this._oQRDialog);
			}
			return this._oQRDialog;
		},
		
		onDialogClose: function() {
			this._getQRDialog().close();	
		},
		
		onDisplayTagsOnWebsite: function() {
			window.open("https://www.sap.com/community/topic.html", "_blank");
		}
		
		

	});
});