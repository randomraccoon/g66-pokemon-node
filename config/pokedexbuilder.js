//This is a script which takes the raw info and turns it into a knex seed file.

const fs = require('fs');
const stripPokemon = (str) => str.replace(' Pokémon', '');
const specialNames = {
  oricorio: 'oricorio-sensu',
  lycanroc: 'lycanroc-midday',
  wishiwashi: 'wishiwashi-school',
  minior: 'minior-meteor'
};

const prefix =
`exports.seed = function(knex, Promise) {
  return knex('species').del()
    .then(function () {
      return knex('species').insert([`;
const postfix =
`
      ]);
    });
};`;

const getImageUrlName = (name) => {
  let n = name
          .toLowerCase()
          .replace('♀','f')
          .replace('♂','m')
          .replace(/[\’\.\:]/g,'')
          .replace(/ /g,'-')
          .replace(/é/g,'e');
  return (specialNames[n]) ? specialNames[n] : n;
}

function buildPokedex() {
  let pokemonList = [];
  fs.readFile("config/pokemonRaw.txt", 'utf-8', (err, data) => {
    if (err) throw err;
    data = data.split('\n')
      .map(line=>line.split(','))
      .filter(p=>+p[1]===9)
      .map(p=>`\n{ id: ${p[0]}, name: '${p[2]}', description: '${stripPokemon(p[3])}', image_name: '${getImageUrlName(p[2])}' }`)
    fs.writeFile("db/seeds/0_species.js", prefix + data + postfix, function(err) {
      if(err) throw err;
      console.log("The file was saved!");
    });
  });

}

buildPokedex();
