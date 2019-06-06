$('document').ready(function(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var propostas1  = currentUser['propostasMandadas'];
    function viewModel() {
        var self = this;
        self.contratos = ko.observableArray(propostas1);
    };
    ko.applyBindings(new viewModel);
});