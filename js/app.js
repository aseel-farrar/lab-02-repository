'use strict';

Animal.all = [];
let allKeywords = [];

// animal constructor
function Animal(animal) {
  this.title = animal.title;
  this.img = animal.image_url;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
  Animal.all.push(this);
}

//prototype function to render the animal
Animal.prototype.render = function () {
  let animalTemplateClone = $('.photo-template').eq(0).clone();
  animalTemplateClone.find('h2').text(this.title);
  animalTemplateClone.find('h2').addClass(this.keyword);
  animalTemplateClone.find('img').attr('src', this.img);
  animalTemplateClone.find('img').attr('alt', this.title);
  animalTemplateClone.find('p').text(this.description);
  $('main').append(animalTemplateClone);
};

// read the data from the JSON file and create the drop down list
$.ajax('./data/page-1.json')
  .then(animals => {
    animals.forEach(animal => {
      let newAnimal = new Animal(animal);
      newAnimal.render();
      //collect all Keywords in one array
      if (!(allKeywords.includes(animal.keyword)))
        allKeywords.push(animal.keyword);
    });
    $('.photo-template').first().remove(); //remove the html template
    $('.photo-template').toggleClass('photo-template');

    allKeywords.sort().forEach(item => $('select').append(`<option val=${item}>${item}</option>`));
  });

// build the filter
$('select').on('change', function () {
  $('div').hide();
  Animal.all.forEach(function (item) {
    if (item.keyword === $('select').val()) {
      $(`.${$('select').val()}`).parent().show();
    }
    else if ($('select').val() === 'default') {
      $('div').show();
    }
  });
});

