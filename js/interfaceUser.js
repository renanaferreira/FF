$('document').ready(function(){
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var pesquisa = users;
    for(var i = 0; i < pesquisa.length; i++){
        if(pesquisa[i]['id'] == currentUser['id']){
            pesquisa.splice(i,1);
            break;
        }

    }
    function viewModel() {
        var self = this;

        self.freelancerCorrente = ko.observable({});
        self.freelancers = ko.observableArray(pesquisa);

        self.aceitar = function() {
            var freelancer = self.freelancerCorrente();
            var salario = $('#myModal2 #salario').val();
            var inicio = $('#myModal2 #dataInicio').val();
            var final = $('#myModal2 #dataFinal').val();
            var contrato = {'id': currentUser['id'] + freelancer['id'],'inicio': inicio,
                            'fim': final, 'salario': salario, 'status': 'Pendente','nome': freelancer['nome']};
            var contrato2 = contrato; contrato2['nome'] = currentUser['nome'];
            currentUser['propostasMandadas'].push(contrato);
            freelancer['propostasRecebidas'].push(contrato2);
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            for(var i = 0; i < users.length; i++){
                if(users[i]['id'] == freelancer['id']){
                    users[i] = freelancer;
                }
                if(users[i]['id'] == currentUser['id']){
                    users[i] = currentUser;
                }
            }
            pesquisa = users;
            for(var i = 0; i < pesquisa.length; i++){
                if(pesquisa[i]['id'] == currentUser['id']){
                    pesquisa.splice(i,1);
                    break;
                }

            }
            self.freelancerCorrente(pesquisa);
            for(var i = 0; i < pesquisa.length; i++){
                console.log(pesquisa[i]);
            }
        };

        self.mensagem = function(){

            var mensage = $('#mensagem1').val();
            console.log(mensage);
            var request = $.ajax({
                url: "avaliacoes.html",
                type: "POST",
                data: {id : self.freelancerCorrente().id, 'mensagem': mensage},
                dataType: "html"
            });


            request.done(function(msg) {
                $('#mensagem1').val("");
                alert("Mensagem enviada.");
            });

            request.fail(function(jqXHR, textStatus) {
                alert("Houve um problema. Tente novamente");
            });
        };
        self.configurar = function(freelancer){self.freelancerCorrente(freelancer);};





    };
    ko.applyBindings(new viewModel);
});
