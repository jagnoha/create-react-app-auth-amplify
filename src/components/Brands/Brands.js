import React, { useState, useEffect }from 'react'
import { DataStore } from '@aws-amplify/datastore'
import { Brand } from '../../models'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { Pagination, Input, Segment, Button, Icon, Grid, Modal, Header, Form, ItemContent} from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import { listBrands } from '../../graphql/queries'
import { createBrand } from '../../graphql/mutations'
import SimpleTable from '../SimpleTable/SimpleTable'
//import { onCreateBrand } from '../../graphql/subscriptions';
import * as subscriptions from '../../graphql/subscriptions';
//import { v4 as uuidv4 } from 'uuid'






export default function Brands() {
  const [chunckBrands, setChunkBrands] = useState(null)
  const [brands, setBrands] = useState(null)
  const [activePage, setActivePage] = useState(1)
  const [search, setSearch] = useState("")
  const [orderColumn, setOrderColumn] = useState({column: null, direction: 'descending'})
  const [open, setOpen] = useState(false)
  const [brandName, setBrandName] = useState("")
  
  
  const addBrand = async () => {
    try {
        //if (!formState.firstName || !formState.lastName) return
        
        //const brand = { ...formState }
        const brand = brandName
        console.log(brand);
        if (brands.find(item => item.name.toUpperCase() === brand.toUpperCase() ))  {
          setTimeout(() => {
            toast({
                type: 'error',
                icon: 'check circle outline',
                size: 'tiny',
                //iconSize: 'mini',
                //title: 'Brand Created',
                description: 'Brand already exists',
                //animation: 'jiggle',
                time: 2000,
                /*onClose: () => alert('you close this toast'),
                onClick: () => alert('you click on the toast'),
                onDismiss: () => alert('you have dismissed this toast')*/
            });
        }, 200);   
        
       
          
          
          return
        }
        setBrands([...brands, brand])        
        await API.graphql(graphqlOperation(createBrand, { input: { name: brand } }))
        setBrandName("")
        setTimeout(() => {
          toast({
              type: 'success',
              icon: 'check circle outline',
              size: 'tiny',
              //iconSize: 'mini',
              //title: 'Brand Created',
              description: 'Brand successfully created',
              //animation: 'jiggle',
              time: 2000,
              /*onClose: () => alert('you close this toast'),
              onClick: () => alert('you click on the toast'),
              onDismiss: () => alert('you have dismissed this toast')*/
          })
          setOpen(false)
      
      }, 200)       
    } catch (err) {
        console.log('error creating brand:', err)
        setBrandName("")
        setTimeout(() => {
          toast({
              type: 'error',
              icon: 'times',
              size: 'tiny',
              //iconSize: 'mini',
              title: 'Error creating brand',
              description: err,
              //animation: 'jiggle',
              time: 2000,
              /*onClose: () => alert('you close this toast'),
              onClick: () => alert('you click on the toast'),
              onDismiss: () => alert('you have dismissed this toast')*/
          });
      }, 200);
    }
  }

  
  const subscription = async () => await API.graphql(
    graphqlOperation(subscriptions.onCreateBrand)
).subscribe({
    next: ({ provider, value }) => { 
      let brand = value.data.onCreateBrand
      console.log(value.data.onCreateBrand)
      setBrands([...brands, brand ]) 
    },
    error: error => console.warn(error)
});
    

  const handleSubmit = (evt) => {
      evt.preventDefault()
      
      //setOpen(false)
      console.log(brandName)
      addBrand()
      fetchBrands()
  }
  
  useEffect(() => {
    fetchBrands()
    subscription()
    //subscription.unsubscribe()
    
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
          <SemanticToastContainer position="top-center" />
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
          
          
          
            <Modal
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={<Button floated='right'
                            icon
                            labelPosition='left'
                            primary                            
                            size='small'> 
                            <Icon name='plus' /> 
                            Add Brand
                      </Button>}
            >
              <Modal.Header>Add Brand</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  
                  <Form>
                    <Form.Field>
                      <label>Brand Name</label>
                      <input placeholder='Brand Name' onChange={e => setBrandName(e.target.value)}/>
                    </Form.Field>                    
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button positive onClick={handleSubmit}>
                Add Brand
              </Button>
                
              


              </Modal.Actions>
            </Modal>

























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