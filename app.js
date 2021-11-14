class SpeechRecognitionApi {
    constructor(options) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.speechApi = new SpeechRecognition();
        this.textbox = options.textbox ? options.textbox : document.createElement('div');
        this.speechApi.continous = true;
        this.speechApi.interimResult = true;
        this.speechApi.onresult = (event) => {
            var resultIndex = event.resultIndex;
            var transcript = event.results[resultIndex][0].transcript;
            this.textbox.textContent = transcript;
            speak();
        }
    }
    init() {
        this.speechApi.start();
    }
    stop() {
        this.speechApi.stop();
    }
}
window.onload = function () {
    var speech = new SpeechRecognitionApi({
        textbox: document.querySelector(".textbox")
    })
    document.querySelector(".btn-start").addEventListener("click", () => {
        speech.init();
    })
    document.querySelector(".btn-end").addEventListener("click", () => {
        speech.stop();
    })
}

var but = document.getElementById("btn").addEventListener("click", speak);

var input = document.getElementById("test");

function speak() {
    
    if ('speechSynthesis' in window) {
        var msg = new SpeechSynthesisUtterance();
        msg.text = input.value;
        window.speechSynthesis.speak(msg);
    } else {
        alert("Sorry, your browser doesn't support text to speech!");
    }

}