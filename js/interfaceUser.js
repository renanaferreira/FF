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

        self.mensagem = function(){

            users = JSON.parse(localStorage.getItem("users") || "[]");
            var mensag = $('#mensagem1').val();
            var umai = {'nome': currentUser['nome'], 'msg': mensag};
            var contem = false;
            for(var i = 0; i < users.length; i++){
                console.log(users[i]);
            }
            console.log('\n');
            var chat = {};
            for(var i = 0;i < users.length;i++){
                for(var j = 0;j < users[i]['chats'].length;j++){
                    if((users[i]['chats'][j]['id1'] == currentUser['id'] && users[i]['chats'][j]['id2'] == self.freelancerCorrente()['id']) ||
                       (users[i]['chats'][j]['id2'] == currentUser['id'] && users[i]['chats'][j]['id1'] == self.freelancerCorrente()['id'])){
                        contem = true;
                        chat = users[i]['chats'][j];
                        break;
                    }
                }
            }
            if(contem){
                console.log('contem');
                for(var i = 0;i < currentUser['chats'].length; i++){
                    if(currentUser['chats'][i]['id1'] == chat['id1'] && currentUser['chats'][i]['id2'] == chat['id2']){
                        currentUser['chats'][i]['mensagens'].push(umai);
                        localStorage.setItem("currentUser", JSON.stringify(currentUser));
                        break;
                    }
                }
                for(var i = 0; i < users.length; i++){
                    if(users[i]['id'] == chat['id2']){
                        for(var j = 0; j < users[i]['chats'].length; j++){
                            if(users[i]['chats'][j]['id2'] == chat['id1']){
                                users[i]['chats'][j]['mensagens'].push(umai);
                            }
                        }
                    }
                    if(users[i]['id'] == currentUser['id']){
                        users[i] = currentUser;
                    }
                }
                localStorage.setItem("users", JSON.stringify(users));
            }else{
                console.log('nao contem');
                var chatCU = {'receptor': self.freelancerCorrente()['nome'], 'id1': currentUser['id'], 'id2': self.freelancerCorrente()['id'],
                              'mensagens':[]};
                chatCU['mensagens'].push(umai);
                currentUser['chats'].push(chatCU);
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                var chatF = {'receptor': currentUser['nome'], 'id1': self.freelancerCorrente()['id'], 'id2': currentUser['id'],
                    'mensagens':[]};
                chatF['mensagens'].push(umai);
                for(var i = 0;i < users.length;i++){
                    if(users[i]['id'] == currentUser['id']){
                        users[i]['chats'].push(chatCU);
                    }
                    if(users[i]['id'] == self.freelancerCorrente()['id']){
                        users[i]['chats'].push(chatF);
                    }
                }
                localStorage.setItem("users", JSON.stringify(users));
            }
            for(var i = 0; i < users.length; i++){
                console.log(users[i]);
            }



        };
        self.configurar = function(freelancer){self.freelancerCorrente(freelancer);};





    };
    ko.applyBindings(new viewModel);
});
