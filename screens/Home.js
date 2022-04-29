import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import Categories from '../components/Categories'
import HeaderTabs from '../components/HeaderTabs'
import RestaurantItems, { localRestaurants } from '../components/RestaurantItems'
import SearchBar from '../components/SearchBar'

const YELP_API_KEY = "2yZ08b64IoYKCItlDYazsX7U7PkK7SUBQETrejnPh_oNT9wg1DvyjZc6YkH_gO1r_2HYFbr_bJdfmYtsbmj8-mYShh1dlUwR17UZLdzOaJmR5KNdG7cZtcMfwbq1YXYx";



export default function Home() {
	const [restaurantData , setRestaurantData] = React.useState(localRestaurants);

	const getRestaurantsFromYelp = () => {
		
		const yelpUrl = 
		"https://api.yelp.com/v3/businesses/search?restaurants&location=new%20york";
	
	
	const apiOptions =  {
		headers: {
			Authorization: "Bearer ${YELP_API_KEY}"
		},
	};

		 fetch(yelpUrl, apiOptions)
		   .then((res) => res.json())
		   .then(json => setRestaurantData(json.businesses));
	};

	useEffect(() => {
		getRestaurantsFromYelp();
	}, [] );

	return (
		<SafeAreaView style={{backgroundColor: "#eee", flex: 1 }}>
		    <View style={{backgroundColor: "white", padding: 15}}>
		    <HeaderTabs />
		    <SearchBar />
		    </View>
		    <ScrollView showsVerticalScrollIndicator={false}>
		       	<Categories />	    
			       <RestaurantItems restaurantData={restaurantData} />
		    </ScrollView>
		</SafeAreaView>
	)
}
