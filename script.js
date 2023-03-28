let elForm = getBy("#form");
let elGenre = getBy("#genre");
let cardTemp = getBy("#card").content;
let elList = getBy("#item");
let modTemp = getBy("#modal-template").content;



elForm.addEventListener("submit",evt=>{
    evt.preventDefault();

    let {search,genre,sorted} = evt.target.elements;


    let regex = new RegExp(search.value.trim(),"gi");

    let searchFilm = films.filter((film)=> film.Title.match(regex));
   console.log(searchFilm);
   
    if(genre.value !="all"){
        let filterGenre = searchFilm.filter((film)=>film.genres.includes(genre.value));
        searchFilm = filterGenre;
    }



    if(sorted.value == "a-z"){
        searchFilm.sort((a,b)=> {
            if(a.Title>b.Title){
                return 1;
            }else if (a.Title<b.Title){
                return -1;
            }else{
                return 0;
            }
        })
    }else if(sorted.value == "z-a"){
        searchFilm.sort((a,b)=>{
            if(a.Title<b.Title){
                return 1;
            }else if(a.Title>b.Title){
                return -1;
            }else{
                return 0;
            }
        })
    }else if(sorted.value == "new-old"){
        searchFilm.sort((a,b)=>{
            if(a.Year>b.Year){
                return 1;
            }else if(a.Year<b.Year){
                return -1;
            }else{
                return 0;
            }
        })
    }else if(sorted.value == "old-new"){
        searchFilm.sort((a,b)=>{
            if(a.Year<b.Year){
                return 1;
            }else if(a.Year>b.Year){
                return -1;
            }else{
                return 0;
            }
        });
    }
renderFunc(searchFilm,elList);
})

function renderGenre(array,element){
    let genArr=[];
    array.forEach((film) => {
        film.genres.forEach(genre =>{
        !genArr.includes(genre)? genArr.push(genre) : null;
        })

    });
    
    

    genArr.forEach((genre) => {
    let newOption = create("Option");
    newOption.textContent= genre;
    newOption.value = genre;


    element.append(newOption);

    });
}
renderGenre(films,elGenre);

function renderFunc(array,element){
element.innerHTML = null;
array.forEach(film => {
    let cloneTemp = cardTemp.cloneNode(true);


    let li = getBy("li",cloneTemp);
    let img = getBy("img",cloneTemp);
    let h2 = getBy("h2",cloneTemp);
    let btn = getBy("button",cloneTemp);

    img.src = film.Poster;
    h2.textContent = film.Title;
    btn.dataset.id = film.id;


    btn.addEventListener("click", evt=>{
        let filmId = evt.target.dataset.id;
        let cloneTempMod = modTemp.cloneNode(true);

        let films= array.find((item)=>item.id == filmId);
        let mod = getBy("#modal",modTemp);
        let iframe = getBy("iframe",modTemp);
        let h2 = getBy("h2",modTemp);
        let h3 = getBy("h3",modTemp);
        let p = getBy("p",modTemp);

        iframe.src = films.link;
        h2.textContent = films.Title;
        h3.textContent = `Genres: ${films.genres.join(", ")}`;
        p.textContent = films.overview;


        document.querySelector("body").append(mod);
    })

    element.append(li)
})
}
renderFunc(films,elList);

function delModal(){
    const elMod = document.getElementById("modal");
    elMod.remove();
}

