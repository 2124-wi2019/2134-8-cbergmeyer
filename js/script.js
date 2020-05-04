/*Craig Bergmeyer
Script.js
INFO 2134
Thoendel
May 3, 2020*/

window.addEventListener('load', () => {
    
    startClock();
    //YOUR CODE SHOULD START BELOW THIS LINE
    //initiate lat and long varibales for asssignment later
    let lat= '';
    let long = '';

    //hold api key for open weather
	const api = '4ef537861596248693af7c2eb3dee935'
	//get location
	navigator.geolocation.getCurrentPosition(youAreHere);
    //set lat and long variables for use 
    function youAreHere(position) { 
    	lat = position.coords.latitude;
    	long = position.coords.longitude
    }
    //add event listener to buttons
    let button = document.querySelectorAll('button');
    for (x = 0; x < 2; x++){
    	button[x].addEventListener('click', whichButton);
    }
    
    function whichButton(){
    		//check dataset of button clicked and call appropriate function
			if (this.dataset.id == 'getCurrentWx'){getCurrentWX();}
    		if (this.dataset.id == 'getFiveDay') getFiveDay();
     }

    function getCurrentWX(){
    	console.log('getCurrentWX() invoked');
    	//set api url with key
	    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${api}`;
	    //fetch url and check response
	    fetch(url)
			.then( (response) => {
				if (response.ok) {
					return response;
				} else{
				throw new Error('Error ' + response.statusText);
				}
			})
				//response to json and call function to display and catch error
				.then( response => response.json())
					.then( text => displayCurrent(text))
						.catch( error => console.log(error) );
		}
    
	function getFiveDay(){
		console.log('getFiveDay() invoked');
		//set api url with key
		let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=imperial&appid=${api}`;
	    //fetch url and check response
	    fetch(url)
			.then( (response) => {
				if (response.ok) {
					return response;
				} else{
				throw new Error('Error ' + response.statusText);
				}
			})
				//response to json and call function to display and catch error

				.then( response => response.json())
					.then( text => displayFiveDay(text))
						//****I don't get where the error is coming from
						.catch( error => console.log(error) );
		}
	
	
	function displayCurrent(text){
		// set Element ID
		let container = document.getElementById('currentWxHolder');
		//clear current and five day text
		clearContainer(container);
		//set variables
		let location = text.name; //h2
		let temp = text.main.temp;
		let maxTemp = text.main.temp_max;
		let minTemp = text.main.temp_min;

		//create h2 and text
		let locationHeading = document.createElement('h2');
		locationHeading.innerHTML = location;
		//create div and text
		let tempDIV = document.createElement('div');
		tempDIV.innerHTML = `Current Temp: ${temp} &deg F`;

		//create div and text
		let maxTempDIV = document.createElement('div');
		maxTempDIV.innerHTML = `Max Temp: ${maxTemp} &deg F`;

		//create div and text
		let minTempDIV = document.createElement('div');
		minTempDIV.innerHTML = `Min Temp: ${minTemp} &deg F`;
		//add text to page
		container.appendChild(locationHeading);
		container.appendChild(tempDIV);
		container.appendChild(maxTempDIV);
		container.appendChild(minTempDIV);
	}

	function displayFiveDay(text){
		
		let container = document.getElementById('fiveDayInfoHolder');
		//call clear function
		clearContainer();

		let location = text.city.name;
		//create h2 and text
		let locationHeading = document.createElement('h2');
		locationHeading.innerHTML = location;
		//create div and text
		let hour3 = document.createElement('div');
		hour3.innerHTML = '3 Hour Forecast';
		//add text to page
		container.appendChild(locationHeading);
		container.appendChild(hour3);
		//for loop to run 3 times 
		for (x = 0; x < 3; x++ ){
			//set variables
			let time = text.list[x].dt_txt;
			let temp = text.list[x].main.temp;
			let maxTemp = text.list[x].main.temp_max;
			let minTemp = text.list[x].main.temp_min;

			//create div and text
			let timeDIV = document.createElement('div');
			timeDIV.innerHTML = `<br><br>Forecast Time (UTC): ${time}`;

			//create div and text
			let tempDIV = document.createElement('div');
			tempDIV.innerHTML = `Temp: ${temp} &deg F`;

			//create div and text
			let maxTempDIV = document.createElement('div');
			maxTempDIV.innerHTML = `Max Temp: ${maxTemp} &deg F`;

			//create div and text
			let minTempDIV = document.createElement('div');
			minTempDIV.innerHTML = `Min Temp: ${minTemp} &deg F<br> <hr>`;
			
			
			//add text
			container.appendChild(timeDIV);
			container.appendChild(tempDIV);
			container.appendChild(maxTempDIV);
			container.appendChild(minTempDIV);
		}
	}

	//Clear current and five day
	function clearContainer(){
		document.getElementById('currentWxHolder').innerHTML = '';
		document.getElementById('fiveDayInfoHolder').innerHTML = '';
	}
});