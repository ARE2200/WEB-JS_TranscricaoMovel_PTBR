
		var element = document.getElementById('transcription');
		var lastScrollTop = element.scrollTop;

const translate = window.translate;
const englishWord =document.getElementById('palavra');
const ptbr =document.getElementById('ptbr')
const sourceLang = 'en';
const targetLang = 'pt';

		if ('webkitSpeechRecognition' in window) {
			const recognition = new webkitSpeechRecognition();
			recognition.lang = 'pt-BR';			
			recognition.continuous = true;
			recognition.interimResults = true;

			const transcription = document.getElementById('transcription');
			document.getElementById('start-btn').addEventListener('click', function() {
				recognition.start();
			});

			recognition.onresult = function(event) {
				let interimTranscription = '';
				for (let i = event.resultIndex; i < event.results.length; ++i) {
					if (event.results[i].isFinal) {
						transcription.innerHTML += event.results[i][0].transcript+='<br><br>';
					} else {
						interimTranscription += event.results[i][0].transcript;
					}
				}

				if (interimTranscription) {
					englishWord.innerText = interimTranscription;
					translate(englishWord.innerText, sourceLang, targetLang).then(function(translation) {
  						ptbr.innerText = translation;
					});
					transcription.innerHTML += interimTranscription;
				} 
				window.scrollTo(0,document.body.scrollHeight);
			};
		} else {
			alert('A API de Reconhecimento de Fala não é suportada neste navegador');
		}