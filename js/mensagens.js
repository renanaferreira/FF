$("document").ready(function () {
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    for(var i = 0; i < users.length; i++){
        console.log(users[i]);
    }
    console.log('\n');

    function viewModel() {
        var self = this;

        self.chats = ko.observableArray(currentUser['chats']);

        self.enviar = function (chat) {
            var idx = self.chats.indexOf(chat);
            var mensag = $('#umai #' + idx).val();
            var umai = {'nome': currentUser['nome'], 'msg': mensag};

            for(var i = 0;i < currentUser['chats'].length; i++){
                if(currentUser['chats'][i]['id1'] == chat['id1'] && currentUser['chats'][i]['id2'] == chat['id2']){
                    currentUser['chats'][i]['mensagens'].push(umai);
                    localStorage.setItem("currentUser", JSON.stringify(currentUser));
                    break;
                }
            }
            self.chats(currentUser['chats']);
            for(var i = 0; i < users.length; i++){
                if(users[i]['id'] == chat['id2']){
                    for(var j = 0; j < users[i]['chats'].length; j++){
                        if(users[i]['chats'][j]['id2'] == chat['id1']){
                            users[i]['chats'][j]['mensagens'].push(umai);
                        }
                    }
                }
                if(users[i]['id'] == currentUser['id']){
                    users[i] = currentUser;
                }
            }
            localStorage.setItem("users", JSON.stringify(users));

            for(var i = 0; i < users.length; i++){
                console.log(users[i]);
            }
        };





    };
    ko.applyBindings(new viewModel);
});