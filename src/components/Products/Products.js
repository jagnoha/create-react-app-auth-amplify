import React, { useState, useEffect }from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { Pagination, Input, Button, Icon, Grid, Modal, Form} from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'
import 'react-semantic-toasts/styles/react-semantic-alert.css'
import { listProducts, listBrands, listManufacturers, listCategorys, listSubCategorys, listSubCategory2s, listEbayStoreCategorys } from '../../graphql/queries'
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

  const [manufacturers, setManufacturers] = useState([])
  const [manufacturer, setManufacturer] = useState(null)

  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(null)

  const [subCategories, setSubCategories] = useState([])
  const [subCategory, setSubCategory] = useState(null)

  const [subCategories2, setSubCategories2] = useState([])
  const [subCategory2, setSubCategory2] = useState(null)

  const [ebayStoreCategorys, setEbayStoreCategorys] = useState([])
  const [ebayStoreCategory, setEbayStoreCategory] = useState(null)

  const [activePage, setActivePage] = useState(1)
  const [search, setSearch] = useState("")
  const [orderColumn, setOrderColumn] = useState({column: null, direction: 'descending'})
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [productForm, setProductForm] = useState({})
  const [productEdit, setProductEdit] = useState({})
  const [ebayTitleChars, setEbayTitleChars] = useState(0)
  
   
  
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
        let productInput = {
          id,
          SKU: productForm.sku, 
          mpn: productForm.mpn,
          legacyId: productForm.legacyId,
          parentSKU: productForm.parentSKU,
          binLocation: productForm.binLocation,
          handle: productForm.handle,
          shopifyFitmentTags: productForm.shopifyFitmentTags,
          shopifyOnlyTags: productForm.shopifyOnlyTags,
          brandID: productForm.brandID,
          manufacturerID: productForm.manufacturerID,
          categoryID: productForm.categoryID,
          subcategoryID: productForm.subcategoryID,
          subcategory2ID: productForm.subcategory2ID,
          ebaystorecategoryID: productForm.ebaystorecategoryID,
          title: {
            store: productForm.titleStore,
            ebay: productForm.titleEbay,
            amazon: productForm.titleAmazon,
          },
          description: {
            store: productForm.descriptionStore,
            ebay: productForm.descriptionEbay,
            amazon: productForm.descriptionAmazon,
          },
          bulletPoints: {
            bullet1: productForm.bullet1,  
            bullet2: productForm.bullet1,
            bullet3: productForm.bullet1,
            bullet4: productForm.bullet1,
            bullet5: productForm.bullet1,
            bullet6: productForm.bullet1,
            bullet7: productForm.bullet1,            
          },
          dimensions: {
            height: productForm.height,
            length: productForm.length,
            width: productForm.width,
          },
          weight: productForm.weight,
          dimensionalWeight: productForm.dimensionalWeight,
          appliedWeight: productForm.appliedWeight,
          
        }
        setProducts([...products, productInput])        
        await API.graphql(graphqlOperation(createProduct, { input: productInput }))
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

  const handleClose = (evt) => {
    evt.preventDefault()
    
    //console.log(productForm)
    /*setBrand(null)
    setManufacturer(null)*/
    setOpen(false)
    setProductForm({})  
    //setManufacturer(null)
    
}

  const handleUpdate = (evt) => {
    evt.preventDefault()
    modifyProduct()
  }

const onPageRendered = async () => {
  fetchProducts()
  fetchBrands()
  fetchManufacturers()
  fetchCategories()
  fetchSubCategories()
  fetchSubCategories2()
  fetchEbayStoreCategorys()
  subscriptionCreate()
  subscriptionUpdate()
  
}



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
    //console.log("esta es una prueba *****", products)
    

} catch (err) { console.log(err) }
}

const fetchManufacturers = async () => {
  try {
    const manufacturersData = await API.graphql({
      query: listManufacturers,
    
    })      

    console.log(manufacturersData)
    
    const manufacturers = await manufacturersData.data.listManufacturers.items.filter(item => !item._deleted)      
    setManufacturers(manufacturers)   
    

} catch (err) { console.log(err) }
}

const fetchCategories = async () => {
  try {
    const categoriesData = await API.graphql({
      query: listCategorys,
    
    })      

    //console.log(manufacturersData)
    
    const categories = await categoriesData.data.listCategorys.items.filter(item => !item._deleted)      
    setCategories(categories)   
    

} catch (err) { console.log(err) }
}

const fetchSubCategories = async () => {
  try {
    const subCategoriesData = await API.graphql({
      query: listSubCategorys,
    
    })      

    //console.log(manufacturersData)
    
    const subCategories = await subCategoriesData.data.listSubCategorys.items.filter(item => !item._deleted)      
    setSubCategories(subCategories)   
    

} catch (err) { console.log(err) }
}

const fetchSubCategories2 = async () => {
  try {
    const subCategoriesData2 = await API.graphql({
      query: listSubCategory2s,
    
    })      

    //console.log(manufacturersData)
    
    const subCategories2 = await subCategoriesData2.data.listSubCategory2s.items.filter(item => !item._deleted)      
    setSubCategories2(subCategories2)   
    

} catch (err) { console.log(err) }
}

const fetchEbayStoreCategorys = async () => {
  try {
    const ebayStoreCategorysData = await API.graphql({
      query: listEbayStoreCategorys,
    
    })      

    console.log("ebay store: ",ebayStoreCategorysData)
    
    const ebayStoreCategorys = await ebayStoreCategorysData.data.listEbayStoreCategorys.items.filter(item => !item._deleted)      
    setEbayStoreCategorys(ebayStoreCategorys)   
    

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

    const handleBrand = (value) => {
      //evt.persist();
      setProductForm((values) => ({
        ...values,
        brandID: value,
    }))
      
      //setBrand(value)
      console.log(value)
      }

      const handleManufacturer = (value) => {
        //evt.persist();
        
        setProductForm((values) => ({
          ...values,
          manufacturerID: value,
      }))

        //setManufacturer(value)
        console.log(value)
        }

        const handleCategory = (value) => {
          //evt.persist();
          setProductForm((values) => ({
            ...values,
            categoryID: value,
        }))
          //setCategory(value)
          console.log(value)
          }

          const handleSubCategory = (value) => {
            //evt.persist();
            setProductForm((values) => ({
              ...values,
              subcategoryID: value,
          }))
            //setSubCategory(value)
            console.log(value)
            }

            const handleSubCategory2 = (value) => {
              //evt.persist();
              setProductForm((values) => ({
                ...values,
                subcategory2ID: value,
            }))
              //setSubCategory2(value)
              console.log(value)
              }

              const handleEbayStoreCategory = (value) => {
                //evt.persist();
                setProductForm((values) => ({
                  ...values,
                  ebaystorecategoryID: value,
              }))
                //setEbayStoreCategory(value)
                console.log(value)
                }

                const handleHandle = (evt) => {
                  evt.persist();
                  setProductForm((values) => ({
                      ...values,
                      handle: evt.target.value,
                  }));
              }

              const handleShopifyFitmentTags = (evt) => {
                evt.persist();
                setProductForm((values) => ({
                    ...values,
                    shopifyFitmentTags: evt.target.value,
                }));
            }

            const handleShopifyOnlyTags = (evt) => {
              evt.persist();
              setProductForm((values) => ({
                  ...values,
                  shopifyOnlyTags: evt.target.value,
              }));
          }

          const handleTitleStore = (evt) => {
            evt.persist();
            setProductForm((values) => ({
                ...values,
                titleStore: evt.target.value,
            }));
        }

        const handleTitleEbay = (evt) => {
          evt.persist();

          setEbayTitleChars(evt.target.value.length)

          if (evt.target.value.length <= 80) {
          setProductForm((values) => ({
              ...values,
              titleEbay: evt.target.value,
          }))
        }
      }

      const handleTitleAmazon = (evt) => {
        evt.persist();
        setProductForm((values) => ({
            ...values,
            titleAmazon: evt.target.value,
        }));
    }

    const handleDescriptionStore = (evt) => {
      evt.persist();
      setProductForm((values) => ({
          ...values,
          descriptionStore: evt.target.value,
      }));
  }

  const handleDescriptionEbay = (evt) => {
    evt.persist();

    
    setProductForm((values) => ({
        ...values,
        descriptionEbay: evt.target.value,
    }))
  
}

const handleDescriptionAmazon = (evt) => {
  evt.persist();
  setProductForm((values) => ({
      ...values,
      descriptionAmazon: evt.target.value,
  }));
}

const handleBullet1 = (evt) => {
  evt.persist();
  setProductForm((values) => ({
      ...values,
      bullet1: evt.target.value,
  }));
}
const handleBullet2 = (evt) => {
  evt.persist();
  setProductForm((values) => ({
      ...values,
      bullet2: evt.target.value,
  }))
  
}
const handleBullet3 = (evt) => {
  evt.persist();
  setProductForm((values) => ({
      ...values,
      bullet3: evt.target.value,
  }))
}
const handleBullet4 = (evt) => {
  evt.persist();
  setProductForm((values) => ({
      ...values,
      bullet4: evt.target.value,
  }))
}
const handleBullet5 = (evt) => {
  evt.persist();
  setProductForm((values) => ({
      ...values,
      bullet5: evt.target.value,
  }))
}
const handleBullet6 = (evt) => {
  evt.persist();
  setProductForm((values) => ({
      ...values,
      bullet6: evt.target.value,
  }))
}
const handleBullet7 = (evt) => {
  evt.persist();
  setProductForm((values) => ({
      ...values,
      bullet7: evt.target.value,
  }))
}

const handleHeight = (evt) => {
  evt.persist()
  let dimCalc = Math.ceil((evt.target.value * productForm.length * productForm.width) / 139)
  setProductForm((values) => ({
      ...values,
      height: evt.target.value,
      dimensionalWeight: dimCalc,
      appliedWeight: dimCalc > productForm.weight ? dimCalc : productForm.weight, 
  }))
 
}
const handleLength = (evt) => {
  evt.persist()
  let dimCalc = Math.ceil((evt.target.value * productForm.height * productForm.width) / 139)
  setProductForm((values) => ({
      ...values,
      length: evt.target.value,
      dimensionalWeight: dimCalc,
      appliedWeight: dimCalc > productForm.length ? dimCalc : productForm.length, 
  }))
}
const handleWidth = (evt) => {
  evt.persist()
  let dimCalc = Math.ceil((evt.target.value * productForm.length * productForm.height) / 139)
  setProductForm((values) => ({
      ...values,
      width: evt.target.value,
      dimensionalWeight: dimCalc,
      appliedWeight: dimCalc > productForm.width ? dimCalc : productForm.width,
  }))
}

const handleWeight = (evt) => {
  evt.persist();
  setProductForm((values) => ({
      ...values,
      weight: evt.target.value,
      appliedWeight: productForm.dimensionalWeight > evt.target.value ? productForm.dimensionalWeight : evt.target.value,      
  }))
}

const handleDimensionalWeight = (evt) => {
  evt.persist();
  setProductForm((values) => ({
      ...values,
      dimensionalWeight: evt.target.value,
  }))
}

const handleAppliedWeight = (evt) => {
  evt.persist();
  setProductForm((values) => ({
      ...values,
      appliedWeight: evt.target.value,
  }))
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
              closeOnEscape={true}
              closeOnDimmerClick={false}            
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
              <Modal.Content scrolling>
                <Modal.Description>
                  
                  
                  <CreateProductForm 
                      sku = {productForm.sku} handleSKU = {(e) => handleSKU(e)}
                      mpn = {productForm.mpn} handleMPN = {(e) => handleMPN(e)}
                      legacyId = {productForm.legacyId} handleLegacyId = {(e) => handleMPN(e)}
                      parentSKU = {productForm.parentSKU} handleParentSKU = {(e) => handleMPN(e)}
                      binLocation = {productForm.binLocation} handleBinLocation = {(e) => handleMPN(e)}
                      handle = {productForm.handle} handleHandle = {(e) => handleHandle(e)}
                      shopifyFitmentTags = {productForm.shopifyFitmentTags} handleShopifyFitmentTags = {(e) => handleShopifyFitmentTags(e)}
                      shopifyOnlyTags = {productForm.shopifyOnlyTags} handleShopifyOnlyTags = {(e) => handleShopifyOnlyTags(e)}
                      brands = {brands} valueBrand = {productForm.brandID} handleBrand = {(e, { value }) => handleBrand(value)}
                      manufacturers = {manufacturers} valueManufacturer = {productForm.manufacturerID} handleManufacturer = {(e, { value }) => handleManufacturer(value)}
                      categories = {categories} valueCategory = {productForm.categoryID} handleCategory = {(e, { value }) => handleCategory(value)}
                      subCategories = {subCategories} valueSubCategory = {productForm.subcategoryID} handleSubCategory = {(e, { value }) => handleSubCategory(value)}
                      subCategories2 = {subCategories2} valueSubCategory2 = {productForm.subcategory2ID} handleSubCategory2 = {(e, { value }) => handleSubCategory2(value)}
                      ebayStoreCategorys = {ebayStoreCategorys} valueEbayStoreCategory = {productForm.ebaystorecategoryID} handleEbayStoreCategory = {(e, { value }) => handleEbayStoreCategory(value)}
                      titleStore = {productForm.titleStore} handleTitleStore = {(e) => handleTitleStore(e)}
                      titleEbay = {productForm.titleEbay} handleTitleEbay = {(e) => handleTitleEbay(e)} ebayChars = {ebayTitleChars}
                      titleAmazon = {productForm.titleAmazon} handleTitleAmazon = {(e) => handleTitleAmazon(e)}
                      descriptionStore = {productForm.descriptionStore} handleDescriptionStore = {(e) => handleDescriptionStore(e)}
                      descriptionEbay = {productForm.descriptionEbay} handleDescriptionEbay = {(e) => handleDescriptionEbay(e)} 
                      descriptionAmazon = {productForm.descriptionAmazon} handleDescriptionAmazon = {(e) => handleDescriptionAmazon(e)}
                      bullet1 = {productForm.bullet1} handleBullet1 = {(e) => handleBullet1(e)}
                      bullet2 = {productForm.bullet2} handleBullet2 = {(e) => handleBullet2(e)}
                      bullet3 = {productForm.bullet3} handleBullet3 = {(e) => handleBullet3(e)}
                      bullet4 = {productForm.bullet4} handleBullet4 = {(e) => handleBullet4(e)}
                      bullet5 = {productForm.bullet5} handleBullet5 = {(e) => handleBullet5(e)}
                      bullet6 = {productForm.bullet6} handleBullet6 = {(e) => handleBullet6(e)}
                      bullet7 = {productForm.bullet7} handleBullet7 = {(e) => handleBullet7(e)}
                      height = {productForm.height} handleHeight = {(e) => handleHeight(e)}
                      length = {productForm.length} handleLength = {(e) => handleLength(e)}
                      width = {productForm.width} handleWidth = {(e) => handleWidth(e)}
                      weight = {productForm.weight} handleWeight = {(e) => handleWeight(e)}
                      dimensionalWeight = {productForm.dimensionalWeight} //handleDimensionalWeight = {(e) => handleDimensionalWeight(e)}
                      appliedWeight = {productForm.appliedWeight} //handleAppliedWeight = {(e) => handleAppliedWeight(e)}

                      
                  />

                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button negative onClick={handleClose}>
                Cancel
              </Button>
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