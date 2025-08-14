// let links = undefined;
let heightbox = undefined;
// let navbar = undefined;
let myskills = [];

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
            if(lnk.dataset.mylink != undefined){
                let thelink = lnk.dataset.mylink.split("#")[1];

                if (thelink == `${theid}`) {
                    lnk.classList.add('active');
                    // lnk.classList.add('w3-white');
                } else {
                    lnk.classList.remove('active');
                    // lnk.classList.remove('w3-white');
                }
                console.log(`checking link ${theid} vs ${thelink}`);
            }
        })
    })
})

window.addEventListener('load', e => {
    renderSkillz('#skills_main',"main");
    renderSkillz('#skills_sec',"sec");

    mekExtras();
    mekVars();
    mekEvents();

    renderProjects('#doneprojos','',true,6);
    renderProjects('#ongoingprojos','',false,6);
    showprods('#tehtable');
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
    myskills = [
        {
            category : "myprojects", 
            title: "uploader premium",
            link: "http://haoselkenya.com/pjs/cfw/uploader-premium/",
            img: "images/project_1.png",
            desc: "an upload manager i made to hold my editing projects plus as an online backup for som e of my files",
            tech: "html,css,js,php,json",
            client: "personal project"
        },{
            category : "myprojects", 
            title: "Foodacious",
            link: "http://haoselkenya.com/pjs/cfw/uploader-premium/",
            img: "images/project_5.png",
            desc: "a wordpress e-commerce site i made to figure out selling and buying stuff online",
            tech: "html,css,js,php,json,wordpress",
            client: "personal project"
        }
    ]
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

    let skills = document.querySelectorAll('.skill');

    skills.forEach(el => {
        el.addEventListener('click',e => {
            toggleShowB('#infomodal','flex','none');

            let hed = infomodal.querySelector('h1');
            let par = infomodal.querySelector('p');

            hed.innerHTML = el.querySelector('.subtxt').innerHTML;
            par.innerHTML = el.querySelector('.mydata').innerHTML;
        })
    })
}

function renderProjects(where,type,isdone,limit) {
    let thebox = document.querySelector(where);

    if(thebox != null){
        thebox.innerHTML = '';
        let mylist = [];
        let count = 0;

        projects.forEach(el => {
            if(el.isdone == isdone && count < limit){
                mylist.push(el);
                count += 1;
            } else {
                console.log("not done");
            }
        });

        console.log(count,mylist);

        mylist.forEach(el => {
            thebox.innerHTML += `
                <div class="project">
                    <img src="images/${el.img}" alt="${el.title} image" class="theimg">
                    <div class="caption">
                        <div class="pname">${el.title}</div>
                        <a target="_blank" href="${el.link}" class="themebtn">visit</a>
                    </div>
                </div>
            `;
        })
    }
}

function showprods(where) {
    let thebox = document.querySelector(where);

    if(thebox != null){
        let html = `
            <table>
                <thead>
                    <tr>
                        <th>title</th>
                        <th>category</th>
                        <th>link</th>
                    </tr>
                </thead>
        `;

        projects.forEach(el => {
            let ver = el.isdone ? "done" : "prototype";
            html += `
                <tr>
                    <td>${el.title}</td>
                    <td><b class="w3-tag w3-orange">${el.cat}</b></td>
                    <td><a target="_blank" href="${el.link}" class="themebtn">visit</a></td>
                </tr>
            `;
        })

        html += `
            </table>
        `;

        thebox.innerHTML = html;
    } else {
        alert('display missing')
    }
}

function renderSkillz(where,cat) {
    let showbox = document.querySelector(where);
    let touse = [];

    skills.forEach(el => {
        if(el.cat == cat){
            touse.push(el);
        }
    })

    if(showbox != undefined){
        showbox.innerHTML = ``;

        touse.forEach(el => {
            showbox.innerHTML += `
                <div class="skill">
                    <div class="skilllvl">${el.level}</div>
                    <img src="images/${el.img}" alt="${el.skillname} icon">
                    <span class="subtxt">${el.skillname}</span>
                    <div class="mydata w3-hide">
                        ${el.desc}
                    </div>
                </div>
            `;
        })
    }
}