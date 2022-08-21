// Globals
const url = 'https://api.artic.edu/api/v1/artworks/'

// DOM Selectors
const largeImg = document.querySelector('#largeImage')
const firstRightImage = document.querySelector('#firstRightImage')
const secondRightImage = document.querySelector('#secondRightImage')
const thirdRightImage = document.querySelector('#thirdRightImage')

// Event Listeners

// Render Functions
function renderAnArtwork(artwork){
    largeImg.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`
    console.log(largeImg.src)
}


function iterateItems(data){
    data.forEach(item => {
        rightMenu(item)
    })
}

function rightMenu(artwork){
    firstRightImage.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`
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

