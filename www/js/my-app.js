// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$(document).on('deviceready', function(e) {
   
   
    
function checkLocation(){
    if(localStorage.getItem('initLocation') == null){
    myApp.alert('please use the search bar to enter a city name followed by country code, for instance: London,uk', 'Welcome to WEAther');
    
    }
    
    else{
     let   searchCity = localStorage.getItem('initLocation');
        fetchWeather(searchCity);
    }
} 
    
    checkLocation();
    
    
    
$('#cityForm').on('submit', function(e){
    let searchCity = $('#cityName').val();
    console.log(searchCity); 
    fetchWeather(searchCity);

        e.preventDefault();
     $('#spin').css('display', 'block');
    
  });
 
    
    
    
    
    
    
    
/*---------------fetch movies------------------*/
    
function  fetchWeather(searchCity){
  $.ajax({
    method:'GET',
    url:'http://api.openweathermap.org/data/2.5/weather?q=' + searchCity + '&APPID=c1f6fe01645c4e9c4cc21370590c8fbc',
       error: function(XMLHttpRequest) {
           console.log(XMLHttpRequest);
      myApp.alert('please enter a valid city name followed by country code, for instance: London,uk', 'Reminder');
           $('#spin').css('display', 'none');
  }
  }).done(function(response){
    console.log(response);
      
$('#spin').css('display', 'none');
     
 
      
             let weather = response.weather; 
       
    
        
        //console.log(moviesArray[0].Year);
        
        
        var placeholder = ' ';
        $.each(weather, function(index, wea){
            
            let loc = wea.main
     localStorage.setItem('initLocation', searchCity);   
 
     let Weaicon = "icons/" + wea.icon + ".png";
            let tempK = response.main.temp;
            let tempC = (tempK - "273.15").toFixed(2);
            let tempC_min = ((response.main.temp_min) - "273.15").toFixed(2);
            let tempC_max = ((response.main.temp_max) - "273.15").toFixed(2);
            
      placeholder += `
<div class="row no-gutter">
        <div class="col-50"><br><img src="${Weaicon}" width="121" height="121"></div>
        <div class="col-50" style="text-align:left;"><h3>${tempC} °C</h3>
        <h3>${wea.description}</h3>
  <h2>${response.name}, ${response.sys.country}</h2>
        </div>
      </div>
        
    

<br>

<div class="row no-gutter">
        <div class="col-33">Min<br>${tempC_min} °C </div>
        <div class="col-33">Max<br>${tempC_max} °C</div>
        <div class="col-33">Humidity<br>${response.main.humidity} % </div>
      </div>
<br>

<div class="row no-gutter">
        <div class="col-33">Visibility<br>${response.visibility} <br> meter</div>
        <div class="col-33">Wind Speed<br>${response.wind.speed} <br> meter/sec</div>
        <div class="col-33">Pressure<br>${response.main.pressure} <br> hPa </div>
      </div>
      `; 
    });
    $('#weatherInfo').html(placeholder);  
  });   
    
    
   
    
    
    
    
    
    
    
      $.ajax({
    method:'GET',
    url:'http://api.openweathermap.org/data/2.5/forecast?q=' + searchCity + '&APPID=c1f6fe01645c4e9c4cc21370590c8fbc'
        }).done(function(result){
          console.log(result);
      

          $('#spin').css('display', 'none');
     
   
       
             let forcast = result.list; 
       
        let Forcicon1 = "icons/" + forcast[2].weather[0].icon + ".png";
        let Forcicon2 = "icons/" + forcast[10].weather[0].icon + ".png";
        let Forcicon3 = "icons/" + forcast[18].weather[0].icon + ".png";
        let Forcicon4 = "icons/" + forcast[26].weather[0].icon + ".png";
        let Forcicon5 = "icons/" + forcast[34].weather[0].icon + ".png";
      
          
          
          
         var d = new Date();
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

          
  var n = weekday[d.getDay()];
       
          var f1;
          var f2;
          var f3;
          var f4;
          var f5;
          
      if(n == "Sunday"){
         f1 = "Mon";
         f2 = "Tue";
         f3 = "Wed";
         f4 = "Thu";
         f5 = "Fri";
         }    
        
          
          if(n == "Monday"){
         f1 = "Tue";
         f2 = "Wed";
         f3 = "Thu";
         f4 = "Fri";
         f5 = "Sat";      
         }
          
            if(n == "Tuesday"){
         f1 = "Wed";
         f2 = "Thu";
         f3 = "Fri";
         f4 = "Sat";
         f5 = "Sun";
         }
          
             if(n == "Wednesday"){
         f1 = "Thu";
         f2 = "Fri";
         f3 = "Sat";
         f4 = "Sun";
         f5 = "Mon";
         }
          
              if(n == "Thursday"){
         f1 = "Fri";
         f2 = "Sat";
         f3 = "Sun";
         f4 = "Mon";
         f5 = "Tue";
         }
         
          
            if(n == "Friday"){
         f1 = "Sat";
         f2 = "Sun";
         f3 = "Mon";
         f4 = "Tue";
         f5 = "Wed";
         }
          
            if(n == "Saturday"){
         f1 = "Sun";
         f2 = "Mon";
         f3 = "Tue";
         f4 = "Wed";
         f5 = "Thu";
         }
         
        var placeholder = ' ';
  
      
     //let Weaicon = "icons/" + wea.icon + ".png";
   
            
      placeholder += `
<br>
<div class="row no-gutter">
        <div class="col-20">${f1}<br><img src="${Forcicon1}" width="50" height="50"><br>${((forcast[2].main.temp - "273.15").toFixed(2))} <br>°C</div>
        <div class="col-20">${f2}<br><img src="${Forcicon2}" width="50" height="50"><br>${((forcast[10].main.temp - "273.15").toFixed(2))}<br> °C</div>
        <div class="col-20">${f3}<br><img src="${Forcicon3}" width="50" height="50"><br>${((forcast[18].main.temp - "273.15").toFixed(2))}<br> °C</div>
        <div class="col-20">${f4}<br><img src="${Forcicon4}" width="50" height="50"><br>${((forcast[26].main.temp - "273.15").toFixed(2))} <br>°C</div>
<div class="col-20">${f5}<br><img src="${Forcicon5}" width="50" height="50"><br>${((forcast[34].main.temp - "273.15").toFixed(2))}<br> °C</div>
      </div>
      `; 
  
    $('#forcastInfo').html(placeholder);   
  }); 
   
    
    
}  /*-- end of featchWeather function -------*/
   
    

 }); /*---------end of onDeviceready function ------------*/
    






  
  



