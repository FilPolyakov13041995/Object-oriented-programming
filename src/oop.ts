class Footballer {
    img: string
    alt: string
    name: string
    descr: string
    date: string
    playNumber: string
    position: string
    parent: HTMLDivElement
    constructor (img: string, alt: string, name: string, descr: string, date: string, playNumber: string, position: string, parentSelector: string) {
        this.img = img
        this.alt = alt
        this.name = name
        this.descr = descr
        this.date = date
        this.playNumber = playNumber
        this.position = position
        this.parent = document.querySelector(parentSelector) as HTMLDivElement
    }
    render () {
        const element = document.createElement('div');
        element.innerHTML =  `
            <figure>
                <img src=${this.img} alt=${this.alt}>
                <h3>${this.name}</h3>
                <details>
                    <p>${this.descr}</p>
                </details>
                <hr>
                <p>${this.date}</p>
                <p>${this.playNumber}</p>
                <p>${this.position}</p>
            </figure>
        `;
        this.parent.append(element);
    }
}

class Hockey extends Footballer {
    constructor(img: string, alt: string, name: string, descr: string, date: string, playNumber: string, position: string, parentSelector: string) {
        super(img, alt, name, descr, date, playNumber, position, parentSelector);
    }
}
class Basketball extends Footballer {
    constructor(img: string, alt: string, name: string, descr: string, date: string, playNumber: string, position: string, parentSelector: string) {
        super(img, alt, name, descr, date, playNumber, position, parentSelector);
    }
}

const urlJsonFootball = 'http://localhost:3000/Footballer';
const urlJsonHockey = 'http://localhost:3000/Hockey';
const urlJsonBasketball = 'http://localhost:3000/Basketball';


function getRequest(url: string) {
    return fetch(url).then(response => {
        if(!response.ok) {
            throw new Error('Сервер упал!');
        } else {
            return response.json();
        }
    });
}

getRequest(urlJsonFootball)
    .then(data => {
        data.forEach(({img, altimg, name, descr, date, playNumber, position}) => {
        new Footballer(img, altimg, name, descr, date, playNumber, position, '.container .bestFootball').render(); 
        });
    })
    .catch(err => console.log(err));

getRequest(urlJsonHockey)
    .then(data => {
        data.forEach(({img, altimg, name, descr, date, playNumber, position}) => {
            new Hockey(img, altimg, name, descr, date, playNumber, position, '.container .bestHockey').render(); 
        });
    })
    .catch(err => console.log(err));

getRequest(urlJsonBasketball)
    .then(data => {
        data.forEach(({img, altimg, name, descr, date, playNumber, position}) => {
            new Basketball(img, altimg, name, descr, date, playNumber, position, '.container .bestBasketball').render(); 
        });
    })
    .catch(err => console.log(err));



const formElem = document.getElementById('formElem') as HTMLFormElement
const urlAddress = 'http://localhost:3000/Request';

function postsRequest(method: string, url: string, obj: object) {
    return fetch(url, {
        method,
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('Что-то сломалось..Скоро починим..');
        } else {
            return response.json();
        }
    });
}


formElem.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Отправка...');
    
    let formData: any = new FormData(formElem)
    const timeId: Date = new Date();
    formData.append('id', timeId.getMilliseconds() * timeId.getSeconds());
      
    let object = {};
    formData.forEach((value: string, key: string) => {
        object[key] = value;
    });

    postsRequest('POST', urlAddress, object)
        .then(data => console.log(data))
        .catch(err => console.error(err));
});