function Store()
{
	var _user = {
		id: 'daniel',		
		username: 'rnd@daniel',
		password: 'macowski81',
		domain: 'rnd'
  };
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
    return _user;
  };
	this.setUser = function(user)
	{
    _user = user;
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