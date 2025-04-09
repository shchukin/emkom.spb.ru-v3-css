(function ($) {


    /* Глобальные константы */

    let isDesktop; /* т.е. не смартфон, а любой десктоп */

    function initGlobalConstant() {
        isDesktop = window.matchMedia("(min-width: 740px)").matches;
    }

    /* При открытии страницы */
    initGlobalConstant();

    /* При ресайзе страницы */
    window.addEventListener('resize', initGlobalConstant);


    /* Инпуты */

    /* Select placeholder */
    function selectPlaceholder($element) {
        if ($element.val() === 'placeholder') {
            $element.parent('.input').addClass('input--placeholder-is-chosen');
        } else {
            $element.parent('.input').removeClass('input--placeholder-is-chosen');
        }
    }

    $('select.input__widget').each(function () {
        selectPlaceholder($(this));
    }).on('change', function () {
        selectPlaceholder($(this));
    });

    /* Expanding textarea */
    function expandTextarea($element) {
        $element.css('height', 'auto');
        $element.css('height', ($element[0].scrollHeight + 2 * parseInt($element.css('border-width'), 10)) + 'px');
    }

    const $expandableInputs = $('.input--expandable .input__widget');

    $expandableInputs.each(function () {
        expandTextarea($(this));
    }).on('input', function () {
        expandTextarea($(this));
    });

    $(window).on('resize', function () {
        $expandableInputs.each(function () {
            expandTextarea($(this));
        });
    });


    /* Error field */
    $('.input__widget').on('focus', function () {
        $(this).parents('.input').removeClass('input--error');
        $(this).parents('.input').nextUntil(':not(.helper--error)').remove();
    });



    /* Маска для телефона -- используем старую версию input.mask
     * Для неё есть плагин для номеров телефонов, который понимает
     * русские города. Например, при ввооде +74852 скобочка увеличивается
     * с трёх до четырёх штук.
     */

    $('[type="tel"]').inputmask({
        alias: 'phoneru',
    });



    /* Модалка */

    const $fixedHeader = $('.header__fixed-part');
    const scrollWidth = $(window).outerWidth() - $(window).width();

    $('.mfp-handler').magnificPopup({
        type: 'inline',
        removalDelay: 200,
        showCloseBtn: false,
        callbacks: {
            open: function () {

                // Перезапускаем обсчёт expanding textareas для инстансов внутри откртой модалки
                const instance = $.magnificPopup.instance;
                const modalContent = instance.content[0];
                const textareas = $(modalContent).find('.input--expandable .input__widget');

                textareas.each(function () {
                    expandTextarea($(this));
                });

                /* Шапка фиксированная, ей тоже надо корректировать пропавшее пространство подскроллбаром */
                $fixedHeader.css({'margin-right': scrollWidth});
            },
            close: function () {
                $fixedHeader.css({'margin-right': '0'});
            }
        }
    });


    /* Карусели */

    document.querySelectorAll('.carousel').forEach(($carousel) => {

        if( $carousel.classList.contains('carousel--js-init-portfolio') ) {
            new Swiper($carousel.querySelector('.swiper'), {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 16,
                autoHeight: true,
                pagination: {
                    el: $carousel.querySelector('.carousel__pagination'),
                    type: "fraction", /* можно переделать на bullets, но когда добавлено много слайдов с проектами, они не влезают */
                    bulletClass: 'carousel__bullet',
                    bulletActiveClass: 'carousel__bullet--current',
                    clickable: true
                }
            });
        }

        if( $carousel.classList.contains('carousel--js-init-stories') ) {
            new Swiper($carousel.querySelector('.swiper'), {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 16,
                autoHeight: true,
                pagination: {
                    el: $carousel.querySelector('.carousel__pagination'),
                    type: "fraction", /* можно переделать на bullets или сделать всю секцию false */
                    bulletClass: 'carousel__bullet',
                    bulletActiveClass: 'carousel__bullet--current',
                    clickable: true
                },
                navigation: {
                    prevEl: $carousel.querySelector('.carousel__button--prev'),
                    nextEl: $carousel.querySelector('.carousel__button--next'),
                    disabledClass: 'carousel__button--disabled',
                },
                breakpoints: {
                    450: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                    },
                    740: {
                        slidesPerView: 3,
                        slidesPerGroup: 1,
                        spaceBetween: 70,
                        speed: 800,
                        centeredSlides: true, // Центрирование нужно, чтобы активным подсвечивался центральный айтем
                        loop: true, // а чтобы слева, до первого айтема не было дыры приходится зацикливаться
                    },
                    1850: {
                        slidesPerView: 5,
                        slidesPerGroup: 1,
                        spaceBetween: 70,
                        speed: 800,
                        centeredSlides: true, // Центрирование нужно, чтобы активным подсвечивался центральный айтем
                        loop: true, // а чтобы слева, до первого айтема не было дыры приходится зацикливаться
                    }
                }
            });
        }

        if( $carousel.classList.contains('carousel--js-init-folder') ) {
            new Swiper($carousel.querySelector('.swiper'), {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 16,
                autoHeight: true,
                speed: 600,
                loop: true,
                autoplay: {
                    delay: 2000,
                },
                pagination: {
                    el: $carousel.querySelector('.carousel__pagination'),
                    type: "fraction", /* можно переделать на bullets или сделать всю секцию false */
                    bulletClass: 'carousel__bullet',
                    bulletActiveClass: 'carousel__bullet--current',
                    clickable: true
                },
                navigation: {
                    prevEl: $carousel.querySelector('.carousel__button--prev'),
                    nextEl: $carousel.querySelector('.carousel__button--next'),
                    disabledClass: 'carousel__button--disabled',
                },
                breakpoints: {
                    500: {
                        slidesPerView: 3,
                        slidesPerGroup: 1,
                    },
                    740: {
                        slidesPerView: 3,
                        slidesPerGroup: 1,
                        spaceBetween: 54,
                    },
                    1850: {
                        slidesPerView: 5,
                        slidesPerGroup: 1,
                        spaceBetween: 84,
                    }
                }
            });
        }

        if( $carousel.classList.contains('carousel--js-init-gallery') ) {
            new Swiper($carousel.querySelector('.swiper'), {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 16,
                autoHeight: true,
                speed: 600,
                pagination: {
                    el: $carousel.querySelector('.carousel__pagination'),
                    type: "fraction", /* можно переделать на bullets или сделать всю секцию false */
                    bulletClass: 'carousel__bullet',
                    bulletActiveClass: 'carousel__bullet--current',
                    clickable: true
                },
                navigation: {
                    prevEl: $carousel.querySelector('.carousel__button--prev'),
                    nextEl: $carousel.querySelector('.carousel__button--next'),
                    disabledClass: 'carousel__button--disabled',
                },
                breakpoints: {
                    400: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                    },
                    740: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                        spaceBetween: 54,
                    },
                    1850: {
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                        spaceBetween: 84,
                    }
                },
                on: {
                    init: function () {
                        toggleNavigationAndPagination(this);
                    },
                    resize: function () {
                        toggleNavigationAndPagination(this);
                    },
                },
            });
        }

        if( $carousel.classList.contains('carousel--js-init-certificates') ) {
            new Swiper($carousel.querySelector('.swiper'), {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 16,
                autoHeight: true,
                pagination: {
                    el: $carousel.querySelector('.carousel__pagination'),
                    type: "fraction", /* можно переделать на bullets, но когда добавлено много слайдов с проектами, они не влезают */
                    bulletClass: 'carousel__bullet',
                    bulletActiveClass: 'carousel__bullet--current',
                    clickable: true
                },
                navigation: {
                    prevEl: $carousel.querySelector('.carousel__button--prev'),
                    nextEl: $carousel.querySelector('.carousel__button--next'),
                    disabledClass: 'carousel__button--disabled',
                },
                breakpoints: {
                    400: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                    },
                },
            });
        }

        if( $carousel.classList.contains('carousel--js-init-solutions-systems') ) {
            new Swiper($carousel.querySelector('.swiper'), {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 16,
                autoHeight: true,
                pagination: {
                    el: $carousel.querySelector('.carousel__pagination'),
                    type: "fraction", /* можно переделать на bullets, но когда добавлено много слайдов с проектами, они не влезают */
                    bulletClass: 'carousel__bullet',
                    bulletActiveClass: 'carousel__bullet--current',
                    clickable: true
                },
            });
        }

        if( $carousel.classList.contains('carousel--js-init-solutions-modules') ) {
            new Swiper($carousel.querySelector('.swiper'), {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 16,
                autoHeight: true,
                pagination: {
                    el: $carousel.querySelector('.carousel__pagination'),
                    type: "fraction", /* можно переделать на bullets, но когда добавлено много слайдов с проектами, они не влезают */
                    bulletClass: 'carousel__bullet',
                    bulletActiveClass: 'carousel__bullet--current',
                    clickable: true
                },
            });
        }

    });


    /* Детектим кейс, когда в свайпере недостаточно айтемов для прокрутки хотя бы один раз, и убираем стрелочки/пагинацию */
    function toggleNavigationAndPagination(swiper) {
        const totalSlides = swiper.slides.length;
        const slidesPerView = swiper.params.slidesPerView;

        if (totalSlides <= slidesPerView) {
            swiper.el.closest('.carousel').classList.add('carousel--not-enough-slides');
        } else {
            swiper.el.closest('.carousel').classList.remove('carousel--not-enough-slides');
        }
    }



    const $html = $('html');


    /* Бургер */

    let rememberedPageScrollPosition = 0;

    $('.header__toggle-menu').on('click', function () {

        if (!$html.hasClass('burger-expanded')) {

            if (!isDesktop) {
                rememberedPageScrollPosition = $(window).scrollTop(); /* Запомнить скролл пользователя, так как display: none на .page его сбросит (смотри .burger-expanded .page) */
            }

            $html.addClass('burger-expanded');

            if (!isDesktop) {
                $(window).scrollTop(0); /* При открытии меню, его скролл должен быть в начале */
            }

        } else {

            $html.removeClass('burger-expanded');

            if (!isDesktop) {
                $(window).scrollTop(rememberedPageScrollPosition);/* При закрытии меню скролл должен быть там, где пользователь его оставил */
            }
        }
    });


    $(document).on('click', function (event) {
        if (!$(event.target).closest('.menu__navigation, .menu__contacts, .header__toggle-menu, .header__detachable-part, .mfp-bg, .mfp-wrap').length) {
            $html.removeClass('burger-expanded');
        }
    });


    $(document).on('keyup', function (event) {
        if (event.keyCode === 27) {
            $html.removeClass('burger-expanded');
        }
    });

    $('.header__close-menu').on('click', function () {
        $html.removeClass('burger-expanded');
    })



    /* Якоря */

    $('.solutions__category').on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 24
        }, 600);
    });



    /* Форма */

    /* Уведомления */
    document.querySelectorAll('.alert').forEach(function (alert) {
        alert.addEventListener('click', function () {
            alert.style.display = 'none';
        });
    });

    document.addEventListener('keyup', function (event) {
        if (event.keyCode === 27) {
            document.querySelectorAll('.alert').forEach(function (alert) {
                alert.style.display = 'none';
            });
        }
    });


    /* Сама форма */
    document.querySelectorAll('[data-js-form]').forEach(function (form) {
        const subscriptionInputs = form.querySelectorAll('.input, .choice');
        const subscriptionSubmit = form.querySelector('[data-js-submit]');
        const subscriptionSuccessAlert = document.querySelector('[data-js-alert-success]');
        const subscriptionFailureAlert = document.querySelector('[data-js-alert-failure]');

        /* Состояния инпутов (на время отправки формы инпуты должны блокироваться) */
        function disableSubscriptionInputs() {
            subscriptionInputs.forEach((input) => {
                input.querySelector('.input__widget, .choice__widget').setAttribute('disabled', 'disabled');
            });
        }

        function enableSubscriptionInputs() {
            subscriptionInputs.forEach((input) => {
                input.querySelector('.input__widget, .choice__widget').removeAttribute('disabled');
            });
        }

        /* Очистка инпутов (после успешной отправки форму должны очищаться) */
        function cleanSubscriptionInputs() {

            subscriptionInputs.forEach((input) => {

                /* Есть три варианта инпутов: */

                // 1) Текстовые инпуты внутри компонента .input (это всё, что не тег <select>):
                const textInputs = input.querySelector('.input__widget:not(select)');
                if (textInputs) {
                    textInputs.value = '';
                }

                // 2) <select> внутри .input
                const selects = input.querySelector('select.input__widget');
                if (selects) {
                    const placeholderOption = Array.from(selects.options).find(option => option.getAttribute('value') === 'placeholder');
                    if (placeholderOption) {
                        selects.value = placeholderOption.value;
                        input.classList.add('input--placeholder-is-chosen');
                    }
                }

                // 3) .choice__widget
                const choices = input.querySelector('.choice__widget');
                if (choices) {
                    choices.checked = false;
                }
            });
        }

        /* Состояния кнопки */
        function changeSubmitStateToLoading() {
            subscriptionSubmit.classList.add('button--loading');
            subscriptionSubmit.setAttribute('disabled', 'disabled');
        }

        function changeSubmitStateToSuccess() {
            subscriptionSubmit.classList.remove('button--loading');
            subscriptionSubmit.classList.add('button--success');
            subscriptionSubmit.setAttribute('disabled', 'disabled');
        }

        function changeSubmitStateToFailure() {
            subscriptionSubmit.classList.remove('button--loading');
            subscriptionSubmit.classList.add('button--warning');
            subscriptionSubmit.setAttribute('disabled', 'disabled');
        }

        function changeSubmitStateToPristine() {
            subscriptionSubmit.classList.remove('button--loading', 'button--success', 'button--warning');
            subscriptionSubmit.removeAttribute('disabled');
        }

        /* Если пользователь начал взаимодействовать с инпутами, то убираем уведомления с прошлой попытки отправки: */
        subscriptionInputs.forEach(input => input.addEventListener('input', () => {
            subscriptionFailureAlert.style.display = 'none';
        }));


        /* Отправка */
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            /* Если с прошлой попытки висит уведомление об ошибке: */
            subscriptionFailureAlert.style.display = 'none';

            /* Начинаем отправку данных, для начала блокируем форму */
            disableSubscriptionInputs();
            changeSubmitStateToLoading();

            /* Представим, что 3000ms отправляем данные */
            setTimeout(function () {

                /* ... дальше развилка, пусть для примера будет рандом 50/50: */

                // Если данные успешно отправлены
                if (Math.random() < 0.5) {

                    // показываем зелёное уведомление:
                    subscriptionSuccessAlert.style.display = 'block';

                    // показываем галочку на кнопке:
                    changeSubmitStateToSuccess();

                    // и то и другое на 4.5 секунды:
                    setTimeout(function () {
                        subscriptionSuccessAlert.style.display = 'none';
                        changeSubmitStateToPristine();
                        enableSubscriptionInputs();

                        //и очищаем форму:
                        cleanSubscriptionInputs();
                    }, 4500);

                }

                // Если произошла ошибка
                else {

                    // показываем красное уведомление
                    subscriptionFailureAlert.style.display = 'block';

                    // Показываем восклицательный знак на кнопке:
                    changeSubmitStateToFailure();

                    // В данном случае всего 2 секунды, чтобы пользователь мог быстро вернуться к работе с формой.
                    // Уведомление в этом случае НЕ убираем -- пусть висит, пока пользователь не увидит и явно не закроет, или не начнёт заново заполнять форму / попытается отправить:
                    setTimeout(function () {
                        changeSubmitStateToPristine();
                        enableSubscriptionInputs();
                    }, 2000);

                }

            }, 3000);

        });
    });


    const slideCount = document.querySelectorAll('.splide--init-engineering-systems .splide__slide').length;


    function generateGridPattern(count) {
        const pattern = [[2, 1], [1, 1]];
        const result = [];
        for (let i = 0; i < count; i++) {
            result.push(pattern[i % 2]); // Alternate between [2, 1] and [1, 1]
        }
        return result;
    }


    new Splide( '.splide--init-engineering-systems', {
        drag   : 'free',
        focus  : 'center',
        pagination: false,
        perPage: 5,
        perMove: 5,
        autoScroll: false,

        // В оригинале была бесконечная карусель:
        // type: 'loop',
        // perMove: 3,
        // autoScroll: {
        //     speed: 0.75,
        //     pauseOnHover: false,
        //     pauseOnFocus: false
        // },
        grid: {
            dimensions: generateGridPattern(slideCount),
            gap : {
                row: '9px',
            },
        },
        breakpoints: {
            1820: {
                // В оригинале была бесконечная карусель:
                // autoScroll: {
                //     speed: 0.5,
                // },
                grid: {
                    gap : {
                        row: '6px',
                    },
                },
            },
            740: {
                perPage: 1,
                perMove: 1,
                autoScroll: false,
                grid: false,
                snap: true
            },
        },
    } ).mount( window.splide.Extensions );



    new Splide( '.splide--init-modular-solutions', {
        type   : 'loop',
        drag   : 'free',
        focus  : 'center',
        pagination: false,
        perPage: 1,
        perMove: 1,
    } ).mount();


    $('.solutions-v3__link').on('click', function () {

        const $this = $(this);

        if( ! $this.hasClass('solutions-v3__link--current') ) {

            $('.solutions-v3__link--current').removeClass('solutions-v3__link--current');
            $('.solutions-v3__tab--current').removeClass('solutions-v3__tab--current');

            if( $this.hasClass('solutions-v3__link--engineering-systems') ) {
                $('.solutions-v3__link--engineering-systems').addClass('solutions-v3__link--current');
                $('.solutions-v3__tab--engineering-systems').addClass('solutions-v3__tab--current');
            }
            if( $this.hasClass('solutions-v3__link--modular-solutions') ) {
                $('.solutions-v3__link--modular-solutions').addClass('solutions-v3__link--current');
                $('.solutions-v3__tab--modular-solutions').addClass('solutions-v3__tab--current');
            }
        }
    });


})(jQuery);
