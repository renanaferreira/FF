$('document').ready(function(){
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    if(users.length == 0){
        users.push({'id': 0, "nome": "Antonio Costa", "idade": 20, "genero": "masculino", "email": "antonio@hotmail.com",
            "nTelemovel": 111111111, "password": "login", "regime": 'Parcial', 'area': 'geral', 'avaliacao': 1,
            "propostasMandadas": [
                {'id':'01','nome': 'Carina Almeida', 'salario': 100, 'inicio': '','fim': '','status':'Aceito'},
                {'id':'02','nome': 'Alina Doces', 'salario': 200, 'inicio': '','fim': '','status':'Pendente'},
            ],"propostasRecebidas": [
                {'id':'10','nome': 'Carina Almeida', 'salario': 250, 'inicio': '','fim': '','status':'Pendente'},
                {'id':'20','nome': 'Alina Doces', 'salario': 560, 'inicio': '','fim': '','status':'Aceito'}
            ],'avaliacaoFeitaEmpregador':[
                {'id':'01','nome': 'Carina Almeida', 'avaliacao': '', 'feita': '0'}
            ],'avaliacaoFeitaFreelancer':[
                {'id':'20','nome': 'Alina Doces', 'avaliacao': '', 'feita': '0'}
            ],'na':'0'});
        users.push({'id': 1, "nome": "Carina Almeida", "idade": 25, "genero": "feminino", "email": "carina@hotmail.com",
            "nTelemovel": 111111111, "password": "login1", "regime": 'Parcial', 'area': 'geral', 'avaliacao': 1,
            "propostasMandadas": [
                {'id':'10','nome': 'Antonio Costa', 'salario': 250, 'inicio': '','fim': '','status':'Pendente'}
            ],"propostasRecebidas": [
                {'id':'01','nome': 'Antonio Costa', 'salario': 100, 'inicio': '','fim': '','status':'Aceito'}
            ],'avaliacaoFeitaEmpregador':[],'avaliacaoFeitaFreelancer':[],'na':'0'});
        users.push({'id': 2, "nome": "Alina Doces", "idade": 23, "genero": "feminino", "email": "alina@hotmail.com",
            "nTelemovel": 111111111, "password": "login2","regime": 'Parcial', 'area': 'geral', 'avaliacao': 1,
            "propostasMandadas": [
                {'id':'20','nome': 'Antonio Costa', 'salario': 560, 'inicio': '','fim': '','status':'Aceito'}
            ],"propostasRecebidas": [
                {'id':'02','nome': 'Antonio Costa', 'salario': 200, 'inicio': '','fim': '','status':'Pendente'},
            ],'avaliacaoFeitaEmpregador':[],'avaliacaoFeitaFreelancer':[],'na':'0'});
    }
    //var users = [];
    localStorage.setItem("users", JSON.stringify(users));

});
(function ($) {
    "use strict";

    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    })

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
            hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }


})(jQuery);

/*==================================================================
Inicio da verificação de login2 */

const userLogin = document.getElementById("username");
const passLogin = document.getElementById("pass");
const erro = document.getElementById("alertBox");
verificarLogin = function() {
    var users = JSON.parse(localStorage.getItem("users") || "[]");

    if (userLogin.value != "" && passLogin.value != ""){
        console.log("Procurando utilizador...")
        for (var i = 0; i < users.length; i++){
            if (users[i]["email"] == userLogin.value && users[i]["password"] == passLogin.value) {
                $("#alertBox").fadeOut();
                localStorage.setItem("currentUser", JSON.stringify(users[i]));
                window.location.href = "interfaceUser.html";
                return false
            }
        }
        $("#alertBox").fadeIn();
    }
}

fadeOut = function() {
    $("#alertBox").fadeOut()
}