//api key
const apiKey = "c8111344442f40f6b55f8188a14ec8ec";
const apiKey4 = "Bearer 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";

let transcriptionResult = "Test";

//function for speech rec request
async function transcribeSpeech(audio) {
  const formData = new FormData();
  formData.append("file", audio, "audio.webm");
  formData.append("model", "whisper-1");
  console.log(formData, "formData");

  const response = await fetch(
    "https://api.openai.com/v1/audio/transcriptions",
    {
      method: "POST",
      headers: {
        Authorization: apiKey4,
      },
      body: formData,
    }
  );
  console.log(response);
  const data = await response.json();
  console.log(data);
  speechInput.value = data.text;
  translatedContent(data.text);
  return data.text;
}

const proxyUrl = "https://cors-anywhere.herokuapp.com/";

async function translatedContent(inputText) {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "DeepL-Auth-Key c4502c90-c5a6-96ed-440a-4d8ecd2026a5:fx"
  );
  myHeaders.append("Content-Type", "application/json");
  console.log(inputText);
  var raw = JSON.stringify({
    text: [inputText],
    target_lang: "DE",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    mode: "cors",
  };

  fetch(proxyUrl + "https://api-free.deepl.com/v2/translate", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      postInput.value = result.translations[0].text;
    })
    .catch((error) => console.log("error", error));
}

let stream;
let mediaRecorder;
let chunks = [];

const startRecording = async () => {
  console.log("start");
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.addEventListener("dataavailable", (e) => {
      chunks.push(e.data);
    });

    mediaRecorder.addEventListener("stop", () => {
      const audioBlob = new Blob(chunks, { type: "audio/webm" });
      const speechText = transcribeSpeech(audioBlob);

      chunks = [];
    });

    mediaRecorder.start();
  } catch (err) {
    console.error("Error accessing microphone:", err);
  }
};

const stopRecording = () => {
  console.log(stop);
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    stream.getTracks().forEach((track) => track.stop());
  }
};

// Attach event listeners to the buttons
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", startRecording);

const stopButton = document.getElementById("stopButton");
stopButton.addEventListener("click", stopRecording);

// Modal
// const shareButton = ducument.querySelector("#share");
const modalBg = document.querySelector(".modal-background");
const modal = document.querySelector(".modal");

shareButton.addEventListener("click", () => {
  modal.classList.add("is-active");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("is-active");
});

const dropdownTrigger = document.querySelector(".dropdown-trigger button");

dropdownTrigger.addEventListener("click", function (event) {
  console.log("click");
  event.stopPropagation();
  const dropdownMenu = document.querySelector(".dropdown-menu");
  dropdownMenu.classList.toggle("is-active");
});

window.addEventListener("click", function (event) {
  const dropdownMenu = document.querySelector(".dropdown-menu");
  console.log("click");
  if (!dropdownMenu.contains(event.target)) {
    dropdownMenu.classList.remove("is-active");
  }
});
