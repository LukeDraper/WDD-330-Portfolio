'use strict'
/**
 * do a querySelector lookup
 * @param  {string} selector The selector passed to querySelector
  * @return {element}     The matching element or null if not found
 */
function qs(selector) {
    return document.querySelector(selector);
}

/**
 * add a touchend event listener to an element for mobile with a click event fallback for desktops
 * @param  {string} elementSelector The selector for the element to attach the listener to
* @param {function} callback The callback function to run
  
 */
function onTouch(elementSelector, callback) {
    console.log('onTouch: ', elementSelector, callback)
    elementSelector.addEventListener('touchend', (event) => {
        console.log(event);
        event.stopPropagation();
        event.preventDefault();
        console.log(callback);
        callback();
    });
    elementSelector.addEventListener('click', (event) => {
        console.log(event);
        // event.stopPropagation();
        // event.preventDefault();
        callback();
    });
}

export async function getJSON(url) {
    return fetch(url)
    .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        } else {
            return response.json();
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}


export {
    qs,
    onTouch
}