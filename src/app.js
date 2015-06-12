/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
//var ajax = require('ajax');
var Rexor = require('rexor').Rexor, 
    core = new Rexor();
 
var main = new UI.Card({
  title: 'Rexor',
  icon: 'images/menu_icon.png',
  subtitle: 'Affärssystem för konsulter...',
  body: ''
});

main.show();

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: core.getMenu()
    }]
  });
  menu.on('select', function(e) {
      Login();
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});

function Login()
{
  core.login(function(success) {
    GetCompanies();
  });
}

function GetCompanies()
{
  core.getCompanies(function(companyMenu) {
    var menu = new UI.Menu({
      sections: [{
      items: companyMenu
      }]
    });
    menu.on('select', function(e) {
			GetProjects(e.item.title);
    });
    menu.show();
  });
}
										
function GetProjects(company)
{
  core.getProjects(company, function(projectMenu) {
    var menu = new UI.Menu({
      sections: [{
      items: projectMenu
      }]
    });
    menu.on('select', function(e) {
			GetActivities(company, e.item.title);
    });
    menu.show();
  });
}

function GetActivities(company, project)
{
  core.getActivities(company, project, 'daniel', function(activityMenu) {
    var menu = new UI.Menu({
      sections: [{
      items: activityMenu
      }]
    });
    menu.on('select', function(e) {
    });
    menu.show();
  });
}
