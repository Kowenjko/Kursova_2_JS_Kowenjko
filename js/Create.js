
// ---------------клас для витягнення ынформацыыъ з API ---------------------------------
class API_Film {
    constructor(url_api) {
        this.url_api = url_api
    }
    async load_data(function_obj) {
        try {
            const response = await fetch(this.url_api);
            const data = await response.json();
            // console.log(data);
            function_obj(data);
            // return data;
        }
        catch (error) {
            console.log(error)
        }
    }
}
// ------------------клас створення елементов-----------------------------
class create_Element {
    constructor(elem, where, metod, class_Name) {
        this.elem = elem
        this.where = where
        this.metod = metod
        this.class_Name = class_Name
    }
    element(content) {
        let cr_El = document.createElement(this.elem);
        if (this.class_Name) { cr_El.classList.add(this.class_Name); }
        if (content) { cr_El.innerHTML = content; }
        this.where.insertAdjacentElement(this.metod, cr_El);
    }
    element_Atribute(artibute, url, content) {
        let cr_El = document.createElement(this.elem);
        if (this.class_Name) { cr_El.classList.add(this.class_Name); }
        if (content) { cr_El.innerHTML = content; }
        cr_El.setAttribute(artibute, url)
        this.where.insertAdjacentElement(this.metod, cr_El);
    }
    element_Iframe(artibute, url) {
        let cr_El = document.createElement(this.elem);
        if (this.class_Name) { cr_El.classList.add(this.class_Name); }
        cr_El.setAttribute('width', '640');
        cr_El.setAttribute('height', '480');

        cr_El.setAttribute(artibute, url)
        cr_El.setAttribute('frameborder', '0');
        cr_El.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        cr_El.allowFullscreen = true;
        this.where.insertAdjacentElement(this.metod, cr_El);
    }
}
// --------------------------HEADER-------------------------------
// --------------------------header-nav-------------------------------
new create_Element('HEADER', document.body, 'afterbegin', 'container-fluid').element();
new create_Element('DIV', document.querySelector('header'), 'afterbegin', 'header-nav-over').element();
new create_Element('DIV', document.querySelector('.header-nav-over'), 'afterbegin', 'container').element();
new create_Element('DIV', document.querySelector('header .container'), 'beforeend', 'row').element();
new create_Element('DIV', document.querySelector('header .row'), 'beforeend', 'header-nav').element();
let header_nav = document.querySelector('.header-nav');
header_nav.classList.add('col-12')
// --------------------------header-baner-------------------------------
new create_Element('DIV', document.querySelector('header'), 'beforeend', 'header-baner').element();
let header_baner = document.querySelector('.header-baner');
console.log(document.body)
// --------------------------MAIN-------------------------------
// ------------------------section-popular---------------------------------
new create_Element('SECTION', document.querySelector('header'), 'afterend', 'section-popular').element();
document.querySelector('.section-popular').classList.add('container');
new create_Element('DIV', document.querySelector('.section-popular'), 'beforeend', 'row').element();
new create_Element('DIV', document.querySelector('.section-popular .row'), 'beforeend', 'popular-div').element();
let popular_div = document.querySelector('.popular-div');
popular_div.classList.add('col-12');
// ------------------------section-new-realises---------------------------------
new create_Element('SECTION', document.querySelector('.section-popular'), 'afterend', 'section-new-realeaes').element();
document.querySelector('.section-new-realeaes').classList.add('container');
new create_Element('DIV', document.querySelector('.section-new-realeaes'), 'beforeend', 'row').element();
new create_Element('DIV', document.querySelector('.section-new-realeaes .row'), 'beforeend', 'new-realeaes-div').element();
let new_realeaes_div = document.querySelector('.new-realeaes-div');
new_realeaes_div.classList.add('col-12');
// ------------------------section-top-site---------------------------------
new create_Element('SECTION', document.querySelector('.section-new-realeaes'), 'afterend', 'top-site-baner').element();
let top_site_baner = document.querySelector('.top-site-baner');
// ------------------------section-list-category---------------------------------
new create_Element('SECTION', document.querySelector('.top-site-baner'), 'afterend', 'list-category').element();
document.querySelector('.list-category').classList.add('container');
new create_Element('DIV', document.querySelector('.list-category'), 'beforeend', 'row').element();
new create_Element('DIV', document.querySelector('.list-category .row'), 'beforeend', 'list-content').element();
let list_content = document.querySelector('.list-content');
list_content.classList.add('col-12');
// ------------------------footer---------------------------------
new create_Element('FOOTER', document.querySelector('.list-category'), 'afterend').element();
document.querySelector('footer').classList.add('container-fluid');
new create_Element('DIV', document.querySelector('footer'), 'beforeend', 'container').element();
new create_Element('DIV', document.querySelector('footer .container'), 'beforeend', 'row').element();
new create_Element('DIV', document.querySelector('footer .row'), 'beforeend', 'footer-content').element();
let footer_content = document.querySelector('.footer-content');
footer_content.classList.add('col-12');
// ------------------------End---------------------------------