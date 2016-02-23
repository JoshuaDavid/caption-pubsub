window.onload = function() {
    var matches = window.location.toString().match(/stream=([0-9a-fA-F]+)/);
    if(matches) {
        var key = matches[1];
        var ref = new Firebase(firebaseUrl + key);

        var curr = [];
        var output = document.getElementById('output');

        ref.on("child_added", function(snapshot) {
            var patch = snapshot.val();
            curr = spliced(curr, patch);
            output.innerHTML = curr.join('');
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }
}
