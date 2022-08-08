# Devlog + Scrum with myself 2 (July 28th-Aug 4th)
Well, it's the second to last day to submit my project. Although I had difficulties with this project, I had fun building this final project. From building the Autocomplete, to reading a bunch of API docs, to deploying the Azure function I need for this project. 

## Progress made so far. What I can do to improve after the hackathon? 
* **Added Google Autocomplete**: Definitely need to have a good prediction on searching addresses well
* **Found and added an API via RAPID API**: I didn't know Lyft or Uber's API needed permissions from the actual companies, so if they responded back, I can integrate them as well. For now, I used the Taxi Fare API
* **Implemented an Azure Function**: Nothing to be honest, though I had lots of difficulties setting it up. 

## Difficulties
* The Autocomplete wasn't that bad, but styling it made it difficult. 
* Finding the right API was a huge pain of the butt. Lyft and Uber's API were my ideal ones because I needed to know how much it costs to travel from a station to a destination. However, both of them needed me to talk to contact them to get permission and set up an OAuth 2.0 implementation. None of them responded to me to this date. Fortunately, taxis are still a thing in Utah, so I used Rapid APIs to find a fare for Taxi. [Taxi Fare Calculator](https://rapidapi.com/3b-data-3b-data-default/api/taxi-fare-calculator/)
* With the Azure function, I had to test it multiple times locally and remotely. After deploying my first prototype, the getURL doesn't work because it didn't have the code authentication.[Anthony Chu](https://github.com/anthonychu) pointed out my deployed function was set to 'anonymous', so I had to change it to 'function'. After I got that running, the URL still didn't work. It took me a couple of hours to find out the problem. I replicated the problem by building the same function but using a different resource group. That worked, but I noticed I didn't install node-fetch in my files.  

## Additional Libraries and APIs I need to use
* **Node-fetch**: fetches API to node.js
* [Taxi Fare Calculator](https://rapidapi.com/3b-data-3b-data-default/api/taxi-fare-calculator/) 
## Things I need to Remove/Add for further use
* I removed the google maps wrapper since I don't need two validation methods (referring to react-google-maps/API) to load up the map.
* I need to remove the first prototype of the function in my files. I would be needing it anymore. 
* Add libraries to format the price and convert the length (km to miles)

# Scrum
## What I did in this time period
* Added Autocomplete to auto-complete my searches instead of typing an address manually. 
* Added an azure HTTP trigger function that uses an API to call coordinates to return a fare. 
## What I need to do tomorrow
* Modify the JSON of the azure function so it can return the price, distance, and duration.
* Use the function link to create a js function to work on multiple locations. 
* Displaying that information to the right markers and changing the marker image. 
* Polyline animation to show directions. 
## What's stopping me (and how can I overcome it)
I have about a day and a half to pull this off. If I didn't complete it, it's alright. I can still turn it in on time and still work on it. I love to make updates until I'm satisfied with my work. :) 
