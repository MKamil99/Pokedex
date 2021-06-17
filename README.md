# Pokedex
### Table of contents
* [Project description](#project-description)
* [Used technologies](#used-technologies)
* [How to start?](#how-to-start)
* [Communication with API](#communication-with-api)
* [How to use it?](#how-to-use-it)
* [Project status](#project-status)

### Project description
**Pokedex** is a mobile application that uses [**PokeApi**](https://pokeapi.co/) to present information **about pokemons**. 
Data needed right after launching the app comes from [**our own Api**](https://github.com/Blazevarjo/Pokedex.Api) (placed on 
[**Heroku**](https://mim-pokedex-api.herokuapp.com/) platform), which helps in reducing amounts of calls to the original one 
by storing some part of its information. User can **explore whole list** of pokemons, **read details** about specific one, **search for** 
a pokemon by name or ID, **filter the list** by types and generations, **sort the list** by name or ID and add specific 
pokemon to the **favourites**. Application is available in **two display modes** (light and dark) and both device orientations.
**Pokedex is not an official product** - all rights are reserved for Nintendo.

### Used technologies
Project has been written in **React Native Expo** technology and here are some of the most important [dependencies](https://github.com/MKamil99/Pokedex/blob/main/package.json):
* React 16.13.1 - JavaScript's library responsible for building user interfaces,
* React Native 41.0.0 - React's extension which allows using mobile devices' native features,
* Expo 41.0.1 - library responsible for managing React Native,
* React Native Paper 4.8.1 - library with Material Design components,
* React Native Async Storage 1.13.0 - library responsible for storing data locally,
* Expo Font 9.1.0 - library responsible for using custom fonts.

### How to start?
#### Server Part
As it was mentioned, our server is placed on [Heroku](https://mim-pokedex-api.herokuapp.com/) and the client application 
by default is connected to this specific URL, but it doesn't mean that you can't change it. You can create **your own server** 
(it can be even on your computer, as localhost) and then connect the client application to it. To do it, follow the instruction
from [Pokedex.Api](https://github.com/Blazevarjo/Pokedex.Api)'s README.

After launching API on your server, there's just one step you have to do. Go to **src/contexts/PokeApiData.js** and replace the URL
in *allPokemonsURL* variable with your URL - the line looks like this:
```const allPokemonsURL = 'https://mim-pokedex-api.herokuapp.com/pokemons?limit=10000';```.

#### Client Part
Pokedex, as most of the React applications, can be launched by ```npm start``` or ```yarn start``` commands. It is written in Expo, 
so ```expo start``` will also work. What is more, if you've just cloned the repository, you'll probably need to download *node_modules*. 
To get them, use command ```npm install``` or ```yarn install```. And because of the fact, that this is not standard mobile application, 
you'll need to have installed *Expo Go* on your device or emulator. Don't forget about these few things and everything will be fine.

### Communication with API
<p align="center">
<img src="https://user-images.githubusercontent.com/43967269/122473925-cb849180-cfc2-11eb-95fc-94922841daca.png" alt="Communication">
</p>

[Pokedex.Api](https://github.com/Blazevarjo/Pokedex.Api) downloads data from two [PokeApi](https://pokeapi.co/)'s endpoints
every 2 hours and stores it, so it can be delivered to the client with only one response. Creating this "triangle" was 
necessary because of the huge amount of pokemons - otherwise client would have to make almost 2000 calls (2 calls per pokemon) every 
time he/she launches the application. Other data is downloaded directly from [PokeApi](https://pokeapi.co/) right after clicking 
specific pokemon's tile in the list.

### How to use it?
Pokedex consists of **two views**: main screen with pokemon tiles, divided into two tabs (**Home** and **Favourites**), 
and details screen with plenty of different, indepent components, divided into three tabs (**General**, **Moves** and **Evolution**).
Main view's AppBar contains inter alia three buttons responsible for **filtering**, **sorting** and **changing the display**,
and in the lower right corner there is a Floating Action Button responsible for **searching for specific pokemon**. 
Second tab is for **favourite pokemons**, which can be added here by clicking Heart icon in appropriate tile.

<p align="center">
  <img src="https://user-images.githubusercontent.com/43967269/122477536-31274c80-cfc8-11eb-8a9a-377f2ceeae09.png" alt="MainView">
  <img src="https://user-images.githubusercontent.com/43967269/122477538-31bfe300-cfc8-11eb-8a82-e24baac06c28.png" alt="Sorting">
  <img src="https://user-images.githubusercontent.com/43967269/122477541-32f11000-cfc8-11eb-81b7-f972efe2d1d2.png" alt="Filtering">
</p>

By clicking specific tile, user can go into clicked pokemon's details. Here, in General Tab there is an information 
about its **name, id, color, sprite, weight, height, types and statistics**. Then, in Moves user can get to know about 
the **moves** that current pokemon uses in specific **version of the game** (which can be selected) and in the last tab 
there is an **evolution chain** which contains all of the specific pokemon's forms with the reasons of evolution (level, happiness or item).

<p align="center">
  <img src="https://user-images.githubusercontent.com/43967269/122477543-3389a680-cfc8-11eb-9c89-43d02bf22057.png" alt="General">
  <img src="https://user-images.githubusercontent.com/43967269/122477544-34223d00-cfc8-11eb-8f67-31f8bbadabf8.png" alt="Moves">
  <img src="https://user-images.githubusercontent.com/43967269/122477546-34bad380-cfc8-11eb-81df-bad51189d9db.png" alt="Evolution">
</p>

Application is well-displayed in both portrait and landscape orientations, and also one of the buttons in AppBar is responsible 
for switching the mode from Dark Mode to Light Mode and reversly. The display changes fully - in all of the views.

<p align="center">
  <img src="https://user-images.githubusercontent.com/43967269/122477548-35536a00-cfc8-11eb-988f-5d1f11de0f99.png" alt="MainDark">
  <img src="https://user-images.githubusercontent.com/43967269/122477549-35ec0080-cfc8-11eb-97d8-6c0a2134fef7.png" alt="DetailsDark">
</p>

### Project status
Although world of Pokemons is huge and there are a lot of things that could be added to the application, 
the project is considered as **finished** and there are no plans to do any updates on it.
