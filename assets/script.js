//api key 
const apiKey = "c8111344442f40f6b55f8188a14ec8ec";

//function for speech rec request
async function transcribeSpeech(audio) {
    const formData = new FormData ();
    formData.append('audio', audio);
    
}