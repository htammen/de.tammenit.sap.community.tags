# SAP Community TAG List
This app provides the list of primary and secondary tags of the new SAP Community
## Architecture
The app is a simple UI5 app that uses a JSON model. The file used when creating the JSON model is
```
webapp/model/tags.json
```
## Origin of JSON file
The before mentioned JSON file is generated from an Excel file that can be downloaded [here](http://www.sap.com/community/about/using-tags.html).  
I then exported this file in Excel as CSV file and converted the CSV file to JSON.  
For this I used this [online converter](http://keyangxiang.com/csvtojson/). Keep in mind to set the delimiter
to `;` instead of using the default one.
