function applyFormat(format) {
    document.execCommand(format, false, null);
}

function alignText(align) {
    document.execCommand('justify' + align.charAt(0).toUpperCase() + align.slice(1), false, null);
}

function indentText() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const tabCharacter = "\u00a0\u00a0\u00a0\u00a0";
    const tabNode = document.createTextNode(tabCharacter);
    range.deleteContents();
    range.insertNode(tabNode);
    range.setStart(tabNode, tabCharacter.length);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    document.getElementById("js-textarea").dispatchEvent(new Event("input"));
}

const textarea = document.getElementById('js-textarea');
document.getElementById('fontSelect').addEventListener('change', function () {
    textarea.style.fontFamily = this.value;
});

document.getElementById('size').addEventListener('change',function(){
    textarea.style.fontSize=this.value+'px';
});

document.getElementById('underlineButton').addEventListener('click', function () {
    applyFormat('underline');
});

document.getElementById('colorPicker').addEventListener('input', function () {
    document.execCommand('foreColor', false, this.value);
});

document.getElementById('italicize').addEventListener('click', function () {
    applyFormat('italic');
});

document.getElementById('fonwidth').addEventListener('click', function () {
    applyFormat('bold');
});

document.getElementById('close').addEventListener('click',function(){
    document.getElementById("js-textarea").innerHTML="";
});

document.getElementById('left').addEventListener('click',function (){
    alignText('left');
});

document.getElementById('center').addEventListener('click',function (){
    alignText('center');
});

document.getElementById('right').addEventListener('click',function (){
    alignText('right');
});

document.getElementById("Tab").addEventListener("click", function() {
    indentText();
});

document.getElementById("js-textarea").addEventListener("keydown", function(event) {
    if (event.key === "Tab") {
        event.preventDefault();
        indentText();
    }
});

document.getElementById('js-textarea').addEventListener('paste', function (e) {
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, '<a href="' + text + '" target="_blank">' + text + '</a>');
});

document.getElementById('js-textarea').addEventListener('click', function (e) {
    if (e.ctrlKey) {
        const target = e.target;
        if (target.tagName === 'A') {
            window.open(target.href, '_blank');
        }
    }
});

document.getElementById('js-textarea').addEventListener('paste', function (e) {
    new FileReader().onload = function (event) {
        document.execCommand('insertHTML', false, '<img src="' + event.target.result + '">');
    };
});

document.getElementById('insertImageBtn').addEventListener('click', function () {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', function () {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageData = e.target.result;
                document.execCommand('insertImage', false, imageData);
            };
            reader.readAsDataURL(file);
        }
    });// Кликнуть на созданный input элемент
    input.click();
});
