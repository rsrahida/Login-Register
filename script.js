function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.querySelector(".clock").innerHTML = h + ":" + m;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
startTime();

let users = JSON.parse(localStorage.getItem("users") || "[]");

if (document.getElementById("signButtons")) {
  document
    .getElementById("signButtons")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      let name = document.getElementById("name").value.trim();
      let number = document.getElementById("phone").value.trim();
      let email = document.getElementById("email").value.trim();
      let passwordInput = document.getElementById("password").value.trim();

      let nameRegex =
        /^[A-ZƏÖÜİŞÇĞ][a-zəöüişçğ]+(?:\s[A-ZƏÖÜİŞÇĞ][a-zəöüişçğ]+)?$/;
      let phoneRegex = /^[0-9]{10,15}$/;
      let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let passwordRegex =
        /^(?=.*[A-ZƏÖÜİŞÇĞ])(?=.*\d)[A-Za-zƏÖÜİŞÇĞəöüişçğ\d!@#$%^&*()_+={}\[\]:;"'<>,.?/-]{8,}$/;

      let isValid = true;

      if (!nameRegex.test(name)) {
        document.getElementById("nameError").innerText =
          "First and last name must consist only of letters and each must begin with a capital letter.";
        isValid = false;
      } else {
        document.getElementById("nameError").innerText = "";
      }

      if (!phoneRegex.test(number)) {
        document.getElementById("phoneError").innerText =
          "The phone number is not in the correct format.";
        isValid = false;
      } else {
        document.getElementById("phoneError").innerText = "";
      }

      if (!emailRegex.test(email)) {
        document.getElementById("emailError").innerText =
          "Please enter a valid email address.";
        isValid = false;
      } else {
        document.getElementById("emailError").innerText = "";
      }

      if (!passwordRegex.test(passwordInput)) {
        document.getElementById("passwordError").innerText =
          "The password must contain at least 8 characters, one uppercase letter, and one number.";
        isValid = false;
      } else {
        document.getElementById("passwordError").innerText = "";
      }

      if (!isValid) {
        return;
      }

      let checkEmail = users.find((user) => user.email === email);
      if (checkEmail) {
        return alert("This email already exists!");
      }

      let newUser = { name, number, email, passwordInput };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration completed successfully.");
      document.getElementById("signButtons").reset();
      window.location.href = "login.html";
    });
}

if (document.getElementById("loginButtons")) {
  document
    .getElementById("loginButtons")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      let loginEmail = document.getElementById("email").value.trim();
      let loginPasswordInput = document.getElementById("password").value.trim();

      let foundUser = users.find(
        (user) =>
          user.email === loginEmail && user.passwordInput === loginPasswordInput
      );
      if (foundUser) {
        alert("Login successful!");
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      } else {
        alert("Email or password is incorrect!");
      }
    });
}
