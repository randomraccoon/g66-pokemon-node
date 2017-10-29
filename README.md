![](public/images/pokemon-logo.png)

### Heroku Link:
https://pokemon-node-randomraccoon.herokuapp.com/

## WELCOME to the Q2 Assessment!

Move deliberately and methodically through the stories provided below.

__Stay calm and code on!__

## Assessment Overview

**Pokémon Node** is an app where a user can manage trainers and their corresponding
Pokémon to battle in a gym. Users should be able to CREATE, READ, UPDATE, and DELETE Pokémon,
as well as assign Pokémon to the gym (details below).

Your app should look at _least_ as good as the wireframes, preferably better.

If you want to use session variables instead of cookies, that is fine.

Your app should use `pg` and `knex`, and your schema should be built
using `migrations`.

Your app should be deployed to Heroku.

## INSTRUCTIONS:

```
Fork and clone this repo
cd into repo
npm install
nodemon
```

* You'll need to create a database called `pokemon-node`
* Write a migration for the pokemon database that creates two tables:
  * pokemon
  * trainers.

### Use the following information to build your migrations (schema):

__trainers__

* id (auto increment)
* name (string)

__pokemon__

* id (auto increment)
* name (string)
* trainer_id (integer)
* cp (integer)  __=>__ cp stands for combat power
* in_gym (boolean)

__After you run your migrations, seed the database by running:__

```
knex seed:run
```

* Inspect your database tables to make sure that you now have trainers and pokemon
* Follow the stories below.


# Use the following Gherkin (User) stories to guide your development:

__You should git add, commit, push, and deploy to Heroku after each story is completed__

### Pokémon and Pokémon CRUD

~~__#1__~~ COMPLETE

```
As a user
When I go to the root route '/'
Then I am redirected to `/pokemon`
```

~~__#2__~~ COMPLETE

```
As a user
When I visit /pokemon
Then I see a button to 'Add a New Pokemon'
```

~~__#3__~~ COMPLETE

```
When I click the 'Add a New Pokemon' button
Then I see a form to add a new Pokemon
```

~~__#4__~~ COMPLETE

```
When I submit the form to add a new Pokemon
Then I am redirected to the Pokemon home page
And I see my new Pokemon listed
```

~~__#5__~~ COMPLETE

```
When I visit '/pokemon'
Then I see a list of all Pokémon and their properties
And I see a link to DELETE
And I see a link to EDIT
```

~~__#6__~~ COMPLETE

```
When I visit the Pokémon home page
And I see all Pokémon
When I click on a Pokémon name
Then I am taken to a show page
And I see all the properties for that Pokémon
And I see the name of that Pokémon's trainer
```
__wireframe not shown, implement your own ideas.__

~~__#7__~~ COMPLETE

Trainers can acquire Pokémon that will belong exclusively to them.
One trainer can have many Pokémon, but each Pokémon belongs to only one trainer.

```
When I visit the Pokémon home page
And I see all Pokémon
And I click the 'EDIT' link for a Pokémon
Then I am taken to a form
And the form is prefilled with information for that Pokémon
And I see the name of that Pokémon's trainer
And that name is in a drop down menu that also has the names of all the other trainers
```

~~__#8__~~ COMPLETE

```
When I submit an edit form for a Pokémon
Then I am redirected to the show page for that Pokémon
And I see all new details for my updated Pokémon
```

~~__#9__~~ COMPLETE

```
When I visit the Pokémon home page
And I see all Pokémon
And I click the 'DELETE' link for a Pokémon
Then I am redirected to the Pokémon home page
And that Pokémon is no longer listed
```


_OVERVIEW of STORY # 10_

* You will be using cookies to keep track of which Pokémon are in the 'gym'.
* You will use cookies to set the values `p1` and `p2` to be the `id `of the two
respective Pokémon in the gym.
* The gym should only hold two Pokémon.
* When you visit the Pokémon home page, if either the `p1` or `p2` cookies is not set,
then you can click 'assign to gym' next to a Pokémon and they will be
'assigned to the gym' (i.e. their id will be assigned to either `p1` or `p2`)
* and their 'in_gym' status in the database will be updated to `true`

__EXAMPLE:__ If you have a Raichu with an id of 22 in the database and you click
'assign to gym' then you would set a cookie p1 with a value of 22.


__NOTE:__ Your database should _always_ be updated to have the current `in_gym`
status of _all_ Pokémon.

~~__#10__~~ COMPLETE

```
As a user
When I visit the Pokémon home page
And I see all Pokémon
And less than 2 Pokémon are 'in the gym'
Then I see a link 'assign to gym' next to every Pokémon that is not 'in the gym'
```

~~__#11__~~ COMPLETE

```
When I visit the Pokémon home page
And I see all Pokémon
And there are already 2 Pokémon 'in the gym'
Then I do not see 'assign to gym' links for any other Pokémon
```
~~__#12__~~ COMPLETE

```
When I go to the Pokémon home page
And I see all Pokémon
And a Pokémon is 'in the gym'
Then I see a link 'remove from gym' next to that Pokémon
And I do NOT see a link 'assign to gym' next to that Pokémon
```

### Trainers

~~__#1__~~ COMPLETE

```
As a user
When I visit /trainers
Then I see a list of all Trainers
```

~~__#2__~~ COMPLETE

```
When I click on the name of a Trainer
Then I am taken to a show page
And I see the name of that Trainer
And I see all of the Pokemon they are currently training
```

### In the Gym

__#1__

```
As a user
When I visit the gym home page
And there are no Pokémon assigned to the gym
Then I can select a Pokémon1 from a drop down menu that has all Pokémon names
And I can select a Pokémon2 from a drop down menu that has all Pokémon names
```

__#2__

```
When I visit the gym home page
And there are no Pokémon assigned to the gym
And I select a Pokémon1 from a drop down menu that has all Pokémon names
And I select a Pokémon2 from a drop down menu that has all Pokémon names
When I click 'Add Pokémon to the Gym'
Then I am redirected to the gym home page
And I see my Pokémon 'in the gym'
```

__#3__

```
When I visit the gym home page
And only one Pokémon is 'in the gym'
Then I see a Pokémon name in the Pokémon1 slot
And by the Pokémon2 slot I see a dropdown menu with all Pokémon names
```

__#4__

```
When I visit the gym home page
And only one Pokémon is 'in the gym'
And I select a second Pokémon name from a dropdown menu
And I click the 'Add Pokémon to the Gym' button
Then I am redirected to the gym home page
And I see a Pokémon in the Pokémon1 slot
And I see my selected Pokémon in the Pokémon2 slot
```

__#5__

```
When I visit the gym home page
And only one Pokémon is 'in the gym'
And I select a second Pokémon name from a dropdown menu
And that Pokémon is the SAME Pokémon already in a slot
Then the gym home page is rendered again
And I a see an error message
And that error message says
"A Pokémon cannot fight itself! Please choose a different Pokémon!"
And that message is the color red
```

__#6__

```
When I visit the gym home page
And 2 Pokémon are 'in the gym'
Then I see a Pokémon name in the Pokémon1 slot
And I see a Pokémon name in the Pokémon2 slot
```

__#7__

```
When I visit the gym home page
And two Pokémon are already in the gym
Then I see a 'battle' button
```

__#8__

```
When I visit the gym home page
And only one Pokémon is in the gym
Then I do not see the 'battle' button
```

__#9__

```
When I visit the gym home page
And two Pokémon are already in the gym
And I click the 'battle' button
Then the Pokémon with the higher Combat Power 'wins' the fight
And the winning Pokémon's name is displayed on the page next to the word 'WINNER!'
```
__HINT:__ Would it be simpler if all the data you need is passed in to the view
when the page loads (before the user clicks the button?)? HOWEVER, a Pokémon's
Combat Power should NOT be stored in the cookie. You will need to get that info
from the database.

__#10__

```
When I visit the gym home page
And I click the 'reset' button (or link)
Then all the Pokémon are removed from the gym
```

### Stretch Goals

__#1__

```
As a user
When I make 2 Pokémon battle
Then the winner's CP is incremented by 20
```

__#2__

* Write a migration that adds an image field to the Pokémon table that takes an
image url.

* Display the image on both the gym and the Pokémon index page.


## WIREFRAMES

You can use these mockups/wireframes as a reference. Your design does not have to
exactly match, but it should look as good or preferably BETTER than the mockups:

## TRAINERS INDEX

![Trainers - Index](mockups/trainers-index.png)

## TRAINERS SHOW PAGE /trainers/:id

![Trainers - Show](mockups/trainers-show.png)

## Pokémon INDEX

![Pokemon - Index](mockups/pokemon-index.png)

## GYM

![Gym](mockups/gym.png)


## How to Submit Your Assessment

1. Add your Heroku URL to the TOP of this readme
2. Submit a pull request

## RESOURCES FROM PAST ASSIGNMENTS
( AND DON'T FORGET ABOUT THE DOCS! )

__Deployment__
* https://github.com/gSchool/intro-to-deploying-express-pg-apps-to-heroku
( GO TO GITHUB BRANCH g29 to see the way we've been doing it )

__Knex and Deployment__
* https://github.com/gSchool/knex-migrations-and-deployment

__CRUD with KNEX__
* https://github.com/gSchool/pirates-crud-with-pg-knex-raw

__COOKIES__
* https://github.com/gSchool/auth_sandbox  ( AUTH SANDBOX )
* https://learn.galvanize.com/redirects/articles/3610  ( VIEW VIDEO #3 ON COOKIES )
* Nmuta's YouTube channel cookies live coding videos ( 9 videos ) : https://www.youtube.com/channel/UCxM6--J9pxeS3geqe1MVxsg

https://www.youtube.com/watch?v=h3vlPfc0Als&t=9s

https://www.youtube.com/watch?v=iPDUW73HKV0

https://www.youtube.com/watch?v=tGRKEkeajQg

... etc... See COOKIES BIKE DEPOT series for all 9 videos
