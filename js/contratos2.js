$('document').ready(function(){
    function viewModel() {
        var self = this;

        self.contratosPendentes = ko.observableArray([
            {id: "",'nome': "Raimundo", 'salario': "10", 'inicio': '', 'fim': '','status':'Aceito'},
            {id: "",'nome': "Marcio"  , 'salario': "20", 'inicio': '', 'fim': '','status':'Pendente'},
            {id: "",'nome': "Carreta" , 'salario': "30", 'inicio': '', 'fim': '','status':'Recusado'},
            {id: "",'nome': "ula"     , 'salario': "40", 'inicio': '', 'fim': '','status':''},
            {id: "",'nome': "moana"   , 'salario': "50", 'inicio': '', 'fim': '','status':''}
        ]);
        self.contratos = ko.observableArray([
            {id: "",'nome': "Raimundo", 'salario': "10", 'inicio': '', 'fim': '','status':'Aceito'},
            {id: "",'nome': "Marcio"  , 'salario': "20", 'inicio': '', 'fim': '','status':'Pendente'},
            {id: "",'nome': "Carreta" , 'salario': "30", 'inicio': '', 'fim': '','status':'Recusado'},
            {id: "",'nome': "ula"     , 'salario': "40", 'inicio': '', 'fim': '','status':''},
            {id: "",'nome': "moana"   , 'salario': "50", 'inicio': '', 'fim': '','status':''}
        ]);

        self.aceitar = function (contrato) {
            var request = $.ajax({
                url: "avaliacoes.html",
                type: "POST",
                data: {id : contrato.id, proposta: '1'},
                dataType: "html"
            });


            request.done(function(msg) {
                contrato.status = 'Aceito';
                self.contratos.push(contrato);
                self.contratosPendentes.remove(contrato);
                alert("Contrato aceito.");
            });

            request.fail(function(jqXHR, textStatus) {
                alert("Houve um problema. Tente novamente");
            });
        };

        self.recusar = function (contrato) {
            var request = $.ajax({
                url: "avaliacoes.html",
                type: "POST",
                data: {id : contrato.id, proposta: '2'},
                dataType: "html"
            });


            request.done(function(msg) {
                contrato.status = 'Recusado';
                self.contratos.push(contrato);
                self.contratosPendentes.remove(contrato);
                alert("Contrato recusado.");
            });

            request.fail(function(jqXHR, textStatus) {
                alert("Houve um problema. Tente novamente");
            });
        };





    };
    ko.applyBindings(new viewModel);
});