const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

//disable/enable button

function toggleButton() {
  button.disabled = !button.disabled;
}

//Passing Jokes from Joke API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "a54ac9599280484aa7c6e4c87c93dc34",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

//Get Jokes from Jokes API
async function getJokes() {
  let joke = "";
  const apiURL =
    "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //text-to speech
    tellMe(joke);

    //disablr button
    toggleButton();
  } catch (error) {
    //catch error
    console.log("whoops!", error);
  }
}

//event listeners

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
