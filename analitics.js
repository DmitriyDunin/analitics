document.addEventListener('DOMContentLoaded', function(){
    let elem_click = '',
        url = window.location.pathname;

    // ym(13003426,'reachGoal', 'header_call_order_click');

    // Клик "Заказать звонок" (хедер)
    $('.widget-view-desktop-10 [data-action="forms.call.open"]').on('click', function(){
        ym(13003426,'reachGoal', 'header_call_order_click');
        elem_click = 'header';
    });
    // Клик "Заказать звонок" (футер)
    $('.c-footer-template-1 [data-action="forms.call.open"]').on('click', function(){
        ym(13003426,'reachGoal', 'footer_call_order_click');
        elem_click = 'footer'; 
    });
    // Клик "Заказать" (листинг)
    $('[data-role="item.order"]').on('click', function(){
        ym(13003426,'reachGoal', 'listing_page_order_click');
        elem_click = 'listing'; 
    });
    // Клик "Заказать" (Карточка товара)
    $('[data-role="order"]').on('click', function(){
        ym(13003426,'reachGoal', 'card_page_order_click');
        elem_click = 'card'; 
    });
    // Клик "Задать вопрос" 
    $('.widget-web-form-2-section [data-role="form"]').on('click', function(){
        ym(13003426,'reachGoal', 'question_click');
        elem_click = 'popup'; 
    });
    // Клик "Задать вопрос" (руководителю)
    $('.widget-item-contact-button-wrap [data-role="form"]').on('click', function(){
        ym(13003426,'reachGoal', 'boss_feedback_click');
        elem_click = 'popup_boss'; 
    });
    // Клик "Оставить заявку"
    $('.custom-order__button [data-role="trigger-form"]').on('click', function(){
        ym(13003426,'reachGoal', 'catalog_application_click');
        elem_click = 'page'; 
    });

    // Изменение инпутов в форме
    document.addEventListener('change', e => {
        var form = e.target.closest('form').name;
        var name = e.target.name;
        
        switch (form){
            case 'SIMPLE_FORM_1': // Обратный звонок
                switch (name){
                    case 'form_text_1': // Имя
                        if(elem_click == 'header'){
                            ym(13003426,'reachGoal', 'header_call_order_name');
                        } else if(elem_click == 'footer'){
                            ym(13003426,'reachGoal', 'footer_call_order_name');
                        } else if(elem_click == 'page'){
                            ym(13003426,'reachGoal', 'catalog_application_start');
                        }
                    break;
                    case 'form_text_2': // Телефон
                        if(elem_click == 'header'){
                            ym(13003426,'reachGoal', 'header_call_order_tel');
                        } else if(elem_click == 'footer'){
                            ym(13003426,'reachGoal', 'footer_call_order_tel');
                        }
                    break;
                }
            break;
            case 'SIMPLE_FORM_3': // Заказать
                switch (name){
                    case 'form_text_8': // Имя
                        if(elem_click == 'listing'){
                            ym(13003426,'reachGoal', 'listing_page_order_name');
                        } else if(elem_click == 'card'){
                            ym(13003426,'reachGoal', 'card_page_order_name');
                        }
                    break;
                    case 'form_text_10': // Телефон
                        if(elem_click == 'listing'){
                            ym(13003426,'reachGoal', 'listing_page_order_tel');
                        } else if(elem_click == 'card'){
                            ym(13003426,'reachGoal', 'card_page_order_tel');
                        }
                    break;
                }
            break;
            case 'SIMPLE_FORM_2': // Задать вопрос
                switch (name){
                    case 'form_text_3': // Имя
                        if(elem_click == 'popup'){
                            ym(13003426,'reachGoal', 'question_name');
                        } else if(elem_click == 'popup_boss'){
                            ym(13003426,'reachGoal', 'boss_feedback_start');
                        } else {
                            if(url == '/'){ // Форма на главной
                                ym(13003426,'reachGoal', 'home_page_feedback_name');
                            } else if(url == '/contacts/'){ // Форма на главной
                                ym(13003426,'reachGoal', 'contacts_page_feedback_name');
                            }
                        }
                    break;
                    case 'form_textarea_4': // Вопрос
                        if(elem_click == 'popup'){
                            ym(13003426,'reachGoal', 'question_text');
                        } else if(!elem_click) {
                            if(url == '/'){
                                ym(13003426,'reachGoal', 'home_page_feedback_text');
                            } else if(url == '/contacts/'){ // Форма на главной
                                ym(13003426,'reachGoal', 'contacts_page_feedback_text');
                            }
                        }
                    break;
                    case 'form_text_5': // Телефон
                        if(!elem_click) {
                            if(url == '/'){
                                ym(13003426,'reachGoal', 'home_page_feedback_tel');
                            } else if(url == '/contacts/'){ // Форма на главной
                                ym(13003426,'reachGoal', 'contacts_page_feedback_tel');
                            }
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
                    if($('form[name="SIMPLE_FORM_1"]').length == 0){
                        if(elem_click == 'header'){
                            ym(13003426,'reachGoal', 'header_call_order_success_send');
                        } else if(elem_click == 'footer'){
                            ym(13003426,'reachGoal', 'footer_call_order_success_send');
                        } else if(elem_click == 'page'){
                            ym(13003426,'reachGoal', 'catalog_application_success_send');
                        }
                    }
                }, 1000);
            break;
            case 'SIMPLE_FORM_3': // Заказать
                setTimeout(function(){
                    if($('form[name="SIMPLE_FORM_3"]').length == 0){
                        if(elem_click == 'listing'){
                            ym(13003426,'reachGoal', 'listing_page_order_success_send');
                        } else if(elem_click == 'card'){
                            ym(13003426,'reachGoal', 'card_page_order_success_send');
                        }
                    }
                }, 1000);
            break;
            case 'SIMPLE_FORM_2': // Задать вопрос
                setTimeout(function(){
                    if($('form[name="SIMPLE_FORM_2"]').length == 0){
                        if(url == '/contacts/'){
                            ym(13003426,'reachGoal', 'contacts_page_feedback_success_send');
                        }
                    } else if($('.popup-window form[name="SIMPLE_FORM_2"]').length == 0){
                        if(elem_click == 'popup_boss'){
                            ym(13003426,'reachGoal', 'boss_feedback_success_send');
                        } else if(elem_click == 'popup'){
                            ym(13003426,'reachGoal', 'question_success_send');
                        }
                    }
                }, 1000);
            break;
        }

        // console.log(`Форма_1: ${form}, инпут: ${e.target.name}`);
    });

    // Форма с редиректом об успешной отправке
    var params = window.location.search.replace('?','').split('&').reduce(
        function(p,e){
            var a = e.split('=');
            p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        }, {}
    );
    if(params.RESULT_ID){
        switch(params.WEB_FORM_ID){
            case '2': // Задать вопрос
                if(url == '/'){
                    if(getCookie("home_page_feedback_success_send") != 'yes'){ // Защита от обновления страницы
                        ym(13003426,'reachGoal', 'home_page_feedback_success_send');
                        var date = new Date; date.setDate(date.getDate() + 3);	
                        document.cookie = "home_page_feedback_success_send=yes; path=/; expires=" + date.toUTCString();
                    }
                }
            break;
        }
    }

    // console.log(params);



});

// функция возвращает cookie с именем name, если есть, если нет, то undefined	
function getCookie(name) {
	var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}