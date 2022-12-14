// Globals
let pageNum = 3
let nextUrl;
let prevUrl;
const url = `https://api.artic.edu/api/v1/artworks/?page=${pageNum}&limit=3`
const fullUrl = 'https://api.artic.edu/api/v1/artworks?page=1&limit=100'
let searchData;
let selectedArtwork;


// DOM Selectors
const largeImg = document.querySelector('#largeImage')
const unorderedList = document.querySelector('#rightMenuList')
const leftContainer = document.querySelector('#leftContainer')
const favoriteButton = document.querySelector('#favoriteButton')
const aboutMenuItem = document.querySelector('#about')
const contactMenuItem = document.querySelector('#contact')
const favoritesMenuItem = document.querySelector('#favorites')
const aboutCard = document.querySelector('#aboutCard')
const contactCard = document.querySelector('#contactCard')
const favoritesCard = document.querySelector('#favoritesCard')
const favoritesList = document.querySelector('#favoritesList')
const addToCartBtn = document.querySelector('#cartButton')
const cartSuccess = document.querySelector('#cartSuccess')
const nextPage = document.querySelector('#nextPage')
const prevPage = document.querySelector('#previousPage')
const form = document.querySelector('#searchForm')
const rightNavBar = document.querySelector('#offcanvasNavbar')

// Event Listeners
favoriteButton.addEventListener('click', changeFavorite)
aboutMenuItem.addEventListener('click', function() {aboutCard.style.display = '';})
contactMenuItem.addEventListener('click', function() {contactCard.style.display = '';})
favoritesMenuItem.addEventListener('click', function() {favoritesCard.style.display = '';})
addToCartBtn.addEventListener('click', addArtworkToCart)
nextPage.addEventListener('click', populateNextPage)
prevPage.addEventListener('click', populatePrevPage)
form.addEventListener('submit', searchList)

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
    if (artwork.image_id !== null){
        newImg.setAttribute('id', 'rightImg')
        newLi.appendChild(newImg)
        newLi.onclick = () => {
            renderAnArtwork(artwork);
        }
        unorderedList.append(newLi)
        }
}

function iterateItems(data){
    unorderedList.innerHTML = ''
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
    saveUserFavorites(selectedArtwork)
}

function addArtworkToCart(e){
    e.target.style.background = 'green'
    e.target.style.color = 'white'
    // cartSuccess.style.opacity = 0
    // cartSuccess.style = 'transition: opacity .5s linear;'
    saveUserCart(selectedArtwork)
}

// function removeCartAlert(){
//     cartSuccess.style.opacity = 0
// }

// Get help here
// Only works for one
// setTimeout(removeCartAlert, 3000)

function populateNextPage(e){
    e.preventDefault()
    getData(nextUrl)
}

function populatePrevPage(e){
    e.preventDefault()
    getData(prevUrl)
}

function searchList(e){
    e.preventDefault()
    let inputText = e.target[0].value
    let inputTextUpper = inputText.toUpperCase()

    for (let i = 0; i < searchData.length; i++){
        let searchItem = searchData[i].artwork_type_title
        if (searchItem.toUpperCase() === inputTextUpper){
            let itemName = document.createElement('p')
            itemName.textContent = `${searchData[i].title}`
            rightNavBar.append(itemName)
        } else {
            console.log('not found')
        }
    }
    form.reset() 
}

function renderUserFavorites(data){
    for (let i = 0; i < data.length; i++){
        let artworkTitle = data[i].favorites
        let newLi = document.createElement('li')
        newLi.textContent = artworkTitle
        favoritesList.append(newLi)
    }
}

// Fetchers
function getData(url){
    return fetch(url)
    .then(res => res.json())
    .then(artworkData => 
        {
            prevUrl = artworkData.pagination.prev_url
            nextUrl = artworkData.pagination.next_url
            iterateItems(artworkData.data)
            for (const element of artworkData.data){
                if(element.image_id !== null){
                    renderAnArtwork(element)
                    break 
                }
            }
        })
}

function getLargeListData(fullUrl){
    return fetch(fullUrl)
    .then(res => res.json())
    .then(listData => {
        searchData = listData.data
    })
}

function saveUserFavorites(){
    fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'favorites': `${selectedArtwork.title}`
        })
    })
}

function saveUserCart(){
    fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'cart': `${selectedArtwork.title}`
        })
    })
}

function getUserFavorites(){
    return fetch('http://localhost:3000/user')
    .then(res => res.json())
    .then(favoritesData => renderUserFavorites(favoritesData))
}

getData(url)
getLargeListData(fullUrl)
getUserFavorites()