async function uploadMyFile(inp) 
{
    let user = { name: "morpheus", job: "leader"};
    let formData = new FormData();
    let photo = inp.files[0];      
         
    //formData.append("photo", photo);
    formData.append("user", JSON.stringify(user));  
    
    try {
       let r = await fetch('/api/users', {method: "POST", body: user}); 
       console.log('HTTP response code:',r.status); 
    } catch(e) {
       console.log('Huston we have problem...:', e);
    }
    
}

async function hello() {
    let user = { name: "morpheus", job: "leader"};
    try {
        let r = await fetch('https://reqres.in/api/users', {method: "POST", body: user}); 
        console.log('HTTP response code:',r.status); 
     } catch(e) {
        console.log('Huston we have problem...:', e);
     }

}

async function Kello() {
    
const x = `http://api.openweathermap.org/data/2.5/weather?q=Upington&units=metric&appid=655529df795a674114f7b77d422adce8`

fetch(x)
.then((res) => res.json())
.then((data) => generateWeatherHtml(data))




}

const generateWeatherHtml = (data) => {
    console.log(data.name +" : "+ data.main.temp);
    }