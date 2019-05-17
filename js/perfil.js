$("document").ready(function () {
    function viewModel() {
        var self = this;

        self.perfil = ko.observable({id: '1', nome: 'pedro', regime: 'integral', area: 'cozinha', avaliacao: '3'});

        self.mudar = function (chat) {
            var regime = $('#regime1').val();
            var area = $('#area1').val();
            var request = $.ajax({
                url: "avaliacoes.html",
                type: "POST",
                data: {id : self.perfil.id, 'regime': regime, 'area': area},
                dataType: "html"
            });


            request.done(function(msg) {
                self.perfil.regime = regime;
                self.perfil.area = area;
                console.log(self.perfil.regime);
                $('#regime1').val("");
                $('#area1').val("");
                alert("Perfil mudado. Espere um momento para as alterações serem feitas.");
            });

            request.fail(function(jqXHR, textStatus) {
                alert("Houve um problema. Tente novamente");
            });
        };





    };
    ko.applyBindings(new viewModel);
});