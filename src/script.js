// Globals
const url = 'https://api.artic.edu/api/v1/artworks/?page=3&limit=12'

// DOM Selectors
const largeImg = document.querySelector('#largeImage')
const firstRightImage = document.querySelector('#firstRightImage')
const secondRightImage = document.querySelector('#secondRightImage')
const thirdRightImage = document.querySelector('#thirdRightImage')

// Event Listeners
firstRightImage.addEventListener('click', renderAnArtwork);

// Render Functions
function renderAnArtwork(artwork){
    console.log(artwork)
    let imgId = artwork.image_id
    largeImg.src = `https://www.artic.edu/iiif/2/${imgId}/full/400,/0/default.jpg`
    artistName.textContent = artwork.artist_title
    artworkTitle.textContent = artwork.title
    artworkDescription.textContent = artwork.thumbnail['alt_text']
}

function iterateItems(data){
    let firstImage = data[1]
    let secondImage = data[2]
    let thirdImage = data[3]
    rightMenu(firstImage, secondImage, thirdImage)
}

function rightMenu(artwork, artwork2, artwork3){
    let imageId1 = artwork.image_id
    let imageId2 = artwork2.image_id
    let imageId3 = artwork3.image_id
    firstRightImage.src = `https://www.artic.edu/iiif/2/${imageId1}/full/200,/0/default.jpg`
    secondRightImage.src = `https://www.artic.edu/iiif/2/${imageId2}/full/200,/0/default.jpg`
    thirdRightImage.src = `https://www.artic.edu/iiif/2/${imageId3}/full/200,/0/default.jpg`
}


// function to display details on the left
// function to add selected artwork to cart
// function to favorite selected artwork
// function to search


// Fetchers
function getData(url){
    return fetch(url)
    .then(res => res.json())
    .then(artworkData => 
        {
            renderAnArtwork(artworkData.data[0])
            iterateItems(artworkData.data)
        })
}

getData(url)

