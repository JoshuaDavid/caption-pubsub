function runPatches(start, patches) {
    var curr = copy(start);
    for(var i = 0, patch; patch = patches[i]; i++) {
        curr = spliced(curr, patch);
    }
    return curr;
}

/**
 * Given two character arrays, generate the arguments for before.splice()
 * which will generate after
 */
function unspliced(before, after) {
    // Get the left-hand offset at which before diverges from after

    var l = 0;

    // Find the first index from the left where the two arrays differ
    while(true) {
        // If the `before` array is shorter, the first index is the length
        // of the `before` array. In the degenerate case of equal arrays,
        // you return `[length, 0]`, which leaves `before` unchanged to yield
        // `after`. Otherwise, we need to append from `length` (deleting 0
        // elements) and then append the remaining items from `after`
        if(l >= before.length) {
            var offset = before.length;
            var remove = 0;
            var append = after.slice(l);
            return [offset, remove].concat(append);
        }

        // If the `after` array is shorter, then to make the `before` array
        // equal to it we just need to delete `before.length - after.length`
        // elements after `after.length`
        if(l >= after.length) {
            var offset = after.length;
            var remove = before.length - after.length;
            return [offset, remove];
        }

        // We've identified the first unequal element, and we're not yet at
        // the end
        if(before[l] !== after[l]) {
            break;
        }

        l += 1;
    }

    var r = 0;
    while(l + r < Math.min(before.length, after.length)) {
        if(before[before.length - r - 1] !== after[after.length - r - 1]) {
            break;
        }

        r += 1;
    }

    var offset = l;
    var left = before.slice(0, l);
    var right = before.slice(-r);
    var beforeMiddle = before.slice(l, before.length - r);
    var afterMiddle = after.slice(l, after.length - r);

    remove = beforeMiddle.length;
    return [offset, remove].concat(afterMiddle);
}

function copy(arr) {
    return arr.map(function id(x) { return x; });
}

function spliced(before, patch) {
    var after = copy(before);
    Array.prototype.splice.apply(after, patch);
    return after;
}

var firebaseUrl = 'https://torrid-heat-8764.firebaseio.com/';
