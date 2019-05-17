$("document").ready(function () {
    function viewModel() {
        var self = this;

        self.chats = ko.observableArray([
            {nome: 'jorge',id: '1', mensagens: [
                    {mensageiro: '1', mensagem: 'ola querido'},
                    {mensageiro: '2', mensagem: 'ola querido'},
                    {mensageiro: '1', mensagem: 'tudo bem'},
                    {mensageiro: '2', mensagem: 'sim ctg'},
                ]}
        ]);

        self.enviar = function (chat) {
            var idx = self.chats.indexOf(chat);
            var mensag = $('#umai #' + idx).val();
            var umai = self.chats()[idx];
            var request = $.ajax({
                url: "word",
                type: "POST",
                data: {id : chat.id, mensagem: mensag},
                dataType: "html"
            });


            request.done(function(msg) {
                umai.mensagens.push({mensageiro: '1', mensagem: mensag});
                self.chats.replace(chat, umai);
                console.log(self.chats()[idx]);
                alert("Mensagem Enviada.");
            });

            request.fail(function(jqXHR, textStatus) {
                alert("Houve um problema. Tente novamente");
            });
        };





    };
    ko.applyBindings(new viewModel);
});