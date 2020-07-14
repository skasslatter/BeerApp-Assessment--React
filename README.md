# PXL-Programming-Assessment

<b>Used technologies:</b>

React | Typescript | Lodash | ExpressJS | Bootstrap | CSS | HTML

RestApi BreweryDB

<b>Instructions:</b>

To run the application, you need to install the dependencies by running the following command:
`npm install`

Create a .env file and add your API key for the BreweryDB api:
`APIKEY = yourKey`

In the <b> client </b> project directory run:
`npm start`

In the <b> api </b> project directory run:
`node start`

Open [http://localhost:3001](http://localhost:3001) to view it in the browser.
The page will reload if you make edits.

<br/>

<b>Content:</b>

For this assessment I had to connect my site to the BreweryDB API. My task was to list breweries per country, provide a search field for them by name and filter/group them by country and by
type.

I decided to list all breweries initially, and give the user the possibility to filter by country or by brewery name. Additionally if the user clicks on a specific brewery, he will be able to see all the beers produced by said brewery and will also have the possibility to filter them by name and beer type. 
Both breweries and beers are fetched on component initialization, searching and filtering use the local data (no additional requests)

To make navigation easier I have added a navbar. The design of the site is fully responsive.
<br/>

<b>Challenges:</b>

My first approach was to connect to the API directly from the frontend, which resulted in getting a CORS error. First I tried to find a workaround, but then I found out that, according to the API documentation, the API can not be used directly from the frontend. So I decided to build a backend and call the API from there.

![alt text](https://res.cloudinary.com/dwnm4mxrr/image/upload/v1589896192/screenshots/pxl/beers1_nufnyr.png)
![alt text](https://res.cloudinary.com/dwnm4mxrr/image/upload/v1589896192/screenshots/beer2_mb7vxt.png)
![alt text](https://res.cloudinary.com/dwnm4mxrr/image/upload/v1589902949/screenshots/beer4_lna3xm.png)
![alt text](https://res.cloudinary.com/dwnm4mxrr/image/upload/v1589896192/screenshots/beer3_gtfhpk.png)
