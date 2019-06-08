$('document').ready(function(){
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var propostas = currentUser['propostasRecebidas'];
    var contratos1 = [];
    var contratos2 = [];
    for(var i = 0;i < propostas.length;i++){
        if(propostas[i]['status'] == 'Pendente'){
            contratos1.push(propostas[i]);
        }else{
            contratos2.push(propostas[i]);
        }
    }
    function viewModel() {
        var self = this;

        self.contratosPendentes = ko.observableArray(contratos1);
        self.contratos = ko.observableArray(contratos2);

        self.aceitar = function (contrato) {
            var users = JSON.parse(localStorage.getItem("users") || "[]");
            for(var i = 0; i < users.length; i++){
                for(var j = 0; j < users[i]['propostasMandadas'].length; j++){
                    if(users[i]['propostasMandadas'][j]['id1'] == contrato['id1']){
                        users[i]['propostasMandadas'][j]['status'] = "Aceito";
                    }
                }
                for(var j = 0; j < users[i]['propostasRecebidas'].length; j++){
                    if(users[i]['propostasRecebidas'][j]['id2'] == contrato['id2']){
                        users[i]['propostasRecebidas'][j]['status'] = "Aceito";
                    }
                }


            }
            for(var i = 0; i < users.length; i++){
                if(users[i]['id'] == currentUser['id']){
                    currentUser = users[i];
                    break;
                }
            }
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            propostas = currentUser['propostasRecebidas'];
            for(var i = 0;i < propostas.length;i++){
                console.log(propostas[i]);
            }
            contratos1 = [];
            contratos2 = [];
            for(var i = 0;i < propostas.length;i++){
                if(propostas[i]['status'] == 'Pendente'){
                    contratos1.push(propostas[i]);
                }else{
                    contratos2.push(propostas[i]);
                }
            }

            self.contratosPendentes.remove(contratos1);
            self.contratos.push(contratos2);
        };

        self.recusar = function (contrato) {
            var users = JSON.parse(localStorage.getItem("users") || "[]");
            for(var i = 0; i < users.length; i++){
                for(var j = 0; j < users[i]['propostasMandadas'].length; j++){
                    if(users[i]['propostasMandadas'][j]['id1'] == contrato['id1']){
                        users[i]['propostasMandadas'][j]['status'] = "Recusado";
                    }
                }
                for(var j = 0; j < users[i]['propostasRecebidas'].length; j++){
                    if(users[i]['propostasRecebidas'][j]['id2'] == contrato['id2']){
                        users[i]['propostasRecebidas'][j]['status'] = "Recusado";
                    }
                }


            }
            for(var i = 0; i < users.length; i++){
                if(users[i]['id'] == currentUser['id']){
                    currentUser = users[i];
                    break;
                }
            }
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            propostas = currentUser['propostasRecebidas'];
            for(var i = 0;i < propostas.length;i++){
                console.log(propostas[i]);
            }
            contratos1 = [];
            contratos2 = [];
            for(var i = 0;i < propostas.length;i++){
                if(propostas[i]['status'] == 'Pendente'){
                    contratos1.push(propostas[i]);
                }else{
                    contratos2.push(propostas[i]);
                }
            }

            self.contratosPendentes.remove(contratos1);
            self.contratos.push(contratos2);
        };





    };
    ko.applyBindings(new viewModel);
});