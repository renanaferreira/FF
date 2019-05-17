$('document').ready(function(){
    function viewModel() {
        var self = this;

        self.contratos = ko.observableArray([
            {id: "",'nome': "Raimundo", 'salario': "10", 'inicio': '', 'fim': '','status':'Aceito'},
            {id: "",'nome': "Marcio"  , 'salario': "20", 'inicio': '', 'fim': '','status':'Pendente'},
            {id: "",'nome': "Carreta" , 'salario': "30", 'inicio': '', 'fim': '','status':'Recusado'},
            {id: "",'nome': "ula"     , 'salario': "40", 'inicio': '', 'fim': '','status':''},
            {id: "",'nome': "moana"   , 'salario': "50", 'inicio': '', 'fim': '','status':''}
        ]);





    };
    ko.applyBindings(new viewModel);
});