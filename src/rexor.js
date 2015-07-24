var Api = require('api'), api = new Api();
var Store = require('store'), store = new Store();
var Transaction = {
	RegistrationDate: '',
	ProjectCompanyID: '',
	ProjectID: '',
	ProjectActivityID: '',
	ResourceID: store.getUser().id,
	Number: '',
	InvoicedNumber: '',
	InvoiceText: '',
	Description: '',
	DescriptionInternal: ''
};

function Rexor()
{
	this.setData = function(type, data)
	{
		//var self = this;
		
		if(type === 'company') Transaction.ProjectCompanyID = data;
		if(type === 'project') Transaction.ProjectID = data;
		if(type === 'activity') Transaction.ProjectActivityID = data;
		if(type === 'date') Transaction.RegistrationDate = data;
		if(type === 'number') Transaction.Number = data;
		if(type === 'number') Transaction.InvoicedNumber = data;
		if(type === 'text') Transaction.InvoiceText = data;
		//if(type === 'text') Transaction.Description = data;
		//if(type === 'text') Transaction.DescriptionInternal = data;
	};
  this.getMenu = function()
  {
    return store.getMenu();
  };
	this.createMenu = function(type, data)
	{
		var menu = [];
		if(type === 'company' || type === 'project' || type === 'activity')
		{		 
      for(var i = 0; i < data.length; i++)
        menu.push({
        title: data[i].ID,
        subtitle: data[i].Description,
				data: data[i]
      });	
		}
		if(type === 'hour')
		{		 
      for(var j = 0; j < data.length; j++)
        menu.push({
        title: data[j].ID,
				subtitle: 'timme',
				data: data[j]
      });	
		}
		if(type === 'day' || type === 'text')
		{		 
      for(var k = 0; k < data.length; k++)
        menu.push({
        title: data[k].ID,
				data: data[k]
      });	
		}
		return menu;
	};
  this.getCompanies = function(callback)
  {
		console.log('getting companies...');
		var self = this;		
		if(store.getCompanies())
		{
			callback(self.createMenu('company', store.getCompanies()));			
		}
		else
		{
			api.get('https://api.rexor.se/api/Company', function(data) {
				store.setCompanies(data);
				callback(self.createMenu('company', data));			
			});
		}
  };
	this.getProjects = function(callback)
  {
		console.log('getting projects...');
		var self = this;
    if(store.getProjects())
		{
			callback(self.createMenu('project', store.getProjects()));			
		}
		else
		{
			api.get('https://api.rexor.se/api/Project/' + store.getUser().id + '/' + '0', function(data) {
				store.setProjects(data);
				callback(self.createMenu('project', data));			
			});
		}
  };
	this.getActivities = function(callback)
  {
		console.log('getting activities...');
		var self = this;
    if(store.getActivities())
		{
			callback(self.createMenu('activity', store.getActivities()));			
		}
		else
		{
			//callback(self.createMenu('activity', [
			//	{ ID: 'Administration', Description: 'Administration' },
			//	{ ID: 'Dokumentering', Description: 'Dokumentering' },
			//	{ ID: 'Möte', Description: 'Möte' }
			//]));			
			api.get('https://api.rexor.se/api/Project/Activity/' + Transaction.ProjectCompanyID + '/' + Transaction.ProjectID + '/' + store.getUser().id, function(data) {			
				store.setActivities(data);
				callback(self.createMenu('activity', data));			
			});
		}
  };
	this.addDays = function(date, days)
	{
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.getFullYear() + '-' + (result.getMonth() + 1) + '-' + result.getDate();		
	};	
	this.getDays = function(callback)
  {
		console.log('getting days...');
		
		var self = this;
		var d = new Date();		
		var day = d.getDay(),
				
    diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
		var monday = new Date(d.setDate(diff));				
		
		callback(self.createMenu('day', [
			{ ID: 'Måndag', Value: self.addDays(monday, 0) },
			{ ID: 'Tisdag', Value: self.addDays(monday, 1) },
			{ ID: 'Onsdag', Value: self.addDays(monday, 2) },
			{ ID: 'Torsdag', Value: self.addDays(monday, 3) },
			{ ID: 'Fredag', Value: self.addDays(monday, 4) },
			{ ID: 'Lördag', Value: self.addDays(monday, 5) },
			{ ID: 'Söndag', Value: self.addDays(monday, 6) },			
		]));
  };
	
	this.getHours = function(callback)
  {
		console.log('getting hours...');
		var self = this;    
		callback(self.createMenu('hour', [
			{ ID: '1', Value: '1' },
			{ ID: '2', Value: '2' },
			{ ID: '3', Value: '3' },		
			{ ID: '4', Value: '4' },
			{ ID: '5', Value: '5' },
			{ ID: '6', Value: '6' },
			{ ID: '7', Value: '7' },
			{ ID: '8', Value: '8' }
		]));
  };
	this.getTexts = function(callback)
  {
		console.log('getting texts...');
		var self = this;    
		callback(self.createMenu('text', [
			{ ID: 'Ingen text', Value: '' },		
			{ ID: 'Kund', Value: 'Kund' },
			{ ID: 'Internt', Value: 'Internt' }			
		]));
  };
	this.getInfo = function()
  {
		return Transaction.ProjectID + ' / ' + Transaction.ProjectActivityID;
	};
	this.saveTime = function(callback)
  {
		console.log('saving time...');			
		
		api.post('https://api.rexor.se/api/Project/TimeTransaction/WriteSingle', Transaction, function(data) {			
				console.log('time saved!');				
				callback();
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