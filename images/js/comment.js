// const form = document.querySelector('form');
const ul = document.querySelector('ul');
const button = document.querySelector('button');
const input = document.getElementById('item');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

const liMaker = (text) => {
    const li = document.createElement('li');
    li.textContent = text;
    ul.appendChild(li);
}
const form = document.querySelector('form')
form.addEventListener('submit', event => {
    // submit event detected
    event.preventDefault()
});

// form.addEventListener(submit',function e. {
//     e.preventDefault()
//     console.log('submit')
//     itemsArray.push(input.value);
// localStorage.setItem('items', JSON.stringify(itemsArray));
// liMaker(input.value);
// input.value = "";
//     // event(e) {
//     // e.preventDefault();

// });

console.log()
data.forEach(item => {
    liMaker(item);
});

button.addEventListener('click', function () {
    localStorage.clear();
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    itemsArray = [];
});

// utility functions for localstorage
function setObject(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}
function getObject(key) {
    var storage = window.localStorage,
        value = storage.getItem(key);
    return value && JSON.parse(value);
}
function clearStorage() {
    window.localStorage.clear();
}

// Clear inputfields and localstorage
function clearComment() {
    $('#txt1').val('');
    $('#namebox').val('');
    clearStorage();
}

function saveComment() {
    var cText = $('#txt1').val(),
        cName = $('#namebox').val(),
        cmtList = getObject('cmtlist');

    if (cmtList) {
        cmtList.push({ name: cName, text: cText });
        setObject('cmtlist', cmtList);
    } else { //Add a comment
        setObject('cmtlist', [{ name: cName, text: cText }]);
    }

    bindCmt();
}

function bindCmt() {
    var cmtListElement = $('#cmtlist'),
        cmtList = getObject('cmtlist');

    //Out with the old
    cmtListElement.empty();
    //And in with the new
    $.each(cmtList, function (i, k) {
        cmtListElement.append($('<p><span>' + k.name + '</span>' + k.text + '</p>'));
    });
}

//Get the comments on page ready
$(function () {
    bindCmt();
});