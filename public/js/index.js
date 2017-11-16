let notify = (() => {
$(() => {
    sidebar_toggle();
    on_top_event();

    $(".notify_sidebar_body").mCustomScrollbar({theme:"dark", setWidth: "340px"});

    $(".notify_trigger button").on("click", () => {
        let level = $('.notify_level_select input:checked').val();
        notify_trigger(level, "Here is the Notification Message. Press OK to close.", "Notification Title");
    });
});

let sidebar_toggle = () => {
    $(".notify_sidebar_icon, .notify_sidebar_header i").on("click", () => {
        $(".notify_sidebar_icon").toggleClass("on").toggle();
        if($(".notify_sidebar_icon").hasClass("on")) {
            $('.notify_sidebar').animate({"margin-right": "0"}, 200, 'linear');
        } else {
            $('.notify_sidebar').animate({"margin-right": "-340px"}, 200, 'linear');
        }
    });
};

let notify_trigger = (level, message, title) => {
    let max_id = +($("#notify_alert_sample").attr("data-max_id")) + 1;
    let counter = +($(".notify_sidebar_icon").attr("data-counter")) + 1;
    $(".notify_sidebar_icon").attr({"data-counter": counter}).addClass("active").find("span").text(counter);
    $(".notify_header_counter").text(counter);

    $("#dialog_modal").clone().attr({"id": "dialog_modal" + max_id}).addClass("notify_popup_level"+level).appendTo("body");
    $('#dialog_modal' + max_id + " .modal-title").text(title);
    $('#dialog_modal' + max_id + " .modal-body").text(message);
    $('#dialog_modal' + max_id).modal();
    $('#dialog_modal' + max_id).on('hidden.bs.modal', function (e) {$(this).remove();});

    if($(".notify_oldest_top").hasClass("active")) {
        $("#notify_alert_sample").attr({"data-max_id": max_id}).clone().attr({"id": "notify_alert" + max_id}).addClass("new notify_alert_level"+level).appendTo("#mCSB_1_container").show();
    } else {
        $("#notify_alert_sample").attr({"data-max_id": max_id}).clone().attr({"id": "notify_alert" + max_id}).addClass("new notify_alert_level"+level).prependTo("#mCSB_1_container").show();
    }
    $('#notify_alert' + max_id + " .notify_alert_header").text(title);
    $('#notify_alert' + max_id + " .notify_alert_body").text(message);

    $(".notify_alert.new i").on("click", function(event) {
        let counter = +($(".notify_sidebar_icon").attr("data-counter")) - 1;
        $(".notify_sidebar_icon").attr({"data-counter": counter}).find("span").text(counter);
        $(".notify_header_counter").text(counter);
        if(counter === 0) {
            $(".notify_sidebar_icon").removeClass("active");
        }

        $(this).closest(".notify_alert").remove();
        event.stopPropagation();
    });

    $(".notify_alert.new").removeClass("new");

    play_audio(level);
};

let play_audio = (level) => {
   let audio = new Audio('public/audio/alert' + level + '.mp3');
    audio.play();
};

let on_top_event = () => {
    $(".notify_sidebar_header .notify_first:not(.active)").on("click", () => {
        $(".notify_sidebar_header .notify_first").toggleClass("active").off();
        on_top_event();

        $(".notify_alert").each(function() {
            $(this).prependTo("#mCSB_1_container");
        });
    });
};

return {
    trigger_notify: notify_trigger
};
})();

notify.trigger_notify(2, "message", "title");