import React, { useState, useEffect }from 'react'
import { DataStore } from '@aws-amplify/datastore'
import { Brand } from '../../models'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { Pagination, Input } from 'semantic-ui-react'
import { listBrands} from '../../graphql/queries'
import SimpleTable from '../SimpleTable/SimpleTable'




export default function Brands() {
  const [brands, setBrands] = useState(null)
  const [activePage, setActivePage] = useState(1)
  const [brandsCount, setBrandsCount] = useState(0)
  const [itemsByPage, setItemsByPage] = useState(5)
  const [dataTable, setDataTable] = useState(null)
  
  useEffect(() => {
    fetchBrands()
}, [])


const sliceIntoChunks = (arr, chunkSize) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
  }
  return res;
}



const fetchBrands = async () => {
  try {
      //const brandData = await API.graphql(graphqlOperation(listBrands))
      const brandData = await API.graphql({
        query: listBrands,
        /*variables: {
          limit: 6,
          //_deleted: null,
          //filter: {name: {eq:"Demon's Cycle"}}
          //filter: {_deleted: {eq: null}}
          
          //{_deleted: {ne: true}}
          //nextToken: nextToken
        }*/
      })      
      
      const brands = brandData.data.listBrands.items.filter(item => !item._deleted)     
      
      setBrands( sliceIntoChunks(brands, 10 ))
      

  } catch (err) { console.log('error fetching brands') }}

    let dataChunks = ((brands === null ? [] : brands ))
    console.log(dataChunks);

    const handlePaginationChange = (e, { activePage }) => { setActivePage(activePage); fetchBrands() };

    

    return (
        <div style={divStyle}>
        <h1>Brands</h1>
        <Input
          icon='search'
          iconPosition='left'
          placeholder='Search...'
        />
        <SimpleTable data = {dataChunks[activePage - 1]} />
         <div style = {paginationStyle}>
          <Pagination
              activePage={activePage}
              boundaryRange={0}
              //defaultActivePage={1}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              siblingRange={1}
              totalPages={ dataChunks.length }
              onPageChange={handlePaginationChange}              
            />

            
            </div>

      </div>  
    );
    
  }

  const divStyle = {
    margin: '3em'
    /*marginRight: '3em',
    marginTop: '3em'*/
  };

  const paginationStyle = {
    display: "flex",
          justifyContent: "center",
          alignItems: "center"
  }