function Store()
{
	var _menu = [{
    title: 'Tid',
    //icon: 'images/menu_icon.png',
    subtitle: 'Registrera tid'
  }];
	var _companies = null;  
	var _projects = null;	
	var _activities = null;
	
  this.getUser = function()
  {
		var domain = localStorage.getItem('domain');
		var id = localStorage.getItem('id');
		var username = localStorage.getItem('username');
		var password = localStorage.getItem('password');	
		
    return {
			id: id,		
			username: domain + '@' + username,
			username_native: username,
			password: password,
			domain: domain
		};
  };
	this.getMenu = function()
  {
    return _menu;
  };
  this.getCompanies = function()
  {
    return _companies;
  };
	this.setCompanies = function(companies)
	{
    _companies = companies;
  };
  this.getCompanies = function()
  {
    return _companies;
  };
	this.setCompanies = function(companies)
	{
    _companies = companies;
  };
	this.getProjects = function()
  {
    return _projects;
  };
	this.setProjects = function(projects)
	{
		for(var i = 0; i < projects.length; i++) {
			if(projects[i].ID === 'Absence')
				projects[i].ID = 'Frånvaro';
		}
    _projects = projects;
  };
	this.getActivities = function()
  {
    return _activities;
  };
	this.setActivities = function(activities)
	{
    _activities = activities;
  };
}
 
this.exports = Store;