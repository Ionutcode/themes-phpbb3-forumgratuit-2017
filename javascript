$(function () {

    if(document.body.contains(document.getElementById("text_editor_textarea")) === false) return;

    var color = "brown",
            list = "",
            nv = "",
            usr = (getCookie("ut00") === '' ? "nume" : getCookie("ut00")),
            hello_world = (new Date().getHours() < 10 ? "Buna dimineata" : new Date().getHours() < 19 ? "Buna ziua" : "Buna seara");


        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }  

        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        for (var z = 0; z < staff_members.length; z++) {
            if (_userdata.user_id === staff_members[z].id) {
                $('.shadow-staff a[href*="/u' + staff_members[z].id + '"]').each(function() {
                    $(".ds53ad2").append('<tr><td width="100px;" style="border-right: 1px solid #00A5CD;padding: 5px;border-bottom: 1px solid #00A5CD;"><b><a href=" //help.forumgratuit.ro/u' + staff_members[z].id + '">' + staff_members[z].name + '</a></b></td><td style="border-bottom: 1px solid #00A5CD;padding: 5px;"><font color="' + staff_members[z].hex + '" unselectable="on"><b>' + staff_members[z].color_name + '</b> (' + staff_members[z].hex + ')</font><div style="width: 20px; height: 20px;border-radius: 50%;float: right;background: ' + staff_members[z].hex + '"></div></td></tr>');
                });
                color = staff_members[z].hex;
                user_name = staff_members[z].name;
            }
        }

        var zModGroups = [{
                id: 0,
                name: 'Administratori'
            },
            {
                id: 1,
                name: 'Moderatori'
            },
            {
                id: 2,
                name: 'Asistenti'
            },
            {
                id: 3,
                name: 'Graphic Designeri'
            },
            {
                id: 4,
                name: 'Icon-uri pentru moderare'
            },
            {
                id: 5,
                name: 'Legaturi rapide'
            },
            {
                id: 7,
                name: 'Tabele tip'
            }
        ];

        var zModTabels = [{
                type: "time",
                body_start: '[table class="moderation-message" style="width: 100%;background: #3399CC;margin-top: 5px;margin-bottom: 5px;border-bottom: 3px solid #2579A2;padding: 5px;border-radius: 4px;font-weight: bold;color: #fff;font-size: 12px;text-shadow: 1px 1px 3px rgba(0,0,0,0.1);font-family: Trebuchet MS, Helvetica, Arial, sans-serif"][tr][td width="1%"][img]https://i21.servimg.com/u/f21/11/80/17/98/6h8i2d10.png[/img][/td][td]',
                body_end: "[/td][/tr][/table]\n"
            },
            {
                type: "done",
                body_start: '[table class="moderation-message" style="width: 100%;background: #3399CC;margin-top: 5px;margin-bottom: 5px;border-bottom: 3px solid #2579A2;padding: 5px;border-radius: 4px;font-weight: bold;color: #fff;font-size: 12px;text-shadow: 1px 1px 3px rgba(0,0,0,0.1);font-family: Trebuchet MS, Helvetica, Arial, sans-serif"][tr][td width="1%"][img]https://i21.servimg.com/u/f21/11/80/17/98/solved10.png[/img][/td][td]',
                body_end: "[/td][/tr][/table]\n"
            },
            {
                type: "garbage",
                body_start: '[table class="moderation-message" style="width: 100%;background: #3399CC;margin-top: 5px;margin-bottom: 5px;border-bottom: 3px solid #2579A2;padding: 5px;border-radius: 4px;font-weight: bold;color: #fff;font-size: 12px;text-shadow: 1px 1px 3px rgba(0,0,0,0.1);font-family: Trebuchet MS, Helvetica, Arial, sans-serif"][tr][td width="1%"][img]https://i21.servimg.com/u/f21/11/80/17/98/garbag11.png[/img][/td][td]',
                body_end: "[/td][/tr][/table]\n"
            },
            {
                type: "warning",
                body_start: '[table class="moderation-message" style="width: 100%;background: #3399CC;margin-top: 5px;margin-bottom: 5px;border-bottom: 3px solid #2579A2;padding: 5px;border-radius: 4px;font-weight: bold;color: #fff;font-size: 12px;text-shadow: 1px 1px 3px rgba(0,0,0,0.1);font-family: Trebuchet MS, Helvetica, Arial, sans-serif"][tr][td width="1%"][img]https://i21.servimg.com/u/f21/11/80/17/98/alert10.png[/img][/td][td]',
                body_end: "[/td][/tr][/table]\n"
            },
            {
                type: "info",
                body_start: '[table class="moderation-message" style="width: 100%;background: #3399CC;margin-top: 5px;margin-bottom: 5px;border-bottom: 3px solid #2579A2;padding: 5px;border-radius: 4px;font-weight: bold;color: #fff;font-size: 12px;text-shadow: 1px 1px 3px rgba(0,0,0,0.1);font-family: Trebuchet MS, Helvetica, Arial, sans-serif"][tr][td width="1%"][img]https://i21.servimg.com/u/f21/11/80/17/98/10oqv711.png[/img][/td][td]',
                body_end: "[/td][/tr][/table]\n"
            },
            {
                type: "rejected",
                body_start: '[table class="moderation-message" style="width: 100%;background: #3399CC;margin-top: 5px;margin-bottom: 5px;border-bottom: 3px solid #2579A2;padding: 5px;border-radius: 4px;font-weight: bold;color: #fff;font-size: 12px;text-shadow: 1px 1px 3px rgba(0,0,0,0.1);font-family: Trebuchet MS, Helvetica, Arial, sans-serif"][tr][td width="1%"][img]https://i21.servimg.com/u/f21/19/32/91/30/close10.png[/img][/td][td]',
                body_end: "[/td][/tr][/table]\n"
            },
            {
                type: "no_edit",
                body_start: '[table class="moderation-message" style="width: 100%;background: #3399CC;margin-top: 5px;margin-bottom: 5px;border-bottom: 3px solid #2579A2;padding: 5px;border-radius: 4px;font-weight: bold;color: #fff;font-size: 12px;text-shadow: 1px 1px 3px rgba(0,0,0,0.1);font-family: Trebuchet MS, Helvetica, Arial, sans-serif"][tr][td width="1%"][img]https://i21.servimg.com/u/f21/19/32/91/30/protec10.png[/img][/td][td]',
                body_end: "[/td][/tr][/table]\n"
            },
            {
                type: "mod_color",
                body_start: '[b][color=' + color + ']',
                body_end: "[/color][/b]"
            },
            {
                type: "variable",
                body_start: '[color=#0000ff][font=Courier New]',
                body_end: "[/font][/color]"
            },
            {
                type: "image",
                body_start: '[img]',
                body_end: "[/img]"
            },
            {
                type: "code",
                body_start: '[code]\n',
                body_end: "[/code]"
            }
        ];

        var zModMessages = [{
                name: "Solicitare stergere forum",
                message: hello_world + ',\n\nVa rog sa postati un topic intr-un loc vizibil pentru vizitatori pe [b]forumul dumneavoastra[/b] in care sa confirmati ca doriti stergerea forumului (folosind contul fondator al forumului). \n\nDupa ce faceti acest lucru va rog sa imi dati link-ul catre acel topic, [b]prin PM[/b], pe acest forum iar eu voi trimite cererea dumneavoastra mai departe catre cineva de la firma care va sterge forumul dumneavoastra. \n\nVa multumesc pentru intelegere',
                group_id: 0,
                type: "default"
            },
            {
                name: "Solicitare trimisa tehnicienilor",
                message: hello_world + ',\n\nAm trimis forumul dumneavoastra catre cineva de la firma ca sa verifice forumul.',
                group_id: 0,
                type: "default"
            },
            {
                name: "Solicitare preluare forum",
                message: hello_world + ',\n\nCititi acest subiect: \nhttp://help.forumgratuit.ro/t39386-preluarea-unui-forum-de-catre-un-nou-fondator',
                group_id: 0,
                type: "default"
            },
            {
                name: "Informare blocare mesagerie privata",
                message: hello_world + ',\n\nDeoarece am primit reclamatii pentru ca v-ati promovat forumul prin Mesagerie Privata catre alti membrii, lucru care este interzis, Mesageria Privata v-a fost dezactivata.',
                group_id: 0,
                type: "default"
            },
            {
                name: "Nume utilizator nepotrivit",
                message: hello_world + ',\n\nAveti 48 de ore de la citirea acestui mesaj ca sa imi trimiteti prin Mesaj Privat un nou username(numele contului dumneavoastra) deoarece actualul nume al contului dumneavoastra incalcă regulile forumului. Daca nu raspundeti la acest mesaj sau depasiti cele 48 de ore de la citirea acestui mesaj, contul dumneavoastră va primi Ban.\nVa multumesc pentru intelegere!',
                group_id: 0,
                type: "default"
            },
            {
                name: "Invitare asistenti",
                message: hello_world + ',\n\nAm observat activitatea dumneavoastra pe acest forum si am vrea sa va invitam sa faceti parte din staff-ul acestui forum devenind Asistent.\nCa asistent veti ajuta in continuare membrii la fel cum faceati si pana acum dar veti avea si permisiuni de moderare asupra sectiunii de suport si veti face parte bineinteles din staff-ul acestui forum.\nDaca mai aveti alte intrebari nu ezitati sa ma intrebati.\nVa multumesc!  ',
                group_id: 0,
                type: "default"
            },
            {
                name: "Adresa de e-mail primita prin PM nu corespunde",
                message: hello_world + ',\n\nDin pacate adresa de email nu corespunde cu cea fondatoare, motiv pentru care va rog sa faceți o lista cu toate adresele de email pe care le aveti, in speranta ca voi identifica si adresa ce coreleaza cu cea a forumului dvs.',
                group_id: 0,
                type: "default"
            },
            {
                name: "Adresa de e-mail primita prin PM nu corespunde",
                message: hello_world + ',\n\nDin pacate adresa de email nu corespunde cu cea fondatoare, motiv pentru care va rog sa faceți o listă cu toate adresele de email pe care le aveti, in speranta ca voi identifica si adresa ce coreleaza cu cea a forumului dvs.',
                group_id: 1,
                type: "default"
            },
            {
                name: "Solicitari de suport postate in afara sectiunii de suport",
                message: hello_world + ',\n\nSuportul se acorda in [url=http://help.forumgratuit.ro/c2-forum-de-suport]sectiunea de suport[/url] si nu in sectiunea ...\n\n[img]http://i57.tinypic.com/2py89k6.png[/img]',
                group_id: 1,
                type: "default"
            },
            {
                name: "Bold si/sau culori",
                message: hello_world + ',\n\n@"' + usr + '", boldul si culorile sunt rezervate pentru moderare. Va rog sa folositi fontul de origine al forumului.\n\nMultumesc pentru intelegere!',
                group_id: 2,
                type: "info",
                sanction: "mustrare"
            },
            {
                name: "Bold si/sau culori",
                message: hello_world + ',\n\n@"' + usr + '", boldul si culorile sunt rezervate pentru moderare. Va rog sa folositi fontul de origine al forumului.\n\nMultumesc pentru intelegere!',
                group_id: 3,
                type: "info",
                sanction: "mustrare"
            },
            {
                name: "Dublu post",
                message: hello_world + ',\n\n@"' + usr + '", va rugam sa readuceti in atentie intrebarea dumneavoastra doar daca au trecut cel putin 24 de ore fara sa primiti un raspuns. Pentru actualizarea mesajului anterior puteti folosi butonul "Editeaza".\n\nMultumesc pentru înţelegere!',
                group_id: 2,
                type: "info",
                sanction: "mustrare"
            },
            {
                name: "Bold si/sau culori",
                message: hello_world + ',\n\n@"' + usr + '", boldul si culorile sunt rezervate pentru moderare. Va rog sa folositi fontul de origine al forumului.\n\nMultumesc pentru intelegere!',
                group_id: 1,
                type: "info",
                sanction: "mustrare"
            },
            {
                name: "Dublu post",
                message: hello_world + ',\n\n"Va rugam sa readuceti in atentie intrebarea dumneavoastra doar daca au trecut cel putin 24 de ore fara sa primiti un raspuns. Pentru actualizarea mesajului anterior puteti folosi butonul "Editeaza".\n\nMultumesc pentru înţelegere!',
                group_id: 1,
                type: "info",
                sanction: "mustrare"
            },           
            {
                name: "Daca nu este posibil ce a solicitat autorul",
                message: hello_world + ',\n\nNe pare rau, dar acest lucru nu este posibil momentan pe Forumgratuit. Puteti insa face o sugestie in acest sens in [url=https://help.forumgratuit.ro/f14-sugestii-pentru-forumurile-voastre]sectiunea dedicata sugestiilor[/url] pentru forumurile dumneavoastra.\n\n[i]=>Topic blocat[/i]',
                group_id: 2,
                type: "info"
            },
            {
                name: "SPAM - link extern postat in scopul de a promova",
                message: hello_world + ',\n\n[b]@"' + usr + '"[color="#C60800"], ati primit warn pentru spam. Va rog sa nu mai postati linkuri externe platformei Forumgratuit fara acordul unui membru al staff-ului. \n\nMultumesc pentru intelegere![/color][/b]',
                group_id: 2,
                type: "default",
                sanction: "warn"
            },
            {
                name: "SPAM - promovare forum personal Forumgratuit in afara sectiunii 'Promovare forumuri'",
                message: hello_world + ',\n\n[b]@"' + usr + '"[color="#C60800"], ati primit warn pentru spam. Va rog sa evitati sa va mai promovati forumul in alte sectiunii in afara de "[url=http://help.forumgratuit.ro/f20-promovare-forumuri]Promovare forumuri[/url]". \n\nMultumesc pentru intelegere![/color][/b]',
                group_id: 2,
                type: "default",
                sanction: "warn"
            },
            {
                name: "SPAM - continutul postat de utilizator contine virusi",
                message: hello_world + ',\n\n[b]@"' + usr + '"[color="#C60800"], ati primit warn pentru spam. Va rog sa nu mai postati linkuri catre fisiere infectate care pot pune in pericol securitatea PC-urilor. \n\nMultumesc pentru intelegere![/color][/b]',
                group_id: 2,
                type: "default",
                sanction: "warn"
            },
            {
                name: "SPAM - injurii",
                message: hello_world + ',\n\n[b]@"' + usr + '"[color="#C60800"], ati primit warn pentru spam. Pe acest forum nu este permisa folosirea unui astfel de limbaj, adresati-va intr-un mod civilizat pentru a evita suspendarea contului. \n\nMultumesc pentru intelegere![/color][/b]',
                group_id: 2,
                type: "default",
                sanction: "warn"
            },
            {
                name: "SPAM - continut ilegal (pornografie, rasism, crime impotriva umanitatii etc)",
                message: hello_world + ',\n\n[b]@"' + usr + '"[color="#C60800"], ati primit warn serios pentru spam. Continuarea postarii unui astfel de continut poate avea ca efect excluderea dvs. din cadrul acestei comunitati. \n\nMultumesc pentru intelegere![/color][/b]',
                group_id: 2,
                type: "default",
                sanction: "warn"
            },
            {
                name: "SPAM - link extern postat in scopul de a promova",
                message: hello_world + ',\n\n[b]@"' + usr + '"[color="#C60800"], ati primit warn pentru spam. Va rog sa nu mai postati linkuri externe platformei Forumgratuit fara acordul unui membru al staff-ului. \n\nMultumesc pentru intelegere![/color][/b]',
                group_id: 1,
                type: "default",
                sanction: "warn"
            },
            {
                name: "SPAM - promovare forum personal Forumgratuit in afara sectiunii 'Promovare forumuri'",
                message: hello_world + ',\n\n[b]@"' + usr + '"[color="#C60800"], ati primit warn pentru spam. Va rog sa evitati sa va mai promovati forumul in alte sectiunii in afara de "[url=http://help.forumgratuit.ro/f20-promovare-forumuri]Promovare forumuri[/url]". \n\nMultumesc pentru intelegere![/color][/b]',
                group_id: 1,
                type: "default",
                sanction: "warn"
            },
            {
                name: "SPAM - continutul postat de utilizator contine virusi",
                message: hello_world + ',\n\n[b]@"' + usr + '"[color="#C60800"], ati primit warn pentru spam. Va rog sa nu mai postati linkuri catre fisiere infectate care pot pune in pericol securitatea PC-urilor. \n\nMultumesc pentru intelegere![/color][/b]',
                group_id: 1,
                type: "default",
                sanction: "warn"
            },
            {
                name: "SPAM - injurii",
                message: hello_world + ',\n\n[b]@"' + usr + '"[color="#C60800"], ati primit warn pentru spam. Pe acest forum nu este permisa folosirea unui astfel de limbaj, adresati-va intr-un mod civilizat pentru a evita suspendarea contului. \n\nMultumesc pentru intelegere![/color][/b]',
                group_id: 1,
                type: "default",
                sanction: "warn"
            },
            {
                name: "SPAM - continut ilegal (pornografie, rasism, crime impotriva umanitatii etc)",
                message: hello_world + ',\n\n[b]@"' + usr + '"[color="#C60800"], ati primit warn serios pentru spam. Continuarea postarii unui astfel de continut poate avea ca efect excluderea dvs. din cadrul acestei comunitati. \n\nMultumesc pentru intelegere![/color][/b]',
                group_id: 1,
                type: "default",
                sanction: "warn"
            },
            {
                name: "Subiect rezolvat",
                message: "https://i58.servimg.com/u/f58/19/68/00/03/1joo0n10.png",
                group_id: 4,
                type: "image"
            },
            {
                name: "Subiect trimis la cos",
                message: "https://i58.servimg.com/u/f58/19/68/00/03/2py89k10.png",
                group_id: 4,
                type: "image"
            },
            {
                name: "Subiect blocat",
                message: "https://i58.servimg.com/u/f58/19/68/00/03/2lwk2y10.png",
                group_id: 4,
                type: "image"

            },
            {
                name: "Cerere respinsa",
                message: "https://i58.servimg.com/u/f58/19/68/00/03/10fs4510.png",
                group_id: 4,
                type: "image"

            },
            {
                name: "Cerere rezolvata",
                message: "https://i21.servimg.com/u/f21/11/80/17/98/asa11.png",
                group_id: 4,
                type: "image"

            },
            {
                name: "Considerat rezolvat",
                message: "https://i58.servimg.com/u/f58/19/68/00/03/nvqn3410.png",
                group_id: 4,
                type: "image"

            },
            {
                name: "Subiecte unite",
                message: "https://i58.servimg.com/u/f58/19/68/00/03/1zzqiq10.png",
                group_id: 4,
                type: "image"

            },
            {
                name: "SPAM - mesaj pentru cei care nu au acces in anumite sectiuni si e urgenta sanctionarea unui utilizator care incalca aceasta regula",
                message: '[b][color="' + color + '"]Spam=> Warn.\nUn Moderator/administrator a fost deja instintat cu privire la acest topic si se va ocupa de el. [/color][/b]',
                group_id: 2,
                type: "default",
                sanction: "warn"
            },
            {
                name: "Limbaj sms",
                message: hello_world + ",\n\n[b]@nume[color=' + color + '], va rog a nu mai folositi limbajul sms! Scrieti cuvintele intregi.\nMultumesc pentru intelegere![/color][/b]",
                group_id: 2,
                type: "default",
                sanction: "mustrare"
            },
            {
                name: "Limbaj sms",
                message: hello_world + ",\n\n[b]@nume[color=' + color + '], va rog a nu mai folositi limbajul sms! Scrieti cuvintele intregi.\nMultumesc pentru intelegere![/color][/b]",
                group_id: 1,
                type: "default",
                sanction: "mustrare"
            },
            {
                name: "Subiect marcat ca fiind rezolvat - existand o solutie concreta",
                message: 'Avand in vedere ca acest subiect a fost marcat ca fiind "rezolvat", acesta va fi inchis si trimis in arhiva.\n\n[i]=> Topic rezolvat[/i]',
                group_id: 2,
                type: "done"
            },
            {
                name: "Subiect marcat ca fiind rezolvat - fara a exista o solutie concreta",
                message: 'Avand in vedere ca acest subiect a fost marcat ca fiind "rezolvat", fara a exista o solutie concreta, acesta va fi inchis si trimis in cosul de gunoi.\n\n[i]=> Topic trimis in cosul de gunoi[/i]',
                group_id: 2,
                type: "garbage"
            },
            {
                name: "Inchidere topicuri datorita lipsei de interes a creatorului",
                message: 'Avand in vedere ca in ultimele 2 saptamani autorul nu a mai aratat interes pentru acesta problema, topicul va fi inchis si trimis in cos. Daca problema nu a fost rezolvata, va invitam sa deschideti un nou topic, in sectiunea corespunzatoare si avind un titlu explicit.\n\n[i]=> Topic trimis in cosul de gunoi[/i]\n',
                group_id: 2,
                type: "garbage"
            },
            {
                name: "Majuscule (CAPS LOCK)",
                message: 'Va rog sa nu mai folositi in exclusivitate scrisul cu litere mari. Puteti sa evidentiati ideile folosind text subliniat sau italic.\n Multumesc pentru intelegere!',
                group_id: 2,
                type: "info",
                sanction: "mustrare"
            },
            {
                name: "Raspuns gresit",
                message: '[b]@nume[color='+color+'], va rog sa nu mai induceti in eroare alti utilizatori!\nMultumesc pentru intelegere![/color][/b]',
                group_id: 2,
                type: "default",
                sanction: "mustrare"
            },   
            {
                name: "Postari inutile",
                message: '[b]@nume[color='+color+'], va rog sa va abtineti sa postati daca nu cunoasteti raspunsul.\nMultumesc pentru intelegere!\n\n*** Postari trimise la cos.[/color][/b]',
                group_id: 2,
                type: "default"
            },
            {
                name: "Majuscule (CAPS LOCK)",
                message: 'Va rog sa nu mai folositi in exclusivitate scrisul cu litere mari. Puteti sa evidentiati ideile folosind text subliniat sau italic.\n Multumesc pentru intelegere!',
                group_id: 1,
                type: "info",
                sanction: "mustrare"
            },
            {
                name: "Majuscule (CAPS LOCK)",
                message: 'Va rog sa nu mai folositi in exclusivitate scrisul cu litere mari. Puteti sa evidentiati ideile folosind text subliniat sau italic.\n Multumesc pentru intelegere!',
                group_id: 3,
                type: "info",
                sanction: "mustrare"
            },
            {
                name: "Dublu post",
                message: hello_world + ',\n\nVa rugam sa readuceti in atentie cererea dumneavoastra doar daca au trecut cel putin 24 de ore fara sa primiti un raspuns. Pentru actualizarea mesajului anterior puteti folosi butonul  "Editeaza".\nMultumesc pentru intelegere!',
                group_id: 3,
                type: "info",
                sanction: "mustrare"
            },
            {
                name: "Adresa forumului nu mai exista",
                message: hello_world + ',\n\n[color='+color+'][b]Forumul dumneavoastra nu se mai regaseste la adresa indicata, va rog sa indicati adresa corecta pentru ca cererea dumneavoastra sa poata fi solutionata.\nMultumesc pentru intelegere![/b][/color]\n',
                group_id: 3,
                type: "default"
            },
            {
                name: "Adresa forumului nu mai exista",
                message: 'Ne pare rau dar nu ati respectat modelul de cerere! Pentru ca cererea dvs. sa poata fi solutionata trebuie sa respectati modelul din [url=https://help.forumgratuit.ro/t26620-regulamentul-sectiunii-cereri-imagini-si-model-de-cerere]acest subiect[/url].\n\n[i]=> Cerere respinsa[/i]',
                group_id: 3,
                type: "rejected"
            },
            {
                name: "Cererea anterioara nerezolvata",
                message: 'Ne pare rau dar cererea anterioara nu va fost inca rezolvata!\n\nLink cerere: x \n\n[i]=> Cerere respinsa[/i]',
                group_id: 3,
                type: "rejected"
            },
            {
                name: "Editarea cererii dupa primirea unei rezolvari",
                message: 'Ne pare rau dar ati editat cererea dand alte detalii dupa ce ati primit o deja o rezolvare! \n\n[i]=> Cerere respinsa[/i]',
                group_id: 3,
                type: "rejected"
            },
            {
                name: "Modificare creatii grafice",
                message: 'Ne pare rau dar astfel de creatii nu sunt acceptate spre a fi modificate! \n\n[i]=> Cerere respinsa[/i]',
                group_id: 3,
                type: "rejected"
            },
            {
                name: "Foaia de stil css",
                message: 'Intrati in:\n[i]Panou de administrare => Afisare => Imagini si culori => Culori => [b]Foaie de stil css[/i][/b]\n\n Si adaugati: [code]\ncodul tau css[/code]',
                group_id: 5,
                type: "default"
            },
            {
                name: "Template-uri => General",
                message: 'Intrati in:\n[i]Panou de administrare => Afisare => Template-uri => General => [b]nume template[/i][/b]',
                group_id: 5,
                type: "default"
            },
            {
                name: "Cautare si inlocuire linie",
                message: '\nCautati:\n[code]\ncod actual[/code]\n\n Inlocuiti cu: [code]\ncod nou[/code]',
                group_id: 5,
                type: "default"
            },
            {
                name: "Tutorial acceptat",
                message: '[table style="border: 1px solid #950000;" cellspacing="0" width="100%"][tr][td style="background-image: url(http://i39.servimg.com/u/f39/11/80/17/98/promov10.png); background-repeat: no-repeat;" height="100" width="100"][/td]\n[td style="background: url(http://i39.servimg.com/u/f39/11/80/17/98/promov11.png);padding-bottom: 15px;text-shadow: 1px 1px 1px white;"][center][size=20][b][color=#950000]Tutorial respins[/color][/b][/size]\n[color=#950000][size=13]Motiv: Aici scrieti motivul.[/size][/color]\n[/center]\n[/td]\n[td style="background-image: url(https://i58.servimg.com/u/f58/19/68/00/03/trr10.png);width: 155px;  background-repeat: no-repeat;" width="84"][/td]\n[/tr]\n[/table]',
                group_id: 7,
                type: "default"
            },
            {
                name: "(Concursuri) Forum descalificat",
                message: '[table style="border: 1px solid #950000;" cellspacing="0" width="100%"][tr][td style="background-image: url(http://i39.servimg.com/u/f39/11/80/17/98/promov10.png); background-repeat: no-repeat;" height="100" width="100"][/td]\n[td style="background: url(http://i39.servimg.com/u/f39/11/80/17/98/promov11.png);padding-bottom: 15px;text-shadow: 1px 1px 1px white;"][center][size=20][b][color=#950000]Forum descalificat[/color][/b][/size]\n[color=#950000][size=13]Motiv: Aici scrieti motivul.[/size][/color]\n[color=#950000][b][size=9]Editarea acestui mesaj de moderare poate duce pana la sanctionarea / banarea utilizatorului[/size][/b][/color][/center]\n[/td]\n[td style="background-image: url(http://i59.tinypic.com/rtesyv.jpg);width: 155px;  background-repeat: no-repeat;" width="84"][/td]\n[/tr]\n[/table]',
                group_id: 7,
                type: "default"
            },
            {
                name: "Promovare respinsa",
                message: '[table style="border: 1px solid #950000;" cellspacing="0" width="100%"][tr][td style="background-image: url(http://i39.servimg.com/u/f39/11/80/17/98/promov10.png); background-repeat: no-repeat;" height="100" width="100"][/td][td style="background: url(http://i39.servimg.com/u/f39/11/80/17/98/promov11.png);padding-bottom: 15px;text-shadow: 1px 1px 1px white;"][center][size=20][b][color=#950000]Promovare respinsa[/color][/b][/size]\n[color=#950000][size=13]Motiv: Aici treceti si motivul.[/size][/color]\n[color=#950000][b][size=9]Editarea acestui mesaj de moderare poate duce pana la sanctionarea / banarea utilizatorului[/size][/b][/color][/center]\n[/td]\n[td style="background-image: url(http://i39.servimg.com/u/f39/11/80/17/98/promov12.png);width: 155px;  background-repeat: no-repeat;" width="84"][/td][/tr][/table]',
                group_id: 7,
                type: "default"
            }
        ];


        for(var xn = 0; xn < staff_members.length; xn++) {
            nv += '<tr><td width="100px;" style="border-right: 1px solid #00A5CD;padding: 5px;border-bottom: 1px solid #00A5CD;"><b><a href=" //help.forumgratuit.ro/u' + staff_members[xn].id + '">' + staff_members[xn].name + '</a></b></td><td style="border-bottom: 1px solid #00A5CD;padding: 5px;"><font color="' + staff_members[xn].hex + '" unselectable="on"><b>' + staff_members[xn].hex + '</b> (' + staff_members[xn].color_name + ')</font><div style="width: 20px; height: 20px;border-radius: 50%;float: right;background: ' + staff_members[xn].hexo + '"></div></td></tr>';
        }

        $(".ds53ad2").each(function () {
            $(this).append(nv);
        });

        if (_userdata.user_level < 1) return;

        console.log("MOD_TOOLS working");

        function zModGetTable(type, body) {
            var str = "";
            for (var y = 0; y < zModTabels.length; y++) str += (zModTabels[y].type === type) ? (body === "start") ? zModTabels[y].body_start : zModTabels[y].body_end : "";
            return str;
        }

        function zModGetModMessageByGroupId(f, g) {
            var str = "",
                c = 0,
                s = "",
                d = "red";
            for (var z = 0; z < zModMessages.length; z++) {
                if (zModMessages[z].group_id === f) {
                   if(f === 4)
                   {
                        str += "<li class='mod_editor_message group_" + zModMessages[z].group_id + "' id='group_" + z + "_" + zModMessages[z].group_id + "'><a style='cursor: pointer'><span class='message_e'><img src='" + zModMessages[z].message + "' alt='" + zModMessages[z].name + "' /></span></a></li>\n";
                        if (g === 0) zModInsertToSCEditor('#group_' + z + '_' + zModMessages[z].group_id + ' a', zModMessages[z].message, zModMessages[z].type);
                        c++;
                    } else {
                       if (typeof zModMessages[z].sanction !== "undefined") {
                            s = zModMessages[z].sanction;
                            if(s === "mustrare") d = "#dc9f10";
                        }
                        str += "<li class='mod_editor_message group_" + zModMessages[z].group_id + "' id='group_" + z + "_" + zModMessages[z].group_id + "'><a style='cursor: pointer'><span class='message_e'>" + zModMessages[z].name + "</span> <span class='sanction' style='color: "+ d +" !important'>" + s + "</span></a></li>\n";
                        if (g === 0) zModInsertToSCEditor('#group_' + z + '_' + zModMessages[z].group_id + ' a', zModMessages[z].message, zModMessages[z].type);
                        c++;
                        s = "";
                        d = "";
                    }

                }
            }
            if (g === 1) str = c;

            return str;
        }

        function zModInsertToSCEditor(e, t, i) {
            $(e).live("click", function(e) {
                $("#text_editor_textarea").sceditor("instance").insertText(zModGetTable(i, "start") + t, zModGetTable(i, "end"));
            });
        }

        function zModToggleSCEditor(o, i) {
            $(o).live("click", function(o) {
                $(i).toggle();
            });
        }


        for (var x = 0; x < zModGroups.length; x++) {
            if (zModGetModMessageByGroupId(zModGroups[x].id, 1) > 0) {

                if (zModGroups[x].id === 0) {
                    if (_userdata.user_level === 1) {
                        list += "<li class='mod_editor_section' id='list_" + zModGroups[x].id + "'><a style='cursor: pointer'>" + zModGroups[x].name + " (" + zModGetModMessageByGroupId(zModGroups[x].id, 1) + ")</a></li>" + zModGetModMessageByGroupId(zModGroups[x].id, 0);
                        zModToggleSCEditor("#list_" + zModGroups[x].id + " a", ".group_" + zModGroups[x].id + "");
                    }
                } else {
                    list += "<li class='mod_editor_section' id='list_" + zModGroups[x].id + "'><a style='cursor: pointer'>" + zModGroups[x].name + " (" + zModGetModMessageByGroupId(zModGroups[x].id, 1) + ")</a></li>" + zModGetModMessageByGroupId(zModGroups[x].id, 0);
                    zModToggleSCEditor("#list_" + zModGroups[x].id + " a", ".group_" + zModGroups[x].id + "");
                }

            }
        }

		zModInsertToSCEditor(".sceditor-button-code", "", "code");

        zModInsertToSCEditor(".sceditor-button-var", "", "variable");

        zModInsertToSCEditor(".sceditor-button-insertc", "", "mod_color");

        zModToggleSCEditor('.sceditor-button.sceditor-button-staff', '.mod_box');

        $("textarea, .sceditor-button div, .sceditor-button a, .sceditor-button a div").click(function() {
            $(".mod_box").hide();
        });

        $(".sceditor-button-source").click(function() {
            $(".sceditor-button-staff, .sceditor-button-insertc, .sceditor-image-staff").removeClass("disabled");
        });

        $(window).load(function() {

            $(".sceditor-group:last-child").before('<div class="sceditor-group"><a class="sceditor-button sceditor-button-var" title="Evidentiere variabila"><div unselectable="on" style="background: url(//i58.servimg.com/u/f58/19/68/00/03/js-1610.png) !important;">Evidentiere variabila</div></a><a class="sceditor-button sceditor-button-staff" title="Mesaje de moderare"><div unselectable="on" style="background: url(//i21.servimg.com/u/f21/11/80/17/98/n10.png) !important;">Mesaje de moderare</div></a><a class="sceditor-button sceditor-button-insertc" title="Inserare culoare de moderare"><div unselectable="on" style="background: url(//i21.servimg.com/u/f21/11/80/17/98/select10.png) !important;">Inserare culoare de moderare</div></a><div class="mod_box" style="display: none;resize: both;"><ul class="mod_groups" id="mod_box_i"><li class="saction_user" style="display: none;"><div>Salut '+ user_name +',</div><div>Adauga in casuta de mai jos numele utilizatorului care trebuie sanctionat.<input type="text" id="userv" name="userv" value="'+ getCookie("ut00") +'" /><a class="updateuserv">Actualizare</a></div></li>' + list + '</div></div></div><style>.sanction {font-size: 11px;color: red;float: right;font-weight: bold;text-transform: uppercase;}.sceditor-group {position: relative;}#quick_reply .mod_box li:first-child {border-radius: 4px 0px 4px 0px !important}.mod_box {z-index:99999 !important;position: absolute;top: 29px !important;left: 0px;border-radius: 4px !important;}div.sceditor-toolbar {overflow: visible !important;}.mod_editor_message {display: none;}.mod_editor_message {padding: 5px !important;box-shadow: 0px 1px 0px #ddd;font-size: 12px;}.mod_groups{line-height:1.5;font-size:11px;font-weight:400;height:200px !important}.message_e {display: block;width: 230px !important;}.sanction {margin-top: -18px;}.mod_box{-moz-background-clip:padding;-moz-border-radius:2px;-moz-box-shadow:1px 2px 4px rgba(0,0,0,0.2);-webkit-background-clip:padding-box;-webkit-border-radius:2px;-webkit-box-shadow:1px 2px 4px rgba(0,0,0,0.2);background:#fff;background-clip:padding-box;border:1px solid #ccc;border-radius:2px;box-shadow:1px 2px 4px rgba(0,0,0,0.2);color:#333;width:300px;line-height:1;padding:10px;position:absolute;z-index:999}.mod_editor_section{background:#f1f1f1;padding:5px;font-weight:700;border-bottom:1px solid #d7d7d7;text-align:left;text-transform:uppercase}.mod_editor_message{padding:2px 5px;text-align:left}.mod_groups{height:150px;overflow-y:scroll}.mod_groups li{list-style-type:none;margin-left:-40px}.mod_box{top:73px}#quick_reply .mod_groups li{margin-left:0}#quick_reply .mod_box{top:35px}</style>');

            $(".updateuserv").click(function () {
                console.log('event');
                usr = $("#userv").val();
                setCookie("ut00", usr, 30);
            });

        });

        $(".mod_editor_message").hide();



});    window.setInterval(function() {
        $(".pre-load").load("" + window.location.href + " .pre-load .support-section", function() {
            $(".statistics-info").load("" + window.location.href + ".statistics-info", function() {
                console.log("[CONSOLE LOG] All content was updated.");
            });
        });

    }, 120000);

    $("#fa_online_users").each(function (){
        var i = 0, fa_staff = $('#fa_groups').length;
        for(i; i < fa_staff; i++)
        {
            $('b > a', fa_staff[i]).each(function() {
                var colors = $(this).attr('style').split('color: ')[1];
                $(this).attr('style', 'background: ' + colors);
            });
        }
        $('ul.tabs').each(function() {
            var $active, $content, $links = $(this).find('a');
            $active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
            $active.addClass('active');
            $content = $($active[0].hash);
            $links.not($active).each(function() {
                $(this.hash).hide();
            });
            $(this).on('click', 'a', function(e) {
                $active.removeClass('active');
                $content.hide();
                $active = $(this);
                $content = $(this.hash);
                $active.addClass('active');
                $content.show();
                e.preventDefault();
            });
        });

        $("#get_total_posts").html(document.getElementById("get_total_posts").innerHTML.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $("#get_total_users").html(document.getElementById("get_total_users").innerHTML.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

        var forums = [4]; 
        var limit = 3; 

        var text = function(cont, tag) {
            tag = cont.getElementsByTagName(tag)[0];
            return (tag && tag.firstChild && tag.firstChild.nodeValue) || '';
        };
        for (var j = 0, f;
            (f = forums[j++]);) {
            var holder = document.getElementById('noutati_fg_' + f);
            if (!holder) continue;
            $.get('/feed/?f=' + f, function(xml) {
                var forum_title = text(xml, 'title'),
                    forum_desc = text(xml, 'description'),
                    topics = xml.getElementsByTagName('item'),
                    i = 0,
                    t = null;

                var html = '<div class="inner_news"><div class="news_title" onmouseover="$(this.nextSibling).show()" onmouseout="$(this.nextSibling).hide()">' + forum_title + '</div>';
                html += '<div class="news_desc" style="display:none">' + forum_desc + '</div><div class="news_topics">';

                for (;
                    (t = topics[i++]);) {
                    var topic_title = text(t, 'title'),
                        preview = text(t, 'description'),
                        link = text(t, 'link'),
                        time = text(t, 'pubDate');
                    var author = t.getElementsByTagName('guid')[0].nextSibling.firstChild.nodeValue;
                    html += '<div class="news_topic"><a href="' + link + '" class="news_topic_title" onmouseover="$(this.nextSibling).show()" onmouseout="$(this.nextSibling).hide()">' + topic_title + '</a>';
                    html += '<div class="news_topic_desc" style="display:none">' + preview + '</div><span class="news_topic_author">' + author + '</span><span class="news_topic_time">' + time + '</span></div>';
                    if (i >= limit) break;
                }
                holder.innerHTML = html + '</div></div>';
            });
        }
        document.getElementById("fa_online_users").innerHTML = document.getElementById("fa_online_users").innerHTML.replace(/<.?br>Motoare de cautare:/g, ", ");
        document.getElementById("fa_online_users").innerHTML = document.getElementById("fa_online_users").innerHTML.replace(/ :: (\d+) Motoar de cautare | :: (\d+) Motoare de cautare /g, "");
        $('span:contains("Google")', document.getElementById("fa_online_users")).replaceWith('<span class="chip" style="color: #9E8DA7; font-weight: 800;" class="username-coloured">Google [Bot]</span>');
        $('span:contains("bing")', document.getElementById("fa_online_users")).replaceWith('<span  class="chip" style="color: #9E8DA7; font-weight: 800;" class="username-coloured">Bing [Bot]</span>');
        document.getElementById("fa_online_users").innerHTML = document.getElementById("fa_online_users").innerHTML.replace(/Nici unul, /g, "");
    });
$(function () {
	"use strict";
	
	var a = "Nu aveti notificari noi";
	
	$("#fa_notifications, a.delete").click(function (){
		var b = $("#notif_list li").length;
		
		$(".see_all").hide();
		
		if(b === 1) {
			$(".see_all").before("<li class='null_notif' style='padding: 20px;'>"+ a +"</li>");
		}
		else if(b > 2){
			$(".see_all").show();
		}
	});	
});

 if (window.location.pathname === '/post' && window.location.href.search("reply") !== -1) {
        $.get("/t" + window.location.href.replace(/[^0-9\ ]/g, '') + "-", function(data) {
            $(".page-title + .topic-actions a[href^='/f44-'].nav", data).each(function() {
                if (_userdata.user_level === 0) {
                    if ($(".facebook-like + .post .author a", data).text() != _userdata.username) {
                        window.location.replace("http://help.forumgratuit.ro");
                    }
                }
            });
        }, "html");
    }


    $(".new-message").parent().addClass("newpm");

    $('[type="radio"]').after('<span class="fa fa-check"></span>');
    var head = document.getElementById('page-header');
    if (head) {
        for (var cleanURI = window.location.href.replace(/\?.*|#.*/, ''), a = head.getElementsByTagName('A'), i = 0, j = a.length; i < j; i++) {
            if (/mainmenu/.test(a[i].className) && cleanURI == a[i].href.replace(/\?.*|#.*/, '')) {
                a[i].className += ' fa_navactif';
                break;
            }
        }
    }


    if (_userdata.session_logged_in === 1) $('#fa_welcome').prepend(_userdata.avatar);

    if (location.pathname == '/post' && location.search == '?f=35&mode=newtopic') $('#textarea_content textarea').val('Tipul de imagine: \nMarimea imaginii (in pixels): \nCu sau fara animatie: \nCuloarea de fundal: \nImagine/i link/s: \nTextul dorit: \nCuloare/i font: \nLink-ul forumului dumneavoastra:\nNumele dvs. in cadrul forumului: \nInformatii suplimentare: \n');
    $(".inputbox.post.ltr:last-child").after('<div class="note_email"><i class="fa fa-info-circle"></i> Introduceti o adresa la care aveti acces in acest moment, pentru ca este necesarea confirmarea pe e-mail.</div>');
    location.pathname == '/post' && $(function() {
        if (!document.post || document.post.mode.value != 'newtopic' || (document.post.f.value != 13 && document.post.f.value != 14)) return;
        $(document.post.poll_title).closest('fieldset').html('<strong>Sondajul a fost adaugat  automat.</strong><input type="hidden" name="poll_title" value="Sunteti de acord cu aceasta propunere?" /><input type="hidden" name="poll_option_text" value="Sunt de acord\nNu sunt de acord"><input type="hidden" name="poll_length" value="30" /><input type="hidden" name="poll_cancel_vote" value="1" />');
    });
    var lang = {
            display_as: '<b>Afiseaza rezultate din : </b>',
            posts: 'Mesaje',
            topics: 'Subiecte',
            tags: '<b>Hashtag : </b>',
            advanced: '<b>Cautare avansata</b>',
            options_title: 'Search options'
        },
        search = document.getElementById('search'),
        settings = document.createElement('DIV'),
        opts = document.createElement('A');
    if (search) {
        settings.style.display = 'none';
        settings.id = 'fa_search_settings';
       
        settings.innerHTML = '<p>' + lang.display_as + '</p><p><input id="searchOptsPosts" type="radio" name="show_results" value="posts"/><label for="searchOptsPosts">' + lang.posts + '</label><input id="searchOptsTopics" type="radio" name="show_results" value="topics" checked="true"/><label for="searchOptsTopics">' + lang.topics + '</label></p><p><label for="searchOptsTags">' + lang.tags + '</label> <input id="searchOptsTags" type="checkbox" name="is_tag" value="tags"/></p><hr class="dashed"/><p><a href="/search">' + lang.advanced + '</a></p>';
        opts.href = '#';
        opts.title = lang.options_title;
        opts.id = 'fa_search_opts';
    
        opts.onclick = function(e) {
            e.preventDefault();
            var settings = document.getElementById('fa_search_settings');
            settings.style.display = /none/.test(settings.style.display) ? 'block' : 'none';
        };
       
        search.search_keywords.onfocus = function() {
            var settings = document.getElementById('fa_search_settings');
            if (!/none/.test(settings.style.display)) settings.style.display = 'none';
        };
        search.appendChild(opts);
        search.appendChild(settings);
    }

    var area = document.getElementById('fa_textarea');
    if (area) {
        if (area.setAttribute) area.setAttribute('style', 'text-indent:0px !important;');
        area.value = 'Căutare...';
        area.onclick = function() {
            if (this.value == 'Căutare...') this.value = '';
        };
        area.onblur = function() {
            if (!this.value) this.value = 'Căutare...';
        };
        document.getElementById('fa_magnifier').onclick = function() {
            this.parentNode.submit();
        };
    }
    var noclick = document.getElementById('textarea_content');
    if (noclick) {
        $("#text_editor_textarea").length && ($(window).on("beforeunload", function() {
            if ($(".sceditor-container textarea").val().length || $(".sceditor-container iframe").contents().find("body").text().length) return "";
        }), $("form[name='post']").submit(function() {
            $(window).off("beforeunload");
        }));
    }
    /*
    $("#p" + window.location.hash.replace("#", "")).each(function () {
		$(this).attr("style", "box-shadow: 0px 0px 13px rgba(151, 8, 8, 0.81);");
	});
	*/

$(function() {
    $(".page-title + .topic-actions a[href^='/f44-'].nav").each(function () {
            if(_userdata.user_level === 0) {
                    if($(".facebook-like + .post .author a").text() != _userdata.username)
                    {
                            $('a[href^="/post?f=44"] + a').attr("href", "#").html("").hide();
                            $("#quick_reply").attr("action", "#").html('<div id="fa_notice" class="noti_warn"><strong>Nu sunteti autorizat sa raspundeti la acest subiect</strong><br/> Doar autorul acestui subiect si echipa poate raspunde.</div>');
                            $(".h3 + strong:contains(Puteti)").text($(".h3 + strong:contains(Puteti)").text().replace('Puteti', 'Nu puteti')); 
                    }
            }
    });
    var groups = [
            'admin', 
            'mod', 
            'asistent', 
            'designer', 
            'analist'
        ],

        profil = $('.postprofile, #preview'),
        html,
        post,
        i = 0,
        j = profil.length,
        k,
        l = groups.length;

    for (; i < j; i++) {
        html = profil[i].innerHTML.replace(/\n/gm, '');

        if (/class="st-rang.*?"/.test(html)) {
            html = html.replace(/.*class="st-rang\s(.*?)".*/, '$1').replace(/\s/g, '');
            post = profil[i].parentNode.parentNode;
            post.className += ' st-mod';

            for (k = 0; k < l; k++) {
                if (html == groups[k]) {
                    post.className += ' ' + groups[k];
                    break;
                }
            }
        }

    }$(function() {
    if (!_userdata.user_level || !document.getElementById('quick_reply') || !$('.quickmod').length) return;
    $('#quick_reply').prepend('<dl style="text-align:center;margin:3px auto;width:60%;padding:3px 0;"><dt style="float:left;font-size:11px;margin-top:4px;"><label style="color:#1675BC;">Icon subiect :</label></dt><dd id="iconlist"></dd></dl>');

   
    icon({
        name: 'Prestabilit',
        id: 0
    });

    icon({
        name: 'Important',
        id: 1,
        image: 'https://i37.servimg.com/u/f37/18/06/95/12/imp12.png'
    });

    icon({
        name: 'Rezolvat',
        id: 3,
        image: 'https://i37.servimg.com/u/f37/18/06/95/12/rezolv10.png'
    });
    icon({
        name: 'Terminat',
        id: 4,
        image: 'https://i37.servimg.com/u/f37/18/06/95/12/termin10.png'
    });
    icon({
        name: 'In progres',
        id: 2,
        image: 'https://i37.servimg.com/u/f37/18/06/95/12/in_pro11.png'
    });
    icon({
        name: 'In cos',
        id: 6,
        image: 'https://i37.servimg.com/u/f37/18/06/95/12/in_cos10.png'
    });

    icon({
        name: 'Tutorial',
        id: 7,
        image: 'https://i37.servimg.com/u/f37/18/06/95/12/tutori10.png'
    });
    icon({
        name: 'Unic',
        id: 8,
        image: 'https://i37.servimg.com/u/f37/18/06/95/12/unic10.png'
    });

    function icon(o) {
        $('#iconlist').append('<label><input name="post_icon" value="' + o.id + '" id="post_icon_' + o.id + '" type="radio"><span class="fa fa-check"></span>&nbsp;<span onclick="document.forms[\'post\'].post_icon_' + o.id + '.checked=true">' + (o.image ? '<img src="' + o.image + '" alt="' + o.name + '" title="' + o.name + '">' : o.name) + '</span></label>&nbsp;&nbsp;');
        $('.post h2.topic-title img').attr('src') == (o.image ? o.image : '//illiweb.com/fa/empty.gif') && (document.getElementById('post_icon_' + o.id).checked = true);
    }
});}),
$(function() {
  
  var config = {
    position_left : true, 
    negative_vote : false, 
    vote_bar : true, 
    
   
    icon_plus : '<img src="//i18.servimg.com/u/f18/18/21/41/30/plus10.png" alt="+"/>',
    icon_minus : '<img src="//i18.servimg.com/u/f18/18/21/41/30/minus10.png" alt="-"/>',
    
   
    title_plus : 'Multumeste-i lui %{USERNAME}\ pentru acest mesaj',
    title_minus : 'Dislike %{USERNAME}\'s post',
    
    title_like_singular : '%{VOTES} persoana apreciaza postarea lui %{USERNAME}',
    title_like_plural : '%{VOTES} persoane apreciaza postarea lui %{USERNAME}',
    
    title_dislike_singular : '%{VOTES} persoana nu ii place postarea lui %{USERNAME}',
    title_dislike_plural : '%{VOTES} persoane nu apreciaza postarea lui %{USERNAME}',
    
    title_vote_bar : '%{VOTES} persoane apreciaza postarea lui %{USERNAME} %{PERCENT}'
  },
      
      
 
  submit_vote = function() {
    var next = this.nextSibling, 
        box = this.parentNode,
        bar = box.getElementsByTagName('DIV'),
        vote = box.getElementsByTagName('A'),
        mode = /eval=plus/.test(this.href) ? 1 : 0,
        i = 0, j = vote.length, pos, neg, percent;
    

    $.get(this.href, function() {
      next.innerHTML = +next.innerHTML + 1;
      next.title = next.title.replace(/(\d+)/, function(M, $1) { return +$1 + 1 });
      
      pos = +vote[0].nextSibling.innerHTML;
      neg = vote[1] ? +vote[1].nextSibling.innerHTML : 0;
      percent = pos === 0 ? '0%' : pos == neg ? '50%' : Math.round(pos / (pos + neg) * 100) + '%';
      
      if (bar[0]) {
        bar[0].style.display = '';
        bar[0].firstChild.style.width = percent;
        box.title = box.title.replace(/\d+\/\d+/, pos + '/' + ( pos + neg )).replace(/\(\d+%\)/, '(' + percent + ')');
      }
    });
    
   
    for (; i < j; i++) {
      vote[i].href = '#';
      vote[i].className = vote[i].className.replace(/fa_vote/, 'fa_voted');
      vote[i].onclick = function() { return false };
    }
    
    return false;
  },
      
  vote = $('.vote'), i = 0, j = vote.length,
  version = $('.bodylinewidth')[0] ? 0 : document.getElementById('wrap') ? 1 : $('.pun')[0] ? 2 : document.getElementById('ipbwrapper') ? 3 : 'badapple', 
  
 
  vdata = {
    tag : ['SPAN', 'LI', 'SPAN', 'LI'][version],
    name : ['.name', '.postprofile dt > strong', '.username', '.popmenubutton'][version],
    actions : ['.post-options', '.profile-icons', '.post-options', '.posting-icons'][version],
  },
  
  post, plus, minus, n_pos, n_neg, title_pos, title_neg, li, ul, bar, button, total, percent, span, pseudo, vote_bar; 
  
  
  if (version == 'badapple') {
    if (window.console) console.warn('This plugin is not optimized for your forum version. Please contact the support for further assistance.');
    return;
  }
  
  for (; i < j; i++) {
    post = $(vote[i]).parentsUntil('.post').parent()[0];
    bar = $('.vote-bar', vote[i])[0]; 
    button = $('.vote-button', vote[i]); 
    pseudo = $(vdata.name, post).text() || 'MISSING_STRING'; 
    ul = $(vdata.actions, post)[0]; 
    li = document.createElement(vdata.tag); 
    li.className = 'fa_reputation';
    
    if (li.tagName == 'SPAN') li.style.display = 'inline-block';
    
    
    if (bar) {
      total = +bar.title.replace(/.*?\((\d+).*/, '$1');
      percent = +bar.title.replace(/.*?(\d+)%.*/, '$1');
      
      n_pos = Math.round(total * (percent / 100));
      n_neg = total - n_pos;
    } else {
      n_pos = 0;
      n_neg = 0;
    }
    
    
    title_pos = (n_pos == 1 ? config.title_like_singular : config.title_like_plural).replace(/%\{USERNAME\}/g, pseudo).replace(/%\{VOTES\}/g, n_pos);
    title_neg = (n_neg == 1 ? config.title_dislike_singular : config.title_dislike_plural).replace(/%\{USERNAME\}/g, pseudo).replace(/%\{VOTES\}/g, n_neg);
    
   
    li.innerHTML = '<span class="fa_count fa_positive" title="' + title_pos + '">' + n_pos + '</span>' + (config.negative_vote ? '&nbsp;<span class="fa_count fa_negative" title="' + title_neg + '">' + n_neg + '</span>' : '');
    span = li.getElementsByTagName('SPAN'); 
    
   
    plus = document.createElement('A');
    plus.href = button[0] ? button[0].firstChild.href : '#';
    plus.onclick = button[0] ? submit_vote : function() { return false };
    plus.className = 'fa_vote' + (button[0] ? '' : 'd') + ' fa_plus';
    plus.innerHTML = config.icon_plus;
    plus.title = (button[0] ? config.title_plus : title_pos).replace(/%\{USERNAME\}/g, pseudo);
    
    span[0] && li.insertBefore(plus, span[0]);
    
    
    if (config.negative_vote) {
      minus = document.createElement('A');
      minus.href = button[1] ? button[1].firstChild.href : '#';
      minus.onclick = button[1] ? submit_vote : function() { return false };
      minus.className = 'fa_vote' + (button[1] ? '' : 'd') + ' fa_minus';
      minus.innerHTML = config.icon_minus;
      minus.title = (button[1] ? config.title_minus : title_neg).replace(/%\{USERNAME\}/g, pseudo);
      
      span[1] && li.insertBefore(minus, span[1]);
    }
    
    
    if (config.vote_bar) {
      vote_bar = document.createElement('DIV');
      vote_bar.className = 'fa_votebar';
      vote_bar.innerHTML = '<div class="fa_votebar_inner" style="width:' + percent + '%;"></div>';
      vote_bar.style.display = bar ? '' : 'none';
      li.title = config.title_vote_bar.replace(/%\{USERNAME\}/, pseudo).replace(/%\{VOTES\}/, n_pos + '/' + (n_pos + n_neg)).replace(/%\{PERCENT\}/, '(' + percent + '%)');
      li.appendChild(vote_bar);
    }
    
    
    config.position_left ? ul.insertBefore(li, ul.firstChild) : ul.appendChild(li);
    vote[i].parentNode.removeChild(vote[i]);
  }
}),
$(function() {
    for (var a = document.getElementsByTagName('A'), main = document.getElementById('main-content'), c, i = 0, j = a.length; i < j; i++) {
        if (/.*\/t\d+.*/.test(window.location.href) && !/\/t5985-/.test(window.location.href) && /nav/.test(a[i].className) && /\/f18-cos-de-gunoi/.test(a[i].href) && !document.getElementById('fa_notice')) {
            c = document.createElement('DIV');
            c.id = 'fa_notice';
            c.className = 'noti_warn';
            c.innerHTML = 'Nu puteti raspunde la acest subiect deoarece acesta se afla in cosul de gunoi. Pentru a afla mai multe informatii despre trimiterea topicurilor in aceasta sectiune cititi <a href="t5985-de-ce-se-afla-subiectul-dumneavoastra-in-forumul-cos-de-gunoi#35399">acest subiect</a>.';
            main.insertBefore(c, main.firstChild)
        }
    }
});
