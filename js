function safeLoad(data) {
    var self = this;
    Object.keys(_userdata).forEach(function(prop) {
        Object.defineProperty(self, prop, {
                value: _userdata[prop],
                writable: false,
                enumerable: true,
                configurable: false
            });
    });
}
if (typeof(_safedata) === "undefined") var _safedata = new safeLoad();
window.onload = function() {
    if (/\/t/.test(window.location.href) !== true || typeof(_userdata) === "undefined") return;
    $like_config = {
        $source: "https://147.ip-51-255-166.eu/red_cdn/forumactif/like_box_beta",
        $limit: 4,
        $lang: {
            you: "Tu",
            you_like_this: "%d acest subiect",
            liked_this: "%d ati reactionat la acest subiect",
            liked_this_: "%s au reactionat la acest subiect",
            and_another: "%e si inca [tooltip]un utilizator[/tooltip]",
            and_another_pl: "%e si inca [tooltip]%d utilizatori[/tooltip]",
            login_first: "<a href=\"/login\" target=\"_blank\">Conecteaza-te</a> pe forum pentru a putea reactiona la acest subiect",
            be_first: "<strong>%s</strong>, fii primul care reactioneaza la acest subiect</div>",
            and: "si",
            i_like: "Imi place",
            you_like: "Iti place",
            alert: "Trebuie sa fiti inscris si conectat pentru a putea aprecia acest subiect",
            an_apreciation: "o reactie",
            appreciations: "%d reactii",
            love: "Ador",
            angry: "Furie",
            haha: "Haha",
            cool: "Cool",
            loading: "Se incarca ..."
        }
    };
    $like_box = document.createElement('div');
    $l_users = "<img src=\"https://i.servimg.com/u/f11/11/80/17/98/ajax-l10.gif\" alt=\"" + $like_config.$lang.loading + "\" /> " + $like_config.$lang.loading;
    $like_box.innerHTML = "<form id=\"like_box\" style=\"display: none;\">" + "<div class=\"container\">" + "<ul id=\"like_elements\">" + "<li class=\"submenu\">" + "<span>" + "<button type=\"submit\" class=\"reaction button4 like_button\" id=\"like\" name=\"reaction\"><span><i class=\"fa fa-thumbs-up\"></i> " + $like_config.$lang.i_like + "</span></button>" + "</span>" + '<span>' + "<button type=\"submit\" class=\"reaction\" id=\"like\" name=\"reaction\"><span><i class=\"fa fa-thumbs-up\"></i><span>" + $like_config.$lang.i_like + "</span></span></button>" + "<button type=\"submit\" class=\"reaction\" id=\"love\" name=\"reaction\"><span><i class=\"fa fa-heart\"></i><span>" + $like_config.$lang.love + "</span></span></button>" + "<button type=\"submit\" class=\"reaction\" id=\"haha\" name=\"reaction\"><span><i class=\"em em-haha\"></i><span>" + $like_config.$lang.haha + "</span></span></button>" + "<button type=\"submit\" class=\"reaction\" id=\"cool\" name=\"reaction\"><span><i class=\"em em-cool\"></i><span>" + $like_config.$lang.cool + "</span></span></button>" + "</span>" + "</li>" + "<li id=\"like_usr\">" + $l_users + "</li>" + "</ul>" + "</div>" + "</form>";
    $like_box.className = 'like_box';
    document.getElementById('wrap').appendChild($like_box);
    $button_submit = document.getElementsByClassName('reaction');
    for (var i = 0; i < $button_submit.length; i++) {
        $button_submit[i].onclick = function() {
            _safedata.action = reactionType(this.getAttribute('id'));
        }
    }
    document.getElementById("like_box").onsubmit = function(event) {
        event.preventDefault();
        $.ajax({
                url: $like_config.$source + "/sent_data.json",
                type: "POST",
                cache: true,
                dataType: 'json',
                data: ({
                        action: _safedata.action,
                        post_link: document.location.href,
                        post_id: document.location.pathname.match(/\d+/)[0],
                        post_title: document.title,
                        source: document.location.origin,
                        like_author: _safedata.username,
                        like_uID: _safedata.user_id,
                        like_avatar: _safedata.avatar,
                        u_session: _safedata.session_logged_in
                    }),
                error: function() {
                    $button_submit.disabled = true;
                    document.getElementById("like_usr").innerHTML = $default_message;
                    console.warn("The server is not responding");
                },
                success: function(data) {
                    if (data.status === 500) {
                        document.getElementById("like_usr").innerHTML = $default_message;
                        $button_submit.disabled = true;
                        console.warn("Data submission method is not supported in the file sent_data.json");
                        return false;
                    }
                    getLikes();
                }
            });
    };

    function reactionType($type) {
        return $type.match(/love|like|haha|cool|unlike/) === null ? null : $type;
    }

    function getLikes() {
        $button_submit = document.getElementsByClassName('reaction')[0];
        if (_safedata.session_logged_in === 0) {
            $button_submit.setAttribute("style", "opacity: 0.8;");
            $button_submit.onclick = function() {
                alert($like_config.$lang.alert);
                return false;
            };
        }
        $default_message = (_safedata.session_logged_in === 1 ? $like_config.$lang.be_first.replace("%s", _safedata.username) : $like_config.$lang.login_first);
        $.ajax({
                url: $like_config.$source + "/get_data.json",
                type: "POST",
                dataType: 'json',
                cache: true,
                data: ({
                        u_session: _safedata.session_logged_in,
                        uID: _safedata.user_id,
                        pID: document.location.pathname.match(/\d+/)[0]
                    }),
                error: function() {
                    $button_submit.disabled = true;
                    document.getElementById("like_usr").innerHTML = $default_message;
                    console.warn("The server is not responding");
                },
                success: function(data) {
                    if (data.status === 500) {
                        $button_submit.disabled = true;
                        document.getElementById("like_usr").innerHTML = $default_message;
                        console.warn("Data submission method is not supported in the file get_data.json");
                        return false;
                    }
                    $button_submit.disabled = false;
                    switch (data.button_class) {
                        case "like":
                            $button_submit.innerHTML = "<i class=\"fa fa-check\"></i> " + $like_config.$lang.you_like;
                            $button_submit.setAttribute("id", "remove_like");
                            break;
                        case "love":
                            $button_submit.innerHTML = "<i class=\"fa fa fa-heart\"></i> " + $like_config.$lang.love;
                            $button_submit.setAttribute("id", "remove_like");
                            break;
                        case "haha":
                            $button_submit.innerHTML = "<i class=\"em em-haha\"></i> " + $like_config.$lang.haha;
                            $button_submit.setAttribute("id", "remove_like");
                            break;
                        case "cool":
                            $button_submit.innerHTML = "<i class=\"em em-cool\"></i> " + $like_config.$lang.cool;
                            $button_submit.setAttribute("id", "remove_like");
                            break;
                        default:
                            $button_submit.innerHTML = "<i class=\"fa fa-thumbs-up\"></i> " + $like_config.$lang.i_like;
                            $button_submit.setAttribute("id", "like");
                            break;
                    }
                    document.getElementsByClassName("like_button")[0].setAttribute("class", "reaction button4 like_button " + data.button_class + "");
                    $avatars = [];
                    $users = [];
                    $aditional_users = [];
                    $avatar_base = "";
                    $count = 0;
                    $pluse = 0;
                    for (var i = 0; i < data.likes.length; i++) {
                        if (data.likes[i].show === false && $like_config.$limit > $count) {
                            $users.push("<a href='/u" + data.likes[i].id + "'><strong>" + data.likes[i].name + "</strong></a>");
                            $avatars.push("<a class='usr_tooltip' href='/u" + data.likes[i].id + "'><span>" + getReactions(data.likes[i].reactions, data.pID) + " " + data.likes[i].name + "</span>" + data.likes[i].avatar + "</a>");
                            $count++;
                        } else if (data.likes[i].show === false) {
                            $aditional_users.push(getReactions(data.likes[i].reactions, data.pID) + " " + data.likes[i].name);
                            $react = getReactions(data.likes[i].reactions, data.pID);
                            $pluse++;
                        } else if (data.likes[i].show === true) {
                            $users.unshift("<a href='/u" + _safedata.user_id + "'><strong>" + $like_config.$lang.you + "</strong></a>");
                            $avatars.push("<a class='usr_tooltip' href='/u" + data.likes[i].id + "'><span>" + getReactions(data.likes[i].reactions, data.pID) + " " + $like_config.$lang.you + " </span>" + data.likes[i].avatar + "</a>");
                            $react = getReactions(data.likes[i].reactions, data.pID);
                            $count++;
                        }
                    }
                    $users_ = $users.join(', ').replace(/,(?=[^,]*$)/, ' ' + $like_config.$lang.and);
                    $items = ["like", "love", "haha", "cool", "angry"];
                    if (data.likes.length === 0)
                        $l_users = $default_message;
                    else if (data.likes.length === 1)
                        $l_users = ($items.indexOf(data.button_class) > -1 ? $react + "<strong><a href=\"/u" + _safedata.user_id + "\">" + _safedata.username + "</a></strong>" : $react + $users_);
                    else if (data.likes.length >= 2 && data.likes.length <= $like_config.$limit)
                        $l_users = ($items.indexOf(data.button_class) > -1 ? $like_config.$lang.liked_this.replace("%d", $users_) : $like_config.$lang.liked_this_.replace("%s", $users_));
                    else {
                        if ($pluse === 1)
                            $l_users = ($items.indexOf(data.button_class) > -1 ? $like_config.$lang.liked_this.replace("%d", $like_config.$lang.and_another) : $like_config.$lang.liked_this_.replace("%s", $like_config.$lang.and_another)).replace("%e", $users.join(', ')).replace("[tooltip]", "<a class=\"tooltip_data\"><span>" + $aditional_users.join('<br /> ') + "</span>").replace("[/tooltip]", "</a>");
                        else if ($pluse > 1)
                            $l_users = ($items.indexOf(data.button_class) > -1 ? $like_config.$lang.liked_this.replace("%d", $like_config.$lang.and_another_pl) : $like_config.$lang.liked_this_.replace("%s", $like_config.$lang.and_another_pl)).replace("%e", $users.join(', ')).replace("%d", $pluse).replace("[tooltip]", "<a class=\"tooltip_data\"><span>" + $aditional_users.join('<br /> ') + "</span>").replace("[/tooltip]", "</a>");
                        else if ($pluse === 0) {
                            $l_users = ($items.indexOf(data.button_class) > -1 ? $like_config.$lang.liked_this_.replace("%s", $users.join(", ")) : $like_config.$lang.liked_this.replace("%d", $users.join(", ")));
                        }
                    }
                    document.getElementById("like_usr").innerHTML = "<div id=\"usr_list_a\"><span id=\"usr_av_l\">" + $avatars.join('') + ($pluse > 0 ? "<span class=\"usr_av_b\">+" + $pluse + "</span>" : "") + "</span></div>" + $l_users;
                }
            });
    }

    function getReactions($object, $id) {
        for (const key of Object.keys($object)) {
            if ($object[key].indexOf($id) > -1) {
                switch (key) {
                    case "like":
                        $react = '<i class="fa fa-thumbs-up"></i>';
                        break;
                    case "love":
                        $react = '<i class="fa fa-heart"></i>';
                        break;
                    case "haha":
                        $react = '<i class="em em-haha"></i>';
                        break;
                    case "cool":
                        $react = '<i class="em em-cool"></i>';
                        break;
                    default:
                        $react = '<i class="fa fa-thumbs-up"></i>';
                        break;
                }
                return $react;
            }
        }
    }
    getLikes();
    var css = "#like_box{display:block!important;position:fixed;bottom:0;left:0;width:100%;z-index:99999;left:0;width:100%;background:#fff;box-shadow:0 0 20px rgba(0,0,0,0.2)}#like_box .container{margin:0 auto;width:91%}#like_box #like_elements li{display:inline-block}#like_box #like_elements li:first-child{width:100px;text-align:center;padding:10px}#like_box .button4{background:#369fcf;padding:5px 7px;font-weight:700;font-family:'Open Sans',Arial,sans-serif;outline:none;border:0;color:#fff;border-radius:2px;font-size:12px;cursor:pointer}#like_box .button4.liked{background:#89b325}#like_usr{font-size:12px}#like_box .tooltip_data span,#like_box .usr_tooltip span{position:absolute;background:rgba(0,0,0,0.7);color:#fff;min-height:20px;visibility:hidden;padding:5px;border-radius:2px;box-shadow:0 0 3px rgba(0,0,0,0.5);bottom:34px;font-size:11px;font-weight:700}#like_box .submenu span + span:before{border-top:5px solid #fff;text-shadow:0 0 1px #d7d7d7}#like_box .tooltip_data span:before,#like_box .usr_tooltip:hover span:before,#like_box .submenu span + span:before{content:'';position:absolute;top:100%;left:8px;border-right:5px solid transparent;border-top:5px solid rgba(0,0,0,0.7);text-shadow:0 0 3px rgba(0,0,0,0.5);border-left:5px solid transparent}#like_usr{position:relative}#like_box .tooltip_data{font-weight:700;cursor:pointer;border-bottom:1px dotted #d7d7d7}#like_box .tooltip_data:hover span{visibility:visible}#usr_av_l img{width:30px;border-radius:100%;border:2px solid #fff;margin-left:-13px;height:30px}#like_box .usr_tooltip span{display:none;position:absolute;left:0}#like_box .usr_tooltip{position:relative}#like_box .usr_tooltip:hover span{visibility:visible;display:block;min-width:initial;padding:5px 15px;left:-10px;bottom:43px}#usr_list_a{float:right;margin-top:-8px;float:right}#like_usr{width:90%}#like_box .usr_av_b{width:30px;border-radius:100%;display:inline-block;background:#d7d7d7;height:30px;text-align:center;line-height:2.7;font-weight:700;position:relative;top:1px;border:2px solid #fff;left:-10px;float:right}#like_box .submenu span + span{display:none}#like_box .submenu:hover span + span{display:block;background:#fff;border:1px solid #d7d7d7;border-radius:3px;padding:10px 15px;box-shadow:0 0 10px rgba(0,0,0,0.2);position:absolute;bottom:39px;left:18px;min-width:116px}#like_box .submenu{position:relative}#like_box .submenu span:hover + span button{display:inline-block}#like_box .submenu span + span button,#like_box .submenu:hover span:hover + span{-webkit-transform:perspective(1px) translateZ(0);transform:perspective(1px) translateZ(0)}#like_box .submenu span + span button:hover,#like_box .submenu:hover span + span{cursor:pointer;-webkit-animation-name:hvr-wobble-vertical;animation-name:hvr-wobble-vertical;-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;-webkit-animation-iteration-count:1;animation-iteration-count:1}#like_box .submenu:hover span + span button span span{display:none}#like_box .submenu:hover span + span button#love,.submenu:hover span + span button#like{outline:none;background:#dc4626;cursor:pointer;border:0;width:25px;height:25px;line-height:2;border-radius:100%;color:#fff}#like_box .submenu:hover span + span button#haha .em,.em-haha{background-position:27px 0!important}#like_box .submenu:hover span + span button#like,#like_box .submenu:hover span + span button#unlike{background:#369fcf}#like_box .submenu:hover span + span button#cool,#like_box .submenu:hover span + span button#haha{border:0}#like_box .submenu:hover span + span button{margin-left:3px;cursor:pointer;outline:none}#like_box .em{padding:6px 13px;background:url(https://i.servimg.com/u/f11/19/68/00/03/emoji10.png)}@keyframes hvr-wobble-vertical{16.65%{-webkit-transform:translateY(8px);transform:translateY(8px)}33.3%{-webkit-transform:translateY(-6px);transform:translateY(-6px)}49.95%{-webkit-transform:translateY(4px);transform:translateY(4px)}66.6%{-webkit-transform:translateY(-2px);transform:translateY(-2px)}83.25%{-webkit-transform:translateY(1px);transform:translateY(1px)}100%{-webkit-transform:translateY(0);transform:translateY(0)}}#like_box .submenu span + span:before{border-top:5px solid #fff;text-shadow:0 0 1px #d7d7d7}#like_box .button4.love{background:#dc4626;padding:5px 15px}#like_box .button4.like{background:#74c01e}#like_box .button4 .em{padding:2px 10px;border-radius:100%;background-size:auto 100%;margin-right:3px}#like_box .button4 .em-haha{background-position:21px 0!important}#like_box .button4.haha{background:transparent;box-shadow:0 0 1px #adadad;padding:5px 10px;color:#d0a122}#like_box .button4.cool{background:transparent;box-shadow:0 0 1px #adadad;padding:5px 13px;color:#d0a122}#like_box .tooltip_data i.fa-thumbs-up,#like_box .tooltip_data .fa-heart{background:#369fcf;padding:3px;font-size:10px;border-radius:100%}#like_box .tooltip_data .fa-heart{background:#dc4626}#like_box .tooltip_data .em{background-size:auto 17px;border-radius:100%;padding:8px;vertical-align:top;display:inline-block;background-position:0 0!important}#like_box .tooltip_data .em.em-haha{background-position:17px 0!important}#like_box .tooltip_data{line-height:2}#like_box .tooltip_data i{margin-top:2px}#like_box .like_tooltip i.fa-thumbs-up,#like_box .like_tooltip .fa-heart,#like_box .usr_tooltip i.fa-thumbs-up,#like_box .usr_tooltip .fa-heart,#like_box #like_usr i.fa-thumbs-up,#like_box #like_usr i.fa-heart{background:#369fcf;padding:3px;color:#fff;font-size:10px;border-radius:100%}#like_box .like_tooltip .fa-heart,#like_box .usr_tooltip .fa-heart,#like_box #like_usr .fa-heart{background:#dc4626!important}#like_box .usr_tooltip span{min-width:80px!important}#like_box .like_tooltip .em,#like_box .usr_tooltip .em,#like_box #like_usr .em{background-size:auto 20px;border-radius:100%;padding:10px;vertical-align:top;margin-right:3px;display:inline-block;background-position:0 0!important}#like_box .like_tooltip .em.em-haha,#like_box .usr_tooltip .em.em-haha,#like_box #like_usr .em.em-haha{background-position:20px 0!important}#like_box .like_tooltip,#like_box .usr_tooltip,#like_box #like_usr{line-height:2}#like_box .like_tooltip i,#like_box .usr_tooltip i,#like_box #like_usr i{margin-top:2px}#like_usr i.fa{padding:4px!important;margin-right:5px;text-align:center;padding:4px!important;margin-right:5px;text-align:center}#like_usr i,#like_usr .em{-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-property:transform;transition-property:transform;-webkit-animation-name:bounce;animation-name:bounce;-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;-webkit-animation-iteration-count:1;animation-iteration-count:1}@keyframes bounce{16.65%{-webkit-transform:scale(1.2);transform:scale(1.2)}100%{-webkit-transform:scale(1);transform:scale(1)}}",
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
};
