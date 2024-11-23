var nameInput = document.getElementById("name");
var urlInput = document.getElementById("url");
var addUser = document.querySelector("#addName");
addUser.addEventListener("click", function () {
  add();
});

var informationList;

if (localStorage.getItem("information") == null) {
  informationList = [];
} else {
  informationList = JSON.parse(localStorage.getItem("information"));
  display(informationList);
}

function add() {
  if (
    nameInput.classList.contains("is-valid") &&
    urlInput.classList.contains("is-valid")
  ) {
    var information = {
      names: nameInput.value,
      urls: urlInput.value,
    };
    informationList.push(information);
    localStorage.setItem("information", JSON.stringify(informationList));
    display();
  } else {
    alert("not valid data");
  }
  nameInput.classList.remove("is-valid");
  urlInput.classList.remove("is-valid");
  clear();
}

function display() {
  var cartona = "";
  for (var i = 0; i < informationList.length; i++) {
    cartona += `<tr>
               <td> ${[i]} </td>
               <td> ${informationList[i].names}</td>
               <td> <a target = "_blank" href="${
                 informationList[i].urls
               }"> <button class="btn bg-bu si  text-white >  <i class="fa-regular fa-eye"></i> Visit </button></a></td>
               <td> <button id="deleteName" onclick="deleteinfo(${i})" class=" si btn btn-danger" > <i class=" fas fa-trash " ></i> Delete  </button></td>
               </tr>`;
  }
  document.getElementById("myRow").innerHTML = cartona;
}

function deleteinfo(deletedIndex) {
  informationList.splice(deletedIndex, 1);
  display(informationList);
  localStorage.setItem("information", JSON.stringify(informationList));
}
function clear() {
  nameInput.value = null;
  urlInput.value = null;
}

function validateInputs(element) {
  var regex = {
    name: /^[A-Za-z0-9]{3,}$/,
    url: /^(http:\/\/|https:\/\/)[a-zA-Z0-9.-:]{3,}(com|org|path|file)[a-zA-Z0-9]{0,}$/,
  };
  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove("d-none");
  }
}
