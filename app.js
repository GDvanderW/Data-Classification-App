let dataStoreName = "";
let typeFile = "";
let path = "";
let idRecord = 0;
let container = "";
let fieldname = "";
let category = "Protected";

async function uploadMyFile(tempUpload) {
    // Get datastore name
    let file = tempUpload.files[0];  
    dataStoreName = file.name;
    //------------------------------------------------------DATASTORE NAME = dataStoreName
    document.getElementById("datastoreName").value = dataStoreName;

    // Get file type
    let exten = false;
    let typ = "";
    for (var i = 0; i < dataStoreName.length; i++) {
        if(dataStoreName[i] == "." || exten == true){
                typ = typ + dataStoreName[i];
                exten = true;
        }
      }
    
    if(typ == ".txt"){
        typeFile = "Text"
    }
    if(typ == ".xls"){
        typeFile = "Excel"
    }
    if(typ == ".xlsx"){
        typeFile = "Excel"
    }
    if(typ == ".json"){
        typeFile = "JSON"
    }
    if(typ == ".csv"){
        typeFile = "CSV"
    }
    if(typ == ".sql"){
        typeFile = "SQL"
    }//------------------------------------------------------------------TYPE = type
    document.getElementById("type").value = typeFile;

    // Get location of file
    path = tempUpload.value;
    //------------------------------------------------------------------Location = path
    document.getElementById("location").value = path;
    idRecord = Math.floor((Math.random() * 999999) + 100000);
    document.getElementById("recordID").value = idRecord;
    document.getElementById("category").value = "Protected";
};

async function postData() {
    idRecord = document.getElementById('recordID').value;
    dataStoreName = document.getElementById('datastoreName').value;
    typeFile = document.getElementById('type').value;
    path = document.getElementById('location').value;
    container = document.getElementById('container').value;
    fieldname = document.getElementById('fieldName').value;
    category = document.getElementById('category').value;

    
    const mydata = {id: idRecord, datastorename: dataStoreName, type: typeFile, location: path, container: container, fieldname: fieldname, category: category};
    
    let options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(mydata)};
        fetch('https://jd3o2caeg6.execute-api.af-south-1.amazonaws.com/NewDataStage/datarecords/id', options)
        .then(response => response.json())
        .then(data => console.log(data))
        setTimeout(() => getAllData(), 1000);
    }

async function getAllData() {
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
           console.log('Record ID number '+id+' deleted SUCCESSFULLY! :)');
        }).catch(err => {
          console.error(err)
        });
        setTimeout(() => getAllData(), 1000);
        
    }