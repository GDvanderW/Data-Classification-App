let APIurl = 'https://jd3o2caeg6.execute-api.af-south-1.amazonaws.com/dataRecords/datarecords/{9}';
let APIurl2 = 'https://jsonplaceholder.typicode.com/posts';
let APIurl3 = 'https://jd3o2caeg6.execute-api.af-south-1.amazonaws.com/NewDataStage';

async function hello() {
    const mydata = {id: "5", datastorename: "#", type: "#", location: "#", container: "#", fieldname: "#", category: "#"};
    
    let options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(mydata)};
      
        fetch('https://jd3o2caeg6.execute-api.af-south-1.amazonaws.com/NewDataStage/datarecords/id', options)
        .then(response => response.json())
        .then(data => console.log(data))
    
}

async function GetAllData() {
    fetch('https://jd3o2caeg6.execute-api.af-south-1.amazonaws.com/NewDataStage/datarecords')
    .then((res) => res.json())
    .then((data) => generateTableHtml(data))}

const generateTableHtml = (data) => {
    console.log(data);
    
    var metaInfo = new Array();
    metaInfo.push(["Record ID", "Datastore Name", "Type", "Location", "Container", "Field Name", "Category"]);
    try {
        for (let i = 0; i < 50; i++) {
            metaInfo.push([data[i].id, data[i].datastorename, data[i].type, data[i].location, data[i].container, data[i].fieldname, data[i].category]);
         }
    } catch (error) {
        console.log("All data is now displayed!");
    }
    GenerateTable(metaInfo);
    }

    function GenerateTable(customers) {
        var table = document.createElement("TABLE");
        table.border = "1";
        var columnCount = customers[0].length;
        var row = table.insertRow(-1);
        for (var i = 0; i < columnCount; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = customers[0][i];
            row.appendChild(headerCell);
        }
 
        for (var i = 1; i < customers.length; i++) {
            row = table.insertRow(-1);
            for (var j = 0; j < columnCount; j++) {
                var cell = row.insertCell(-1);
                cell.innerHTML = customers[i][j];
            }
        }
        var dvTable = document.getElementById("dvTable");
        dvTable.innerHTML = "";
        dvTable.appendChild(table);
    }


function deleteData(){
        let id = document.getElementById('username').value;
        fetch('https://jd3o2caeg6.execute-api.af-south-1.amazonaws.com/dataRecords/datarecords' + '/' + id, {
          method: 'DELETE'
        }).then(() => {
           console.log('removed');
        }).catch(err => {
          console.error(err)
        });
        }