var key = (Math.random() * 0x100000000).toString(16);
var firebaseRef = new Firebase(firebaseUrl + key);

var prev = [];
var patches = [];
function handleChange(input) {
    var curr = input.value.split('');
    var patch = unspliced(prev, curr);
    firebaseRef.push(patch);
    patches.push(patch);
    prev = curr;
}

function updateLink() {
    var link = document.getElementById('stream-link');
    link.href += '?stream=' + key;
}

window.onload = function() {
    updateLink();
}
