import React, { useState, useEffect }from 'react'
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify'
import { Pagination, Input, Button, Icon, Grid, Modal, Dropdown, Form, Popup} from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'
import 'react-semantic-toasts/styles/react-semantic-alert.css'
import { listProducts, listBrands, listManufacturers, listCategorys, listSubCategorys, listSubCategory2s, listEbayStoreCategorys, listAttributes } from '../../graphql/queries'
import { createProduct, updateProduct } from '../../graphql/mutations'
import * as subscriptions from '../../graphql/subscriptions'
import { v4 as uuidv4 } from 'uuid'
import ProductTable from '../ProductTable/ProductTable'
import CreateProductForm from '../Forms/CreateProductForm'
import urlSlug from 'url-slug'
import aws_exports from '../../aws-exports'
//import _, { groupBy, map, first } from 'underscore';

import { parse } from 'uuid'
import EditCategoriesForm from '../Forms/EditCategoriesForm'
import SubCategories from '../SubCategories/SubCategories'
Amplify.configure(aws_exports)



export default function Products() {
  const [chunckProducts, setChunkProducts] = useState(null)
  const [products, setProducts] = useState([])



  //const [images, setImages] = React.useState([{"data_url":"https://cdn.shopify.com/s/files/1/0338/9682/4876/products/28890339_600x.jpg?v=1627667600"}]);
  const [images, setImages] = React.useState([]);
  
  const [productsByPage, setProductsByPage] = useState(15)
  
  const [brands, setBrands] = useState([])
  const [brand, setBrand] = useState(null)

  const [statusType, setStatusType] = useState([{key: 1, text: "Active", value: '1'},{key: 0, text: "Draft", value: '0'}])

  const [manufacturers, setManufacturers] = useState([])
  const [manufacturer, setManufacturer] = useState(null)

  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(null)

  const [attributes, setAttributes] = useState([])
  const [attributesSelected, setAttributesSelected] = useState([])
  const [attributeSelected, setAttributeSelected] = useState({})

  const [productsSelected, setProductsSelected] = useState([])
  const [productsSelectedAll, setProductsSelectedAll] = useState(false)


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

  const [editCategoriesModal, setEditCategoriesModal] = useState(false)
  const [editAttributesModal, setEditAttributesModal] = useState(false)
  const [editPricesModal, setEditPricesModal] = useState(false)
  const [editStatusModal, setEditStatusModal] = useState(false)

  const [editCategoriesSelected, setEditCategoriesSelected] = 
        useState({
          category: {id:"", checked: false},
          subCategory: {id: "", checked: false},
          subCategory2: {id: "", checked: false},
          ebayStoreCategory: {id:"", checked: false}
        })
  
  
  

  const optionsActions = [
    { key: 'categories', icon: 'sitemap', text: 'Edit Categories', value: 'categories' },
    { key: 'attribute', icon: 'sliders horizontal', text: 'Edit Attributes', value: 'attributes' },
    { key: 'price', icon: 'money bill alternate', text: 'Edit Price', value: 'price' },    
    { key: 'delete', icon: 'delete', text: 'Remove Product', value: 'delete' },    
  ]
  
  const urlBase = 'https://demons-cycle-storage202642-devt.s3.amazonaws.com/public/'
  
  const addProduct = async (imageList) => {
    try {
        
        const product = productForm
        //console.log(productForm);
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
          images: {
            image1: JSON.stringify(imageList[0]),
            image2: JSON.stringify(imageList[1]),
            image3: JSON.stringify(imageList[2]),
            image4: JSON.stringify(imageList[3]),
            image5: JSON.stringify(imageList[4]),
            image6: JSON.stringify(imageList[5]),
            image7: JSON.stringify(imageList[6]),
            image8: JSON.stringify(imageList[7]),
            image9: JSON.stringify(imageList[8]),
            image10: JSON.stringify(imageList[9]),
          },
          bulletPoints: {
            bullet1: productForm.bullet1,  
            bullet2: productForm.bullet2,
            bullet3: productForm.bullet3,
            bullet4: productForm.bullet4,
            bullet5: productForm.bullet5,
            bullet6: productForm.bullet6,
            bullet7: productForm.bullet7,            
          },
          dimensions: {
            height: productForm.height,
            length: productForm.length,
            width: productForm.width,
          },
          weight: productForm.weight,
          dimensionalWeight: productForm.dimensionalWeight,
          appliedWeight: productForm.appliedWeight,
          price: {
            MSRP: productForm.priceMSRP,
            MAP: productForm.priceMAP,
            store: productForm.priceStore,
            ebay: productForm.priceEbay,
            amazon: productForm.priceAmazon,
            wholesaleLow: productForm.priceWholesaleLow,
            wholesaleHigh: productForm.priceWholesaleHigh,
            scratchLow: productForm.priceScratchLow,
            scratchHigh: productForm.priceScratchHigh,
          },
          cost: productForm.cost,
          source: {
            warehouse: productForm.sourceWarehouse,
            dropship: productForm.sourceDropship,
          },
          Attributes: productForm.Attributes,
          status: productForm.status,          
        }
        setProducts([...products, productInput])        
        await API.graphql(graphqlOperation(createProduct, { input: productInput }))
        //fetchProducts()
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

  /*const saveImages = async () => {
    let image = images[0]
    await Storage.put(image.file.name, image.data_url)
    console.log('************************** successfully saved file... ******************')
  }*/

  const saveImages = async () => {
    try {
      //let image = images[0]
      //const result = await Storage.put(image.file.name, image.data_url)
      //let imageList = images.map(item => item)
      
      /*console.log("&&&&&&& &&&&&&& &&&&&& &&&&", images)
      setProductForm((values) => ({
        ...values,
        images: [],
      }))*/
      console.log("AQUI VAN UNAS IMAGENES!!!!!!!!!!!!!")
      let tempList = []
      console.log("**************************",images)
      for (const item of images) {
        
        let name = uuidv4()
        
        console.log("ESTE ES EL TIPO:", item)
        
        if (!item.old){
        const result = await Storage.put(item.file ? item.file.name : name, item.file, {
          level: "public",
          contentType: item.file.type,
        })
      }
        //const result = await Storage.put(name, item.data_url)
        
        //console.log(result.key)
        
        tempList.push({data_url: urlBase + item.file.name, file: {type: item.file.type, name: item.file.name}})
        //console.log("$$$$$$$$$$$$$$$$$$$$$$$ ", result)
        
        /*if (productForm.images) {

            setProductForm((values) => ({
              ...values,
              images: [ ...productForm.images, urlBase + result.key],
            }))     
        } else {
          setProductForm((values) => ({
            ...values,
            images: [urlBase + result.key],
          }))   
        }*/
      
      }

      console.log("LISTA TEMPORAL: ", tempList)
    /*
      setProductForm((values) => ({
        ...values,
        images: tempList,
      })) */

        /*const file = await Storage.get(
          'demonhorns_480x.png', {
            level: 'public'
          }
        )*/
      
      
      //const result = await Storage.put("test.txt", "Hello")

      //console.log('************************** successfully saved file... ******************: ', result)      
      return tempList


    } catch (err) { console.log(err) }}


  const modifyProduct = async (imageList) => {
    try {
      //let imageList = result.then(value =>console.log(value))
      //console.log("IMAGES: ", images)  
      //console.log("IMAGE LIST: ", imageList)
        const sku = productForm.sku
        const id = productForm.id
        //console.log("AQUI VA ProductS ********")
        //console.log(products)
        let tempProducts = [...products]
        let index = tempProducts.findIndex(item => item.id === id)
        tempProducts[index].sku = sku
        setProducts(tempProducts)        
        const version = tempProducts[index]._version     
        
        //saveImages()
        
        /*const productDetails = {
          id: id,
          SKU: productEdit.sku,
          mpn: productEdit.mpn,
          _version: version
        };*/
        //console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMM  ", productForm)

        let productDetails = {
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
          images: {
            image1: JSON.stringify(imageList[0]),
            image2: JSON.stringify(imageList[1]),
            image3: JSON.stringify(imageList[2]),
            image4: JSON.stringify(imageList[3]),
            image5: JSON.stringify(imageList[4]),
            image6: JSON.stringify(imageList[5]),
            image7: JSON.stringify(imageList[6]),
            image8: JSON.stringify(imageList[7]),
            image9: JSON.stringify(imageList[8]),
            image10: JSON.stringify(imageList[9]),
          },
          bulletPoints: {
            bullet1: productForm.bullet1,  
            bullet2: productForm.bullet2,
            bullet3: productForm.bullet3,
            bullet4: productForm.bullet4,
            bullet5: productForm.bullet5,
            bullet6: productForm.bullet6,
            bullet7: productForm.bullet7,            
          },
          dimensions: {
            height: productForm.height,
            length: productForm.length,
            width: productForm.width,
          },
          weight: productForm.weight,
          dimensionalWeight: productForm.dimensionalWeight,
          appliedWeight: productForm.appliedWeight,
          price: {
            MSRP: productForm.priceMSRP,
            MAP: productForm.priceMAP,
            store: productForm.priceStore,
            ebay: productForm.priceEbay,
            amazon: productForm.priceAmazon,
            wholesaleLow: productForm.priceWholesaleLow,
            wholesaleHigh: productForm.priceWholesaleHigh,
            scratchLow: productForm.priceScratchLow,
            scratchHigh: productForm.priceScratchHigh,
          },
          cost: productForm.cost,
          source: {
            warehouse: productForm.sourceWarehouse,
            dropship: productForm.sourceDropship,
          },
          Attributes: productForm.Attributes,
          status: productForm.status,
          _version: version,          
        }
        await API.graphql(graphqlOperation(updateProduct, { input: productDetails }))
        //fetchProducts()

        setProductForm({})
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
        //console.log('error updating Product:', err)
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
  
  const subscriptionCreate = async () => await API.graphql(
    graphqlOperation(subscriptions.onCreateProduct)
).subscribe({
    next: (item) => { 
      fetchProducts()
      let product = item.value.data.onCreateProduct;
      //console.log(product)
       
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
    //console.log(productTemp)
    
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
      
      
      
      let imageList = serialFlow().then(value => { 
        
        addProduct(value)
      })

  }

  const handleClose = (evt) => {
    evt.preventDefault()
    
    //console.log(productForm)
    /*setBrand(null)
    setManufacturer(null)*/
    setOpen(false)
    setProductForm({})
    setAttributesSelected([])
    setProductsSelected([]) 
    setProductsSelectedAll(false)
        
    //setManufacturer(null)
    
}

const handleCloseUpdate = (evt) => {
  evt.preventDefault()
  
  //console.log(productForm)
  /*setBrand(null)
  setManufacturer(null)*/
  setOpenEdit(false)
  setProductForm({})
  setAttributesSelected([])
  setProductsSelected([]) 
  setProductsSelectedAll(false)
       
  //setManufacturer(null)
  
}

async function serialFlow(){
 
  let result = await saveImages()
  /*setProductForm((values) => ({
    ...values,
    images: "",
  }))*/
  
  return result
  
  }

  //const handleUpdate = (evt) => {
    async function handleUpdate(evt){
    evt.preventDefault()

    let imageList = serialFlow().then(value => { 
      
      modifyProduct(value)
    })
    
  }


const onPageRendered = async () => {
  fetchProducts()
  fetchBrands()
  fetchManufacturers()
  fetchCategories()
  fetchSubCategories()
  fetchSubCategories2()
  fetchEbayStoreCategorys()
  fetchAttributes()
  
  subscriptionCreate()
  subscriptionUpdate()

  //subscriptions.onCreateProduct.unsubscribe()
  //subscriptions.onUpdateProduct.unsubscribe()



  

  
  
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

    //console.log(brandsData)
    
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

    //console.log(manufacturersData)
    
    const manufacturers = await manufacturersData.data.listManufacturers.items.filter(item => !item._deleted)      
    setManufacturers(manufacturers)   
    

} catch (err) { console.log(err) }
}

const fetchAttributes = async () => {
  try {
    const attributesData = await API.graphql({
      query: listAttributes,
    
    })      

    //console.log(manufacturersData)
    
    const attributes = await attributesData.data.listAttributes.items.filter(item => !item._deleted)      
    setAttributes(attributes)   
    

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

    //console.log("ebay store: ",ebayStoreCategorysData)
    
    const ebayStoreCategorys = await ebayStoreCategorysData.data.listEbayStoreCategorys.items.filter(item => !item._deleted)      
    setEbayStoreCategorys(ebayStoreCategorys)   
    

} catch (err) { console.log(err) }
}



const fetchProducts = async () => {
  try {
      const productData = await API.graphql({
        query: listProducts,
      
      })      

      //console.log(productData)
      
      const products = await productData.data.listProducts.items.filter(item => !item._deleted)   
      //console.log("QUE TENEMOS AQUI:", Products)  
      //sortItems(products, orderColumn.direction === 'descending' ? 'ascending' : 'descending');
      setChunkProducts( sliceIntoChunks(products, productsByPage ))
      setProducts(products)
      //console.log("esta es una prueba *****", products)
      

  } catch (err) { console.log(err) }}

  

    let dataChunks = ((chunckProducts === null ? [] : chunckProducts ))
    
    const handlePaginationChange = (e, { activePage }) => { console.log("ORDER COLUMN:", orderColumn);setActivePage(activePage); setProductsSelected([]); setProductsSelectedAll(false); };
    
    
    const sortItems = (list, direction, column) => {
      if (direction === 'descending'){
        list.sort(function(a, b) {
          let nameA = column !== 'title' ? ( a[column] ? a[column].toUpperCase() : "" ) : ( a.title.store ? a.title.store.toUpperCase() : "") // ignore upper and lowercase
          let nameB = column !== 'title' ? ( b[column] ? b[column].toUpperCase() : "" ) : ( b.title.store ? b.title.store.toUpperCase() : "")  // ignore upper and lowercase
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
          let nameA = column !== 'title' ? ( a[column] ? a[column].toUpperCase() : "" ) : ( a.title.store ? a.title.store.toUpperCase() : "") // ignore upper and lowercase
          let nameB = column !== 'title' ? ( b[column] ? b[column].toUpperCase() : "" ) : ( b.title.store ? b.title.store.toUpperCase() : "")  // ignore upper and lowercase
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
      //console.log(column);
      
      
      //console.log(products)
      //console.log(orderColumn.direction)
      sortItems(products, orderColumn.direction, column);
      setChunkProducts( sliceIntoChunks(products, productsByPage ))
      setProducts(products)

      setOrderColumn({column: column, direction: orderColumn.direction === 'descending' ? 'ascending' : 'descending' })
      setProductsSelected([]) 
      setProductsSelectedAll(false)
      
    }

    const handleOpenEditForm = (item) => {
      setOpenEdit(!openEdit) 
      //setProductEdit({id: item.id, sku: item.SKU, mpn: item.mpn})
      //console.log("ESTE ES EL IIIIIIIIIIIIIITEM", item);
      //console.log("ESTE ES EL ATTRIBUTE: " ,item.Attributes)
      //console.log("ESTE ES EL OBJETO: ", JSON.parse(item.Attributes))
      let attributesObject = JSON.parse(item.Attributes)
      setAttributesSelected(attributesObject ? attributesObject : [] )
      //console.log(attributesObject)

      //console.log("OTRA MAAAAAAAAAAAAAAAAAAAARCA ********************")
      //console.log(attributesObject.map(item => item.id))
      /*setAttributes(attributesObject.map(item => { 
        return (
          {
            key: item.id, name: item.value, value: item.id
          }
        )
      }))*/
      let tempImages = []
    
      if (item.images){
        for (const property in item.images){
          console.log("IMAGES PROPERTY: ",item.images[property])
          if (item.images[property]) {
            //tempImages.push({data_url:urlBase+item.images[property]})
            tempImages.push({...JSON.parse(item.images[property]),old: true})   
          
          }
          
        }
      }
      console.log("IMAGENES TEMPORALES ***********:  ",tempImages)
      
      setImages(tempImages)
      //key: item.id, text: item.name, value: item.id

      setProductForm({
        id: item.id, 
        sku: item.SKU ? item.SKU : "",
        legacyID: item.legacyID ? item.legacyID : "",
        mpn: item.mpn ? item.mpn : "",
        parentSKU: item.parentSKU ? item.parentSKU : "",
        brandID: item.brandID,
        manufacturerID: item.manufacturerID,
        categoryID: item.categoryID,
        subcategoryID: item.subcategoryID,
        subcategory2ID: item.subcategory2ID,
        ebaystorecategoryID: item.ebaystorecategoryID,
        binLocation: item.binLocation ? item.binLocation : "",
        //title: item.title,
        sourceDropship: item.source ? item.source.dropship : false,
        sourceWarehouse: item.source ? item.source.warehouse : false,
        titleStore: item.title ? item.title.store : "",
        titleEbay: item.title ? item.title.ebay : "",
        titleAmazon: item.title ? item.title.amazon : "", 
        descriptionStore: item.description ? item.description.store : "",
        descriptionEbay: item.description ? item.description.ebay : "",
        descriptionAmazon: item.description ? item.description.amazon : "",
        bullet1: item.bulletPoints ? item.bulletPoints.bullet1 : "",
        bullet2: item.bulletPoints ? item.bulletPoints.bullet2 : "",
        bullet3: item.bulletPoints ? item.bulletPoints.bullet3 : "",
        bullet4: item.bulletPoints ? item.bulletPoints.bullet4 : "",
        bullet5: item.bulletPoints ? item.bulletPoints.bullet5 : "",
        bullet6: item.bulletPoints ? item.bulletPoints.bullet6 : "",
        bullet7: item.bulletPoints ? item.bulletPoints.bullet7 : "",
        handle: item.handle ? item.handle : "",
        weight: item.weight ? item.weight : 0,
        images: tempImages, 
        dimensionalWeight: item.dimensionalWeight ? item.dimensionalWeight : 0,
        appliedWeight: item.appliedWeight ? item.appliedWeight : 0,
        height: item.dimensions ? item.dimensions.height : 0,
        length: item.dimensions ? item.dimensions.length : 0,
        width: item.dimensions ? item.dimensions.width : 0,
        shopifyFitmentTags: item.shopifyFitmentTags ? item.shopifyFitmentTags : "",
        shopifyOnlyTags: item.shopifyOnlyTags ? item.shopifyOnlyTags : "",
        priceMSRP: item.price ? item.price.MSRP : 0,
        priceMAP: item.price ? item.price.MAP : 0,
        priceStore: item.price ? item.price.store : 0,
        priceEbay: item.price ? item.price.ebay : 0,
        priceAmazon: item.price ? item.price.amazon : 0,
        priceWholesaleLow: item.price ? item.price.wholesaleLow : 0,
        priceWholesaleHigh: item.price ? item.price.wholesaleHigh : 0,
        priceScratchLow: item.price ? item.price.scratchLow : 0,
        priceScratchHigh: item.price ? item.price.scratchHigh : 0,
        cost: item.cost ? item.cost : 0,
        status: item.status ? item.status : "Draft",
        




        
        
        

        //sourceWarehouse: item.source.warehouse,
        //sourceDropship: item.source.dropship,       
      })
      //setProductForm(item)
      
         
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        //console.log(search);
        

        setActivePage(1); 
      
        /*let tempProducts = products.filter(  
          item => item.SKU.toLowerCase().includes(search.toLowerCase()) 
        )*/
        console.log(products)

        //lista.filter(item => item.a.includes('1') || item.b.includes('ch'))
        //console.log(search.toLowerCase())
        let tempProducts = products.filter(  
          item => item.mpn.toLowerCase().includes(search.toLowerCase())
        )
        
        /*let tempProductsSKU = products.filter(  
          item => item.SKU.toLowerCase().includes(search.toLowerCase())
        )*/

        

       // const comparation = (item) => item.mpn.to
       //let map = new Map()
       
       
       //let tempProductsJoin = tempProductsMPN.concat(tempProductsSKU)
       //let tempProducts = [...new Set(tempProductsJoin.map(item => item.id))]
       
       
       
       /*tempProducts.forEach(item => {
        if(!map.has(item.id)){
          map.set(item.id, item);
        }
      })*/
      //Array.from(map.values())

        tempProducts = tempProducts.length > 0 ? tempProducts : products
        


        setChunkProducts( sliceIntoChunks(tempProducts, productsByPage ))
      }
    }

    const handleSelectAllProductsInPage = (e, value) => {
      
      /*console.log(value, ' ', id)
      console.log(productsSelected)
      let result = productsSelected.find(item => item === id)
      if (result) {
        setProductsSelected(productsSelected.filter(item => item !== id))
      } else {
        setProductsSelected(...productsSelected, id)
      }*/
      setProductsSelectedAll(value)

      if (value) {
        setProductsSelected(chunckProducts[activePage - 1].map(item => item.id))
      } else {
        setProductsSelected([])
      }
      
    }

    const handleProductSelected = (e, value, id) => {
      
      /*console.log(value, ' ', id)
      console.log(productsSelected)
      let result = productsSelected.find(item => item === id)
      if (result) {
        setProductsSelected(productsSelected.filter(item => item !== id))
      } else {
        setProductsSelected(...productsSelected, id)
      }*/
      if (value){
        setProductsSelected([...productsSelected,id])
      } else {
        setProductsSelected(productsSelected.filter(item => item !== id))
      }

      console.log("**************************** ",productsSelected)
      console.log("PRODUCTS IN PAGE", chunckProducts[activePage - 1])
      
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
    const handleAttributes = (value) => {
      //evt.persist();
      
      let temp = value.map(item => {
        
        let attr = attributesSelected.find(itemAtrr => itemAtrr.id === item)
        //console.log("************ attribute: ",item)
        if (attr){
        return (
          {id: attr.id, value: attr.value, option: attr.option}
        )}
        return (
          {
            id: item,
            value: "",
            option: false,
            //text: "",
          }
        )
      })      
      
      setAttributesSelected(temp)
  }

  const handleAttributesSelectedValue = (evt) => {
    //console.log(evt.target.value)
    //console.log(evt.target.id)
    let id = evt.target.id
    let value = evt.target.value
    let tempAttributesSelected = attributesSelected.map(item => {
      if (item.id === id){
        return (
          {id: id, value: value, option: item.option }
        )
      }      
      return (
        item
      )
    })

    setAttributesSelected(tempAttributesSelected)
    setProductForm((values) => ({
      ...values,
      Attributes: JSON.stringify(tempAttributesSelected),
    }))

    
}

const handleAttributesSelectedCheckbox = (data) => {
  //evt.persist()
  let id = data.id.split('.')[0]
  //console.log("OOOOOOOOOOOOOOTRA:", id)
  //console.log("Otra mierda", id)
  //console.log("COOOOOOOOOOOOOOOONO: ", data.id.split('.')[0])

  let tempAttributesSelected = attributesSelected.map(item => {
    if (item.id === id){
      return (
        {...item, option: !item.option }
      )
    }      
    return (
      item
    )
  })
  setAttributesSelected(tempAttributesSelected)
  
  setProductForm((values) => ({
    ...values,
    Attributes: JSON.stringify(tempAttributesSelected),
  }))

  //console.log("<<<<<<<<<<<<<<<<<", JSON.stringify(tempAttributesSelected))
  
}

    const handleBrand = (value) => {
      //evt.persist();
      setProductForm((values) => ({
        ...values,
        brandID: value,
    }))
      
      //setBrand(value)
      //console.log(value)
      }

      

      const handleManufacturer = (value) => {
        //evt.persist();
        
        setProductForm((values) => ({
          ...values,
          manufacturerID: value,
      }))

        //setManufacturer(value)
        //console.log(value)
        }

        const handleCategory = (value) => {
          //evt.persist();
          setProductForm((values) => ({
            ...values,
            categoryID: value,
        }))
          //setCategory(value)
          //console.log(value)
          }

          const handleCategorySelectedBulk = ({value}) => {
            //evt.persist();
            console.log(value)
            setEditCategoriesSelected((values) => ({
              ...values,
              category: {id: value, checked: editCategoriesSelected.category.checked},
          }))
          console.log(editCategoriesSelected)
            //setCategory(value)
            //console.log(value)
          }

          const handleCategorySelectedBulkChecked = (e, data) => {
            //evt.persist();
            console.log(data.checked)
            let value = data.checked
            setEditCategoriesSelected((values) => ({
              ...values,
              category: {id: editCategoriesSelected.category.id, checked: value},
          }))
          console.log(editCategoriesSelected)
          }

          const handleSubCategorySelectedBulkChecked = (e, data) => {
            //evt.persist();
            console.log(data.checked)
            let value = data.checked
            setEditCategoriesSelected((values) => ({
              ...values,
              subCategory: {id: editCategoriesSelected.subCategory.id, checked: value},
          }))
          console.log(editCategoriesSelected)
          }

          const handleSubCategorySelectedBulk = ({value}) => {
            //evt.persist();
            console.log(value)
            setEditCategoriesSelected((values) => ({
              ...values,
              subCategory: {id: value, checked: editCategoriesSelected.subCategory.checked},
          }))
          console.log(editCategoriesSelected)
            //setCategory(value)
            //console.log(value)
          }

          const handleSubCategory2SelectedBulkChecked = (e, data) => {
            //evt.persist();
            console.log(data.checked)
            let value = data.checked
            setEditCategoriesSelected((values) => ({
              ...values,
              subCategory2: {id: editCategoriesSelected.subCategory2.id, checked: value},
          }))
          console.log(editCategoriesSelected)
          }

          const handleSubCategory2SelectedBulk = ({value}) => {
            //evt.persist();
            console.log(value)
            setEditCategoriesSelected((values) => ({
              ...values,
              subCategory2: {id: value, checked: editCategoriesSelected.subCategory2.checked},
          }))
          console.log(editCategoriesSelected)
            //setCategory(value)
            //console.log(value)
          }

          const handleEbayStoreCategorySelectedBulkChecked = (e, data) => {
            //evt.persist();
            console.log(data.checked)
            let value = data.checked
            setEditCategoriesSelected((values) => ({
              ...values,
              ebayStoreCategory: {id: editCategoriesSelected.ebayStoreCategory.id, checked: value},
          }))
          console.log(editCategoriesSelected)
          }

          const handleEbayStoreCategorySelectedBulk = ({value}) => {
            //evt.persist();
            console.log(value)
            setEditCategoriesSelected((values) => ({
              ...values,
              ebayStoreCategory: {id: value, checked: editCategoriesSelected.ebayStoreCategory.checked},
          }))
          console.log(editCategoriesSelected)
            //setCategory(value)
            //console.log(value)
          }

          





          const handleSubCategory = (value) => {
            //evt.persist();
            setProductForm((values) => ({
              ...values,
              subcategoryID: value,
          }))
            //setSubCategory(value)
            //console.log(value)
            }

            const handleSubCategory2 = (value) => {
              //evt.persist();
              setProductForm((values) => ({
                ...values,
                subcategory2ID: value,
            }))
              //setSubCategory2(value)
              //console.log(value)
              }

              const handleEbayStoreCategory = (value) => {
                //evt.persist();
                setProductForm((values) => ({
                  ...values,
                  ebaystorecategoryID: value,
              }))
                //setEbayStoreCategory(value)
                //console.log(value)
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
                /*title: {
                  store: evt.target.value,
                  ebay: productForm.title ? productForm.title.ebay : "",
                  amazon: productForm.title ? productForm.title.amazon : "",
                }*/
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

const handlePriceMSRP = (evt) => {
  evt.persist();
  setProductForm((values) => ({
      ...values,
      priceMSRP: evt.target.value,
  }))
}

const handlePriceMAP = (evt) => {
  evt.persist();
  setProductForm((values) => ({
      ...values,
      priceMAP: evt.target.value,
  }))
}

const handlePriceStore = (evt) => {
  evt.persist();
  setProductForm((values) => ({
      ...values,
      priceStore: evt.target.value,
  }))
}

const handlePriceEbay = (evt) => {
  evt.persist();
  setProductForm((values) => ({
      ...values,
      priceEbay: evt.target.value,
  }))
}

const handlePriceAmazon = (evt) => {
  evt.persist();
  setProductForm((values) => ({
      ...values,
      priceAmazon: evt.target.value,
  }))
}

const handlePriceWholesaleLow = (evt) => {
  evt.persist();
  setProductForm((values) => ({
      ...values,
      priceWholesaleLow: evt.target.value,
  }))
}

const handlePriceWholesaleHigh = (evt) => {
  evt.persist();
  setProductForm((values) => ({
      ...values,
      priceWholesaleHigh: evt.target.value,
  }))
}

const handlePriceScratchLow = (evt) => {
  evt.persist();
  setProductForm((values) => ({
      ...values,
      priceScratchLow: evt.target.value,
  }))
}

const handlePriceScratchHigh = (evt) => {
  evt.persist();
  setProductForm((values) => ({
      ...values,
      priceScratchHigh: evt.target.value,
  }))
}

const handleCost = (evt) => {
  evt.persist();
  setProductForm((values) => ({
      ...values,
      cost: evt.target.value,
  }))
}

const handleSourceWarehouse = (evt) => {
  evt.persist();

  //console.log(!productForm.sourceWarehouse)
  
  setProductForm((values) => ({
      ...values,
      sourceWarehouse: !productForm.sourceWarehouse,
  }))
}

const handleStatus = (evt) => {
  evt.persist();

  //console.log(!productForm.sourceWarehouse)
  console.log(evt)
  setProductForm((values) => ({
      ...values,
      status: productForm.status === "Active" ? "Draft" : "Active",
  }))
}

const handleSourceDropship = (evt) => {
  evt.persist()
  //console.log(!productForm.sourceDropship)
  setProductForm((values) => ({
      ...values,
      sourceDropship: !productForm.sourceDropship,
  }))
}

const handleImages = (imageList, addUpdateIndex) => {
    //console.log("IMAGE LIST >>>>>>>>>>>>>", imageList, addUpdateIndex)
    console.log("IMAGE LIST >>>",imageList)
    //console.log(addUpdateIndex)
    setImages(imageList)

}

const updateCategories = async (id) => {
  try {
    let product = products.find(item => item.id === id)
    let version = product._version
    let categoryOld = product.categoryID
    let subCategoryOld = product.subcategoryID
    let subCategoryOld2 = product.subcategory2ID
    let ebayStoreCategoryOld = product.ebaystorecategoryID
    
    let productDetails = {
      id,
      categoryID: editCategoriesSelected.category.checked ? editCategoriesSelected.category.id : categoryOld, 
      subcategoryID: editCategoriesSelected.subCategory.checked ? editCategoriesSelected.subCategory.id : subCategoryOld,
      subcategory2ID: editCategoriesSelected.subCategory2.checked ? editCategoriesSelected.subCategory2.id : subCategoryOld2,
      ebaystorecategoryID: editCategoriesSelected.ebayStoreCategory.checked ? editCategoriesSelected.ebayStoreCategory.id : ebayStoreCategoryOld,
      _version: version,          
    }
    await API.graphql(graphqlOperation(updateProduct, { input: productDetails }))

    

  } catch (err) {
    //console.log('error creating Product:', err)
    setTimeout(() => {
      toast({
          type: 'error',
          icon: 'times',
          size: 'tiny',              
          title: 'Error updating Categories',
          description: err,              
          time: 2000,              
      });
    }, 200);
  }
}

const handleApplyCategoriesChanges = () => {
  setEditCategoriesModal(false)
  try {
  for (let item of productsSelected){
    console.log(item)
    updateCategories(item)
  }
  setTimeout(() => {
    toast({
        type: 'success',
        icon: 'check circle outline',
        size: 'tiny',              
        description: productsSelected.length + ' Products successfully updated',
        time: 2000,              
    })
  }, 200
  )
  setProductsSelected([])
  setProductsSelectedAll(false)
  } catch (error) {
    console.log(error)
  }
}

const handleGenerateHandle = () => {
  
  let newHandle = productForm.titleStore
  let brandFind = brands.find(item => item.id === productForm.brandID)
  let brand = brandFind ? brandFind.name : ""
  let mpn = productForm.mpn

  //console.log("ESTA ES LA MARCA!: ", brand)

  if (brand === "Ultima" || brand === "Demon's Cycle"){
    setProductForm((values) => ({
      ...values,
      handle: urlSlug(newHandle),
  }))
  } else {
    setProductForm((values) => ({
      ...values,
      handle: urlSlug(`${brand} ${mpn} ${newHandle}`),
  }))
  }

 
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

    //console.log("************************** ",productForm)
    //console.log(ProductEdit.id)
    //console.log(attributesSelected)
    //console.log("Los atributos ************** ", attributesSelected)
    console.log("^^^^^^^^^^^^^^^^^^^", productForm)
    console.log(editCategoriesSelected)
    //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", attributes)
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
              onClose={() => setEditCategoriesModal(false)}              
              open={editCategoriesModal}              
            >
              <Modal.Header>Edit Categories <span style={{fontSize: 14}}>({productsSelected.length} Products Selected)</span></Modal.Header>
              <Modal.Content >
                <Modal.Description>
                  <EditCategoriesForm 
                        categories = {categories} 
                        subCategories = {subCategories} 
                        subCategories2 = {subCategories2} 
                        ebayStoreCategorys = {ebayStoreCategorys}
                        handleCategorySelectedBulk = {(e,{value}) => handleCategorySelectedBulk({value})} 
                        handleCategorySelectedBulkChecked = {(e,data) => handleCategorySelectedBulkChecked(e,data)}
                        handleSubCategorySelectedBulk = {(e,{value}) => handleSubCategorySelectedBulk({value})} 
                        handleSubCategorySelectedBulkChecked = {(e,data) => handleSubCategorySelectedBulkChecked(e,data)}
                        handleSubCategory2SelectedBulk = {(e,{value}) => handleSubCategory2SelectedBulk({value})} 
                        handleSubCategory2SelectedBulkChecked = {(e,data) => handleSubCategory2SelectedBulkChecked(e,data)}
                        handleEbayStoreCategorySelectedBulk = {(e,{value}) => handleEbayStoreCategorySelectedBulk({value})} 
                        handleEbayStoreCategorySelectedBulkChecked = {(e,data) => handleEbayStoreCategorySelectedBulkChecked(e,data)}

                        
                        
                        />
                  </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button negative onClick={() => setEditCategoriesModal(false)}>
                Cancel
              </Button>
              <Button positive disabled = {!Object.keys(editCategoriesSelected).some( (k) => { return editCategoriesSelected[k].checked === true })} onClick={() => handleApplyCategoriesChanges()}>
                Apply changes
              </Button>
 
              </Modal.Actions>
          </Modal>

          <Modal
              closeOnEscape={true}
              closeOnDimmerClick={false}            
              onClose={() => setEditAttributesModal(false)}              
              open={editAttributesModal}              
            >
              <Modal.Header>Edit Attributes <span style={{fontSize: 14}}>({productsSelected.length} Products Selected)</span></Modal.Header>
              <Modal.Content scrolling>
                <Modal.Description>
                  </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button negative onClick={() => setEditAttributesModal(false)}>
                Cancel
              </Button>
              <Button positive onClick={() => console.log("caramba")}>
                Apply changes
              </Button>
 
              </Modal.Actions>
          </Modal>

          <Modal
              closeOnEscape={true}
              closeOnDimmerClick={false}            
              onClose={() => setEditPricesModal(false)}              
              open={editPricesModal}              
            >
              <Modal.Header>Edit Prices <span style={{fontSize: 14}}>({productsSelected.length} Products Selected)</span></Modal.Header>
              <Modal.Content scrolling>
                <Modal.Description>
                  </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button negative onClick={() => setEditPricesModal(false)}>
                Cancel
              </Button>
              <Button positive onClick={() => console.log("caramba")}>
                Apply changes
              </Button>
 
              </Modal.Actions>
          </Modal>

          <Modal
              closeOnEscape={true}
              closeOnDimmerClick={false}            
              onClose={() => setEditStatusModal(false)}              
              open={editStatusModal}              
            >
              <Modal.Header>Edit Status <span style={{fontSize: 14}}>({productsSelected.length} Products Selected)</span></Modal.Header>
              <Modal.Content scrolling>
                <Modal.Description>
                  </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button negative onClick={() => setEditStatusModal(false)}>
                Cancel
              </Button>
              <Button positive onClick={() => console.log("caramba")}>
                Apply changes
              </Button>
 
              </Modal.Actions>
          </Modal>
         


              <Button.Group>
                  <Button onClick = {() => setEditCategoriesModal(true) } disabled = {productsSelected.length > 0 ? false : true} name="Edit Categories" icon>
                    <Popup content='Edit Categories' position='top center' offset={[0, 15]} inverted trigger={<Icon name='sitemap' />} />

                  </Button>
                  <Button onClick = {() => setEditAttributesModal(true)} disabled = {productsSelected.length > 0 ? false : true} icon>
                  <Popup content='Edit Attributes' position='top center' offset={[0, 15]} inverted trigger={<Icon name='sliders horizontal' />} />
                    
                  </Button>
                  <Button onClick = {() => setEditPricesModal(true)} disabled = {productsSelected.length > 0 ? false : true} icon>
                  <Popup content='Edit Prices' position='top center' offset={[0, 15]} inverted trigger={<Icon name='money bill alternate' />} />
                  </Button>
                  <Button onClick = {() => setEditStatusModal(true)} disabled = {productsSelected.length > 0 ? false : true} icon>
                  <Popup content='Change Status' position='top center' offset={[0, 15]} inverted trigger={<Icon name='checkmark' />} />
                  </Button>
                  <Button disabled = {productsSelected.length > 0 ? false : true} icon>
                  <Popup content='Remove Products' position='top center' offset={[0, 15]} inverted trigger={<Icon name='delete' />} />
                  </Button>
                </Button.Group>


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
                      titleStore = { productForm.titleStore } handleTitleStore = {(e) => handleTitleStore(e)}
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
                      priceMSRP = {productForm.priceMSRP} handlePriceMSRP = {(e) => handlePriceMSRP(e)}
                      priceMAP = {productForm.priceMAP} handlePriceMAP = {(e) => handlePriceMAP(e)}
                      priceStore = {productForm.priceStore} handlePriceStore = {(e) => handlePriceStore(e)}
                      priceEbay = {productForm.priceEbay} handlePriceEbay = {(e) => handlePriceEbay(e)}
                      priceAmazon = {productForm.priceAmazon} handlePriceAmazon = {(e) => handlePriceAmazon(e)}
                      priceWholesaleLow = {productForm.priceWholesaleLow} handlePriceWholesaleLow = {(e) => handlePriceWholesaleLow(e)}
                      priceWholesaleHigh = {productForm.priceWholesaleHigh} handlePriceWholesaleHigh = {(e) => handlePriceWholesaleHigh(e)}
                      priceScratchLow = {productForm.pricePriceScratchLow} handlePriceScratchLow = {(e) => handlePriceScratchLow(e)}
                      priceScratchHigh = {productForm.pricePriceScratchHigh} handlePriceScratchHigh = {(e) => handlePriceScratchHigh(e)}
                      cost = {productForm.cost} handleCost = {(e) => handleCost(e)}                      
                      sourceWarehouse = {productForm.sourceWarehouse} handleSourceWarehouse = {(e) => handleSourceWarehouse(e)}
                      sourceDropship = {productForm.sourceDropship} handleSourceDropship = {(e) => handleSourceDropship(e)}
                      attributes = {attributes} handleAttributes = {(e, { value }) => handleAttributes(value)}
                      attributesSelected = {attributesSelected}
                      handleAttributesSelectedValue = {(e) => handleAttributesSelectedValue(e)}
                      handleAttributesSelectedCheckbox = {(e, data) => handleAttributesSelectedCheckbox(data)}
                      handleImages = {(imageList, addUpdateIndex) => handleImages(imageList, addUpdateIndex)}
                      images = {images} 
                      generateHandle = {() => handleGenerateHandle()}
                      status = {productForm.status === 'Active' ? true : false} handleStatus = {(e) => handleStatus(e)}
                      
                  />
                  

                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button negative onClick={handleClose}>
                Cancel
              </Button>
              <Button positive disabled = { !(productForm.sku && (productForm.sourceWarehouse || productForm.sourceDropship))  ? true : false} onClick={handleSubmit}>
                Add Product
              </Button>
 
              </Modal.Actions>
            </Modal>


            <Modal
            closeOnEscape={true}
            closeOnDimmerClick={false} 
              onClose={() => setOpenEdit(false)}
              onOpen={() => setOpenEdit(true)}
              open={openEdit}
              
            >
              <Modal.Header>
                <p>Edit Product</p> 
                <p>{productForm.sku} - {productForm.titleStore}</p>
              </Modal.Header>
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
                      titleStore = { productForm.titleStore } handleTitleStore = {(e) => handleTitleStore(e)}
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
                      priceMSRP = {productForm.priceMSRP} handlePriceMSRP = {(e) => handlePriceMSRP(e)}
                      priceMAP = {productForm.priceMAP} handlePriceMAP = {(e) => handlePriceMAP(e)}
                      priceStore = {productForm.priceStore} handlePriceStore = {(e) => handlePriceStore(e)}
                      priceEbay = {productForm.priceEbay} handlePriceEbay = {(e) => handlePriceEbay(e)}
                      priceAmazon = {productForm.priceAmazon} handlePriceAmazon = {(e) => handlePriceAmazon(e)}
                      priceWholesaleLow = {productForm.priceWholesaleLow} handlePriceWholesaleLow = {(e) => handlePriceWholesaleLow(e)}
                      priceWholesaleHigh = {productForm.priceWholesaleHigh} handlePriceWholesaleHigh = {(e) => handlePriceWholesaleHigh(e)}
                      priceScratchLow = {productForm.pricePriceScratchLow} handlePriceScratchLow = {(e) => handlePriceScratchLow(e)}
                      priceScratchHigh = {productForm.pricePriceScratchHigh} handlePriceScratchHigh = {(e) => handlePriceScratchHigh(e)}
                      cost = {productForm.cost} handleCost = {(e) => handleCost(e)}                      
                      sourceWarehouse = {productForm.sourceWarehouse} handleSourceWarehouse = {(e) => handleSourceWarehouse(e)}
                      sourceDropship = {productForm.sourceDropship} handleSourceDropship = {(e) => handleSourceDropship(e)}
                      attributes = {attributes} handleAttributes = {(e, { value }) => handleAttributes(value)}
                      attributesSelected = {attributesSelected}
                      handleAttributesSelectedValue = {(e) => handleAttributesSelectedValue(e)}
                      handleAttributesSelectedCheckbox = {(e, data) => handleAttributesSelectedCheckbox(data)}
                      handleImages = {(imageList, addUpdateIndex) => handleImages(imageList, addUpdateIndex)}
                      images = {images} 
                      generateHandle = {() => handleGenerateHandle()}
                      status = {productForm.status === 'Active' ? true : false} handleStatus = {(e) => handleStatus(e)}
                      
                  />





                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
              <Button negative onClick={handleCloseUpdate}>
                Cancel
              </Button>
              <Button positive onClick={handleUpdate}>
                Save Product
              </Button>
 
              </Modal.Actions>
            </Modal>
            
          </Grid.Column> 
           
        </Grid>

        
        <ProductTable 
              data = {dataChunks[activePage - 1]} 
              categories = {categories}
              subCategories = {subCategories}
              subCategories2 = {subCategories2}
              attributes = {attributes}
              handleOrder = {handleOrderColumn} 
              orderColumn = {orderColumn}
              productsSelected = {productsSelected} 
              handleProductSelected = {(e, data, id) => handleProductSelected (e, data, id)}
              handleSelectAllProductsInPage = {(e, data) => handleSelectAllProductsInPage (e, data)}
              productsSelectedAll = {productsSelectedAll}
              openForm = {handleOpenEditForm} />
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