
class Footballer {
    constructor(img, alt, name, descr, date, playNumber, position, parentSelector) {
        this.img = img;
        this.alt = alt;
        this.name = name;
        this.descr = descr;
        this.date = date;
        this.playNumber = playNumber;
        this.position = position;
        this.parent = document.querySelector(parentSelector);
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
    constructor(img, alt, name, descr, date, playNumber, position, parentSelector) {
        super(img, alt, name, descr, date, playNumber, position, parentSelector);
    }

}
class Basketball extends Footballer {
    constructor(img, alt, name, descr, date, playNumber, position, parentSelector) {
        super(img, alt, name, descr, date, playNumber, position, parentSelector);
    }

}



const urlJsonFootball = 'http://localhost:3000/Footballer';
const urlJsonHockey = 'http://localhost:3000/Hockey';
const urlJsonBasketball = 'http://localhost:3000/Basketball';

function getRequest(url) {
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
   


const reformElem = document.getElementById('formElem');
const urlAddress = 'http://localhost:3000/Request';


function posts(method, url, obj) {
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

reformElem.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Отправка...');
    
    let formData = new FormData(reformElem);
    const timeId = new Date();
    formData.append('id', timeId.getMilliseconds() * timeId.getSeconds());
      
    let object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });

    posts('POST', urlAddress, object)
        .then(data => console.log(data))
        .catch(err => console.error(err));
});


//=========Fotball================//
// new Footballer(
//     "img/pele.jpg",
//     "pele",
//     "Э́дсон Ара́нтис ду Насиме́нту",
//     "более известный как Пеле́ — бразильский футболист, нападающий. Играл за клубы «Сантос» и «Нью-Йорк Космос». Провёл 92 матча и забил 77 голов в составе сборной Бразилии. Пеле — единственный футболист в мире, три раза становившийся чемпионом мира как игрок.",
//     "23 октября 1940 г.",
//     "Игровой номер: 10",
//     "Позиция: нападающий",
//     ".container .bestFootball"

// ).render();
// new Footballer(
//     "img/Kroif.jpg",
//     "Kroif",
//     "Хе́ндрик Йо́ханнес Кройф",
//     "нидерландский футболист и тренер. В качестве игрока в основном выступал на атакующих позициях, став первым трёхкратным обладателем «Золотого мяча» и других наград. Считается одним из лучших футболистов и тренеров в истории футбола.",
//     "11 сентября 1945 г.",
//     "Игровой номер: 6",
//     "Позиция: защитник",
//     ".container .bestFootball"

// ).render();
// new Footballer(
//     "img/Franc.jpg",
//     "Franc",
//     "Франц Анто́н Беккенба́уэр",
//     "немецкий футболист и тренер, выступавший в амплуа центрального защитника или полузащитника. Часто упоминается как футболист, который изобрёл амплуа футбольного либеро. Считается одним из лучших защитников XX века.",
//     "25 апреля 1947 г.",
//     "Игровой номер: 14",
//     "Позиция: атакующий полузащитник",
//     ".container .bestFootball"
// ).render();


//==========Hockey==============//
// new Hockey(
//     "img/Grecki.jpg",
//     "Grecki",
//     "Уэ́йн Ду́глас Гре́тцки",
//     "канадский хоккеист, центральный нападающий. Один из самых известных спортсменов XX века. В 1978—1988 годах выступал за клуб «Эдмонтон Ойлерз», с которым четыре раза выигрывал Кубок Стэнли.",
//     "26 января 1961 г.",
//     "Игровой номер: 99",
//     "Позиция: нападающий",
//     ".container .bestHockey"
// ).render();

// new Hockey(
//     "img/Harlamov.jpg",
//     "Harlamov",
//     "Вале́рий Бори́сович Харла́мов",
//     "советский хоккеист, нападающий команды ЦСКА и сборной СССР, заслуженный мастер спорта СССР. Двукратный олимпийский чемпион и восьмикратный чемпион мира. Лучший хоккеист СССР. Один из ведущих хоккеистов СССР 1970-х годов, получивший признание как в своей стране, так и за её пределами.",
//     "14 января 1948 г.",
//     "Игровой номер: 17",
//     "Позиция: нападающий",
//     ".container .bestHockey"
// ).render();

// new Hockey(
//     "img/Alex_Ovechkin.jpg",
//     "Alex_Ovechkin",
//     "Алекса́ндр Миха́йлович Ове́чкин",
//     "российский хоккеист, левый крайний нападающий и капитан клуба НХЛ «Вашингтон Кэпиталз». Обладатель Кубка Стэнли 2018 года. Трёхкратный чемпион мира. Начал профессиональную карьеру в московском «Динамо» в 16 лет. На драфте 2004 года выбран «Вашингтоном» под общим первым номером.",
//     "17 сентября 1985 г.",
//     "Игровой номер: 8",
//     "Позиция: нападающий",
//     ".container .bestHockey"
// ).render();

//============Basketball================//

// new Basketball(
//     "img/majkl-dzhordan03.jpg",
//     "Dzhordan",
//     "Майкл Дже́ффри Джо́рдан",
//     "американский баскетболист, бывший игрок НБА. Лучший баскетболист в истории. Играл на позиции атакующего защитника. Джордан сыграл важную роль в популяризации баскетбола и НБА во всём мире в 1980-х и 1990-х годах. Двукратный олимпийский чемпион.",
//     "17 февраля 1963 г.",
//     "Игровой номер: 23",
//     "Позиция: атакующий защитник",
//     ".container .bestBasketball"
// ).render();

// new Basketball(
//     "img/Belov.jpg",
//     "Belov",
//     "Серге́й Алекса́ндрович Бело́в",
//     "советский баскетболист, тренер, олимпийский чемпион 1972 года, двукратный чемпион мира, один из самых именитых игроков советского и европейского баскетбола XX века.",
//     "23 января 1944 г.",
//     "Игровой номер: 10",
//     "Позиция: атакующий защитник",
//     ".container .bestBasketball"
// ).render();

// new Basketball(
//     "img/Bryant.jpg",
//     "Bryant",
//     "Ко́би Бин Бра́йант",
//     "американский баскетболист, выступавший в Национальной баскетбольной ассоциации в течение двадцати сезонов за одну команду — «Лос-Анджелес Лейкерс». Играл на позиции атакующего защитника. Был выбран в первом раунде под общим 13-м номером на драфте НБА 1996 года командой «Шарлотт Хорнетс».",
//     "23 августа 1978 г.",
//     "Игровой номер: 24",
//     "Позиция: атакующий защитник",
//     ".container .bestBasketball"
// ).render();

