const apiKey = "DGasfpW29DdXzsW6fVb1OCC_hroakMrz-uXYUnbPohhuNLCmCWz0KotFXYTlcU50nE-hACRCb83wDUbI9yGLZliNABQLkG3sScpfKCFi96nwjhsuoPN2k7puahacYHYx";
const Yelp = {

    search(term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {headers: {Authorization: `Bearer ${apiKey}`}})
        .then(response => {return response.json()})
        .then(jsonResponse => {
            if (jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => {
                    let categories = [];
                    business.categories.forEach(cat => {
                        categories.push(cat.title)
                    })
                    return {
                        id: business.id,
                        imgSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: categories.join(', '),
                        rating: business.rating,
                        reviewCount: business.review_count 
                    }
                })
            }
        })
    }
};

export default Yelp;