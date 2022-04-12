Link

https://real-estate-listing-app.herokuapp.com/


Descriptions

This MERN stack application is a platform for real estate listing. Users can list their properties and the posted properties are shown on the website. There is a search component where users can enter their search criteria and the displayed properties will change accordingly. At the bottom of the page, there is a pagination feature that is used to go through the displayed properties. 

Each property has either a "Good Price", "Fair Price" or "Overpriced" badge which shows the value proposition of the property. if the price is more than 10% higher than the average price of that type of property in that specific city, it's overpriced. If the price is less than 10% lower than average, it's a good price, otherwise, it's a fair price.


API Documentation

- Getting all properties: get('/api/v1/properties')
Gets all properties as an array of json objects
- Getting one property: get('/api/v1/properties/:id')
Gets one property as a json object
- Posting a property: post('/api/v1/properties')
Posts a property which is sent as a json object
- Getting all cities: get('/api/v1/cities')
Gets all cities as an array of json objects
- Getting one city: get('/api/v1/cities/:id')
Gets one city as a json object
-	Posting a city: post('/api/v1/cities')
Posts a city which is sent as a json object
