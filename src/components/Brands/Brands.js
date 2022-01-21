import React, { useState, useEffect }from 'react'
import { DataStore } from '@aws-amplify/datastore'
import { Brand } from '../../models'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { Pagination, Input, Segment, Button, Icon, Grid} from 'semantic-ui-react'
import { listBrands} from '../../graphql/queries'
import SimpleTable from '../SimpleTable/SimpleTable'




export default function Brands() {
  const [chunckBrands, setChunkBrands] = useState(null)
  const [brands, setBrands] = useState(null)
  const [activePage, setActivePage] = useState(1)
  const [search, setSearch] = useState("");
  const [orderColumn, setOrderColumn] = useState({column: null, direction: 'descending'});
  
  const handleSubmit = (evt) => {
      evt.preventDefault();
      alert(`Submitting Name ${search}`)
  }
  
  useEffect(() => {
    fetchBrands()
    //fetchInitialBrands()
}, [])


const sliceIntoChunks = (arr, chunkSize) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
  }
  return res;
}

const fetchInitialBrands = async () => {
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
      setChunkBrands( sliceIntoChunks(brands, 10 ))
      setBrands(brands)
      

  } catch (err) { console.log(err) }}


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
      sortItems(brands, orderColumn.direction === 'descending' ? 'ascending' : 'descending');
      setChunkBrands( sliceIntoChunks(brands, 10 ))
      setBrands(brands)
      

  } catch (err) { console.log(err) }}

    let dataChunks = ((chunckBrands === null ? [] : chunckBrands ))
    
    const handlePaginationChange = (e, { activePage }) => { setActivePage(activePage); fetchBrands() };
    
    
    const sortItems = (list, direction) => {
      if (direction === 'ascending'){
        list.sort(function(a, b) {
          let nameA = a.name.toUpperCase(); // ignore upper and lowercase
          let nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        
          // names must be equal
          return 0;
        });
      } else {
        list.sort(function(a, b) {
          let nameA = a.name.toUpperCase(); // ignore upper and lowercase
          let nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameB < nameA) {
            return -1;
          }
          if (nameB > nameA) {
            return 1;
          }
        
          // names must be equal
          return 0;
        });
      }

      console.log(list)
      console.log(direction)

    }
    
    
    
    
    const handleOrderColumn = (column) => {
      console.log(column);
      setOrderColumn({column: column, direction: orderColumn.direction === 'descending' ? 'ascending' : 'descending' })
      console.log(brands)
      console.log(orderColumn.direction)
      sortItems(brands, orderColumn.direction);
      setChunkBrands( sliceIntoChunks(brands, 10 ))
      setBrands(brands)
      
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        console.log(search);
        

        setActivePage(1); 
      
        let tempBrands = brands.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) )
        tempBrands = tempBrands.length > 0 ? tempBrands : brands
         
        
        setChunkBrands( sliceIntoChunks(tempBrands, 10 ))
      }
    }


    return (
        <div style={divStyle}>
        <h1>Brands</h1>

        

        

        

        <Grid>
          <Grid.Column width={12}>
          <Input
                icon='search'
                iconPosition='left'
                placeholder='Search...'
                fluid = {true}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                value={search}             
                //floated='left'
              />
          </Grid.Column>
          <Grid.Column width={4}>
          <Button
                floated='right'
                icon
                labelPosition='left'
                primary
                size='small'
              >
                <Icon name='plus' /> Add Brand
            </Button>
          </Grid.Column>          
        </Grid>

        
        <SimpleTable data = {dataChunks[activePage - 1]} handleOrder = {handleOrderColumn} orderColumn = {orderColumn} />
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