var UI = require('ui');
//var Vector2 = require('vector2');
var ajax = require('ajax');

function Rexor()
{
  var _token = null;
  var _companies = null;
  var _menu = [
  {
    title: 'Tid',
    //icon: 'images/menu_icon.png',
    subtitle: 'Registrera tid'
  }, 
  //{
  //  title: 'Second Item3',
  //  subtitle: 'Subtitle Text'
  //}
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
    console.log(_token.access_token);
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
  this.login = function(callback)
  {
    console.log('login in...');
    ajax(
    {
      url: 'https://auth.rexor.se/Token',
      type: 'application/x-www-form-urlencoded;charset=UTF-8',
      method: 'post',
      data: { client_id:'rnd',grant_type:'password',username:'daniel',password:'macowski81' }
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