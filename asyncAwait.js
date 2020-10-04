var mainSections = ['home', 'world', 'politics', 'magazine', 'technology', 'science', 'health', 'sports', 'arts', 'fashion', 'food', 'travel'];
var container = createEleWithClass('div', 'container');
var nav = createEleWithClass('nav', 'navbar navbar-expand-lg navbar-dark bg-dark');
var button = createEleWithClass('button', 'navbar-toggler');
setAttributesInEle(button, {
    'type': 'button',
    'data-toggle': 'collapse',
    'data-target': '#navbarCollapse'
});
var span = createEleWithClass('span', 'navbar-toggler-icon');
var collapse = createEleWithClass('div', 'collapse navbar-collapse');
setAttributesInEle(collapse, { 'id': 'navbarCollapse' });
var navbar = createEleWithClass('div', 'navbar-nav');
var a = [];

for (var i = 0; i < 12; i++) {
    a[i] = document.createElement('a');
    setAttributesInEle(a[i], {
        'href': '#',
        'class': "nav-item nav-link",
        'id': mainSections[i],
        'onclick': `getSectionData('${mainSections[i]}')`,
    });
    a[i].innerHTML = mainSections[i].toUpperCase();
    navbar.append(a[i]);
}

collapse.appendChild(navbar);
button.appendChild(span);
nav.append(button, collapse);
container.appendChild(nav);
document.body.append(container);

// Getting NewYork Times Data
async function getSectionData(sectionName) {

    try {
        console.log(sectionName);

        document.querySelectorAll('.card').forEach(function (a) {
            a.remove();
        });

        //removing active class from all nav items
        document.querySelectorAll('.nav-item').forEach((ele) => {
            var newClass = ele.className.replace(' active', '');
            ele.className = newClass;
        })

        // setting the nav item to active class
        document.getElementById(sectionName).className += ' active';

        var keyAPI = 'QeV70U0bJTykQcHCEycy0WAMJubGdqRC';
        var sectionData = await fetch(`https://api.nytimes.com/svc/topstories/v2/${sectionName}.json?api-key=${keyAPI}`);
        var jsonData = await sectionData.json();
        var sectionInfo = jsonData.results;
        console.log(sectionInfo);

        sectionInfo.forEach((res) => {
            var card = createEleWithClass('div', 'card mt-3 mb-3');
            var row = createEleWithClass('div', 'row');
            var colleft = createEleWithClass('div', 'col-md-8');
            var colright = createEleWithClass('div', 'col-md-4');
            var divright = createEleWithClass('div', 'divImage');
            var cardBody = createEleWithClass('div', 'card-body');
            var cardImg = createEleWithClass('img', `${sectionName}-card`);
            var imageUrl = res.multimedia[res.multimedia.length - 1].url;
            setAttributesInEle(cardImg, {
                'src': imageUrl,
                'width': '100%',
                'height': '100%'
            });
            var cardSection = createEleWithClass('h5', `card-title ${sectionName}-card`);
            cardSection.setAttribute('style', 'color:blue;');
            var cardTitle = createEleWithClass('h6', `card-title mb-2 ${sectionName}-card`);
            var cardDate = createEleWithClass('h6', `card-subtitle mb-2 ${sectionName}-card`);
            var cardAbstract = createEleWithClass('p', `card-text ${sectionName}-card`);
            var cardItemType = createEleWithClass('h6', `card-subtitle text-muted mb-2 ${sectionName}-card`);
            var cardByLine = createEleWithClass('h6', `card-subtitle mb-2 text-muted ${sectionName}-card`);
            var cardContine = createEleWithClass('a', 'continueReading');
            setAttributesInEle(cardContine, {
                'href': res.url,
                'target': '_blank',
            });
            cardSection.innerHTML = res.section;
            cardTitle.innerHTML = res.title;
            cardItemType.innerHTML = res.item_type;
            cardByLine.innerHTML=res.byline;
            cardDate.innerHTML = '<small>' + res.created_date.split('T')[0] + '</small>';
            cardAbstract.innerHTML = '<br>' + res.abstract;
            cardContine.innerHTML = 'Continue reading';

            container.append(card);
            card.append(row);
            row.append(colleft, colright);
            colleft.append(cardBody);
            cardBody.append(cardSection, cardTitle, cardItemType, cardByLine, cardDate, cardAbstract, cardContine);
            colright.append(divright);
            divright.append(cardImg);
        });

    }
    catch (err) {
        console.log(err);
    }
};

document.getElementById('home').click();

//creating element with classname
function createEleWithClass(ele, className) {
    var k = document.createElement(ele);
    k.setAttribute('class', className);
    return k;
}

//setting attributes to elements.
function setAttributesInEle(ele, attr) {
    for (var j in attr) {
        ele.setAttribute(j, attr[j]);
    }
}
