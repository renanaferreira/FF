$('document').ready(function(){
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    if(users.length == 0){
        users.push({'id': 0, "nome": "Antonio Costa", "idade": 20, "genero": "masculino", "email": "antonio@hotmail.com",
            "nTelemovel": 111111111, "password": "login", "regime": 'Parcial', 'area': 'geral', 'avaliacao': 1,
            "propostasMandadas": [
                {'id1':'0','id2':'1','nome': 'Carina Almeida', 'salario': 100, 'inicio': '2019-01-01','fim': '2019-09-01','status':'Aceito'},
                {'id1':'0','id2':'2','nome': 'Alina Doces', 'salario': 200, 'inicio': '2019-06-01','fim': '2019-06-30','status':'Pendente'},
            ],"propostasRecebidas": [
                {'id1':'1','id2':'0','nome': 'Carina Almeida', 'salario': 250, 'inicio': '2019-04-01','fim': '2020-01-01','status':'Pendente'},
                {'id1':'2','id2':'0','nome': 'Alina Doces', 'salario': 560, 'inicio': '2020-01-01','fim': '2020-01-20','status':'Aceito'}
            ],'avaliacaoFeitaEmpregador':[
                {'id1':'0','id2':'1','nome': 'Carina Almeida', 'avaliacao': '', 'feita': '0'}
            ],'avaliacaoFeitaFreelancer':[
                {'id1':'2','id2':'0','nome': 'Alina Doces', 'avaliacao': '', 'feita': '0'}
            ],'na':'0', 'chats':[{'receptor':'Carina Almeida', 'id1':'0', 'id2':'1', 'mensagens': [
                    {'nome': 'Antonio','msg':'ola, fiquei muito interessado no seu perfil. gostaria de ser cozinheira de uma festa' +
                            'que estou a fazer?'},{'nome': "Carina",'msg':'estou sim, antonio :)'}]
                    }]
        });
        users.push({'id': 1, "nome": "Carina Almeida", "idade": 25, "genero": "feminino", "email": "carina@hotmail.com",
            "nTelemovel": 111111111, "password": "login1", "regime": 'Parcial', 'area': 'geral', 'avaliacao': 1,
            "propostasMandadas": [
                {'id1':'1','id2':'0','nome': 'Antonio Costa', 'salario': 250, 'inicio': '2019-04-01','fim': '2020-01-01','status':'Pendente'}
            ],"propostasRecebidas": [
                {'id1':'0','id2':'1','nome': 'Antonio Costa', 'salario': 100, 'inicio': '2019-01-01','fim': '2020-09-01','status':'Aceito'}
            ],'avaliacaoFeitaEmpregador':[],'avaliacaoFeitaFreelancer':[],'na':'0','chats':[{'receptor':'Antonio Costa', 'id1':'1', 'id2':'0', 'mensagens': [
                    {'nome': 'Antonio','msg':'ola, fiquei muito interessado no seu perfil. gostaria de ser cozinheira de uma festa' +
                            'que estou a fazer?'},{'nome': "Carina",'msg':'estou sim, antonio :)'}]
            }]});
        users.push({'id': 2, "nome": "Alina Doces", "idade": 23, "genero": "feminino", "email": "alina@hotmail.com",
            "nTelemovel": 111111111, "password": "login2","regime": 'Parcial', 'area': 'geral', 'avaliacao': 1,
            "propostasMandadas": [
                {'id1':'2','id2':'0','nome': 'Antonio Costa', 'salario': 560, 'inicio': '2020-01-01','fim': '2020-01-20','status':'Aceito'}
            ],"propostasRecebidas": [
                {'id1':'0','id2':'2','nome': 'Antonio Costa', 'salario': 200, 'inicio': '2019-06-01','fim': '2019-06-30','status':'Pendente'},
            ],'avaliacaoFeitaEmpregador':[],'avaliacaoFeitaFreelancer':[],'na':'0','chats': []
            });
    }
    //users = [];
    for(var i = 0;i < users.length;i++){
        console.log(users[i]);
    }

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