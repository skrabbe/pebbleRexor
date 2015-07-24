/* Libs */
var UI = require('ui');
var Vector2 = require('vector2');
var Rexor = require('rexor'), rexor = new Rexor();
var Vibe = require('ui/vibe');

/* Variables */
var isLoggedIn = false;
var _backGroundColor = "malachite";
var _textColor = "black";
var _highlightBackgroundColor = "black";
var _highlightTextColor = 'white'
//var APP_VERSION = "v0.1";

Login(); // run login so user has auth when running program

/* UI */
var main = new UI.Window({
		backgroundColor: _backGroundColor,
		fullscreen:true
});

var info_text = new UI.Text({
  position: new Vector2(0, 10),
  size: new Vector2(144, 50),
  text: 'Rexor',
	font: 'GOTHIC_28_BOLD',
  color: 'white',
  textOverflow: 'wrap',
  textAlign: 'center',
	backgroundColor: _backGroundColor
});

var anykey_text = new UI.Text({
  position: new Vector2(0, 100),
  size: new Vector2(144, 168),  
  text: 'Affärssystemet för konsulter...',    
	font: 'GOTHIC_14_BOLD',
  color: 'white',
  textOverflow: 'wrap',
  textAlign: 'center',
	backgroundColor: _backGroundColor
});

/* Functions */
function SetText(text)
{
	info_text.text(text);
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
		backgroundColor: 'magenta', // purple
		textColor: _textColor,  
		highlightBackgroundColor: _highlightBackgroundColor,
		highlightTextColor: _highlightTextColor,
    sections: [{
      items: rexor.getMenu()
    }]
  });
  menu.on('select', function(e) {
			if(!isLoggedIn)
				return;      
			GetProjects();
  });
  menu.show();
	anykey_text.text('Rexor');
}
										
function GetProjects()
{
	//Loading();
  rexor.getProjects(function(items) {
    var menu = new UI.Menu({		
			backgroundColor: 'vividCerulean', //blue
			textColor: _textColor,  
			highlightBackgroundColor: _highlightBackgroundColor,
			highlightTextColor: _highlightTextColor,
      sections: [{
				title: 'Välj projekt:',
				items: items
      }]
    });
    menu.on('select', function(e) {
			rexor.setData('company', e.item.data.Company);
			rexor.setData('project', e.item.data.ID);
			GetActivities();
    });
    menu.show();
  });
}

function GetActivities()
{
	//Loading();
  rexor.getActivities(function(items) {
    var menu = new UI.Menu({
			backgroundColor: 'lavenderIndigo', // pink
			textColor: _textColor,  
			highlightBackgroundColor: _highlightBackgroundColor,
			highlightTextColor: _highlightTextColor,
      sections: [{
				title: 'Välj aktivitet:',
				items: items
      }]
    });
    menu.on('select', function(e) {
			rexor.setData('activity', e.item.data.ID);
			GetDays();
    });
    menu.show();
  });
}

function GetDays()
{
	//Loading();
  rexor.getDays(function(items) {
    var menu = new UI.Menu({
			backgroundColor: 'green',
			textColor: _textColor,  
			highlightBackgroundColor: _highlightBackgroundColor,
			highlightTextColor: _highlightTextColor,
      sections: [{
				title: 'Välj dag:',
				items: items
      }]
    });
    menu.on('select', function(e) {
			rexor.setData('date', e.item.data.Value);
			GetHours();
    });
    menu.show();
  });
}

function GetHours()
{
	//Loading();
  rexor.getHours(function(items) {
    var menu = new UI.Menu({
			backgroundColor: 'chromeYellow', // orange
			textColor: _textColor,  
			highlightBackgroundColor: _highlightBackgroundColor,
			highlightTextColor: _highlightTextColor,
      sections: [{
				title: 'Välj antal timmar:',
				items: items
      }]
    });
    menu.on('select', function(e) {
			rexor.setData('number', e.item.data.Value);
			GetTexts();
    });
    menu.show();
  });
}

function GetTexts()
{
	//Loading();
  rexor.getTexts(function(items) {
    var menu = new UI.Menu({
			backgroundColor: 'electricUltramarine', //blue
			textColor: _textColor,  
			highlightBackgroundColor: _highlightBackgroundColor,
			highlightTextColor: _highlightTextColor,
      sections: [{
				title: 'Välj text:',
				items: items
      }]
    });
    menu.on('select', function(e) {
			rexor.setData('text', e.item.data.Value);
			SaveTime();
    });
    menu.show();
  });
}

function SaveTime()
{
  rexor.getTexts(function(items) {
    var menu = new UI.Menu({
			backgroundColor: _backGroundColor,
			textColor: _textColor,  
			highlightBackgroundColor: _highlightBackgroundColor,
			highlightTextColor: _highlightTextColor,
      sections: [{
				title: 'Spara?:',
				items: [
					{ title: 'Ja', subtitle: rexor.getInfo() },
					{ title: 'Nej' }
				]
      }]
    });
    menu.on('select', function(e) {
			if(e.item.title === 'Ja') {
				rexor.saveTime(function(items) {
					SetText('Sparad...');
					Vibe.vibrate('short');
				});					
			}									
    });
		menu.on('click', 'up', function(e) {
			GetProjects();
    });
		menu.on('click', 'down', function(e) {
			GetProjects();
    });
    menu.show();
  });
}

/* Init */
main.on('click', 'up', Start);
main.on('click', 'select', Start);
main.on('click', 'down', Start);

main.add(info_text);
main.add(anykey_text);
main.show();
