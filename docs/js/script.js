window.addEventListener('load', function () {

    axios.get('https://hubculture.com/markets/api', {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(function (response) {
        let ven = response.data.filter(function(e) {
            return ((e.secondary_currency == 'BTC')||(e.secondary_currency == 'ETH')||(e.secondary_currency == 'XRP')||(e.secondary_currency == 'BCH')||(e.secondary_currency == 'USD')||(e.secondary_currency == 'EUR'))
        })
        for (let i=0; i<ven.length; i++) {
            let percent, span, spanClass, indicator;
            percent = 100*parseFloat(ven[i].currency_diff)/parseFloat(ven[i].current_amount);
            percent = Math.round(percent*100000)/100000;
            (percent > 0) ? (spanClass = 'up', indicator = '+') : (spanClass = 'down', indicator = '')
            span = ' <span class="' + spanClass + '"> ' + indicator + percent + '%<\/span>';
            document.querySelector('.' + ven[i].secondary_currency + ' .crypto-percent').innerHTML = span;
            document.querySelector('.' + ven[i].secondary_currency + ' .crypto-ven').textContent = ven[i].current_amount;
        }
    })

    .catch(function (error) {
        console.log(error);
    });

    let HXTTP = window.XDomainRequest || window.XMLHttpRequest
        xmlhttp = new HXTTP();       
        xmlhttp.open("GET", "https://hubculture.com/", true);
        xmlhttp.onerror = function(){ console.log("Error") }
        xmlhttp.send();
        xmlhttp.onload = parseHub;
        
        function parseHub() {
            hubculture = xmlhttp.responseText;
            let parser = new DOMParser();
            const html = parser.parseFromString(hubculture, "text/html");
            let hubImage, hubTitle, hubAnnounce, exImage, exTitle, exAnnounce;
            hubImage = html.querySelectorAll('.thecardtsk img');
            hubTitle = html.querySelectorAll('.thecardtsk .cardtsk-title');
            hubAnnounce = html.querySelectorAll('.thecardtsk span p');
            hubReadmore = html.querySelectorAll('.cardtsk-outmore')
            exImage = document.querySelectorAll('.article-image');
            exTitle = document.querySelectorAll('.article-title a');
            exAnnounce = document.querySelectorAll('.article-announce');
            exReadmore = document.querySelectorAll('.article-readmore');
            exDate = document.querySelectorAll('.article-date');
            date = new Date()

            for ( let i=0; i<3; i++) {
                exImage[i].style.backgroundImage = 'url('+hubImage[i].src+')';
                exImage[i].title = hubImage[i].alt;
                exTitle[i].innerHTML = hubTitle[i].innerHTML;
                exAnnounce[i].innerHTML = hubAnnounce[i].innerHTML;
                exReadmore[i].innerHTML = hubReadmore[i].innerHTML;
                exReadmore[i].title = hubReadmore[i].title;
                let asd = hubReadmore[i].href.indexOf('\/hubs');
                let href = hubReadmore[i].href
                href = href.substr(asd,href.length);
                href = 'http://hubculture.com'+href;
                exReadmore[i].href = href;
                exTitle[i].href = href;
                exDate[i].innerHTML = date.toLocaleDateString();
            }
        }

    let burger = document.querySelector('.burger'),
        offcanvas = document.querySelector('#offcanvas'),
        wrapper = document.querySelector('#wrapper'),
        overlay = document.querySelector('#overlay');
    
    burger.addEventListener('click', offShow);
    overlay.addEventListener('click', offHide);

    function offShow() {
        wrapper.style.transform = 'translateX(360px)';
        offcanvas.style.transform = 'translateX(0)';
        overlay.style.zIndex = '10';
        overlay.style.opacity = '100';
    }

    function offHide() {
        wrapper.style.transform = 'translateX(0)';
        offcanvas.style.transform = 'translateX(-360px)';
        overlay.style.zIndex = '-10';
        overlay.style.opacity = '0';
    }
})