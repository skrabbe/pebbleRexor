var ajax = require('ajax');
var Store = require('store'), store = new Store();

function Api()
{
	var _token;
	
  this.get = function(url, callback)
  {
    console.log('api get...');
    ajax(
    {
			method: 'GET',
      url:url,
      type:'json',
      headers: { 'Authorization': 'Bearer ' + _token.access_token }
    },
    function(data) {
			callback(data);
    },
    function(error) {
      console.log('api get failed: ' + error);
    });
  };
	this.post = function(url, data, callback)
  {
    console.log('api post...');
    ajax(
    {
      method: 'POST',
			url:url,
			data:data,			
      type:'json',
      headers: { 'Authorization': 'Bearer ' + _token.access_token }
    },
    function(data) {
			callback(data);
    },
    function(error) {
      console.log('api post failed: ' + error);
    });
  };
  this.login = function(callback)
  {
    console.log('api login...');
		var user = store.getUser();
    ajax(
    {
      url: 'https://auth.rexor.se/Token',
      type: 'application/x-www-form-urlencoded;charset=UTF-8',
      method: 'post',
      data: { 
				grant_type: 'password',
				client_id: user.domain,
				username: user.id,
				password: user.password
			}
    },
    function(data) {
      _token = JSON.parse(data);
      callback(true);
    },
    function(error) {
      console.log('api login failed: ' + error);
    });
  };
}
 
this.exports = Api;