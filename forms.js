let formData = {
    name: '',
    email: '',
    status: 'Active',
    gender: 'Male'
};

let statusEln = document.getElementById('status');
statusEln.addEventListener('change', function(event) {
    formData.status = event.target.value;
});

let genderMale = document.getElementById('genderMale');
genderMale.addEventListener('change', function(event) {
    formData.gender = event.target.value;
});

let genderFemale = document.getElementById('genderFemale');
genderFemale.addEventListener('change', function(event) {
    formData.gender = event.target.value;
});

let userName = document.getElementById('name');
let nameerrorMsg = document.getElementById('nameerrorMsg');
userName.addEventListener('change', function(event) {
    if (userName.value === '') {
        nameerrorMsg.textContent = 'Required*';
    } else {
        nameerrorMsg.textContent = '';
    }
    formData.name = event.target.value;
});

let userEmail = document.getElementById('email');
let mailerrorMsg = document.getElementById('mailerrorMsg');
userEmail.addEventListener('change', function() {
    if (userEmail.value === '') {
        mailerrorMsg.textContent = 'Required*';
    } else {
        mailerrorMsg.textContent = '';
    }
    formData.email = event.target.value;
});

function validateFormData(formData) {
    let {
        name,
        email
    } = formData;
    if (name === "") {
        nameerrorMsg.textContent = "Required*";
    }
    if (email === "") {
        mailerrorMsg.textContent = "Required*";
    }
}

function submitFormData(formData) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 137b1e9fc30e2dcf1228db0680fe5025374c1d714d54c828ce64020e287f92d9",
        },
        body: JSON.stringify(formData)
    };

    let url = "https://gorest.co.in/public-api/users";

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            if (jsonData.code === 422) {
                if (jsonData.data[0].message === 'has already been taken') {
                    mailerrorMsg.textContent = 'Email Already Exists!!';
                }
            }
        });
}

let myForm = document.getElementById('myForm');
myForm.addEventListener('submit', function(event) {
    event.preventDefault();
    validateFormData(formData);
    submitFormData(formData);
});