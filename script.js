let formBtn = document.querySelector('.btn')
let form = document.querySelector('#form')

form.addEventListener('submit', function (event) {
    event.preventDefault();

    let flag = true;
    deleteErrorMsg();

    let first_name_field = document.getElementById("first_name");
    let last_name_field = document.getElementById("last_name");
    let email_field = document.getElementById("email");
    let textarea_field = document.getElementById("textarea");

    let fields = [first_name_field, last_name_field, email_field, textarea_field];
    for (let i = 0; i < fields.length; i++) {
      if (checkEmpty(fields[i])) flag = false;
    }
    if (!EmailCheck()) flag=false;

    if (flag) {
      let data = {
        first_name: first_name_field.value,
        last_name: last_name_field.value,
        email: email_field.value,
        textarea: textarea_field.value
      };

      console.log(data);
      sendToServer(data);
    }
  })
  
  
let deleteErrorMsg = function () {
  let errorElements = form.querySelectorAll('.trable')
  for (let i = 0; i < errorElements.length; i++) {
    errorElements[i].remove()
  }
}


function checkEmpty(elem) {
  if (elem.value.trim() === '') {
    flag = false;
    let errorMsg = document.createElement('p');
    errorMsg.className = 'trable'
    errorMsg.textContent = 'Введите данные';
    errorMsg.style.margin = 0;
    errorMsg.style.color = 'red';
    elem.parentNode.appendChild(errorMsg);

    return true;
  }

  return false;
}


function EmailCheck() {
  let mailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let mail = email.value;
  if(!mailPattern.test(mail)) {
     alert('Некорректный e-mail');
     return false;
  }

  return true;
}


function sendToServer(data) {
  let url = "http://localhost:3000";
  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
  })
      .then((response) => response.text())
      .then((text) => {
          alert(text);
      });
} 