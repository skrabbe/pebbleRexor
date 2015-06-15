var UI = require('ui');
var Api = require('api'), api = new Api();
var Store = require('store'), store = new Store();

function Rexor()
{
  this.getMenu = function()
  {
    return store.getMenu();
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
		api.post('https://api.rexor.se/api/Company', function(data) {
      var menu = [];
      for(var i = 0; i < data.length; i++)
        menu.push({
        title: data[i].ID,
        subtitle: data[i].Description
      });
      callback(menu);
    });
  };
	this.getProjects = function(company, callback)
  {
    console.log('getting projects...');
		api.post('https://api.rexor.se/api/Project/' + company, function(data) {
      var menu = [];
      for(var i = 0; i < data.length; i++)
        menu.push({
        title: data[i].ID,
        subtitle: data[i].Description
      });
      callback(menu);
    });
  };
	this.getActivities = function(company, project, callback)
  {
    console.log('getting activities...');
		api.post('https://api.rexor.se/api/Project/Activity/' + company + '/' + project + '/' + store.getUser().id, function(data) {
			console.log('get activities...');
			console.log('length: ' + data.length);
      var menu = [];
      for(var i = 0; i < data.length; i++)
        menu.push({
        title: data[i].ID,
        subtitle: data[i].Description
      });
      callback(menu);
    });
  };
  this.login = function(callback)
  {
		api.login(function(data) {
      callback(true);
    });  
	};
}
 
this.exports = Rexor;