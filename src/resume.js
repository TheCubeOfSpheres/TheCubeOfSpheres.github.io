console.log('Initialize Resume');
function fadeIn() {
	document.body.classList.add('fade-in')
	document.body.classList.remove('fade-out');
}

window.onload = function() {
	fadeIn();
}

/*Audio Files
------------------------------------------------*/
var x = new Audio("media/closeNav.wav")
var select = new Audio("media/validate.wav");
var hover = new Audio("media/hover.wav");

/*Handle bars for Hud display
-------------------------------------------------*/
var targetDiv = document.getElementById('data');
var hudDisplay = document.getElementById('hudDisplay').innerHTML;
var hudDisplayTemplate = Handlebars.compile(hudDisplay);
var bio = "I am a self taught programmer and aspiring software engineer. Over the last two years I learned the fundamental concepts of programming by studying JavaScript and related tools such as CSS, Node.js and HTML.  From my initial studies I came to understand, that with good process and communication, any code base can be systematically broken down into its simplest components, understood with precision, and then optimized for efficiency and expanded capability. I hold a Bachelor of Arts in Philosophy from Florida International University. In my spare time I am an avid reader of science fiction and fantasy novels, hobbyist mycologist, and botanist.  I am currently expanding my programming capabilities by studying C++ and machine learning and look forward to incorporating both tools into future projects."

var experienceData = {
	isData: true,
	title: "<label>Experience</label>",
	header1: "<a onmouseover='hover.play();' href='https://www.facebook.com/Johnson-Family-Farm-527881367346588/' target='_blank'> Johnson Family Farm: 2013-2015</a>",
	notes1: ['Plant nutrition', 'Greenhouse maintenance', 'Watering', 'Harvesting', 'Weighing and packaging produce', 'Market sales'],
	header2: "<a onmouseover='hover.play();' href='https://www.facebook.com/polos.palms' target='_blank'> Polos' Palms: 2015-2016</a>",
	notes2: ['Plant nutrition', 'Maintenance of machinery', 'Watering', 'Harvesting', 'Tree removal', 'Tree Trimming'],
	header3: "<a onmouseover='hover.play();' href='https://www.lyft.com/' target='_blank'>Lyft:Driver - Current </a>",
	notes3: ['Lyft Driver'],
}

var portfolioData = {
	isData: true,
	title: "<label>Portfolio</label>",
	header1: "<a onmouseover='hover.play();' href='https://jo7ephjames.github.io/' target='_blank'>Vanilla Todolist</a>",
	notes1: ["Saves todos to local storage" ,"Double click to edit todos" ,"Checkbox to indicate completion" ,"Checkall Feature" ,"Option to render data based on completion status"],
	header2: "<a onmouseover='hover.play();' href='https://rocky-basin-92760.herokuapp.com/' target='_blank'>Appointment Setter</a>",
	notes2: ['Calendar interface rendered from vanilla javascript functions', 'Node.js  server deployed to Heroku', 'Calendar data(client and schedule information) stored on MongoDB', 'Admin accessible by button for educational purposes', 'Automated Text and Email confirmation with Nexmo', 'Captcha required for submission'],
	header3: "<a onmouseover='hover.play();' href='https://pacific-atoll-50941.herokuapp.com/' target='_blank'>Nested Todolist</a>",
	notes3: ['Authentication and login system with Passport','Check boxes to indicate completion','Recursive nesting of tasks,  collapsible subtasks option','Add, Save, or Delete separate task data from user database','Task lists stored on MongoDB','Password storage and password encryption with Bcrypt',],
}

var contactData;
var submitButton;


function validateFormData() {
	var form = document.getElementById('contactForm');
	var formData = {
		_id: form.phonenumber.value,
		firstName: form.firstname.value.trim(),
		lastName: form.lastname.value.trim(),
		eMail: form.email.value,
		message: form.message.value
	}
	if(formData.eMail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null && formData._id.match(/^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/) !== null && formData.firstName.trim() !== '' && formData.lastName.trim() !== '') {
		console.log(formData);

		Email.send("thecubeofspheres@gmail.com",
			formData.eMail,
			"Your Contact Form Was Received By Joseph James - Software Engineer",
			'Hi '+formData.firstName+'. Thank you for your interest, I will get back to you as soon as I get a chance to catch up on my e-mails.',
			"smtp.elasticemail.com",
			"thecubeofspheres@gmail.com",
			"a562f2c9-9d99-4c1c-ac5c-d4e618a58280");
		
		Email.send("thecubeofspheres@gmail.com",
			"theCubeOfSpheres@gmail.com",
			"Inquiry from " +formData.firstName+' '+formData.lastName,
			'Email: ' + formData.eMail + ' Tel: ' + formData._id + ' Message: ' + formData.message,
			"smtp.elasticemail.com",
			"thecubeofspheres@gmail.com",
			"a562f2c9-9d99-4c1c-ac5c-d4e618a58280",
			function done(message) { 
			 	alert("Your message has been sent");
			 	secret(); 
		});

	} else {
		var enterFirst = 'Please enter your first name in the appropriate field \n'
		var enterLast = 'Please enter your last name in the appropriate field \n'
		var invalidEmail = 'Enter your e-mail address in the correct format  \n'
		var invalidNumber = 'Enter the your phone number in one of the following formats XXX-XXX-XXXX and XXXXXXXXXX \n'
		var errorMessage = 'In order to submit contact form \n' 
		if(formData.firstName.trim() === '') {
			errorMessage = errorMessage + enterFirst;
		}
		if(formData.lastName.trim() === '') {
			errorMessage = errorMessage + enterLast;
		}
		if(formData.eMail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null) {
			errorMessage = errorMessage + invalidEmail;
		}
		if(formData._id.match(/^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/) === null) {
			errorMessage = errorMessage + invalidNumber;
		}
		alert(errorMessage);
	}
}


var aboutData = {
	isData: true,
	title: "<label> Bio </label>",
	header1: '',
	notes1: '',
	header2: '',
	notes2: '',
	header3: "<p id='bio'> Bio Goes Here</p>",
	notes3: '' 
}
var skillData = {
	isData: true,
	title: "<label> Skills </label>",
	header1: '',
	notes1: '',
	header2: '',
	notes2: ['MongoDB','Express','Angular','Node.js','JavaScript','HTML','CSS','Heroku','TypeScript', 'Various Frameworks', 'Git Version-Control','NPM'],
	header3: '',
	notes3: '' 
}

Handlebars.registerHelper('list', function(items, options) {
  var out = "<ul>";

  for(var i=0, l=items.length; i<l; i++) {
    out = out + "<li>" + items[i] + "</li>";
  }

  return out + "</ul>";
});

/*Open and close hud
---------------------------------------------------*/
function openNav(data) {
	document.getElementById("myNav").style.width = "100%";
	targetDiv.innerHTML = hudDisplayTemplate(data, 'list');
	if(data === contactData) {
		submitButton = document.getElementById('submitButton');
		form = document.getElementById('contactForm')
		submitButton.addEventListener('click', function() {
			validateFormData();
		});
	}
	if(data === aboutData) {
		var bioLabel = document.getElementById('bio');
		bioLabel.textContent = bio;
	}
}
/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

