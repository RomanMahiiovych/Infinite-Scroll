const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// let initialLoad = true;  

/* Unsplash API */
let count = 30;
const apiKey = 'EcTUVMMff3KlA_Vc4Uavrd2Vv4DhEpV67C3PyAbyREw';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&orientation=landscape&portrait`;
//const replace on let because apiUrl contains variable 
// let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&orientation=landscape&portrait`;

// Check if all images were loaded
function imageLoaded() {
     console.log('image loaded');
     imagesLoaded++;
     if (imagesLoaded === totalImages) {
         ready = true;
         loader.hidden = true;
        //  initialLoad = false;
        //  count  = 30;  //- increase count photos after first loading
        // redefine apiUrl because it contains variable count
        //  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&orientation=landscape&portrait`;
         console.log('ready =', ready);
     }
}

//Helper Function  to Set Attributes On DOM Elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Element By Links & Photos, Add to DOM
function displayPhotos() {
    totalImages = photosArray.length;
    imagesLoaded = 0; //becouse counter become greater than totaly
    console.log('total images ', totalImages);
    //Run function for each element in photosArray
    photosArray.forEach((photo) => {
        // Create tag <a> to link to Unsplash from each element in array
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        //Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description, 
            title: photo.alt_description,
        });

        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img); //link add img as child element
        imageContainer.appendChild(item); // imageContainer add item as child element
        });
}

/* Get Photos From Unsplash API */
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        // const data = await response.json();
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //Catch Errors
    }
}

//Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {  //?
    // console.log('scrolled');
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {  
        //substruct 1000px before bottom is reached. Other ways photos will loading after last element 
        ready = false;
        imageLoaded();
        getPhotos();
        console.log('load more photos');
    }
}); //window - parent of the document, grandparent of body

//On Load
getPhotos();