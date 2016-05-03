/**
 * Created by harry on 16/4/14.
 */
var hostname = "10.254.101.201:8080";
export default {
	getHostName : () => hostname,
	getUrl : (url) => {
		var fullUrl = 'http://' + hostname + url;
		if(location.hostname == "localhost" || location.hostname == '10.254.101.195'){
			// return '/proxy?url=' + encodeURIComponent(fullUrl);
			return url;
		}else{
			return fullUrl;
		}
	},
	convertSchema : schema => {
		return Object.keys(schema).map(name => {
			var type = schema[name];
			var text = "";
			if(type.type) {
				type = type.type;
				text = schema[name].text;
			}
			var field = {
				name : name,
				schema : schema[name],
				text : text
			};
			if(type == Date){
				field.type = "date";
			}
			if(type == Boolean){
				field.type = "bool";
			}
			return field;
		});
	}
}