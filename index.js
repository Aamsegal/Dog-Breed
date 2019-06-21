'use strict';

function getDogImage(breed) {
  const breedUrlBase = `https://dog.ceo/api/breed/`;
  const breedUrl = breed.length > 1 ? `${breedUrlBase}${breed[1]}/${breed[0]}/images/random` : `${breedUrlBase}${breed[0]}/images/random`;
  
  console.log(breedUrl);
  
  /*fetch(breedUrl)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}*/

  fetch(breedUrl)
          .then(response => {
              if (response.ok) {
                  return response.json();
              }
              throw new Error(response.statusText);
          })
          .then(responseJson => displayResults(responseJson))
          .catch(err => {
              $('#js-error-message').text(`Something went wrong: ${err.message}`);
          });
  }

function displayResults(responseJson) {
  console.log(responseJson);
  //replace the existing image with the new one
    $('.dog-Image-Container').html(
        `<img src="${responseJson.message}" class="dog-Image" alt="Pupper Image">`
    )
  /*display the results section
  $('.results').removeClass('hidden');*/
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const x = $('#dog-Breed-Name').val();
    let breed = x.replace(/\s+/g,"-").toLowerCase().split("-");
    console.log(breed);
    getDogImage(breed);
  });
}

$(function() {
  console.log('App loaded! Gimme dem puppers');
  watchForm();
});