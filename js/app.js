window.addEventListener("load", init);



var niz_clanova= [];

var clan1 = {
    'id' : "1",
    'ime_prezime' : "Alen Alizoti",
    'godine' : 2004,
    'email' : "aalizoti722it@raf.rs",
    'vrsta_clana' : "povlasceni",
    'clanarina' : 3000,
    'originalna_cena' : 3000
};
var clan2 = {
    'id' : "2",
    'ime_prezime' : "David Stojanovic",
    'godine' : 2003,
    'email' : 'dstojanovic6722it@raf.rs',
    'vrsta_clana' : 'regularni',
    'clanarina' : 3000,
    'originalna_cena' : 3000
};
var clan3 = {
    'id' : "3",
    'ime_prezime' : "Mika Mikic",
    'godine' : 2001,
    'email' : 'mikamikic@gmail.com',
    'vrsta_clana' : 'regularni',
    'clanarina' : 3000,
    'originalna_cena' : 3000
};

function proveri_vrstu_clana(clanovi){
    for (const clan of clanovi) {
        if(clan.vrsta_clana == 'povlasceni') {
            clan.clanarina = clan.clanarina - (clan.clanarina * 0.2);
            return true;
        }
    }
    return false;
}

function vrati_clanarinu(clanarina){
    clanarina = parseInt(clanarina);
    return clanarina;
}

function init(){
    niz_clanova.push(clan1,clan2,clan3);
    proveri_vrstu_clana(niz_clanova);
    var dugme_dodaj = document.getElementById('dugme_dodaj');
    dugme_dodaj.addEventListener("click",proveri);
    // dugme_dodaj.addEventListener("click",tajmer );
    niz_clanova = JSON.parse(localStorage.getItem("clanovi")) || [];
    dodaj_u_tabelu();
    var update_div = document.querySelector('.update-div');
    var glavni = document.querySelector('.glavni');
    update_div.style.display = "none";
    glavni.style.display = "none";

    
}

function validiraj_id(id){
    for (const clan of niz_clanova) {
        if(clan.id == id){
            return "Uneti ID vec postoji!"
        }
    }
    if (id == ""){
        return "Popunite polje za ID!"
    }
    else if(isNaN(parseInt(id))){
        return "ID mora biti broj!"
    }
   
    return "";
    
}

function validiraj_ime_prezime (ime_prezime){
    
    var delovi = ime_prezime.split(" ");
    if(delovi.length < 2 || delovi[0].trim() == '' || delovi[1].trim() == ""){
        return 'Unos mora sadržati tačno ime i prezime!';
    }

    return "";
}

function validiraj_godinu(godina){
    
    godina = parseInt(godina);

    if (isNaN(godina)  || godina < 1920 || godina > 2024) {
        return 'Input je prazan ili nije validan broj.'
    }
   
    return "";
    
}
function validiraj_email(email) {
   if(email.includes('@') && email.includes(".")){
        var pozicijaAt = email.indexOf("@");
        var pozicijaTacke = email.indexOf(".");
        var izmedjuAtiTacke = email.substring(pozicijaAt + 1, pozicijaTacke);
        var posleTacke = email.substring(pozicijaTacke + 1, email.length);
        var preAt = email.substring (0, pozicijaAt);
        if(izmedjuAtiTacke.length < 2){
            return "Unos nije validan!"
        }
        else if(posleTacke.length < 2){
            return "Unos nije validan!"
        }
        else if (preAt.length < 3) {
            return "Unos nije validan!"
        }
   }
   else{
        return "Unos nije validan!"
   }

   return "";
}
function validiraj_clanarinu(clanarina){
    clanarina = parseInt(clanarina);
    if(clanarina < 0){
        return "Cena za clanarinu ne sme biti negativna!";
    }
    else if(isNaN(clanarina)){
        return "Unos nije validan!";
    }
   
    return "";
}

var interval = null;
var procenti = 100;

function tajmer(){
    if(interval == null){
        interval = setInterval(otkucaj, 1000);
    }
}
var vreme = 30;

function otkucaj(){
    var tajmer_div = document.querySelector('.tajmer');
    var izraz = document.querySelector('.izraz');
    var roditelj = document.querySelector('.roditelj');
    var smanji_vreme = 100/vreme
    tajmer_div.style.width = `${procenti}%`;

    
    if(procenti - smanji_vreme > 0){
        procenti -= smanji_vreme;
    }    
    else {
        alert('Vreme je isteklo!')
        izraz.style.display = 'none'
        roditelj.style.display = 'none'
        clearInterval(interval);
        interval = null;
        procenti = 100;
        document.getElementById('id').value = "";
        document.getElementById('ime_prezime').value = "";
        document.getElementById('godine').value = "";
        document.getElementById('email').value = "";
        document.getElementById('regularni').checked = true;
        document.getElementById('clanarina').value = "";
        return false
    }
}


function generisiOperaciju() {
    var broj1 = Math.floor(Math.random() * 10) + 1;
    var broj2 = Math.floor(Math.random() * 10) + 1;
    var operacije = ['+', '-', '*', '/'];
    var operacija = operacije[Math.floor(Math.random() * operacije.length)];

    return {
        broj1: broj1,
        broj2: broj2,
        operacija: operacija
    };
}
function izracunajRezultat(zadatak) {
    switch (zadatak.operacija) {
        case '+':
            return zadatak.broj1 + zadatak.broj2;
        case '-':
            return zadatak.broj1 - zadatak.broj2;
        case '*':
            return zadatak.broj1 * zadatak.broj2;
        case '/':
            if(zadatak.broj1 > zadatak.broj2){

                return Math.round(zadatak.broj1 / zadatak.broj2);
            }
            else if(zadatak.broj2 > zadatak.broj1){

                return Math.round(zadatak.broj2 / zadatak.broj1);
            }
            else{
                return zadatak.broj1 / zadatak.broj2
            }
        default:
            return NaN; // Nepoznata operacija
    }
}


function proveri(){
    
    var izraz = document.querySelector('.izraz');
    var roditelj = document.querySelector('.roditelj');
    var id = document.getElementById('id').value;
    var ime_prezime = document.getElementById('ime_prezime').value;
    var godine = document.getElementById('godine').value;
    var email = document.getElementById('email').value;
    var regularni = document.getElementById('regularni');
    var povlasceni = document.getElementById('povlasceni');
    var clanarina = document.getElementById('clanarina').value;

    

    var greska_id = document.querySelector('.greska_id');
    var greska_ime_prezime = document.querySelector('.greska_ime_prezime');
    var greska_godine = document.querySelector('.greska_godine');
    var greska_email = document.querySelector('.greska_email');
    var greska_clanarina = document.querySelector('.greska_clanarina');

    greska_id.innerHTML = validiraj_id(id);
    greska_ime_prezime.innerHTML = (validiraj_ime_prezime(ime_prezime));
    greska_godine.innerHTML = validiraj_godinu(godine);
    greska_email.innerHTML = validiraj_email(email);
    greska_clanarina.innerHTML = validiraj_clanarinu(clanarina);

    var greske = document.getElementsByClassName('greska');
    for (const greska of greske) {
        if(greska.innerHTML == ""){
            console.log("Sve je proslo kako treba!");
            tajmer()
        }
        else{
            console.log("Unos nije validan!")
            return false;

        }
    }
    izraz.style.display = 'block'
    roditelj.style.display = 'flex'

    var matematickiIzraz = generisiOperaciju()
    var resenje = izracunajRezultat(matematickiIzraz)
    var pResenje = document.getElementById('resenje');
    pResenje.value = resenje
    var izrazUpis = document.getElementById('matematickiIzraz');
    if(matematickiIzraz.broj2 > matematickiIzraz.broj1 && matematickiIzraz.operacija == '/'){
        izrazUpis.innerHTML = `${matematickiIzraz.broj2} ${matematickiIzraz.operacija} ${matematickiIzraz.broj1}`
    }
    else{
        izrazUpis.innerHTML = `${matematickiIzraz.broj1} ${matematickiIzraz.operacija} ${matematickiIzraz.broj2}`
    }
    

   

    var dugme_za_proveru = document.getElementById('dugme_proveri');
    dugme_za_proveru.addEventListener('click',dodaj_clana)

}
function dodaj_clana(){
    var izraz = document.querySelector('.izraz');
    var roditelj = document.querySelector('.roditelj');
    var pResenje = document.getElementById('resenje').value;
    var odgovor = document.getElementById('odgovor').value
    var resenje = pResenje
    if(odgovor != resenje){
        alert('Netacan rezultat!');
        izraz.style.display = 'none'
        roditelj.style.display = 'none'
        document.getElementById('id').value = "";
        document.getElementById('ime_prezime').value = "";
        document.getElementById('godine').value = "";
        document.getElementById('email').value = "";
        document.getElementById('regularni').checked = true;
        document.getElementById('clanarina').value = "";
        clearInterval(interval);
        interval = null;
        procenti = 100;
        document.getElementById('odgovor').value = "";
        return false;
    }


    var id = document.getElementById('id').value;
    var ime_prezime = document.getElementById('ime_prezime').value;
    var godine = document.getElementById('godine').value;
    var email = document.getElementById('email').value;
    var regularni = document.getElementById('regularni');
    var povlasceni = document.getElementById('povlasceni');
    var clanarina = document.getElementById('clanarina').value;

    
    var vrsta_clana;

    if(regularni.checked){
        vrsta_clana = "regularni"
    }
    else if(povlasceni.checked){
        vrsta_clana = "povlasceni"
    }

    var clan = {
        'id' : id,
        'ime_prezime' : ime_prezime,
        'godine' : godine,
        'email' : email,
        'vrsta_clana' : vrsta_clana,
        'clanarina' : clanarina,
        'originalna_cena' : clanarina
    };
    
    if (vrsta_clana == 'povlasceni') {
        proveri_vrstu_clana([clan]);
    }
  
    
    niz_clanova.push(clan);
    localStorage.setItem("clanovi", JSON.stringify(niz_clanova));
    dodaj_u_tabelu();
    clearInterval(interval);
    interval = null;
    document.getElementById('id').value = "";
    document.getElementById('ime_prezime').value = "";
    document.getElementById('godine').value = "";
    document.getElementById('email').value = "";
    document.getElementById('regularni').checked = true;
    document.getElementById('clanarina').value = "";
    izraz.style.display = 'none';
    roditelj.style.display = 'none';
    procenti = 100;
    document.getElementById('odgovor').value = "";
    
}



function dodaj_u_tabelu(){
    var tabela = document.getElementById('tabela');
    tabela.innerHTML = `
    <table>
        <tr>
            <th>ID</th>
            <th>Ime i prezime</th>
            <th>Godiste</th>
            <th>Email</th>
            <th>Vrsta clana</th>
            <th>Clanarina</th>
            <th colspan ="2">Opcije</th>
        </tr>
    </table>`

    var brojac = 0;
    for (const clan of niz_clanova) {
        
        var novi_red = document.createElement('tr');
        for (const key in clan) {
            if (Object.hasOwnProperty.call(clan, key)) {
                const element = clan[key];
                var novi_td = document.createElement('td');
                novi_td.innerHTML = element;    
                if (key === 'clanarina' && element === undefined) {
                    novi_td.innerHTML = clan.originalna_cena;
                }
                if(key != 'originalna_cena'){
                    novi_red.appendChild(novi_td);
                }
                
            }
        }
        
        var delete_td = document.createElement('td');
        delete_td.innerHTML = 'Obrisi';
        delete_td.id = `obrisi_${brojac}`;
        delete_td.addEventListener('click', obrisi);
        var update_td = document.createElement('td');
        update_td.innerHTML = 'Azuriraj';
        update_td.id = `azuriraj_${brojac}`;
        update_td.addEventListener('click', azuriraj);
        delete_td.style.cursor = 'pointer';
        update_td.style.cursor = 'pointer';
        novi_red.appendChild(delete_td);
        novi_red.appendChild(update_td);
        brojac++;
        tabela.append(novi_red);
    }


    
}


function obrisi(event){
    var meta = event.target;
    // console.log(meta);
    id_mete = meta.id;
    var delovi = id_mete.split("_");
    var pozicija = delovi[1];
    niz_clanova.splice(pozicija,1);
    localStorage.setItem("clanovi", JSON.stringify(niz_clanova));
    dodaj_u_tabelu();
}


function azuriraj(event){
    var meta = event.target;
    id_mete = meta.id;
    var delovi = id_mete.split("_");
    var pozicija = delovi[1];
    var clan = niz_clanova[pozicija];
    console.log(clan);
    var update_div = document.querySelector('.update-div');
    var glavni = document.querySelector('.glavni');
    update_div.style.display = "flex";
    glavni.style.display = "flex";
    update_div.style.backgroundColor = "gray"
    glavni.style.backgroundColor = "rgba(0,0,0,0.2)"
    update_div.innerHTML = "";
    update_div.innerHTML = `
    <p>
    <label for="id">Unesite ID:</label>
    <input type="text" name="id" id="id_update" value= "${clan.id}" readonly>
</p>
<p>
    <label for="ime_prezime">Unesite ime i prezime:</label>
    <input type="text" name="ime_prezime" id="ime_prezime_update" value= "${clan.ime_prezime}">
    <span class="greska_ime_prezime_update greska"></span>
</p>
<p>
    <label for="godine">Unesite godinu rodjenja:</label>
    <input type="text" name="godine" id="godine_update" value= "${clan.godine}">
    <span class="greska_godine_update greska"></span>
</p>
<p>
    <label for="email">Unesite email:</label>
    <input type="text" name="email" id="email_update" value= "${clan.email}">
    <span class="greska_email_update greska"></span>
</p>`

    if(clan.vrsta_clana == 'povlasceni'){
        update_div.innerHTML += `
        <div class="radio">
            <label for="vrsta_clana">Izaberite tip clana:</label>
            <div>
                <input type="radio" name="vrsta_clana_update" id="regularni_update" >Regularni
                <input type="radio" name="vrsta_clana_update" id="povlasceni_update" checked>Povlasceni
            </div>
        </div>`
    }
    else{
        update_div.innerHTML += `
    <div class="radio">
        <label for="vrsta_clana">Izaberite tip clana:</label>
        <div>
            <input type="radio" name="vrsta_clana_update" id="regularni_update" checked>Regularni
            <input type="radio" name="vrsta_clana_update" id="povlasceni_update">Povlasceni
        </div>
    </div>`
    }
    update_div.innerHTML += `
    <p>
    <label for="clanarina">Unesite cenu clanarine:</label>
    <input type="text" name="clanarina" id="clanarina_update" value = "${clan.clanarina}">
    <span class="greska_clanarina_update greska"></span>

</p>
<button id="update_dugme" onclick="update_clana(${pozicija})">Dodaj novog clana</button>
    `
}

function update_clana(pozicija){
    
    var clan = niz_clanova[pozicija];

    var id = document.getElementById('id_update').value;
    var ime_prezime = document.getElementById('ime_prezime_update').value;
    var godine = document.getElementById('godine_update').value;
    var email = document.getElementById('email_update').value;
    var regularni = document.getElementById('regularni_update');
    var povlasceni = document.getElementById('povlasceni_update');
    var clanarina = document.getElementById('clanarina_update').value;
    var prava_cena = vrati_clanarinu(clan.originalna_cena);


    var greska_ime_prezime = document.querySelector('.greska_ime_prezime_update');
    var greska_godine = document.querySelector('.greska_godine_update');
    var greska_email = document.querySelector('.greska_email_update');
    var greska_clanarina = document.querySelector('.greska_clanarina_update');

    greska_ime_prezime.innerHTML = (validiraj_ime_prezime(ime_prezime));
    greska_godine.innerHTML = validiraj_godinu(godine);
    greska_email.innerHTML = validiraj_email(email);
    greska_clanarina.innerHTML = validiraj_clanarinu(clanarina);

    var greske = document.getElementsByClassName('greska');
    for (const greska of greske) {
        if(greska.innerHTML == ""){
            console.log("Sve je proslo kako treba!");
        }
        else{
            console.log("Unos nije validan!")
            return false;
        }
    }

    var vrsta_clana;
    
    if(regularni.checked){
        vrsta_clana = "regularni"
        if(clan.vrsta_clana == 'povlasceni'){
            clanarina = prava_cena;
        }
    }
    else if(povlasceni.checked){
        vrsta_clana = "povlasceni"
        if(clan.vrsta_clana == 'regularni'){
            clanarina = clan.clanarina - (clan.clanarina * 0.2);
        }
    }   
    
    console.log(clanarina,clan.clanarina, clan.originalna_cena)
    
    var promenjeno = {
        'id' : id,
        'ime_prezime' : ime_prezime,
        'godine' : godine,
        'email' : email,
        'vrsta_clana' : vrsta_clana,
        'clanarina' : clanarina,
        'originalna_cena' : clan.originalna_cena
    };

    niz_clanova[pozicija] = promenjeno;
    localStorage.setItem("clanovi", JSON.stringify(niz_clanova));
    dodaj_u_tabelu();

    var update_div = document.querySelector('.update-div');
    update_div.innerHTML = "";
    var glavni = document.querySelector('.glavni');
    glavni.style.display = "none";
}

