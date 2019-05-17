$('document').ready(function(){
    function viewModel() {
        var self = this;

        self.freelancerCorrente = ko.observable({});
        self.freelancers = ko.observableArray([
            {'nome': 'Noé Elisabete Ferreiro'  , 'area': 'Programação', 'regime': '', 'avaliacao': '3', id:"12"},
        ]);

        self.aceitar = function(freelancer) {
            var salario = $('#myModal2 #salario').val();
            var inicio = $('#myModal2 #inicio').val();
            var final = $('#myModal2 #final').val();
            var request = $.ajax({
                url: "avaliacoes.html",
                type: "POST",
                data: {id : self.freelancerCorrente.id, salario: salario, inicio: inicio, fim: final},
                dataType: "html"
            });


            request.done(function(msg) {

                alert("Proposta foi mandada");
            });

            request.fail(function(jqXHR, textStatus) {
                alert("Houve um problema. Tente novamente");
            });

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
