// ---------------Зміна теми-----------------------------
let themes = document.querySelector('.div-theme');
let themes_item = 0;
let theme_light_icon = `<i class="far fa-sun"></i>`;
let theme_dark_icon = `<i class="far fa-moon"></i>`;
let themeCurrent = theme_light_icon;
const currentTheme = localStorage.getItem('theme');
if (currentTheme == 'light') { themes.innerHTML = theme_dark_icon; }
else { themes.innerHTML = theme_light_icon; }
document.documentElement.setAttribute('data-theme', currentTheme);
// ---------------------------------------------
themes.addEventListener('click', () => {
    if (theme_light_icon == themeCurrent) {
        themes.innerHTML = theme_dark_icon;
        themeCurrent = theme_dark_icon;
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
    else {
        themes.innerHTML = theme_light_icon;
        themeCurrent = theme_light_icon;
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }

})