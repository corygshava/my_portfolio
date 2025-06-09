// let links = undefined;
let heightbox = undefined;
// let navbar = undefined;

window.addEventListener('scroll', e => {
    // change up the navbar
    if (heightbox != undefined) {
        let theclass = (window.scrollY >= heightbox.offsetHeight) ? "scrolled" : "";
        navbar.className = theclass;
        console.log((window.scrollY >= heightbox.offsetHeight))
    }

    // get the current focus item
    let sects = document.querySelectorAll('.section.pageitem');
    let scrol = window.scrollY;
    let found = false;
    let theid = "";

    sects.forEach(el => {
        if (scrol >= (el.offsetTop - 20)) {
            // el.classList.add("w3-white");
            theid = el.id;
        } else {
            // el.classList.remove("w3-white");
        }
    });

    // update all alternate menus
    let menus = document.querySelectorAll('.menulinks');

    menus.forEach(el => {
        let links = el.querySelectorAll('a');

        links.forEach(lnk => {
            let thelink = lnk.dataset.mylink.split("#")[1];

            if (thelink == `${theid}`) {
                lnk.classList.add('active');
                // lnk.classList.add('w3-white');
            } else {
                lnk.classList.remove('active');
                // lnk.classList.remove('w3-white');
            }
            console.log(`checking link ${theid} vs ${thelink}`);
        })
    })
})

window.addEventListener('load', e => {
    mekExtras();
    mekVars();
    mekEvents();
})

// functions

function mekExtras() {
    heightbox = document.createElement('div');
    heightbox.className = "heightbox";
    heightbox.style.opacity = 0;

    document.body.appendChild(heightbox);

    document.querySelectorAll('a').forEach(el => {
        el.dataset.mylink = el.href;
    })
}

function mekVars() {
    // UI variables
}

function mekEvents() {
    menubtn.addEventListener('click', e => {
        let icon = menubtn.querySelector('i');

        let clicked = menubtn.dataset.clicked;
        menubtn.dataset.clicked = clicked == "1" ? "0" : "1";
        let rotto = clicked == "1" ? "0deg" : "180deg";
        let nxticon = clicked != "1" ? "fa-arrow-left" : "fa-bars";

        icon.style.rotate = rotto;
        icon.className = `fa ${nxticon}`;

        if (clicked == "1") {
            phonemenu.classList.remove("showme");
        } else {
            phonemenu.classList.add("showme");
        }
    })
}