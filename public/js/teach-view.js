var menuItem = document.getElementById('teachMenu');
menuItem.classList.add('active');
menuItem.classList.add('orange');


var i = 0;
var original = document.getElementById('duplicater');
var beforeElem = document.getElementById('add_button_div');

function duplicate() {
    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "duplicater" + ++i;
    // or clone.id = ""; if the divs don't need an ID
    original.parentNode.insertBefore(clone, beforeElem);
}