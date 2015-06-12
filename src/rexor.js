var UI = require('ui');
var ajax = require('ajax');

function Rexor()
{
	var _user = {
		id: 'daniel',		
		username: 'rnd@daniel',
		password: 'macowski81',
		domain: 'rnd'
  };
  var _token = null;
  var _companies = null;  
	var _projects = null;	
	var _activities = null;
  var _menu = [
  {
    title: 'Tid',
    //icon: 'images/menu_icon.png',
    subtitle: 'Registrera tid'
  }
  ];
  
  this.getMenu = function()
  {
    return _menu;
  };
  this.handleMenu = function(index, text)
  {
    var card = new UI.Card();
    card.title('Ett projekt');
    card.subtitle(text);
    card.body('100 timmar');
    return card;
  };
  this.getCompanies = function(callback)
  {
    console.log('getting companies...');
    ajax(
    {
      url:'https://api.rexor.se/api/Company',
      type:'json',
      headers: { 'Authorization': 'Bearer ' + _token.access_token }
    },
    function(data) {
      _companies = data;
      var menu = [];
      for(var i = 0; i < _companies.length; i++)
        menu.push({
        title: _companies[i].ID,
        subtitle: _companies[i].Description
      });
      callback(menu);
    },
    function(error) {
      console.log('Download failed: ' + error);
    });
  };
	this.getProjects = function(company, callback)
  {
    console.log('getting projects...');
    ajax(
    {
      url:'https://api.rexor.se/api/Project/' + company,
      type:'json',
      headers: { 'Authorization': 'Bearer ' + _token.access_token }
    },
    function(data) {
      _projects = data;
      var menu = [];
      for(var i = 0; i < _projects.length; i++)
        menu.push({
        title: _projects[i].ID,
        subtitle: _projects[i].Description
      });
      callback(menu);
    },
    function(error) {
      console.log('Download failed: ' + error);
    });
  };
	this.getActivities = function(company, project, callback)
  {
    console.log('getting activities...');
		console.log('https://api.rexor.se/api/Project/Activity/' + company + '/' + project + '/' + _user.id);
    ajax(
    {
      url:'https://api.rexor.se/api/Project/Activity/' + company + '/' + project + '/' + _user.id,
      type:'json',
      headers: { 'Authorization': 'Bearer ' + _token.access_token }
    },
    function(data) {
			console.log('data');			
			console.log(data);

      _activities = data;
      var menu = [];
      for(var i = 0; i < _activities.length; i++)
        menu.push({
        title: _activities[i].ID,
        subtitle: _activities[i].Description
      });
      callback(menu);
    },
    function(error) {
      console.log('Download failed: ' + error);
    });
  };
  this.login = function(callback)
  {
    console.log('login in...');
    ajax(
    {
      url: 'https://auth.rexor.se/Token',
      type: 'application/x-www-form-urlencoded;charset=UTF-8',
      method: 'post',
      data: { 
				grant_type: 'password',
				client_id: _user.domain,
				username: _user.id,
				password: _user.password
			}
    },
    function(data) {
      console.log(JSON.stringify(data));
      _token = JSON.parse(data);
      callback(true);
    },
    function(error) {
      console.log('Download failed: ' + error);
    });
  };
}
 
exports.Rexor = Rexor;