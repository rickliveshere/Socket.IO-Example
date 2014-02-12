var RR = RR || {};

RR.Sockets = function(audioPlayer) {
	
	var socket = io.connect('http://localhost');
    		socket.on('receive', function(message) {
     	 		console.log('received %s', message);
     	 		audioPlayer.playSound(message);
    });

    var send = function(value) {
      		console.log(value);
      		console.log('sending %s to server', value);
      		socket.emit('playSound', { key: value });
    };

    document.onkeydown = function(e) {
    		e = e || window.event;
    		send(e.which || e.keyCode);
    };
}

RR.AudioPlayer = function() {

	var audioFiles = {
		'97': { file: '1.wav' },
		'65': { file: '1.wav' },
		'115': { file: '2.wav' },
		'83': { file: '2.wav' },
		'100': { file: '3.wav' },
		'68': { file: '3.wav' },
		'102': { file: '4.wav' },
		'70': { file: '4.wav' },
		'103': { file: '5.wav' },
		'71': { file: '5.wav' },
		'104': { file: '6.wav' },
		'72': { file: '6.wav' },
		'106': { file: '7.wav' },
		'74': { file: '7.wav' },
		'107': { file: '8.wav' },
		'75': { file: '8.wav' }
	};
	
	var currentAudio;

	function loadAudioFile(id) {

		var audioFile = audioFiles[id];
		if (audioFile)
		{
			if (!audioFile.audio)
			{
				var audio = new Audio('/sounds/'+audioFile.file);
				audioFile.audio = audio;
			}
			
			if (currentAudio)
			{
				audioFiles[currentAudio].audio.pause();
				audioFiles[currentAudio].audio.currentTime = 0;
			}
			
			currentAudio = id;
			
			audioFile.audio.play();
		}
	}

	return {
		playSound: function(id) {
			loadAudioFile(id);
		}
	};
};

var audioPlayer = new RR.AudioPlayer();
var client = new RR.Sockets(audioPlayer);
