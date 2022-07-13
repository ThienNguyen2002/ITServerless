const bunnForm = document.getElementById('bunnForm');

bunnForm.addEventListener('submit', async function (event) {
   event.preventDefault()
   const username = document.getElementById("username").value
   const output = document.getElementById("output")
   if(!username){
      alert("No name error.")
      return
   }
let fileInput = document.getElementById('image')
const file = fileInput.files[0];
   var payLoad = new FormData(bunnForm);
   payLoad.append('file', file);
   const endpoint = "https://cantin.azurewebsites.net/api/bunnimage-upload?code=5iaLcu8sDrKcTs62pXRSSICZFrM9jRcX9gcoeqD3DeDTAzFucOlR7A=="
   const options = {
      method: 'POST',
      body: payLoad,
      headers: {
         codename : username,
         'Content-Type': 'multipart/form-data'
      }
   }

   const resp  = await fetch(endpoint, options);
   const data = await resp.text();
   output.textContent = 'Your image has been stored successfully!'
});

const downloadButton = document.getElementById('button1');

downloadButton.addEventListener('click', async function (event) {
   event.preventDefault()
   var username = document.getElementById("username").value

  console.log('attempting to get your image...');

   const url = "https://cantin.azurewebsites.net/api/bunnimage-download?code=uM1FoejicIn_5eFO1BtkR_D47dLNtFoyowNvDPrnCjNMAzFul3LZbw==" 
   const resp = await fetch(url, {
      method: 'GET',
      headers: {
         username : username
      }
   });

   const data = await resp.json();
   console.log("image has been received");
   console.log(data);

   window.open(data.downloadUri, "_self");
});