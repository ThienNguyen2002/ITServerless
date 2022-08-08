# Devlog + Scrum with myself (July 26th-27th)
Referring to week 1, I started it at the beginning of week 2. Learning React.js in one day was not easy, but I'm getting to understand its basic idea of it. It's like JavaScript has HTML components in their kits. 

## Design with file structures and App structure
It took me a good chunk of time on what structures I should use for a simple react application. Fortunately, I don't have to follow any specific rules for file structure or App structure because the project was simple. I went with the default React.js template and deleted some of the files that I don't need in the src. I changed the images and icon to fits the project's theme. the App structure wasn't too bad to implement because it depends on other .js files and libraries. 

## Difficulties
Here are some things I had difficulties with, but I resolved them with the power of Google. 
* **Other APIs/Libraries I also needed and how to use them (Next section)**
* **Git revert:** Almost lost my progress because I leaked my Map API key (which now it is in private and made a new public repo).  
* **Rendering the map:** I had to make 3 prototypes of a Google Map theme to fit my specific needs. Not to mention I asked why my theme wasn't showing for a good hour until I realized my map component needs a map ID. 

## Additional Libraries and APIs I need to use
* **@googlemaps/react-wrapper**: A wrapper that contains the map in React. This also needs **react-spinners/BarLoader** and **react-error-boundary** to render the status of the map. 
* **@react-google-maps/api:** The Holy Grail of combining React.js and Google Maps. It helps with getting components from a standard Google Map API to a React component. 

## Things I need to Remove/Add for further use
* I removed the button to calculate the prices. The search bar with the enter key would calculate the price ranges itself. 
* (Addition to the first bullet) I need to add an auto-complete so the user can type in the keywords of an address. 
* (Addition to the second bullet) I might need to remove the "Invalidation" branch of the workflow since there's an autocomplete.  

# Scrum
## What I did today
* Built a Front-End of the project.
* Set up a Google Map 
* And created markers for each rail station. 
* How to use the right APIs
## What I need to do tomorrow
* Autocomplete: After the end of an auto-complete, create a marker and send coordinates to the azure function. 
* Build an Azure Function that calls to UBER API that calculates the prices of an end destination. 
* Find a way to show prices once an end destination is shown. 
## What's stopping me (and how can I overcome it)
Over the past 6-ish weeks at Serverless Bootcamp, I am not sure how to actually implement those Functions to my React App. I will ask Piazza to see if any devs/instructors could guide me in the right direction. Otherwise, Google...

