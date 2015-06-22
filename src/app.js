/* Libs */
var UI = require('ui');
var Vector2 = require('vector2');
var Rexor = require('rexor'), rexor = new Rexor();
var Vibe = require('ui/vibe');

/* Variables */
var isLoggedIn = false;
//var APP_VERSION = "v0.1";

Login(); // run login so user has auth when running program

/* UI */
var main = new UI.Window();

var info_text = new UI.Text({
  position: new Vector2(0, 50),
  size: new Vector2(144, 30),
  font: 'gothic-24-bold',
  text: 'Rexor',
  textAlign: 'center'
});

var anykey_text = new UI.Text({
  position: new Vector2(0, 114),
  size: new Vector2(144, 30),
  font: 'gothic-14-bold',
  text: 'Affärssystemet för konsulter...',
  textAlign: 'center'
});

/* Functions */
function Loading()
{
	info_text.text('Laddar...');
	main.show();
}

function Login()
{
  rexor.login(function(success) {
    console.log('logged in...');
		isLoggedIn = true;
  });
}

function Start()
{
  var menu = new UI.Menu({
    sections: [{
      items: rexor.getMenu()
    }]
  });
  menu.on('select', function(e) {
			if(!isLoggedIn)
				return;
      GetCompanies();
  });
  menu.show();
	anykey_text.text('Rexor');
}

function GetCompanies()
{
	Loading();

  rexor.getCompanies(function(items) {
		var menu = new UI.Menu({
			sections: [{
				title: 'Välj företag:',
				items: items
			}]
		});
		menu.on('select', function(e) {
			Vibe.vibrate('short');
			GetProjects(e.item.title);
		});
    menu.show();
  });
}
										
function GetProjects(company)
{
	Loading();
  rexor.getProjects(company, function(items) {
    var menu = new UI.Menu({
      sections: [{
				title: 'Välj projekt:',
				items: items
      }]
    });
    menu.on('select', function(e) {
			Vibe.vibrate('short');
			GetActivities(company, e.item.title);
    });
    menu.show();
  });
}

function GetActivities(company, project)
{
	Loading();
  rexor.getActivities(company, project, function(items) {
    var menu = new UI.Menu({
      sections: [{
				title: 'Välj aktivitet:',
				items: items
      }]
    });
    menu.on('select', function(e) {
			Vibe.vibrate('short');
			GetHours();
    });
    menu.show();
  });
}

function GetHours()
{
	Loading();
  rexor.getHours(function(items) {
    var menu = new UI.Menu({
      sections: [{
				title: 'Välj antal timmar:',
				items: items
      }]
    });
    menu.on('select', function(e) {
			Vibe.vibrate('short');
			GetTexts();
    });
    menu.show();
  });
}

function GetTexts()
{
	Loading();
  rexor.getTexts(function(items) {
    var menu = new UI.Menu({
      sections: [{
				title: 'Välj text:',
				items: items
      }]
    });
    menu.on('select', function(e) {
			Vibe.vibrate('short');
			rexor.saveTime();
    });
    menu.show();
  });
}

/* Init */
main.on('click', 'up', Start);
main.on('click', 'select', Start);
main.on('click', 'down', Start);

main.add(anykey_text);
main.add(info_text);
main.show();
