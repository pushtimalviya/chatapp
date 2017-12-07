var name = getQueryVariable('name');
var room = getQueryVariable('room');
var socket = io();

console.log(name +'want to join chat group ' + room);
jQuery('.room-title').text(room);

socket.on('connect', function(){
    console.log('succefully connected');
    socket.emit('joinroom', {
        name:name,
        room:room
    });
});

socket.on('message', function (message) {
   var momentTimestamp = moment.utc(message.timestamp);
   var $message = jQuery('.message');
    console.log(message.text);
    //jQuery('.message').append('<p>'+message.text +' '+ now.local().format('hh:mm a') +'</p>');
    // jQuery('.message').append('<p>'+message.text +' '+ momentTimestamp.local().format('hh:mm a') +'</p>');

    $message.append('<p>'+message.name +' '+ momentTimestamp.local().format('hh:mm a') +'</p>');
    $message.append('<p>'+message.text +'</p>');
});

/*handles submitting of new messages*/
var $form = jQuery('#form1');
$form.on('submit', function (event) {
    event.preventDefault();
    socket.emit('message',{
        name: name,
        text:$form.find('input[name=message]').val()
    });
    $("#form1").find('input[name=message]').val("")
});