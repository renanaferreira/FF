$( document ).ready(function() {
    const nome1 = document.getElementById("first_name");
    const nome2 = document.getElementById("last_name");
    const aniversario = document.getElementById("birthday");
    const genero = document.getElementById("gender");
    const mail = document.getElementById("email");
    const numTel = document.getElementById("phone");
    const pass = document.getElementById("password");
    const cPass = document.getElementById("confirmPassword");

    guardarDados = function () {
        var fName = nome1.value;
        var lName = nome2.value;
        var age = calcularIdade(aniversario.value)
        var gender;
        if (genero.value == "on") {var gender = "Masculino"}
        else{gender = "Feminino"};
        var email = mail.value;
        var phoneNumb = numTel.value;
        var password = pass.value;
        
        // Carregar utilizadores existentes
        var users = JSON.parse(localStorage.getItem("users") || "[]");
        console.log("# of users: " + users.length);
        var idd = 0;
        if (users.length != null){
            var idd = users.length;
        }
        // Criar utilizador novo e adicionar ao conjunto de utilizadores
        var user = {
            "id": idd,
            "nome": fName + " " + lName,
            "idade": age,
            "genero": gender,
            "email": email,
            "nTelemovel": phoneNumb,
            "password": password
        };
        users.push(user);

        // Guardar lista de utilizadores
        localStorage.setItem("users", JSON.stringify(users));

        window.location.href = "index.html";
        alert("Registo efetuado.")
        return false

    }

    calcularIdade = function(birthDay) {
        var dateBirth = new Date(birthDay);
        var today = new Date();
        var age = today.getTime() - dateBirth.getTime();
        return Math.floor(age / (1000 * 60 * 60 * 24 * 365.25))

    }

    verificarPassword = function() {
        if (cPass.value != ""){
            if (pass.value == cPass.value) {
                document.getElementById('confirmacao').style.display = 'none';
                cPass.style.border = 'none';
                document.getElementById('btnSubmit').disabled = false;

            } else {
                document.getElementById('confirmacao').style.display = 'block';
                document.getElementById('confirmacao').style.color = 'red';
                cPass.style.border = 'thick solid red';
                document.getElementById('confirmacao').innerHTML = 'Passwords não coincidem';
                document.getElementById('btnSubmit').disabled = true;
            }
        }
    }
})