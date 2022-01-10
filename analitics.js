const ymg_ym_id = 13003426; // Код счетчика YM

let elem_click = '';

// Отправляем цель
function ymg_send (name, event = 'reachGoal') {
    ym(ymg_ym_id, event, name);
}

// element - Селекторы элемента
// metric_name - Название цели в метрике
// target_name - Для уникальности формы на старнице
function ymg_click (element, metric_name, target_name) {
    $(element).on('click', function() {
        ymg_send(metric_name);
        elem_click = target_name;
    });
}

// Проверяем на текущее имя и отправляем цель
function ymg_is_target (target_name, goal_name, is_elem = elem_click ) {
    let send = false;
    if( is_elem === target_name ) {
        ymg_send(goal_name);
        send = true;
    }
    return send;
}

// функция возвращает cookie с именем name, если есть, если нет, то undefined
function ymg_getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

document.addEventListener('DOMContentLoaded', () => {
    let url = window.location.pathname; // Текущий URL. Нужен для условия, если одинаковая форма расположена на разных страницах и для этого разные цели (н-р, на главной одни цели метрики, в контактах у той же формы другие цели метрики)

    // Клик "Заказать звонок" (хедер)
    ymg_click('.widget-view-desktop-10 [data-action="forms.call.open"]', 'header_call_order_click', 'header');

    // Клик "Заказать звонок" (футер)
    ymg_click('.c-footer-template-1 [data-action="forms.call.open"]', 'footer_call_order_click', 'footer');

    // Клик "Заказать" (листинг)
    ymg_click('[data-role="item.order"]', 'listing_page_order_click', 'listing');

    // Клик "Заказать" (Карточка товара)
    ymg_click('[data-role="order"]', 'card_page_order_click', 'card');

    // Клик "Задать вопрос"
    ymg_click('.widget-web-form-2-section [data-role="form"]', 'question_click', 'popup');

    // Клик "Задать вопрос" (руководителю)
    ymg_click('.widget-item-contact-button-wrap [data-role="form"]', 'boss_feedback_click', 'popup_boss');

    // Клик "Оставить заявку"
    ymg_click('.custom-order__button [data-role="trigger-form"]', 'catalog_application_click', 'page');

    // Изменение инпутов в форме
    document.addEventListener('change', e => {
        let form = e.target.closest('form').name,
            name = e.target.name,
            target_elems = false;

        switch (form){
            case 'SIMPLE_FORM_1': // Обратный звонок
                switch (name){
                    case 'form_text_1': // Имя
                        ymg_is_target('header', 'header_call_order_name');
                        ymg_is_target('footer', 'footer_call_order_name');
                        ymg_is_target('page', 'catalog_application_start');
                        break;
                    case 'form_text_2': // Телефон
                        ymg_is_target('header', 'header_call_order_tel');
                        ymg_is_target('footer', 'footer_call_order_tel');
                        break;
                }
                break;
            case 'SIMPLE_FORM_3': // Заказать
                switch (name){
                    case 'form_text_8': // Имя
                        ymg_is_target('listing', 'listing_page_order_name');
                        ymg_is_target('card', 'card_page_order_name');
                        break;
                    case 'form_text_10': // Телефон
                        ymg_is_target('listing', 'listing_page_order_tel');
                        ymg_is_target('card', 'card_page_order_tel');
                        break;
                }
                break;
            case 'SIMPLE_FORM_2': // Задать вопрос
                switch (name){
                    case 'form_text_3': // Имя
                        target_elems = ymg_is_target('popup', 'question_name');
                        target_elems = ymg_is_target('popup_boss', 'boss_feedback_start');

                        if ( target_elems === false ) {
                            ymg_is_target('/', 'home_page_feedback_name', url);
                            ymg_is_target('/contacts/', 'contacts_page_feedback_name', url);
                        }
                        break;
                    case 'form_textarea_4': // Вопрос
                        target_elems = ymg_is_target('popup', 'question_text');

                        if ( target_elems === false ) {
                            ymg_is_target('/', 'home_page_feedback_text', url);
                            ymg_is_target('/contacts/', 'contacts_page_feedback_text', url);
                        }
                        break;
                    case 'form_text_5': // Телефон
                        if(!elem_click) {
                            ymg_is_target('/', 'home_page_feedback_text', url);
                            ymg_is_target('/contacts/', 'contacts_page_feedback_text', url);
                        }
                        break;
                }
                break;
        }

        // console.log(`Форма: ${form}, инпут: ${e.target.name}`)
    });

    // Отправка формы
    document.addEventListener('submit', e => {
        var form = e.target.closest('form').name;

        switch(form){
            case 'SIMPLE_FORM_1': // Обратный звонок
                setTimeout(function(){
                    if($('form[name="SIMPLE_FORM_1"]').length === 0){
                        ymg_is_target('header', 'header_call_order_success_send');
                        ymg_is_target('footer', 'footer_call_order_success_send');
                        ymg_is_target('page', 'catalog_application_success_send');
                    }
                }, 1000);
                break;
            case 'SIMPLE_FORM_3': // Заказать
                setTimeout(function(){
                    if($('form[name="SIMPLE_FORM_3"]').length === 0){
                        ymg_is_target('listing', 'listing_page_order_success_send');
                        ymg_is_target('card', 'card_page_order_success_send');
                    }
                }, 1000);
                break;
            case 'SIMPLE_FORM_2': // Задать вопрос
                setTimeout(function(){
                    if($('form[name="SIMPLE_FORM_2"]').length === 0){
                        if(url === '/contacts/'){
                            ymg_is_target('/contacts/', 'contacts_page_feedback_success_send', url);
                        }
                    } else if($('.popup-window form[name="SIMPLE_FORM_2"]').length === 0){
                        ymg_is_target('popup_boss', 'boss_feedback_success_send');
                        ymg_is_target('popup', 'question_success_send');
                    }
                }, 1000);
                break;
        }

        // console.log(`Форма_1: ${form}, инпут: ${e.target.name}`);
    });

    // Форма с редиректом об успешной отправке
    let params = window.location.search.replace('?','').split('&').reduce(
        function(p,e){
            let a = e.split('=');
            p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        }, {}
    );

    if(params.RESULT_ID){
        switch(params.WEB_FORM_ID){
            case '2': // Задать вопрос
                if(url == '/'){
                    if(ymg_getCookie("home_page_feedback_success_send") != 'yes'){ // Защита от обновления страницы
                        ymg_send('home_page_feedback_success_send');
                        let date = new Date;
                        date.setDate(date.getDate() + 3);
                        document.cookie = "home_page_feedback_success_send=yes; path=/; expires=" + date.toUTCString();
                    }
                }
                break;
        }
    }

    // console.log(params);
});