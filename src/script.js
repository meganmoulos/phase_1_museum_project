// Globals
const url = 'https://api.artic.edu/api/v1/artworks/?page=3&limit=3'
let selectedArtwork;

// DOM Selectors
const largeImg = document.querySelector('#largeImage')
const unorderedList = document.querySelector('#rightMenuList')
const leftContainer = document.querySelector('#leftContainer')
const favoriteButton = document.querySelector('#favoriteButton')
const aboutMenuItem = document.querySelector('#about')
const contactMenuItem = document.querySelector('#contact')
const aboutCard = document.querySelector('#aboutCard')
const contactCard = document.querySelector('#contactCard')
const addToCartBtn = document.querySelector('#cartButton')

// Event Listeners
favoriteButton.addEventListener('click', changeFavorite)
aboutMenuItem.addEventListener('click', function() {aboutCard.style.display = '';})
contactMenuItem.addEventListener('click', function() {contactCard.style.display = '';})
addToCartBtn.addEventListener('click', addArtworkToCart)

// Render Functions
function renderAnArtwork(artwork){
    selectedArtwork = artwork
    largeImg.src = getImageSource(artwork.image_id)
    artistName.textContent = artwork.artist_title
    artworkTitle.textContent = artwork.title
    artworkDescription.textContent = artwork.credit_line
    favoriteButton.style.background = ''
    favoriteButton.style.color = ''
    addToCartBtn.style.background = ''
    addToCartBtn.style.color = ''
}

function renderRightImage(artwork){
    selectedArtwork = artwork
    const newLi = document.createElement('li')
    const newImg = document.createElement('img')
    newImg.src = getImageSource(artwork.image_id)
    newImg.setAttribute('id', 'rightImg')
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

function changeFavorite(e){
    e.target.style.background = 'red'
    e.target.style.color = 'white'
}

function addArtworkToCart(e){
    e.target.style.background = 'green'
    e.target.style.color = 'white'
    let successMessage = document.createElement('h5')
    successMessage.textContent = 'Added to Cart!' 
    leftContainer.appendChild(successMessage)
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