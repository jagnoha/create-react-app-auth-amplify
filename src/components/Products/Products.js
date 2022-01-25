import React, { useState, useEffect }from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { Pagination, Input, Button, Icon, Grid, Modal, Form} from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'
import 'react-semantic-toasts/styles/react-semantic-alert.css'
import { listProducts, listBrands } from '../../graphql/queries'
import { createProduct, updateProduct } from '../../graphql/mutations'
import * as subscriptions from '../../graphql/subscriptions'
import { v4 as uuidv4 } from 'uuid'
import ProductTable from '../ProductTable/ProductTable'
import CreateProductForm from '../Forms/CreateProductForm'



export default function Products() {
  const [chunckProducts, setChunkProducts] = useState(null)
  const [products, setProducts] = useState([])
  const [brands, setBrands] = useState([])
  const [brand, setBrand] = useState(null)
  const [activePage, setActivePage] = useState(1)
  const [search, setSearch] = useState("")
  const [orderColumn, setOrderColumn] = useState({column: null, direction: 'descending'})
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [productForm, setProductForm] = useState({})
  const [productEdit, setProductEdit] = useState({})
  
   
  
  const addProduct = async () => {
    try {
        
        const product = productForm
        console.log(productForm);
        if (products.find(item => item.SKU.toUpperCase() === product.sku.toUpperCase() ))  {
          setTimeout(() => {
            toast({
                type: 'error',
                icon: 'check circle outline',
                size: 'tiny',                
                description: 'Product already exists',                
                time: 2000,                
            });
        }, 200); 
          return
        }
        let id = uuidv4()
        setProducts([...products, {id, SKU: productForm.sku, mpn: productForm.mpn }])        
        await API.graphql(graphqlOperation(createProduct, { input: {id, SKU: productForm.sku, mpn: productForm.mpn } }))
        fetchProducts()
        setProductForm({})
        setTimeout(() => {
          toast({
              type: 'success',
              icon: 'check circle outline',
              size: 'tiny',              
              description: 'Product successfully created',
              time: 2000,              
          })
          setOpen(false)
      
      }, 200)
           
    } catch (err) {
        //console.log('error creating Product:', err)
        setProductForm({})
        setTimeout(() => {
          toast({
              type: 'error',
              icon: 'times',
              size: 'tiny',              
              title: 'Error creating Product',
              description: err,              
              time: 2000,              
          });
      }, 200);
    }
  }

  const modifyProduct = async () => {
    try {
        
        const sku = productEdit.sku
        const id = productEdit.id
        console.log("AQUI VA ProductS ********")
        console.log(products)
        let tempProducts = [...products]
        let index = tempProducts.findIndex(item => item.id === id)
        tempProducts[index].sku = sku
        setProducts(tempProducts)        
        const version = tempProducts[index]._version        
        
        const productDetails = {
          id: id,
          SKU: productEdit.sku,
          mpn: productEdit.mpn,
          _version: version
        };
        await API.graphql(graphqlOperation(updateProduct, { input: productDetails }))
        fetchProducts()

        setProductEdit({})
        setTimeout(() => {
          toast({
              type: 'success',
              icon: 'check circle outline',              
              size: 'tiny',              
              description: 'Product successfully updated',
              time: 2000,              
          })
          setOpenEdit(false)
      
      }, 200)
           
    } catch (err) {
        console.log('error updating Product:', err)
        setProductEdit({})
        setTimeout(() => {
          toast({
              type: 'error',
              icon: 'times',
              size: 'tiny',              
              title: 'Error creating Ebay Store Category',
              description: err,              
              time: 2000,              
          });
      }, 200);
    }
  }
  
  const subscriptionCreate = async () => await API.graphql(
    graphqlOperation(subscriptions.onCreateProduct)
).subscribe({
    next: (item) => { 
      fetchProducts()
      let product = item.value.data.onCreateProduct;
      console.log(product)
       
      //console.log("QUE HAY AHORA", products)
      
      if (products) {
        setProducts([...products, product ]) 
      }
    
    },
    error: error => console.warn(error)
});

const subscriptionUpdate = async () => await API.graphql(
  graphqlOperation(subscriptions.onUpdateProduct)
).subscribe({
  next: (item) => { 
    fetchProducts()
    //console.log(item)
    let productTemp = item.value.data.onUpdateProduct;
    console.log(productTemp)
    
    let tempProducts = [...products]
    let index = tempProducts.findIndex(item => item.id === productTemp.id)
    
    if (tempProducts) {
      tempProducts[index] = productTemp
      setProducts(tempProducts)
    }
   

  },
  error: error => console.warn(error)
});



    

  const handleSubmit = (evt) => {
      evt.preventDefault()
      
      console.log(productForm)
      addProduct()
  }

  const handleUpdate = (evt) => {
    evt.preventDefault()
    modifyProduct()
  }

const onPageRendered = async () => {
  fetchProducts()
  fetchBrands()
  subscriptionCreate()
  subscriptionUpdate()
  
};



  useEffect(() => {
    onPageRendered()
    
}, [])


const sliceIntoChunks = (arr, chunkSize) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
  }
  return res;
}

const getOnlyProducts = async () => {

  try {
    const productData = await API.graphql({
      query: listProducts,
    
    })      
    
    const products = await productData.data.listProducts.items.filter(item => !item._deleted)   
    setProducts(products)
    //console.log("esta es una prueba *****", products)
    

} catch (err) { console.log(err) }}


const fetchBrands = async () => {
  try {
    const brandsData = await API.graphql({
      query: listBrands,
    
    })      

    console.log(brandsData)
    
    const brands = await brandsData.data.listBrands.items.filter(item => !item._deleted)   
    //console.log("QUE TENEMOS AQUI:", Products)  
    //sortItems(products, orderColumn.direction === 'descending' ? 'ascending' : 'descending');
    setBrands(brands)
    console.log("esta es una prueba *****", products)
    

} catch (err) { console.log(err) }
}


const fetchProducts = async () => {
  try {
      const productData = await API.graphql({
        query: listProducts,
      
      })      

      console.log(productData)
      
      const products = await productData.data.listProducts.items.filter(item => !item._deleted)   
      //console.log("QUE TENEMOS AQUI:", Products)  
      //sortItems(products, orderColumn.direction === 'descending' ? 'ascending' : 'descending');
      setChunkProducts( sliceIntoChunks(products, 10 ))
      setProducts(products)
      console.log("esta es una prueba *****", products)
      

  } catch (err) { console.log(err) }}

  

    let dataChunks = ((chunckProducts === null ? [] : chunckProducts ))
    
    const handlePaginationChange = (e, { activePage }) => { setActivePage(activePage); fetchProducts() };
    
    
    const sortItems = (list, direction) => {
      if (direction === 'descending'){
        list.sort(function(a, b) {
          let nameA = a.SKU.toUpperCase(); // ignore upper and lowercase
          let nameB = b.SKU.toUpperCase(); // ignore upper and lowercase
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
          let nameA = a.SKU.toUpperCase(); // ignore upper and lowercase
          let nameB = b.SKU.toUpperCase(); // ignore upper and lowercase
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
      console.log(products)
      console.log(orderColumn.direction)
      sortItems(products, orderColumn.direction);
      setChunkProducts( sliceIntoChunks(products, 10 ))
      setProducts(products)
      
    }

    const handleOpenEditForm = (item) => {
      setOpenEdit(!openEdit) 
      setProductEdit({id: item.id, sku: item.SKU, mpn: item.mpn})
           
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        console.log(search);
        

        setActivePage(1); 
      
        let tempProducts = products.filter(item => item.SKU.toLowerCase().includes(search.toLowerCase()) )
        tempProducts = tempProducts.length > 0 ? tempProducts : products
         
        
        setChunkProducts( sliceIntoChunks(tempProducts, 10 ))
      }
    }

    const handleSKU = (evt) => {
        evt.persist();
        setProductForm((values) => ({
            ...values,
            sku: evt.target.value,
        }));

    }

    const handleMPN = (evt) => {
        evt.persist();
        setProductForm((values) => ({
            ...values,
            mpn: evt.target.value,
        }));
    }

    const handleBrand = (evt) => {
      //evt.persist();
      
      setBrand(evt)
      console.log(brand)
      }
  

    const handleEditSKU = (evt) => {
        evt.persist();
        setProductEdit((values) => ({
            ...values,
            sku: evt.target.value,
        }));

    }

    const handleEditMPN = (evt) => {
        evt.persist();
        setProductEdit((values) => ({
            ...values,
            mpn: evt.target.value,
        }));
    }

    //console.log("************************** ",ProductForm)
    //console.log(ProductEdit.id)
    

    return (
      
        <div style={divStyle}>
          <SemanticToastContainer position="top-center" />
        <h1>Products</h1>

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
                            Add Product
                      </Button>}
            >
              <Modal.Header>Add Product</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  
                  
                  <CreateProductForm 
                      sku = {productForm.sku} handleSKU = {(e) => handleSKU(e)}
                      mpn = {productForm.mpn} handleMPN = {(e) => handleMPN(e)}
                      legacyId = {productForm.mpn} handleLegacyId = {(e) => handleMPN(e)}
                      parentSKU = {productForm.mpn} handleParentSKU = {(e) => handleMPN(e)}
                      binLocation = {productForm.mpn} handleBinLocation = {(e) => handleMPN(e)}
                      handle = {productForm.mpn} handleHandle = {(e) => handleMPN(e)}
                      shopifyFitmentTags = {productForm.mpn} handleShopifyFitmentTags = {(e) => handleMPN(e)}
                      shopifyOnlyTags = {productForm.mpn} handleShopifyOnlyTags = {(e) => handleMPN(e)}
                      brands = {brands} value = {brand} handleBrands = {(e, {value}) => handleBrand(e)}
                  />

                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button positive onClick={handleSubmit}>
                Add Product
              </Button>
 
              </Modal.Actions>
            </Modal>


            <Modal
              onClose={() => setOpenEdit(false)}
              onOpen={() => setOpenEdit(true)}
              open={openEdit}
              
            >
              <Modal.Header>Edit Product</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  
                  <Form>
                    <Form.Field>
                      <label>SKU</label>
                      <input placeholder='Product SKU' 
                      value = {productEdit.sku} 
                      onChange={ (e) => handleEditSKU(e) }/>
                    </Form.Field>
                    <Form.Field>
                      <label>Manufacturer Part Number</label>
                      <input placeholder='Manufacturer Part Number' 
                      value = {productEdit.mpn} 
                      onChange={ (e) => handleEditMPN(e) }/>
                    </Form.Field>                        
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button positive onClick={handleUpdate}>
                Save Product
              </Button>
 
              </Modal.Actions>
            </Modal>

          </Grid.Column>          
        </Grid>

        
        <ProductTable data = {dataChunks[activePage - 1]} handleOrder = {handleOrderColumn} orderColumn = {orderColumn} openForm = {handleOpenEditForm} />
         <div style = {paginationStyle}>
          <Pagination
              activePage={activePage}
              boundaryRange={0}
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
  };

  const paginationStyle = {
    display: "flex",
          justifyContent: "center",
          alignItems: "center"
  }