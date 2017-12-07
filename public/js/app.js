
var socket = io();

socket.on('connect', function(){
    console.log('succefully connected');
});

socket.on('message', function (message) {
    console.log(message.text);

    jQuery('.message').append('<p>'+message.text +'</p>');
});

/*handles submitting of new messages*/
var $form = jQuery('#form1');

$form.on('submit', function (event) {
    event.preventDefault();

    socket.emit('message',{

        text:$form.find('input[name=message]').val()
    });

    $("#form1").find('input[name=message]').val("")


})