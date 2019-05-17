$('document').ready(function(){
    function viewModel() {
        var self = this;

        self.avaliacoesPendentes = ko.observableArray([
            {'nome': 'Noé Elisabete Ferreiro'  , 'inicio': 'Programação', 'fim': '', 'salario': '', id:"12",avaliacao: ''},
        ]);
        self.avaliacoes = ko.observableArray([
            {'nome': 'Noé Elisabete Ferreiro'  , 'inicio': 'Programação', 'fim': '', 'salario': '', id:"12",avaliacao: ''},
        ]);

        self.avaliar = function(objeto) {
            var ava = $('#avaliador').val();
            var request = $.ajax({
                url: "avaliacoes.html",
                type: "POST",
                data: {id : objeto.id, avaliacao: ava},
                dataType: "html"
            });


            request.done(function(msg) {
                objeto.avaliacao = ava;
                self.avaliacoes.push(objeto);
                self.avaliacoesPendentes.remove(objeto);
                alert("Avaliação feita");
            });

            request.fail(function(jqXHR, textStatus) {
                alert("Houve um problema. Tente novamente");
            });

        };







    };
    ko.applyBindings(new viewModel);
});
