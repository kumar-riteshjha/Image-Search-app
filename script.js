const accessKey = "WNsevaL08cOtbisNFOv3hnQcCncfvaGKOiJvX1PBsWQ";

const formElement = document.querySelector("form");
const inputElement = document.getElementById("Search-input");
const SearchResults = document.querySelector(".Search-results");
const showMore = document.querySelector(".show-more-btn");

let keyword = ""
let page = 1;

async function SearchImages(){
    keyword = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);

    const results = data.results;
    if (page === 1){
        SearchResults.innerHTML = ""
    };

    results.map((result)=>{
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("Search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textConstent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        SearchResults.appendChild(imageWrapper);
    });

    page++
    if(page>1){
        showMore.style.display="block";
   }
} ;

formElement.addEventListener("submit",(e)=>{
    e.preventDefault();
    page = 1;
    SearchImages();
});

showMore.addEventListener("click", () =>{
    SearchImages();
});