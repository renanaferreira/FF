$('document').ready(function(){
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var avaliacoes = currentUser['avaliacaoFeitaEmpregador'];
    var ava1 = [];
    var ava2 = [];
    for(var i = 0;i < avaliacoes.length;i++){
        if(avaliacoes[i]['feita'] == '0'){
            ava1.push(avaliacoes[i]);
        }else{
            ava2.push(avaliacoes[i]);
        }
    }
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    function viewModel() {
        var self = this;

        self.avaliacoesPendentes = ko.observableArray(ava1);
        self.avaliacoes = ko.observableArray(ava2);

        self.avaliar = function() {
            var objeto = this;
            for(var i = 0; i < currentUser['avaliacaoFeitaEmpregador'].length;i++){
                if(objeto['id'] == currentUser['avaliacaoFeitaEmpregador'][i]['id']){
                    currentUser['avaliacaoFeitaEmpregador'][i]['avaliacao'] = $('#avaliador').val();
                    currentUser['avaliacaoFeitaEmpregador'][i]['feita'] = '1';
                }
            }
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            var umai = [];
            for(var i = 0; i < users.length; i++){
                umai = users[i]['propostasRecebidas'];
                for(var j = 0; j < umai.length;j++){
                    if(objeto['id'] == umai[j]['id']){
                        var na = parseInt(users[i]['na']);
                        var avai = parseInt(users[i]['avaliacao']);
                        var novavai = parseInt($('#avaliador').val());
                        users[i]['avaliacao'] = Math.round((avai*na + novavai) /(na + 1));
                        users[i]['na'] = (na + 1);
                    }
                }
            }
            for(var i = 0; i < users.length; i++){
                if(users[i]['id'] == currentUser['id']){
                    users[i] = currentUser;
                    break;
                }
            }
            localStorage.setItem("users", JSON.stringify(users));
            avaliacoes = currentUser['avaliacaoFeitaEmpregador'];
            ava1 = [];
            ava2 = [];
            for(var i = 0;i < avaliacoes.length;i++){
                if(avaliacoes[i]['feita'] == '0'){
                    ava1.push(avaliacoes[i]);
                }else{
                    ava2.push(avaliacoes[i]);
                }
            }
            self.avaliacoesPendentes(ava1);
            self.avaliacoes(ava2);
        };







    };
    ko.applyBindings(new viewModel);
});
