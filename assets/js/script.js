
const container = document.getElementsByClassName('container')[0];
const bck = document.getElementsByClassName('bck')[0];
const img = document.getElementsByClassName('img-bck')[0];
const imginput = document.getElementById('image');
const urlParams = new URLSearchParams(window.location.search);

onload = function() {
    if (container && bck) {
        let hue = 0;
        setInterval(function() {
            hue = (hue + 1) % 360;
            const colorContainer = `hsla(${hue}, 100%, 50%, 0.62)`;
            container.style.boxShadow = `0px 0px 300px 200px ${colorContainer}`;
            bck.style.backgroundColor = colorContainer;
        }, 100);
    } else {
        console.error('Element with class "container" not found.');
    }
    
    img.src = 'https://edt.infuseting.fr/default.png';
    for (const [key, value] of urlParams.entries()) {
        console.log(key, value);
        if (key === 'img-link') {
            if (value != '') {
                img.src = value;
                console.log(imginput);
                imginput.value = value;
            } 
        }
        const element = document.getElementById(key.replace('-text', '').replace('-color', ''));
        if (element) {
            if (key.endsWith('-text')) {
                element.value = value;
                onInputChange(element);
            } else if (key.endsWith('-color')) {
                element.value = value;
                onColorChange(element);
            }
        }
        if (key.endsWith('-color')) {
            const colorInput = document.querySelector('input[type="color"]#' + key.replace('-color', ''));
            if (colorInput) {
                colorInput.value = value;
                onColorChange(colorInput);
            }
        } else if (key.endsWith('-text')) {
            const textInput = document.querySelector('input[type="text"]#' + key.replace('-text', ''));
            if (textInput) {
                textInput.value = value;
                onInputChange(textInput);
            }
        }
    }
    
}


function imgChange(element) {
    const inputText = element.value;
    if (inputText=== '') {
        img.src = 'https://edt.infuseting.fr/default.png';
        urlParams.set("img-link", '');
        const newUrl = window.location.pathname + '?' + urlParams.toString();
        window.history.replaceState(null, '', newUrl);
    }
    else {
        img.src=inputText;
        urlParams.set("img-link", img.src);
        const newUrl = window.location.pathname + '?' + urlParams.toString();
        window.history.replaceState(null, '', newUrl);
    }
}

function onColorChange(element) {
    const color = element.value;
    const textDiv = document.querySelector('.text');
    if (textDiv) {
        const pElements = textDiv.getElementsByTagName('p');
        for (let p of pElements) {
            if (p.id == element.id) {
                urlParams.set(element.id + "-color", color);
                const newUrl = window.location.pathname + '?' + urlParams.toString();
                window.history.replaceState(null, '', newUrl);
                p.style.color = color;
                break;
            }
        }
    }
}
function onInputChange(element) {
    const text = element.value;
    const textDiv = document.querySelector('.text');
    if (textDiv) {
        const pElements = textDiv.getElementsByTagName('p');
        for (let p of pElements) {
            if (p.id == element.id){
                urlParams.set(element.id + "-text", text);
                const newUrl = window.location.pathname + '?' + urlParams.toString();
                window.history.replaceState(null, '', newUrl);
                p.innerHTML = '';
                p.innerHTML += text;
                break;
            }
        }
    }
}


document.getElementById('generate').onclick = function() {
    const content = document.querySelector('.img-content .content');
    const contentClone = content.cloneNode(true);
    contentClone.style.position = 'relative';
    contentClone.style.width = '600px';
    contentClone.style.cursor = 'pointer';
    contentClone.style.maxHeight = 'auto';
    contentClone.setAttribute('onclick', "window.open('https://infuseting.fr', '_blank');");

    const imgClone = contentClone.querySelector('img');
    if (imgClone) {
        imgClone.style.width = '100%';
        imgClone.style.height = 'auto';
    }

    const textClone = contentClone.querySelector('.text');
    if (textClone) {
        textClone.setAttribute('onload', "this.style.position = 'absolute'");
        textClone.style.transform = 'translateY(-182px)';
        textClone.style.zIndex = '1';
        textClone.style.top = '-600';
        textClone.style.left = '0';
        textClone.style.width = 'calc(100% - 2em)';
        textClone.style.height = 'calc(100% - 2em)';
        textClone.style.display = 'flex';
        textClone.style.flexDirection = 'column';
        textClone.style.flexWrap = 'wrap';
        textClone.style.justifyContent = 'space-between';
        textClone.style.padding = '1em';

        const pElements = textClone.getElementsByTagName('p');
        for (let p of pElements) {
            p.style.flex = '1 1 25%';
            p.style.margin = '1%';
            p.style.fontSize = '1.5em';
            p.style.textShadow = '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff';
        }
    }
    var contentString = new XMLSerializer().serializeToString(contentClone) ;
    console.log(contentString);
    navigator.clipboard.writeText(contentString).then(function() {
        console.log('Content copied to clipboard');
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}