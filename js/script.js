
let key_api = `b6fbdefaf826660e33bc713afbb18b9b`;
let count = 0;
let movie_id = 0;

// ---------------------модельне вікно-----------------------------------
new create_Element('DIV', document.body, 'beforeend', 'overlay').element();
new create_Element('DIV', document.body, 'beforeend', 'overlay-sourch').element();
// ------------------------------nav - header-------------------------------------------------------
// let arr_nav_logo = ['Home', 'About', 'Contact']
new create_Element('DIV', header_nav, 'beforeend', 'logo-name').element(`<div><i class="fas fa-play"></i></div>`);
new create_Element('DIV', document.querySelector('.logo-name'), 'beforeend', 'title-logo').element(`<h1>MovieViewing</h1>`);
new create_Element('DIV', header_nav, 'beforeend', 'div-nav-logo').element('Жанр');
new create_Element('UL', document.querySelector('.div-nav-logo'), 'beforeend', 'ul-nav-logo').element();
// ------------------------------жанри-------------------------------------------------------
let url_genre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key_api}&language=ru` //жанри
let genre = new API_Film(url_genre);
genre.load_data(show_genre);
function show_genre(obj) {
    console.log(obj)
    obj.genres.forEach(item => {
        new create_Element('LI', document.querySelector('.ul-nav-logo'), 'beforeend').element(item.name);
    })

    let content_genres = document.querySelectorAll('.ul-nav-logo li')
    searchPreew(content_genres, obj);
}
//-------------------------------------------------
new create_Element('DIV', header_nav, 'beforeend', 'div-search').element();
new create_Element('INPUT', document.querySelector('.div-search'), 'beforeend').element_Atribute('type', 'text');
let input_sourch = document.querySelector('.div-search input');
input_sourch.setAttribute('placeholder', 'Поиск...')
new create_Element('DIV', document.querySelector('.div-search'), 'beforeend', 'logo-search').element(` <i class="fas fa-search"></i>`);
new create_Element('DIV', header_nav, 'beforeend', 'div-theme').element();
// ---------------Пошук фильмов---------------------------
let btn_click = 0;
document.querySelector('.div-search i').addEventListener('click', function (event) {
    console.log(event.target)
    btn_click++;
    console.log(btn_click)
    if (btn_click < 2) {
        // console.log(event.target)
        if (input_sourch.value) {
            let url_text_sourch = `https://api.themoviedb.org/3/search/movie?api_key=${key_api}&language=ru-RU&query=${input_sourch.value}&page=1&include_adult=true&region=ru`
            // console.log(this.value)
            // let value_sourch = this.value
            let text_sourch = new API_Film(url_text_sourch);
            text_sourch.load_data(show_sourch);
        }
    }
    else {
        btn_click = 0;
    }
})
input_sourch.addEventListener('change', function () {
    btn_click++;
    console.log(btn_click)
    if (btn_click < 2) {
        if (this.value) {
            let url_text_sourch = `https://api.themoviedb.org/3/search/movie?api_key=${key_api}&language=ru-RU&query=${this.value}&page=1&include_adult=true&region=ru`
            console.log(this.value)
            let value_sourch = this.value
            let text_sourch = new API_Film(url_text_sourch);
            text_sourch.load_data(show_sourch);
        }
    }
    else {
        btn_click = 0;
    }
})
// ------------------------------Slider - header-------------------------------------------------------
let url_kinoteant = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key_api}&language=ru-RU&page=1&region=ru` //в список кынотеатрах
let kinoteant = new API_Film(url_kinoteant);
kinoteant.load_data(show_kinoteant);
// -------------------------------------------------------------------------------------
function show_kinoteant(obj) {
    let movie_id = obj.results[count].id;

    new create_Element('UL', header_baner, 'beforeend', 'ul-baner').element();
    createLi(10);//Виводимо весь список
    createLi(3);//ДОбавляємо в кінець
    function createLi(item) {
        for (let i = 0; i < item; i++) {
            let url_ul_baner = obj.results[i].backdrop_path;
            let li = document.createElement('LI');
            li.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${url_ul_baner}) `
            li.style.width = `${popular_div.offsetWidth}px`
            new create_Element('H2', li, 'beforeend').element(obj.results[i].title);
            let icon_reting = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';
            new create_Element('DIV', li, 'beforeend', 'reting-film').element(`${icon_reting}  <span> - ${obj.results[i].vote_average}</span>`);
            new create_Element('DIV', li, 'beforeend', 'golos-film').element(`<p>Голосов - <span>${obj.results[i].vote_count}</span></p> `);
            new create_Element('DIV', li, 'beforeend', 'data-film').element(`<p>Дата: <span>${obj.results[i].release_date}</span></p> `);
            new create_Element('DIV', li, 'beforeend', 'play-icon').element(`<i class="fas fa-play"></i>`);
            document.querySelector('.ul-baner').insertAdjacentElement('beforeend', li);
        }

    }
    showList();
    let move_video = document.querySelectorAll(`.ul-baner .play-icon`);
    moveVideo(move_video, obj);
}
// -------------------------------------------------------------------------------------
function showList() {
    let ul = document.querySelector('.ul-baner');
    let li = document.querySelectorAll('.ul-baner li');

    let widthLi = popular_div.offsetWidth;
    let widthUl = widthLi * (li.length);
    let width_correct = (header_baner.offsetWidth - popular_div.offsetWidth) / 2;
    let widthItem = widthLi - width_correct;
    function showImg() {
        if (widthItem < widthUl - widthLi) {
            ul.style.left = `-${widthItem}px`;
            ul.style.transition = '.5s linear';
            setTimeout(showImg, 4000);
        }
        else {
            widthItem = widthLi - width_correct;
            ul.style.left = `-${widthItem}px`;
            ul.style.transition = '0s linear';
            setTimeout(showImg, 0);
        }
        widthItem += widthLi;
    }
    showImg();
}
//----------Популярние---------------------------
let url_popular = `https://api.themoviedb.org/3/movie/popular?api_key=${key_api}&language=ru&page=1&region=ru`
let popular_film = new API_Film(url_popular);
popular_film.load_data(show_popular);
function show_popular(obj) {
    let movie_id = obj.results[count].id;
    new create_Element('DIV', popular_div, 'afterbegin', 'div-title').element();
    new create_Element('H3', document.querySelector('.div-title'), 'beforeend', 'h3-title').element('Популярние фильмы');
    new create_Element('P', document.querySelector('.div-title'), 'beforeend', 'p-title').element('');

    new create_Element('DIV', popular_div, 'beforeend', 'popular-container').element();
    for (let i = 0; i < 4; i++) {
        let url_poster_path = obj.results[i].poster_path;
        new create_Element('DIV', document.querySelector('.popular-container'), 'beforeend', `div-container-${i}`).element();
        document.querySelector(`.div-container-${i}`).classList.add('div-popular');
        new create_Element('IMG', document.querySelector(`.div-container-${i}`), 'beforeend', `img-poster-${i}`).element_Atribute('src', `https://image.tmdb.org/t/p/w300${url_poster_path}`);
        // new create_Element('h6', document.querySelector(`.div-container-${i}`), 'beforeend').element(obj.results[i].title);
        new create_Element('DIV', document.querySelector(`.div-container-${i}`), 'beforeend').element(`<i class="fab fa-youtube"></i>`);
    }
    let move_video = document.querySelectorAll(`.div-popular`);
    moveVideo(move_video, obj);

}
//---------------------------Предстоящие в кинотеатри---------------------------
let url_new_realeaes = `https://api.themoviedb.org/3/movie/upcoming?api_key=${key_api}&language=ru&page=1&region=ru`;
let new_realeaes_film = new API_Film(url_new_realeaes);
new_realeaes_film.load_data(show_new_realeaes_film);

function show_new_realeaes_film(obj) {
    let movie_id = obj.results[count].id;
    new create_Element('DIV', new_realeaes_div, 'afterbegin', 'div-title-new').element();
    new create_Element('H3', document.querySelector('.div-title-new'), 'beforeend', 'h3-title').element('Предстоящие фильмы');
    new create_Element('P', document.querySelector('.div-title-new'), 'beforeend', 'p-title').element('');

    new create_Element('DIV', new_realeaes_div, 'beforeend', 'new-realeaes-position').element();
    new create_Element('DIV', document.querySelector('.new-realeaes-position'), 'beforeend', 'new-realeaes-container').element();
    new create_Element('DIV', document.querySelector('.new-realeaes-container'), 'beforeend', 'new-realeaes-list').element();
    createSlaid(0, obj.results.length);//Виводимо весь список 
    createSlaid(obj.results.length, 5);//ДОбавляємо в кінець

    function createSlaid(start, item) { //start - номер div початку, item - кількість елементів

        for (let i = 0; i < item; i++) {
            let url_new_poster_path = obj.results[i].poster_path;

            let div_height = (new_realeaes_div.offsetWidth / 5) * 1.5;
            let list_div = document.createElement('DIV');
            let list_img = document.createElement('IMG');
            list_img.setAttribute('src', `https://image.tmdb.org/t/p/original${url_new_poster_path}`)
            list_img.style.width = `${((new_realeaes_div.offsetWidth)) / 5}px`
            list_img.style.height = `${div_height}px`
            list_div.classList.add(`list-${i + start}`);
            list_div.classList.add(`list-item`);
            document.querySelector('.new-realeaes-list').insertAdjacentElement('beforeend', list_div);
            let description = obj.results[i].overview.slice(0, 70).padEnd(74, ' ...');

            document.querySelector(`.list-${i + start}`).insertAdjacentElement('beforeend', list_img);
            list_div.style.height = `${div_height}px`
            new create_Element('DIV', document.querySelector(`.list-${i + start}`), 'beforeend', 'new-realeaes-info').element();
            new create_Element('DIV', document.querySelector(`.list-${i + start} .new-realeaes-info`), 'beforeend', 'description').element();
            new create_Element('h5', document.querySelector(`.list-${i + start} .new-realeaes-info .description`), 'beforeend').element(obj.results[i].title);
            new create_Element('p', document.querySelector(`.list-${i + start} .new-realeaes-info .description`), 'beforeend').element(description);
            new create_Element('div', document.querySelector(`.list-${i + start} .new-realeaes-info`), 'afterend', 'div-btn').element('Подробно');
            new create_Element('DIV', document.querySelector(`.list-${i + start}`), 'beforeend').element(`<i class="fab fa-youtube"></i>`);
        }

    }
    showListNew();
    let container_detal = document.querySelectorAll('.div-btn');
    detalFilm(container_detal, obj);
    let move_video = document.querySelectorAll(`.list-item i`);
    moveVideo(move_video, obj);
    // -------------------------------------------------------------------------------------
    function showListNew() {
        let ul = document.querySelector('.new-realeaes-list');
        let li = document.querySelectorAll('.new-realeaes-list .new-realeaes-info');

        let widthLi = (new_realeaes_div.offsetWidth) / 5;
        let widthUl = widthLi * (li.length + 1);
        let widthItem = 0;

        function showImgNew() {
            if (widthItem < widthUl - widthLi * 5) {
                ul.style.left = `-${widthItem}px`;
                ul.style.transition = '0.5s linear';
                setTimeout(showImgNew, 3000);
            }
            else {
                widthItem = 0;
                ul.style.left = `-${widthItem}px`;
                ul.style.transition = '0s linear';
                setTimeout(showImgNew, 0);
            }
            widthItem += widthLi;
            // console.log(widthItem)
        }
        showImgNew();
    }
}
//---------------------------Популярние на сайте---------------------------
let url_top_site = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key_api}&language=ru&page=1&region=ru`
let top_site = new API_Film(url_top_site);
top_site.load_data(show_top_site);
// -------------------------------------------------------------------------------------
function show_top_site(obj) {

    new create_Element('UL', top_site_baner, 'beforeend', 'ul-top-site').element();
    createLi(15);//Виводимо весь список
    createLi(3);//ДОбавляємо в кінець
    function createLi(item) {
        for (let i = 0; i < item; i++) {
            let url_ul_baner = obj.results[i].backdrop_path;
            let movie_id = obj.results[i].id;
            let li = document.createElement('LI');
            li.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${url_ul_baner})`
            li.style.width = `${top_site_baner.offsetWidth}px`
            new create_Element('H2', li, 'beforeend').element(obj.results[i].title);

            // -------------------------------------
            let url_gende = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${key_api}&language=ru&append_to_response=videos,images&include_image_language=en,null`;
            let top_gende = new API_Film(url_gende);
            top_gende.load_data(show_top_gende);
            function show_top_gende(obj) {
                // console.log(obj)
                new create_Element('P', li, 'beforeend', 'genres-top').element(obj.genres[0].name);
                new create_Element('P', li, 'beforeend', 'genres-data').element(`${obj.release_date} / ${obj.runtime} мин`);
                new create_Element('P', li, 'beforeend', 'genres-tagline').element(obj.tagline);
                new create_Element('DIV', li, 'beforeend', 'genres-play-icon').element(`<i class="fas fa-play"></i>`);
                new create_Element('P', li, 'beforeend', 'genres-play-icon-p').element(`- Трейлер`);
            }
            // -------------------------------------
            document.querySelector('.ul-top-site').insertAdjacentElement('beforeend', li);

        }

    }
    let li_dot = document.querySelectorAll('.ul-top-site li');
    new create_Element('DIV', top_site_baner, 'afterbegin', 'div-dot').element();
    for (let i = 0; i < 17; i++) {
        new create_Element('DIV', document.querySelector('.div-dot'), 'beforeend', 'dot').element();
    }
    showList();
    let move_video = document.querySelectorAll(`.ul-top-site li`);

    moveVideo(move_video, obj);
    // -------------------------------------------------------------------------------------
    function showList() {
        let ul = document.querySelector('.ul-top-site');
        let li = document.querySelectorAll('.ul-top-site li');
        let dots = document.querySelectorAll('.div-dot .dot');
        let index = 0;
        let indexActive = 0;
        let widthLi = top_site_baner.offsetWidth;
        let widthUl = widthLi * (li.length);
        let widthItem = widthLi;
        dots[0].classList.add('active')
        function showImg() {

            if (widthItem < widthUl - widthLi) {
                dots[index].classList.add('active')
                ul.style.left = `-${widthItem}px`;
                ul.style.transition = '2s';
                dots[index].classList.toggle('active')
                index++;
                dots[index].classList.toggle('active')
                setTimeout(showImg, 4000);
            }
            else {
                dots[index].classList.toggle('active')
                index = 0;
                widthItem = widthLi;
                ul.style.left = `-${widthItem}px`;
                ul.style.transition = '0s';
                setTimeout(showImg, 0);
            }
            widthItem += widthLi;
        }
        showImg();
    }
}
//---------------------------Список категорій---------------------------
new create_Element('UL', list_content, 'beforeend', 'ul-nav-list').element();
new create_Element('DIV', list_content, 'afterend', 'div-list-contnt').element();
let arr_list = ['В кинотеатрах', 'Популярные', 'Популярные на сайте', 'Предстоящие'];
let url_list = [
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${key_api}&language=ru-RU&page=1&region=ru`,
    `https://api.themoviedb.org/3/movie/popular?api_key=${key_api}&language=ru&page=1&region=ru`,
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${key_api}&language=ru&page=1&region=ru`,
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${key_api}&language=ru&page=1&region=ru`
]
for (let i = 0; i < arr_list.length; i++) {
    new create_Element('LI', document.querySelector('.ul-nav-list'), 'beforeend', 'li-nav-list').element(arr_list[i]);
}
// ----------------замовчування--------------------------
let arr_content_list = document.querySelectorAll('.li-nav-list');
arr_content_list[0].classList.add('active-list');
let list_class_content = new API_Film(url_list[0]);
list_class_content.load_data(show_list_content);
// ------------------------------------------
for (let i = 0; i < arr_content_list.length; i++) {

    arr_content_list[i].addEventListener('click', function (event) {
        for (let i = 0; i < arr_content_list.length; i++) {
            arr_content_list[i].classList.remove('active-list')
        }
        console.log(event.target)
        let contnt = document.querySelector('.div-list-contnt');
        removeContent(contnt);
        arr_content_list[i].classList.add('active-list');
        let list_class_content = new API_Film(url_list[i]);
        list_class_content.load_data(show_list_content);
    })
}
function show_list_content(obj) {
    for (let i = 0; i < 9; i++) {
        new create_Element('DIV', document.querySelector('.div-list-contnt'), 'beforeend', `div-list-${i}`).element();
        document.querySelector(`.div-list-contnt`).classList.add(`col-12`)
        document.querySelector(`.div-list-contnt`).classList.add(`row`);
        document.querySelector(`.div-list-${i}`).classList.add(`div-list`);
        let url_poster_path = obj.results[i].poster_path;
        new create_Element('IMG', document.querySelector(`.div-list-${i}`), 'beforeend', `img-list-${i}`).element_Atribute('src', `https://image.tmdb.org/t/p/w300${url_poster_path}`);
        document.querySelector(`.img-list-${i}`).classList.add(`col-6`)
        new create_Element('DIV', document.querySelector(`.div-list-${i}`), 'beforeend', `div-info-${i}`).element();
        document.querySelector(`.div-info-${i}`).classList.add(`col-6`)
        new create_Element('H6', document.querySelector(`.div-info-${i}`), 'beforeend', `div-title-${i}`).element(obj.results[i].title);
        let description = obj.results[i].overview.slice(0, 100).padEnd(104, ' ...')
        new create_Element('P', document.querySelector(`.div-info-${i}`), 'beforeend', `div-title-${i}`).element(description);
        new create_Element('P', document.querySelector(`.div-info-${i}`), 'beforeend', `div-title-${i}`).element(`Дата: <span>${obj.results[i].release_date}</span>`);
        let iconReting = `<i class="fas fa-star"></i>`
        new create_Element('DIV', document.querySelector(`.div-info-${i}`), 'beforeend', `div-reting-${i}`).element(`${iconReting.repeat(5)} - <span>${obj.results[i].vote_average}</span>`);
        document.querySelector(`.div-reting-${i}`).classList.add('div-reting');
        new create_Element('PROGRESS', document.querySelector(`.div-reting-${i}`), 'beforeend', `reting-title-${i}`).element_Atribute('max', `10`)
        document.querySelector(`.reting-title-${i}`).value = obj.results[i].vote_average;
    }
    let container_category = document.querySelectorAll('.div-list');
    detalFilm(container_category, obj);
}
function removeContent(obj) {
    while (obj.firstChild) {
        obj.removeChild(obj.firstChild);
    }
}
// ------------------------Футер-----------------------------
let footer_text = `&copy 2021 MovieViewing. Все права защищены`
let arr_icon_footer = [
    `<i class="fab fa-facebook-f"></i>`,
    `<i class="fab fa-linkedin-in"></i>`,
    `<i class="fab fa-twitter"></i>`,
    `<i class="fab fa-google-plus-g"></i>`
]
let arr_link_footer = [
    `https://uk-ua.facebook.com`,
    `https://www.linkedin.com`,
    `https://twitter.com`,
    `https://accounts.google.com`
]
new create_Element('DIV', footer_content, 'beforeend', 'footer-text').element(footer_text);
new create_Element('UL', footer_content, 'beforeend', 'ul-link').element();
for (let i = 0; i < arr_icon_footer.length; i++) {
    new create_Element('LI', document.querySelector('.ul-link'), 'beforeend', `li-link-${i}`).element(`<a href='${arr_link_footer[i]}'>${arr_icon_footer[i]}</a>`);
}
// -------------Поиск -------------------------
function show_sourch(obj) {
    new create_Element('A', document.querySelector('.overlay-sourch'), 'beforeend', 'closebtn').element_Atribute('href', 'javascript:void(0)', `&times;`);
    new create_Element('DIV', document.querySelector('.overlay-sourch'), 'beforeend', 'div-sourch').element(`<h2>Результат - <span>${input_sourch.value}</span></h2>`);
    document.querySelector('.overlay-sourch').style.display = 'block';
    let closebtn = document.querySelector('.overlay-sourch .closebtn');
    let step = 0;
    new create_Element('DIV', document.querySelector('.div-sourch'), 'beforeend', 'container').element();
    new create_Element('DIV', document.querySelector('.div-sourch .container'), 'beforeend', 'row').element();
    new create_Element('DIV', document.querySelector('.div-sourch .row'), 'beforeend', 'div-content-sourch').element();
    document.querySelector('.div-content-sourch').classList.add('col-12');
    console.log(obj.results.length)
    if (obj.results.length != 0) {
        obj.results.forEach(item => {
            new create_Element('DIV', document.querySelector('.div-content-sourch'), 'beforeend', `sourch-content-${step}`).element();
            document.querySelector(`.sourch-content-${step}`).classList.add('sourch-content');
            let src_poster = item.poster_path;
            // console.log(src_poster)
            if (src_poster != null) {
                new create_Element('IMG', document.querySelector(`.sourch-content-${step}`), 'beforeend').element_Atribute('src', `https://image.tmdb.org/t/p/w300${src_poster}`)
            }
            else { new create_Element('IMG', document.querySelector(`.sourch-content-${step}`), 'beforeend').element_Atribute('src', `../img/no_foto.jpg`) }
            new create_Element('DIV', document.querySelector(`.sourch-content-${step}`), 'beforeend', `sourch-discript`).element();

            new create_Element('H5', document.querySelector(`.sourch-content-${step} .sourch-discript`), 'beforeend').element(item.title);
            new create_Element('P', document.querySelector(`.sourch-content-${step} .sourch-discript`), 'beforeend').element(`Описание: <span>${item.overview}</span>`);
            new create_Element('P', document.querySelector(`.sourch-content-${step} .sourch-discript`), 'beforeend').element(`Дата выхода: <span>${item.release_date}</span>`);

            new create_Element('DIV', document.querySelector(`.sourch-content-${step} .sourch-discript`), 'beforeend', 'div-btn').element('Подробно');
            if (src_poster != null) {
                new create_Element('DIV', document.querySelector(`.sourch-content-${step} .sourch-discript`), 'beforeend').element(`<i class="fab fa-youtube"></i>`);
            }
            step++;
        })
    }
    else {
        new create_Element('H5', document.querySelector(`.div-content-sourch`), 'beforeend', 'null-result').element('Нет такого фильма');
    }
    close_overlay_sourch(closebtn);
    // ----------------------------------
    let traler_play = document.querySelectorAll('.sourch-discript i');
    moveVideo(traler_play, obj);
    // ----------------------------------
    let detal_sourch = document.querySelectorAll('.sourch-discript .div-btn');
    detalFilm(detal_sourch, obj);
    // ----------------------------------
}
// -------------Жанри виведення----------------

function searchPreew(container, obj_genres) {
    let click_btn = 0
    // console.log(obj_genres)
    for (let i = 0; i < container.length; i++) {
        container[i].addEventListener('click', () => {
            click_btn++;
            console.log(click_btn)
            if (click_btn < 2) {

                let genres_id = obj_genres.genres[i].id;
                let genres_name = obj_genres.genres[i].name;
                let url_genres_id = `https://api.themoviedb.org/3/discover/movie?api_key=${key_api}&language=ru&region=ru&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_genres=${genres_id}`
                let genres = new API_Film(url_genres_id);
                genres.load_data(show_genres);
                function show_genres(obj) {
                    console.log(obj);
                    new create_Element('A', document.querySelector('.overlay-sourch'), 'beforeend', 'closebtn').element_Atribute('href', 'javascript:void(0)', `&times;`);
                    new create_Element('DIV', document.querySelector('.overlay-sourch'), 'beforeend', 'div-sourch').element(`<h2>Жанр - <span>${genres_name}</span></h2>`);

                    document.querySelector('.overlay-sourch').style.display = 'block';
                    let closebtn = document.querySelector('.overlay-sourch .closebtn');
                    let step = 0;
                    new create_Element('DIV', document.querySelector('.div-sourch'), 'beforeend', 'container').element();
                    new create_Element('DIV', document.querySelector('.div-sourch .container'), 'beforeend', 'row').element();
                    new create_Element('DIV', document.querySelector('.div-sourch .row'), 'beforeend', 'div-content-sourch').element();
                    document.querySelector('.div-content-sourch').classList.add('col-12');
                    obj.results.forEach(item => {
                        new create_Element('DIV', document.querySelector('.div-content-sourch'), 'beforeend', `sourch-content-${step}`).element();
                        document.querySelector(`.sourch-content-${step}`).classList.add('sourch-content');
                        new create_Element('IMG', document.querySelector(`.sourch-content-${step}`), 'beforeend').element_Atribute('src', `https://image.tmdb.org/t/p/w300${item.poster_path}`)
                        new create_Element('DIV', document.querySelector(`.sourch-content-${step}`), 'beforeend', `sourch-discript`).element();

                        new create_Element('H5', document.querySelector(`.sourch-content-${step} .sourch-discript`), 'beforeend').element(item.title);
                        new create_Element('P', document.querySelector(`.sourch-content-${step} .sourch-discript`), 'beforeend').element(`Описание: <span>${item.overview}</span>`);
                        new create_Element('P', document.querySelector(`.sourch-content-${step} .sourch-discript`), 'beforeend').element(`Дата выхода: <span>${item.release_date}</span>`);

                        new create_Element('DIV', document.querySelector(`.sourch-content-${step} .sourch-discript`), 'beforeend', 'div-btn').element('Подробно');
                        new create_Element('DIV', document.querySelector(`.sourch-content-${step} .sourch-discript`), 'beforeend').element(`<i class="fab fa-youtube"></i>`);
                        step++;
                    })
                    close_overlay_sourch(closebtn);
                    // ----------------------------------
                    let traler_play = document.querySelectorAll('.sourch-discript i');
                    moveVideo(traler_play, obj);
                    // ----------------------------------
                    let detal_sourch = document.querySelectorAll('.sourch-discript .div-btn');
                    detalFilm(detal_sourch, obj);
                    // ----------------------------------
                }
            }
            else {
                click_btn = 0;
            }
        })
    }
}
// -------------Деталировка фильма----------------
function detalFilm(container, obj_film) {
    let click_btn = 0;
    for (let i = 0; i < container.length; i++) {

        container[i].addEventListener('click', function (event) {
            click_btn++;
            console.log(click_btn)
            if (click_btn < 2) {
                let movie_id = obj_film.results[i].id;
                let url_detal = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${key_api}&language=ru&append_to_response=videos,images&include_image_language=en,null`;
                let detales = new API_Film(url_detal);
                detales.load_data(show_detal);
                function show_detal(obj) {

                    new create_Element('A', document.querySelector('.overlay'), 'beforeend', 'closebtn').element_Atribute('href', 'javascript:void(0)', `&times;`);
                    new create_Element('DIV', document.querySelector('.overlay'), 'beforeend', 'div-detals').element();
                    document.querySelector('.overlay').style.display = 'block'
                    let closebtn = document.querySelector('.overlay .closebtn');

                    new create_Element('H2', document.querySelector('.div-detals'), 'beforeend').element(obj.title);
                    new create_Element('DIV', document.querySelector('.div-detals'), 'beforeend', 'container').element();
                    new create_Element('DIV', document.querySelector('.div-detals .container'), 'beforeend', 'row').element();
                    new create_Element('DIV', document.querySelector('.div-detals .container .row'), 'beforeend', 'detal-container').element();
                    document.querySelector('.detal-container').classList.add('col-12');


                    new create_Element('IMG', document.querySelector('.detal-container'), 'beforeend', 'img-detal-poster').element_Atribute('src', `https://image.tmdb.org/t/p/w300${obj.poster_path}`);

                    new create_Element('DIV', document.querySelector('.detal-container'), 'beforeend', 'div-detal-descript').element();
                    new create_Element('H5', document.querySelector('.div-detal-descript'), 'beforeend').element('О фильме');
                    new create_Element('P', document.querySelector('.div-detal-descript'), 'beforeend').element(`Дата выхода: <span>${obj.release_date}</span>`);
                    new create_Element('P', document.querySelector('.div-detal-descript'), 'beforeend').element(`Страна: <span>${obj.production_countries[0].name}</span>`);
                    new create_Element('P', document.querySelector('.div-detal-descript'), 'beforeend').element(`Слоган: <span>${obj.tagline}</span>`);

                    let arr_genres = [];

                    for (let i = 0; i < obj.genres.length; i++) {
                        arr_genres.push(obj.genres[i].name);
                    }

                    new create_Element('P', document.querySelector('.div-detal-descript'), 'beforeend').element(`Жанр: <span>${arr_genres.join(', ')}</span>`);
                    new create_Element('P', document.querySelector('.div-detal-descript'), 'beforeend').element(`Бюджет: <span>$${obj.budget}</span>`);
                    new create_Element('P', document.querySelector('.div-detal-descript'), 'beforeend').element(`Доход: <span>$${obj.revenue}</span>`);

                    new create_Element('P', document.querySelector('.div-detal-descript'), 'beforeend').element(`Описание: <span>${obj.overview}</span>`);
                    let iconReting = '<i class="fas fa-star"></i> ';
                    new create_Element('DIV', document.querySelector(`.div-detal-descript`), 'beforeend', `div-reting`).element(`${iconReting.repeat(5)}- <span>${obj.vote_average}</span>`);

                    new create_Element('PROGRESS', document.querySelector(`.div-detal-descript`), 'beforeend').element_Atribute('max', `10`)
                    document.querySelector(`.div-detal-descript progress`).value = obj.vote_average;

                    new create_Element('P', document.querySelector('.div-detal-descript'), 'beforeend').element(`Голосов: <span>${obj.vote_count}</span>`);
                    let hour = Math.trunc(obj.runtime / 60);
                    let min = obj.runtime % 60;
                    new create_Element('P', document.querySelector('.div-detal-descript'), 'beforeend').element(`Время: <span>${obj.runtime} мин./ 0${hour}:${min}</span>`);

                    new create_Element('DIV', document.querySelector('.detal-container'), 'beforeend', 'div-detal-media').element();

                    new create_Element('DIV', document.querySelector('.div-detal-media'), 'beforeend', 'detal-image-conteiner').element();
                    new create_Element('H5', document.querySelector('.detal-image-conteiner'), 'beforeend').element('Кадры фильма');
                    new create_Element('DIV', document.querySelector('.detal-image-conteiner'), 'beforeend', 'div-detal-images').element();
                    //  images.backdrops[0].file_path
                    let length_img = 9;
                    if (obj.images.backdrops.length != 0) {
                        if (obj.images.backdrops.length < length_img) { length_img = obj.images.backdrops.length; }
                        for (let i = 0; i < length_img; i++) {
                            new create_Element('IMG', document.querySelector('.div-detal-images'), 'beforeend').element_Atribute('src', `https://image.tmdb.org/t/p/w300${obj.images.backdrops[i].file_path}`);
                        }
                    }
                    else {
                        new create_Element('DIV', document.querySelector('.div-detal-images'), 'beforeend', 'div-detal-error').element();
                        new create_Element('P', document.querySelector('.div-detal-error'), 'beforeend').element('Нет фото');
                    }
                    new create_Element('DIV', document.querySelector('.div-detal-media'), 'beforeend', 'detal-video-conteiner').element();
                    new create_Element('H5', document.querySelector('.detal-video-conteiner'), 'beforeend').element('Трейлер');
                    new create_Element('DIV', document.querySelector('.detal-video-conteiner'), 'beforeend', 'div-detal-video').element();
                    // videos.results[0].key
                    if (obj.videos.results.length != 0) {
                        let src_video = obj.videos.results[0].key;

                        new create_Element('iframe', document.querySelector('.div-detal-video'), 'beforeend').element_Iframe('src', `https://www.youtube.com/embed/${src_video}`);
                    }
                    else {
                        new create_Element('P', document.querySelector('.div-detal-video'), 'beforeend').element('Нет видео');
                    }
                    new create_Element('DIV', document.querySelector('.detal-container'), 'beforeend', 'div-simular').element();
                    new create_Element('H5', document.querySelector('.div-simular'), 'beforeend').element('Похожие фильмы');
                    new create_Element('DIV', document.querySelector('.div-simular'), 'beforeend', 'simular-content').element();

                    let url_simular = `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${key_api}&language=ru&page=1`;
                    let simular = new API_Film(url_simular);
                    simular.load_data(show_simular);
                    function show_simular(obj) {
                        console.log(obj)
                        for (let i = 0; i < 7; i++) {
                            new create_Element('DIV', document.querySelector('.simular-content'), 'beforeend', `simular-img-${i}`).element();
                            document.querySelector(`.simular-img-${i}`).classList.add('simular-img');
                            new create_Element('H6', document.querySelector(`.simular-img-${i}`), 'beforeend',).element(obj.results[i].title);
                            new create_Element('IMG', document.querySelector(`.simular-img-${i}`), 'beforeend',).element_Atribute('src', `https://image.tmdb.org/t/p/w300${obj.results[i].poster_path}`);
                        }
                    }

                    close_overlay(closebtn);
                }
            }
            else {
                click_btn = 0;
            }
        })

    }
}
// ----------Вивід трейлера-------------------
function moveVideo(move_video, obj) {
    // let move_video = document.querySelectorAll(`.div-popular`);
    let click_btn = 0;
    for (let i = 0; i < move_video.length; i++) {

        move_video[i].addEventListener('click', function (event) {
            click_btn++;
            console.log(click_btn)
            if (click_btn <= 1) {
                let content_treler = document.querySelector('.div-treler');
                if (content_treler) { removeContent(content_treler); }
                let movie_id = obj.results[i].id;
                let movie_title = obj.results[i].title;
                console.log(movie_id)
                let url_treler = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${key_api}&language=ru`
                let treler_film = new API_Film(url_treler);
                treler_film.load_data(show_treler);
                function show_treler(obj) {
                    new create_Element('A', document.querySelector('.overlay'), 'beforeend', 'closebtn').element_Atribute('href', 'javascript:void(0)', `&times;`);
                    new create_Element('DIV', document.querySelector('.overlay'), 'beforeend', 'div-treler').element();
                    document.querySelector('.overlay').style.display = 'block'
                    let closebtn = document.querySelector('.overlay .closebtn');
                    console.log(movie_title)
                    new create_Element('H2', document.querySelector('.div-treler'), 'beforeend').element(movie_title);
                    if (obj.results.length != 0) {
                        let src_video = obj.results[0].key;
                        // console.log(closebtn)
                        new create_Element('iframe', document.querySelector('.div-treler'), 'beforeend').element_Iframe('src', `https://www.youtube.com/embed/${src_video}`);
                    }
                    else {
                        new create_Element('P', document.querySelector('.div-treler'), 'beforeend').element('Нет видео');
                    }
                    close_overlay(closebtn);
                }
            }
            else {
                click_btn = 0;
            }
        })
    }
}
// -----------кнопка закрити------------------
function close_overlay(closebtn) {
    if (closebtn) {
        closebtn.addEventListener('click', function () {
            let overlay = document.querySelector('.overlay');
            // console.log(overlay)
            if (overlay) {
                removeContent(overlay);
                overlay.style.display = 'none'
            };
        })
    }
}
function close_overlay_sourch(closebtn) {
    if (closebtn) {
        closebtn.addEventListener('click', function () {
            let overlay_sourch = document.querySelector('.overlay-sourch');
            if (overlay_sourch) {
                removeContent(overlay_sourch);

                overlay_sourch.style.display = 'none'
            };
        })
    }
}

