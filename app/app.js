var loadLocalStorage = function () {
	var keys = Object.keys(localStorage)
	// var htmlString = '';
	for (var i = 0; i < keys.length; i++) {
		// var player = keys[i].substr(0, 1);
		// htmlString += `<tr><td>${keys[i]}</td><td>${localStorage[keys[i]]}</tr></tr>`;
		$(`#${keys[i]}`).text(localStorage[keys[i]]);
	}
	// $('tbody').html(htmlString)
};

var updateStatusLabel = function(message) {
	$('#statusLabel').text('Status: ' + message);
}

var players = ['1', '2', '3', '4'];
var holes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];

 //jQuery document ready initialization stuff
 ////button and form event handlers
 // logic for determining action probably needs to go in the event handler
$(document).ready(function () {
	loadLocalStorage();

	$('#btn-create').on('click', function(e) {
		var hole = $('#hole').val();
		// var value = $('#value').val();
		for (var p of players) {
			// var keyExists = localStorage.getItem(key) !== null;	
			// if (keyExists) {
				// updateStatusLabel('key already exists, please use update button instead! :D');
			// } else if (key === '') {
				var key = `${hole}${p}`;
				var value = $(`#player-${p}`).val();
			if (key === '') {
				updateStatusLabel('invalid input!')
			} else {
				createEntry(key, value);
				$(`#${key}`).text(value);
				// updateStatusLabel('key created - ' + k);
			}

			if (value === '1') {
				console.log('ace');
				var aceGif = '<img class="front-and-center" src="https://media.tenor.com/images/c045960860ad20e06810576147f20a76/tenor.gif">';
				$('body').append(aceGif);
				setTimeout(function () {
					$('.front-and-center').remove();
				}, 3000);
			}
		}
		//https://media.tenor.com/images/c045960860ad20e06810576147f20a76/tenor.gif

		loadLocalStorage();
	});

	$('#btn-update').on('click', function(e) {
		// var key = $('#key').val();
		// var value = $('#value').val();
		// var existingValue = localStorage.getItem(key)
		// var keyExists = existingValue !== null;

		// if (value === existingValue) {
		// 	updateStatusLabel('key not updated - that value already exists silly! xD')
		// } else if (keyExists) {
		// 	updateEntry(key, value);
		// 	updateStatusLabel('key updated - ' + key);
		// } else if (key === '') {
		// 	updateStatusLabel('invalid input!')
		// } else {
		// 	updateStatusLabel('key doesn\'t exist, please use create button instead! :D');
		// }		
		
		// loadLocalStorage();
		var lowestScore = 9999999999;
		var winningPlayers = [];
		for (var p of players) {
			var playerTotal = 0;
			for (var h of holes) {
				var key = `${h}${p}`;
				if (localStorage[key]) {
					playerTotal += Number(localStorage[key]);
				}
			}
			if (playerTotal < lowestScore) {
				lowestScore = playerTotal;
				winningPlayers = [p];
			} else if (playerTotal === lowestScore) {
				winningPlayers.push(p);
			}
			$(`#stroke-total-${p}`).text(playerTotal);
		}
		for (p of players) {
			$(`#row-${p}`).removeClass('winning');
		}
		for (w of winningPlayers) {
			$(`#row-${w}`).addClass('winning');
		}
	});

	$('#btn-delete').on('click', function(e) {
		var key = $('#key').val();
		var value = $('#value').val();
		var keyExists = localStorage.getItem(key) !== null;

		if (keyExists) {
			removeEntry(key);
			updateStatusLabel('key removed - ' + key);
		} else if (key === '') {
			updateStatusLabel('invalid input!')
		} else {
			updateStatusLabel('key doesn\'t exist, nothing removed. :|');
		}

		loadLocalStorage();
	});	

});
/*



When an input element is given a name, that name becomes a property of the owning form element's 
HTMLFormElement.elements property. That means if you have an input whose name is set to guest and 
another whose name is hat-size, the following code can be used:

let form = document.querySelector("form");
let guestName = form.elements.guest;
let hatSize = form.elements["hat-size"];
*/

/*
PAGE CONTENT STUFF
*/
//something to update the table every time localStorage changes

//localStorage stuff
//https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
////create new entry
//localStorage.setItem(key, value)
var createEntry = function(key, value) {
	return localStorage.setItem(key, value);
}

////Update existing entry
//localStorage.setItem(key, value)
var updateEntry = function(key, value) {
	return localStorage.setItem(key, value);
}

////delete existing entry
//localStorage.removeItem(key)
var removeEntry = function(key) {
	return localStorage.removeItem(key);
}
