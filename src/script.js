// Globals
const url = 'https://api.artic.edu/api/v1/artworks/?page=3&limit=4'
let selectedArtwork;

// DOM Selectors
const largeImg = document.querySelector('#largeImage')
const unorderedList = document.querySelector('#rightMenuList')

// Event Listeners


// Render Functions
function renderAnArtwork(artwork){
    console.log(artwork)
    selectedArtwork = artwork
    largeImg.src = getImageSource(artwork.image_id)
    artistName.textContent = artwork.artist_title
    artworkTitle.textContent = artwork.title
    artworkDescription.textContent = artwork.credit_line
}

function renderRightImage(artwork){
    console.log(artwork)
    selectedArtwork = artwork
    const newLi = document.createElement('li')
    const newImg = document.createElement('img')
    newImg.src = getImageSource(artwork.image_id)
    newLi.appendChild(newImg)
    newLi.onclick = () => {
        renderAnArtwork(artwork);
    }
    unorderedList.appendChild(newLi)
}

function iterateItems(data){
    data.forEach(artworkObj => renderRightImage(artworkObj))
}

function getImageSource(imgId){
    return `https://www.artic.edu/iiif/2/${imgId}/full/400,/0/default.jpg`
}

function changeImage() {
    renderAnArtwork(selectedArtwork)
}

// function to add selected artwork to cart
// function to favorite selected artwork
// function to search

// Fetchers
function getData(url){
    return fetch(url)
    .then(res => res.json())
    .then(artworkData => 
        {
            iterateItems(artworkData.data)
            renderAnArtwork(artworkData.data[0]) 
        })
}

getData(url)