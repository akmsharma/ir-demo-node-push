function renderTeamStats(arr) {
var arrLength = arr.length;
var str = '<thead><tr><th>Hotel Name</th><th>Available rooms</th><th>Price</th></tr></thead>';
for (var i = 0; i < arrLength; i++) {
str +='<tr class="ladderRow averages">';
for (var key in arr[i]) {
    if (arr[i].hasOwnProperty(key)) {
        str += '<td statname="' + key.toUpperCase() + '">' + arr[i][key] + '</td>';
    }
}
str += '</tr>';
}
//str += '</tr>';
$('#container').html(str);
}
var socket = io.connect('http://127.0.0.1:8000');

socket.on('connection-data', function(data) {
var _data = JSON.parse(data);
console.log(_data);
renderTeamStats(_data);
});
socket.on('demo-content-update', function(data) {
var _data = JSON.parse(data);
console.log(_data);
renderTeamStats(_data);
});
