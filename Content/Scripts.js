var selectedRow = null;
var nRow = 0;

function onFormSubmit() {
    var formData = readFormData();
    if (selectedRow == null)
        insertNewRecord(formData,nRow++);
    else
        updateRecord(formData);
    resetForm();

}

function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["empCode"] = document.getElementById("empCode").value;
    formData["salary"] = document.getElementById("salary").value;
    formData["city"] = document.getElementById("city").value;
    return formData;
}

function insertNewRecord(data, n) {
   
    var stringifiedObj = JSON.stringify(data);
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.empCode;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.salary;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.city;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = "pending";
    cell5.id = `td${n}`;
    cell6= newRow.insertCell(5);
    cell6.innerHTML = `<a onClick= "onEdit(this)">Edit</a> 
                   <a onClick= "onDelete(this)"> Delete </a> 
                    <a onClick= '(()=>{document.getElementById("td${n}").innerHTML = "processing";Save(${stringifiedObj})})()'>Save </a>`;
                  
}
function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("empCode").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("city").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("empCode").value = selectedRow.cells[1].innerHTML;
    document.getElementById("salary").value = selectedRow.cells[2].innerHTML;
    document.getElementById("city").value = selectedRow.cells[3].innerHTML;

}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.empCode;
    selectedRow.cells[2].innerHTML = formData.salary;
    selectedRow.cells[3].innerHTML = formData.city;
}

function onDelete(td) {
    if (confirm('Are you sure to delete the record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function Save(td) {
    var url = "/api/Product";
    var objectProduct = {};
    objectProduct.fullName = td.fullName;
    objectProduct.empCode = td.empCode;
    objectProduct.salary = td.salary;
    objectProduct.city = td.city;
    if (objectProduct) {
        $.ajax({
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(objectProduct),
            type: "Post",
            success: function (result) {
                alert(result);
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
}