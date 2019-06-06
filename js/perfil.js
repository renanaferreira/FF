$("document").ready(function () {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser);
    function viewModel() {
        var self = this;

        self.perfil = ko.observable(currentUser);

        self.mudar = function (chat) {
            currentUser['regime'] = $('#regime1').val();
            currentUser['area'] = $('#area1').val();
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            self.perfil(currentUser);
            var users = JSON.parse(localStorage.getItem("users") || "[]");
            for(var i = 0;i < users.length;i++){
                if(users[i]['id'] == currentUser['id']){
                       users[i] = currentUser;
                       break;
                }
            }
            for(var i = 0;i < users.length;i++){
                console.log(users[i]);
            }
            localStorage.setItem("users", JSON.stringify(users));
        };





    };
    ko.applyBindings(new viewModel);
});