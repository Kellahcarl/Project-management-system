
document.getElementById('sign-up-btn').addEventListener('click', function() {
    let firstName = document.getElementById('first-name').value;
    let lastName = document.getElementById('last-name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };
s
    fetch('http://your-server.com/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
});
