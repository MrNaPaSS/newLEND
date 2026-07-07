setTimeout(() => {
    AOS.init({ anchorPlacement: "top-bottom", once: true, duration: 600 });
}, 200);

$(document).ready(() => {
    // Прелоадер;
    // setTimeout(() => {
    //   $(".preloader").fadeOut("slow");
    // }, 1300);
    //инициализация полей формы для utm
    function getUTM(name) {
        let url = new URL(window.location.href);
        return url.searchParams.get(name) || '';
    }
    // инициализация utm hidden inputs 
    $("#utm_source").val(getUTM('utm_source'));
    $("#utm_medium").val(getUTM('utm_medium'));
    $("#utm_campaign").val(getUTM('utm_campaign'));
    $("#utm_content").val(getUTM('utm_content'));


    if ($(window).width() < 575) {
        $(".team__box__left-title span").attr("data-aos-delay", "200");
        $(".team__cards__item-title span").attr("data-aos-delay", "200");
        $(".facts__item-title span").attr("data-aos-delay", "200");
        $(".second-text span").attr("data-aos-delay", "200");

        $(".stages__box__item").attr("data-aos", "fade-up");

        AOS.refresh();
    }

    $(".ui.dropdown").dropdown();

    // Модальные окна
    var overlay = $(".overlay"),
        modal = $(".modal"),
        modalClose = $(".modal__close"),
        modalOpen = $(".modal__open[data-modal]");

    overlay.click(function (e) {
        if ($(e.target).closest(".modal").length == 0) {
            $("body, html").removeClass("my-body-noscroll-class");
            $(this).fadeOut();
            modal.fadeOut();
            $(".video-content iframe").remove();
        }
    });

    modalClose.click(function () {
        $("body, html").removeClass("my-body-noscroll-class");
        overlay.fadeOut();
        modal.fadeOut();
        $(".video-content iframe").remove();
    });

    modalOpen.each(function () {
        $(this).on("click", function (e) {
            var modalId = $(this).attr("data-modal"),
                EachModal = $('.modal[data-modal="' + modalId + '"]');
            $("body, html").addClass("my-body-noscroll-class");

            if (this.getAttribute("data-src")) {
                var modalVideo = this.getAttribute("data-src");
                modalElem = document.querySelector(
                    '.modal[data-modal="' + modalId + '"]'
                );
                $(modalElem)
                    .find(".video-content")
                    .html(
                        '<iframe src="https://www.youtube.com/embed/' +
                        modalVideo +
                        '?frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                    );
            }

            if (this.getAttribute("data-usluga")) {
                var modalUsluga = this.getAttribute("data-usluga");
                modalElem = document.querySelector(
                    '.modal[data-modal="' + modalId + '"]'
                );
                $(modalElem).find(".usluga").val(modalUsluga);
            }

            $("#mobile__menu").removeClass("active");
            modal.fadeOut();

            overlay.fadeIn();
            EachModal.fadeIn();
        });
    });

    /** * Replace all SVG images with inline SVG */
    $("img.img-svg").each(function () {
        var $img = $(this);
        var imgID = $img.attr("id");
        var imgClass = $img.attr("class");
        var imgURL = $img.attr("src");
        $.get(
            imgURL,
            function (data) {
                var $svg = $(data).find("svg");
                if (typeof imgID !== "undefined") {
                    $svg = $svg.attr("id", imgID);
                }
                if (typeof imgClass !== "undefined") {
                    $svg = $svg.attr("class", imgClass + " replaced-svg");
                }
                $svg = $svg.removeAttr("xmlns:a");
                $img.replaceWith($svg);
            },
            "xml"
        );
    });

    // Мобильное меню
    $(".intro-mobile-btn").on("click", function (e) {
        $(".mobile-menu").toggleClass("active");
        $("body, html").addClass("my-body-noscroll-class");
    });
    $(".mobile__box-close").on("click", function (e) {
        $(".mobile-menu").toggleClass("active");
        $("body, html").removeClass("my-body-noscroll-class");
    });

    $('a[href^="#"]').click(function () {
        $(".mobile-menu").removeClass("active");
        $("body, html").removeClass("my-body-noscroll-class");
        let target = $(this).attr("href");
        let targetPosition = $(target).offset().top - 30;
        $("html, body").animate({ scrollTop: targetPosition }, 500);

        return false;
    });

    $(".intro__language-item").click(function () {
        $(this).parent().toggleClass("active");
        $(this).siblings(".intro__language-item.item2").slideToggle();
    });

    // Telegram Direct Send
    $("form").submit(function (event) {
        event.preventDefault();
        var th = $(this);
        var formData = {};
        th.serializeArray().forEach(function(item) {
            formData[item.name] = item.value;
        });

        // Пиксель: событие заявки шлём сразу на submit, независимо от отправки в Telegram
        if (typeof window.fbq === "function") { window.fbq("track", "SubmitApplication"); }

        var t = ["8875182859", "AAFhbDvmJjuiv4eyUezzuytK45iWV742zkE"];
        var chatId = "511442168";

        var lines = [
            "🔥 <b>Новая заявка NMNH!</b>",
            "",
            "👤 <b>Имя:</b> " + (formData.name || "—"),
            "💬 <b>Telegram:</b> " + (formData.telegram || "—"),
            "🎯 <b>Направление:</b> " + (formData.vertical || "—"),
        ];
        if (formData.utm_source) lines.push("📢 <b>UTM Source:</b> " + formData.utm_source);
        if (formData.utm_medium) lines.push("✉️ <b>UTM Medium:</b> " + formData.utm_medium);
        if (formData.utm_campaign) lines.push("🎁 <b>UTM Campaign:</b> " + formData.utm_campaign);
        if (formData.utm_content) lines.push("📝 <b>UTM Content:</b> " + formData.utm_content);

        var text = lines.join("\n");
        var url = "https://api.telegram.org/bot" + t[0] + ":" + t[1] + "/sendMessage";

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: "HTML" })
        }).then(function() {
            setTimeout(function () {
                window.location = "thanks-" + document.documentElement.lang + ".html";
            }, 300);
        }).catch(function() {
            window.location = "thanks-" + document.documentElement.lang + ".html";
        });
    });

    // PnL screenshots are served locally from img/cases/1..13.jpg — no external fetch needed
    $(".cases__box").lightGallery({
        thumbnail: false,
        download: false,
        selector: "a",
        mode: "lg-fade",
    });
});

// ------------------------------------------------------

$(document).ready(function () {
    const $items = $(".recommendation-section__list-item");

    // Добавляем .right каждому второму элементу
    $items.each(function (index) {
        if ((index + 1) % 2 === 0) {
            $(this).addClass("right");
        }
    });

    let $activePerson = null;

    // Клик по .recommendation-section__list-item-photo
    $(".recommendation-section__list-item-photo").on("click", function (e) {
        e.stopPropagation(); // Не даём событию всплыть выше

        const $photo = $(this);
        const $parentItem = $photo.closest(".recommendation-section__list-item");
        const $infoCard = $parentItem.find(".recommendation-section__card");

        // Если кликаем повторно по активному
        if ($activePerson && $activePerson.is($parentItem)) {
            $photo.removeClass("active");
            $infoCard.removeClass("visible");
            $activePerson = null;
            return;
        }

        // Скрываем всё остальное
        $(".recommendation-section__list-item-photo").removeClass("active");
        $(".recommendation-section__card").removeClass("visible");

        // Заполняем карточку (если нужно)
        const name = $parentItem.data("name");
        const inst = $parentItem.data("inst");
        const followers = $parentItem.data("followers");

        $infoCard.find(".cardName").text(name);
        $infoCard.find(".cardInfo").text(inst);
        $infoCard
            .find(".recommendation-section__card-followers-text")
            .text(followers);

        // Показываем карточку и ставим активность
        $photo.addClass("active");
        $infoCard.addClass("visible");
        $activePerson = $parentItem;
    });

    // Клик вне карточки и элемента — закрытие
    $(document).on("click", function () {
        $(".recommendation-section__card").removeClass("visible");
        $(".recommendation-section__list-item-photo").removeClass("active");
        $activePerson = null;
    });

    // При прокрутке — тоже закрываем
    $(window).on("scroll", function () {
        $(".recommendation-section__card").removeClass("visible");
        $(".recommendation-section__list-item-photo").removeClass("active");
        $activePerson = null;
    });
});
