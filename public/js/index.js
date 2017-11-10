(() => {
$(() => {
    sidebar_toggle();
    on_top_event();

    $(".notify_trigger button").on("click", () => {
        trigger_notify(1, "Here is the Notification Message. Press OK to close.", "Notification Title");
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

let trigger_notify = (level, message, title) => {
    let max_id = +($("#notify_alert_sample").attr("data-max_id")) + 1;

    $("#dialog_modal").clone().attr({"id": "dialog_modal" + max_id}).appendTo("body");
    $('#dialog_modal' + max_id + " .modal-title").text(title);
    $('#dialog_modal' + max_id + " .modal-body").text(message);
    $('#dialog_modal' + max_id).modal();
    $('#dialog_modal' + max_id).on('hidden.bs.modal', function (e) {$(this).remove();});

    $("#notify_alert_sample").attr({"data-max_id": max_id}).clone().attr({"id": "notify_alert" + max_id}).appendTo(".notify_sidebar_body").show();
    $('#notify_alert' + max_id + " .notify_alert_header").text(title);
    $('#notify_alert' + max_id + " .notify_alert_body").text(message);
};

let on_top_event = () => {
    $(".notify_sidebar_header span:not(.active)").on("click", () => {
        $(".notify_sidebar_header span").toggleClass("active").off();
        on_top_event();
    });
};
})();