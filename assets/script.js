//api key
const apiKey = "c8111344442f40f6b55f8188a14ec8ec";
const apiKey2 = "AIzaSyBtibM-CRu_1WCLUUdmOkndv7BZbV3rplE";

//function for speech rec request
async function transcribeSpeech(audio) {
    const formData = new FormData();
    formData.append("audio", audio);

    const response = await fetch("https://api.assemblyai.com/v2/transcript", {
        method: "POST",
        headers: {
            Authorization: apiKey,
        },
        body: formData,
    });

    const data = await response.json();
    return data.transcript_text;
}

// speech recognition
const recognition = new webkitSpeechRecognition();
recognition.continuous = true;

recognition.onresult = async function (event) {
    const speechText = event.results[event.results.length - 1][0].transcript;
    speechInput.value = speechText;

    const translationOutput = document.getElementById("translationOutput");
    translationOutput.textContent = "Translating...";

    try {
        const transcription = await transcribeSpeech(speechText);
        const translatedText = transcription.split("").reverse().join("");

        translationOutput.textContent = translatedText;
        postInput.value = translatedText;
    } catch (error) {
        console.error("Error transcribing speech:", error);
        translationOutput.textContent = "Translation Error";
    }
};

recognition.start();

// Function to handle the Post button click event
function handlePostButtonClick() {
    const postInput = document.getElementById("postInput");
    const postText = postInput.value;

    // Perform the social media posting logic here
    // Replace the following example code with your actual posting logic

    console.log("Posting to social media:", postText);
}

function handleStartButtonClick() {
    const startButton = document.getElementById("startButton");
    startButton.disabled = true;

    const speechInput = document.getElementById("speechInput");
    speechInput.disabled = true;

    const postInput = document.getElementById("postInput");
    postInput.disabled = true;

    recognition.start();
}

// Attach event listeners to the buttons
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", handlePostButtonClick);

const postButton = document.getElementById("postButton");
postButton.addEventListener("click", handlePostButtonClick);

async function translateText() {
    const response = await fetch('https://translation.googleapis.com/language/translate/v2?key=AIzaSyBtibM-CRu_1WCLUUdmOkndv7BZbV3rplE', {
        method: "POST",
        headers: {

        },
        body: {
            target: "de",
            q: "hello world",
        }
    });
    const data = await response.json()
    return data;
}
console.log(data)