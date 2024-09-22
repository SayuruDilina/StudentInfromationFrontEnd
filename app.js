addDataToTable();

function register() {

    const regNameTxt = document.getElementById("regNameTxt").value;
    const regAgeTxt = document.getElementById("regAgeTxt").value;
    const regAddressTxt = document.getElementById("regAddressTxt").value;
    const regContactTxt = document.getElementById("regContactTxt").value;
    const regImg = document.getElementById("regPic").files[0];
    const regGrdNameTxt = document.getElementById("regGrdNameTxt").value;
    const regGrdAddressTxt = document.getElementById("regGrdAddressTxt").value;
    const regGrdContactTxt = document.getElementById("regGrdContactTxt").value;
    const formdata = new FormData();
    formdata.append("stdName", regNameTxt);
    formdata.append("stdAge", regAgeTxt);
    formdata.append("stdAddress", regAddressTxt);
    formdata.append("stdContact", regContactTxt);
    formdata.append("image", regImg);
    formdata.append("contentType", regImg.type);
    formdata.append("grdName", regGrdNameTxt);
    formdata.append("grdAddress", regGrdAddressTxt);
    formdata.append("grdContact", regGrdContactTxt);

    const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
    };

    fetch("http://localhost:8080/add-information", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

function clearField() {

    let regNameTxt = document.getElementById("regNameTxt").value = "";
    let regAgeTxt = document.getElementById("regAgeTxt").value = "";
    let regAddressTxt = document.getElementById("regAddressTxt").value = "";
    let regContactTxt = document.getElementById("regContactTxt").value = "";
    let regImg = document.getElementById("regPic").value = "";
    let regGrdNameTxt = document.getElementById("regGrdNameTxt").value = "";
    let regGrdAddressTxt = document.getElementById("regGrdAddressTxt").value = "";
    let regGrdContactTxt = document.getElementById("regGrdContactTxt").value = "";


}
function addDataToTable() {

    let tblbody = document.getElementById("tblBody");
    tblbody.innerHTML = "";

    fetch("http://localhost:8080/view-table")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            if (Array.isArray(data)) {
                data.forEach((student, index) => {
                    let row = `
                             <tr data-index="${index}">
                                 <td>${student.stdName}</td>
                                 <td>${student.stdAge}</td>
                                 <td>${student.stdContact}</td>
                             </tr>`
                        

                    tblbody.innerHTML += row;

                });
                tblbody.querySelectorAll('tr').forEach(row => {
                    row.addEventListener('click', (event) => {

                        const index = event.currentTarget.getAttribute('data-index');
                        console.log('Clicked row index:', index);
                        selectRowByIndex(index);
                    });
                });
            }

        });

}

function selectRowByIndex(rowIndex) {
    const table = document.querySelector('table');
    const rows = table.querySelectorAll('tbody tr');

    if (rowIndex >= rows.length) {
        console.log('Row index out of range');
        return;
    }

    const row = rows[rowIndex];
    const cells = row.querySelectorAll('td')
    const cellValues = Array.from(cells).map(cell => cell.textContent.trim());
    console.log(cellValues);
    console.log(cellValues[0]);
    console.log(cellValues[1]);
    console.log(cellValues[2]);

    let nameTxt = document.getElementById("nameTxt");
    let stdid = Number(rowIndex) + 1;
    viewAllDAta(stdid);
    // console.log(stdid);

    nameTxt.textContent = cellValues[0];


    // console.log(row.innerHTML); // Log the HTML content of the row
}
function viewAllDAta(stdId) {
    // console.log(stdId);

    fetch(`http://localhost:8080/viewById?stdId=${stdId}`)
        .then((res) => res.json()).then((data) => {
            console.log(data);

            console.log(data.stdName);

            const stringImage = data.profileImage;
            const img = document.getElementById("stdImg");
            document.getElementById("ageTxt").textContent=data.stdAge;
            document.getElementById("addressTxt").textContent=data.stdAddress;
            document.getElementById("conatctTxt").textContent=data.stdContact;
            document.getElementById("grdTxt").textContent=data.grdName;
            document.getElementById("grdaddressTxt").textContent=data.grdAddress;
            document.getElementById("grdConatctTxt").textContent=data.grdContact;
            // document.getElementById("grdAgeTxt").textContent=data.grdAge;
            // img.style.width = "15%";
            //    img.style.borderRadius="20px";
            img.src = `data:image/jpeg;base64,${stringImage}`;

        });
}

