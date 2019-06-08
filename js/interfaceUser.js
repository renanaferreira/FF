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
            users = JSON.parse(localStorage.getItem("users") || "[]");
            for(var i = 0; i < pesquisa.length; i++){
                console.log(users[i]);
            }
            console.log('');
            var freelancer = self.freelancerCorrente();
            var salario = $('#myModal2 #salario').val();
            var inicio = $('#myModal2 #dataInicio').val();
            var final = $('#myModal2 #dataFinal').val();
            var contrato = {'id1': currentUser['id'],'id2':freelancer['id'],'inicio': inicio,
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
            localStorage.setItem("users", JSON.stringify(users));
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
        self.configurar = function(freelancer){self.freelancerCorrente(freelancer);};





    };
    ko.applyBindings(new viewModel);
});
