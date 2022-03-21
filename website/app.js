// Global Variables

let d = new Date();

let month = d.getMonth() + 1;

let newDate = d.getDate() + "." + month + "." + d.getFullYear();

let apiKey = "d726da3b981f66a9180502b48d376b3e&units=imperial";

const button = document.getElementById("generate");

button.addEventListener("click", clickFunction);
//click function 
async function clickFunction(click) {
  const cityZipCode = document.getElementById("zip").value;
  ///https://api.openweathermap.org/data/2.5/weather?zip=90089&appid=d726da3b981f66a9180502b48d376b3e&units=imperial& units=metric`
  let baseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${cityZipCode}&appid=${apiKey}& units=metric`;
  await getData(baseUrl, cityZipCode, apiKey);
uiUpdating()}

// function to get the data 
async function getData(url, cityCode, api) {
  const fullUrl = url + cityCode + api;
  const clientFeeling = document.getElementById("feelings").value;

  const res = await fetch(fullUrl);

  try {
    const data = await res.json();

    console.log(data);

    const temp = data["main"]["temp"];

    const country = data["sys"]["country"];

    const city = data["name"];

    await postData("/post", temp, clientFeeling);
  } catch (error) {
    console.log("error", error);
  }
}

//function to post data
async function postData(url = "", temp, content) {
  const response = await fetch(url, {
    method: "POST",

    credentials: "same-origin",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      date: newDate,

      temp: temp,

      feelings: content,
    }),
  });

  try {
    const newData = await response.json();

    return newData;
  } catch (error) {
    console.log("error", error);
  }
}
///////////////////////////////////////////////////////////////
async function uiUpdating() {
  const req = await fetch('http://localhost:4000/get');
  try {
    const allData = await req.json();
    document.getElementById('date').innerHTML = 'Date: '+allData.date;
    document.getElementById('temp').innerHTML = 'temperature: '+allData.temp;
    document.getElementById('content').innerHTML = 'your feeling: '+allData.feelings;
    console.log(allData)
  }
  catch (error) {
      console.log('error', error);
  }
}