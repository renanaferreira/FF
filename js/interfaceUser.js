$('document').ready(function(){
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(currentUser);
    var pesquisa = users;
    for(var i = 0; i < pesquisa.length; i++){
        if(pesquisa[i]['id'] == currentUser['id']){
            pesquisa.splice(i,1);
            break;
        }

    }
    for(var i = 0; i < pesquisa.length; i++){
        console.log(pesquisa[i]);
    }
    function viewModel() {
        var self = this;

        self.freelancerCorrente = ko.observable({});
        self.freelancers = ko.observableArray(pesquisa);

        self.aceitar = function(freelancer) {
            var salario = $('#myModal2 #salario').val();
            var inicio = new Date($('#myModal2 #inicio').val()).toDateString();
            var final = new Date($('#myModal2 #final').val()).toDateString();
            console.log(final);

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
