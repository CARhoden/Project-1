//api key 
const apiKey = "c8111344442f40f6b55f8188a14ec8ec";

//function for speech rec request
async function transcribeSpeech(audio) {
    const formData = new FormData ();
    formData.append('audio', audio);

const response = await fetch('https://api.assemblyai.com/v2/transcript', {
    method: "POST",
    headers: {
        "Authorization": apiKey,
    },
    body: formData,
});

const data = await response.json();
return data.transcript_text;
}

//TODO START BUTTON GO HERE

// speech recognition 
const recognition = new webkitSpeechRecognition();
recognition.continuous = true;

recognition.onresult = async function(event) {
const speechText = event.results[event.results.length - 1][0].transcript;
speechInput.value = speechText;

const translationOutput = document.getElementById('translationOutput');
translationOutput.textContent = 'Translating...';