sap.ui.define([], function() {
	"use strict";

	return {

		formatTag: function(level, tagL1, tagL2, tagL3, link) {
			var retValue = "";
			switch (level) {
				case '(level 1)':
					retValue = tagL1;
					break;
				case '(level 2)':
					retValue = tagL2;
					break;
				case '(level 3)':
					retValue = tagL3;
					break;
				default:
			}
			return retValue;
		},
		
		formatHREF: function(link) {
			if(link !== "" && link.startsWith("http")) {
				return link;
			} else {
				return "";
			}
		},
		
		_formatLinkText: function(link, text) {
			if(link !== "" && link.startsWith("http")) {
				return text;
			} else {
				return "";
			} 
		},
		
		formatLinkTextAnswers: function(link) {
			return this.formatter._formatLinkText(link, 'Q&A');
		},
		formatLinkTextBlogs: function(link) {
			return this.formatter._formatLinkText(link, 'Blogs');
		},
		formatLinkTextUnanswered: function(link) {
			return this.formatter._formatLinkText(link, 'Unanswered');
		},
		
		formatHREFAnswers: function(link) {
			if(link !== "" && link.startsWith("http")) {
				return "https://answers-qa.sap.com/tags/" + this.formatter._extractIdFromLink(link);
			} else {
				return "";
			}
		},

		formatHREFBlogs: function(link) {
			if(link !== "" && link.startsWith("http")) {
				return "https://blogs-qa.sap.com/tags/" + this.formatter._extractIdFromLink(link);
			} else {
				return "";
			}
		},

		formatHREFUnanswered: function(link) {
			if(link !== "" && link.startsWith("http")) {
				return "https://answers-qa.sap.com/tags/" + this.formatter._extractIdFromLink(link) + "?sort=newest&filter=unanswered";
			} else {
				return "";
			}
		},
		
		
		_extractIdFromLink: function(link) {
			var start = link.indexOf("id=") + 3;
			var end = link.length;
			return link.substring(start, end);
		}
	};

});