// Globals
const url = 'https://api.artic.edu/api/v1/artworks/?page=2&limit=50'

// DOM Selectors
const largeImg = document.querySelector('#largeImage')
const firstRightImage = document.querySelector('#firstRightImage')
const secondRightImage = document.querySelector('#secondRightImage')
const thirdRightImage = document.querySelector('#thirdRightImage')

// Event Listeners

// Render Functions
function renderAnArtwork(artwork){
    largeImg.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`
}

function iterateItems(data){
    data.forEach(item => {
        rightMenu(item)
    })
}

function rightMenu(artwork){
    let imageId = artwork.image_id
    firstRightImage.src = `https://www.artic.edu/iiif/2/${imageId}/full/200,/0/default.jpg`
    secondRightImage.src = `https://www.artic.edu/iiif/2/${imageId}/full/200,/0/default.jpg`
    thirdRightImage.src = `https://www.artic.edu/iiif/2/${imageId}/full/200,/0/default.jpg`
    console.log(imageId)
}


// Fetchers
function getData(url){
    return fetch(url)
    .then(res => res.json())
    .then(artworkData => 
        {
            console.log(artworkData)
            renderAnArtwork(artworkData.data[0])
            iterateItems(artworkData.data)
        })
}

getData(url)

