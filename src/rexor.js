var Api = require('api'), api = new Api();
var Store = require('store'), store = new Store();

function Rexor()
{
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
        subtitle: data[i].Description
      });	
		}
		if(type === 'hour')
		{		 
      for(var j = 0; j < data.length; j++)
        menu.push({
        title: data[j].ID,
				subtitle: 'timme'
      });	
		}
		if(type === 'text')
		{		 
      for(var k = 0; k < data.length; k++)
        menu.push({
        title: data[k].ID        
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
	this.getProjects = function(company, callback)
  {
		console.log('getting projects...');
		var self = this;
    if(store.getProjects())
		{
			callback(self.createMenu('project', store.getProjects()));			
		}
		else
		{
			api.get('https://api.rexor.se/api/Project/' + company, function(data) {
				store.setProjects(data);
				callback(self.createMenu('project', data));			
			});
		}
  };
	this.getActivities = function(company, project, callback)
  {
		console.log('getting activities...');
		var self = this;
    if(store.getActivities())
		{
			callback(self.createMenu('activity', store.getActivities()));			
		}
		else
		{
			callback(self.createMenu('activity', [
				{ ID: 'Administration', Description: 'Administration' },
				{ ID: 'Dokumentering', Description: 'Dokumentering' },
				{ ID: 'Möte', Description: 'Möte' }
			]));			
			//api.get('https://api.rexor.se/api/Project/Activity/' + company + '/' + project + '/' + store.getUser().id, function(data) {			
				//store.setActivities(data);
				//callback(self.createMenu('activity', data));			
			//});
		}
  };
	this.getHours = function(callback)
  {
		console.log('getting hours...');
		var self = this;    
		callback(self.createMenu('hour', [
				{ ID: '1' },
				{ ID: '2' },
				{ ID: '3' }		
		]));
  };
	this.getTexts = function(callback)
  {
		console.log('getting texts...');
		var self = this;    
		callback(self.createMenu('text', [
				{ ID: 'Kund' },
				{ ID: 'Internt' },
				{ ID: '' }		
		]));
  };
	this.saveTime = function(company, callback)
  {
		console.log('saving time...');
		//var self = this;
		var data = {
			RegistrationDate: '2015-06-16',
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
		api.post('https://api.rexor.se/api/Project/TimeTransaction/WriteSingle', data, function(data) {
				console.log('time saved!');				
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