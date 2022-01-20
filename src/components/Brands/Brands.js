import React, { useState, useEffect }from 'react'
import { DataStore } from '@aws-amplify/datastore'
import { Brand } from '../../models'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { listBrands} from '../../graphql/queries'



export default function Brands() {
  const [brands, setBrands] = useState([])
  useEffect(() => {
    fetchBrands()
}, [])

const fetchBrands = async () => {
  try {
      const brandData = await API.graphql(graphqlOperation(listBrands))
      const brands = brandData.data.listBrands.items
      setBrands(brands)
      console.log(brands);
      
  } catch (err) { console.log('error fetching brands') }
}
  
    return (
        <div>
        <h1>Brands</h1>
        
        {brands.filter( item => item?._deleted !== null).map( item => item?.name)}

      </div>  
    );
    
  }