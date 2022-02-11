import React, { useState, useEffect } from 'react'
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'
import { Pagination, Input, Segment, Button, Icon, Grid, Modal, Header, Form, ItemContent, Item} from 'semantic-ui-react'
import { listProducts, listBrands, listCategorys, listSubCategorys, listSubCategory2s, listEbayStoreCategorys, listAttributes } from '../../graphql/queries'
import aws_exports from '../../aws-exports'
import { CSVLink } from 'react-csv'
import { attachEventProps } from '@aws-amplify/ui-react/lib-esm/react-component-lib/utils'
//import Papa from "papaparse"
import {ExcelToJson} from 'excel-to-json-in-react-js'
import xlsx from 'xlsx'
import { v4 as uuidv4 } from 'uuid'
import { createCategory, createSubCategory, createManufacturer, createProduct } from '../../graphql/mutations'

//import Attributes from '../Attributes/Attributes'

Amplify.configure(aws_exports)


export default function ExportFile(props) {

    const [products, setProducts] = useState([])
    const [JsonData,setJsonData]=useState("")
    //const [brands, setBrands] = useState([])
    //const [categories, setCategories] = useState([])
    //const [attributes, setAttributes] = useState([])
    //const [subCategories, setSubCategories] = useState([])
    //const [subCategories2, setSubCategories2] = useState([])    
    const [data, setData] = useState([])
    
    let headers = [
        { label: "SKU", key: "SKU" },
        { label: "MPN", key: "MPN" },
        { label: "Source", key: "Source" },
        { label: "BinLocation", key: "BinLocation" },
        { label: "Brand", key: "Brand" },
        { label: "PartsSKU", key: "PartsSKU" },
        { label: "TuckerSKU", key: "TuckerSKU" },
        { label: "WPSSKU", key: "WPSSKU" },
        { label: "ItemName", key: "ItemName" },
        { label: "BodyDescription", key: "BodyDescription" },
        { label: "Handle", key: "Handle" },
        { label: "Category", key: "Category" },
        { label: "SubCategory", key: "SubCategory" },
        { label: "SubCategory2", key: "SubCategory2" },
        { label: "Weight", key: "Weight" },
        { label: "Height", key: "Height" },
        { label: "Length", key: "Length" },
        { label: "Width", key: "Width" },
        { label: "ShopifyFitmentTags", key: "ShopifyFitmentTags" },
        { label: "ShopifyOnlyTags", key: "ShopifyOnlyTags" },
        { label: "Image", key: "Image" },
        { label: "ApparelGender", key: "ApparelGender" },
        { label: "ApparelMaterial", key: "ApparelMaterial" },        
        { label: "ApparelSize", key: "ApparelSize" },
        { label: "ApparelSizeSegment", key: "ApparelSizeSegment" },
        { label: "ApparelSizeModifier", key: "ApparelSizeModifier" },
        { label: "ApparelStyle", key: "ApparelStyle" },
        { label: "BatteryCode", key: "BatteryCode" },
        { label: "BearingSize", key: "BearingSize" },
        { label: "BoltPattern", key: "BoltPattern" },
        { label: "Bore", key: "Bore" },
        { label: "Compression", key: "Compression" },
        { label: "ContainerSize", key: "ContainerSize" },
        { label: "Diameter", key: "Diameter" },
        { label: "HandlebarBlinkers", key: "HandlebarBlinkers" },
        { label: "HandlebarClampingDiameter", key: "HandlebarClampingDiameter" },
        { label: "HandlebarConfiguration", key: "HandlebarConfiguration" },
        { label: "HandlebarControlColor", key: "HandlebarControlColor" },
        { label: "HandlebarPullback", key: "HandlebarPullback" },
        { label: "HandlebarRise", key: "HandlebarRise" },
        { label: "HandlebarDiameter", key: "HandlebarDiameter" },
        { label: "HandlebarSwitchColor", key: "HandlebarSwitchColor" },
        { label: "HandlebarStyle", key: "HandlebarStyle" },
        { label: "HandlebarWidth", key: "HandlebarWidth" },
        { label: "LensStyle", key: "LensStyle" },
        { label: "LoadRating", key: "LoadRating" },
        { label: "Material", key: "Material" },
        { label: "Pitch", key: "Pitch" },
        { label: "SeatStyle", key: "SeatStyle" },
        { label: "SeatWidthDriver", key: "SeatWidthDriver" },
        { label: "SeatWidthPassenger", key: "SeatWidthPassenger" },
        { label: "Shape", key: "Shape" },
        { label: "Sizing", key: "Sizing" },
        { label: "SpringRate", key: "SpringRate" },
        { label: "SprocketPosition", key: "SprocketPosition" },
        { label: "SprocketTeeth", key: "SprocketTeeth" },
        { label: "SprocketSize", key: "SprocketSize" },
        { label: "Thickness", key: "Thickness" },
        { label: "Speed", key: "Speed" },
        { label: "TireApplication", key: "TireApplication" },
        { label: "TireConstruction", key: "TireConstruction" },
        { label: "TirePly", key: "TirePly" },
        { label: "TireRimOffset", key: "TireRimOffset" },
        { label: "TireSpeedRating", key: "TireSpeedRating" },
        { label: "TireType", key: "TireType" },
        { label: "WheelDiameter", key: "WheelDiameter" },
        { label: "WheelDisc", key: "WheelDisc" },
        { label: "WheelSpokeCount", key: "WheelSpokeCount" },
        { label: "WheelSpokeFinish", key: "WheelSpokeFinish" },
        { label: "WheelWidth", key: "WheelWidth" },
        { label: "OptionName1", key: "OptionName1" },
        { label: "OptionValue1", key: "OptionValue1" },
        { label: "OptionName2", key: "OptionName2" },
        { label: "OptionValue2", key: "OptionValue2" },
        { label: "OptionName3", key: "OptionName3" },
        { label: "OptionValue3", key: "OptionValue3" },
        { label: "OptionName4", key: "OptionName4" },
        { label: "OptionValue4", key: "OptionValue4" },
        { label: "OptionName5", key: "OptionName5" },
        { label: "OptionValue5", key: "OptionValue" },
        { label: "MSRP", key: "MSRP" },
        { label: "Cost", key: "Cost" },
        { label: "ListPrice", key: "ListPrice" },
        { label: "MyStorePrice", key: "MyStorePrice" },
        { label: "SellPrice", key: "SellPrice" },
        { label: "UpdateFlag", key: "UpdateFlag" },
      ];    				
      
      
    /*let dataTemp = [
        { 
            SKU: "Ahmed", MPN: "Tomi", Source: "ah@smthing.co.com", BinLocation: "",
            Brand: "", PartsSKU: "", TuckerSKU: "", WPSSKU: "", ItemName: "",
            BodyDescription: "", Handle: "", Category: "", SubCategory: "",
            SubCategory2: "", Weight: "", Height: "", Length: "", Width:"",
            ShopifyFitmentTags: "", ShopifyOnlyTags: "", Image: "", ApparelGender: "",
            ApparelMaterial: "", ApparelSize: "", ApparelSizeSegment: "", ApparelSizeModifier: "",
            ApparelStyle: "", BatteryCode: "", BearingSize: "", BoltPattern: "", Bore: "",
            Compression: "", ContainerSize: "", Diameter: "", HandlebarBlinkers: "", 
            HandlebarClampingDiameter: "", HandlebarConfiguration: "", HandlebarControlColor: "",
            HandlebarPullback: "", HandlebarRise: "", HandlebarDiameter: "", HandlebarSwitchColor: "",
            HandlebarStyle: "", HandlebarWidth: "", LensStyle: "", LoadRating: "", Material: "",
            Pitch: "", SeatStyle: "", SeatWidthDriver: "", SeatWidthPassenger: "", Shape: "",
            Sizing: "", SpringRate: "", SprocketPosition: "", SprocketTeeth: "", SprocketSize: "",
            Thickness: "", Speed: "", TireApplication: "", TireConstruction: "", TirePly: "",
            TireRimOffset: "", TireSpeedRating: "", TireType: "", WheelDiameter: "", WheelDisc: "",
            WheelSpokeCount: "", WheelSpokeFinish: "", WheelWidth: "", OptionName1: "", OptionValue1: "",
            OptionName2: "", OptionValue2: "", OptionName3: "", OptionValue3: "", OptionName4: "",
            OptionValue4: "", OptionName5: "", OptionValue5: "", MSRP: "", Cost: "", ListPrice: "",
            MyStorePrice: "", SellPrice: "", UpdateFlag: ""
        }
    ]*/

    const onPageRendered = async () => {
        //fetchBrands()
        //fetchCategories()
        //fetchSubCategories()
        //fetchSubCategories2()
        //fetchAttributes()
        fetchProducts()
          
    }

          
    useEffect(() => {
          onPageRendered()
    }, [])

    const getProducts = (event, done) => {
        
    }

    const fetchProducts = async () => {
        try {
            //fetchAttributes()
            const productData = await API.graphql({
              query: listProducts,
            })      
            const products = await productData.data.listProducts.items.filter(item => !item._deleted)   
            setProducts(products)

            
            
            let result = [];
            

            for (let item of products){
                //console.log(item)
                
                let brand = props.brands.find(itemBrand => itemBrand.id === item.brandID) 
                let brandName = brand ? brand.name : ""
                let title = item.title && item.title.store ? item.title.store : ""
                let description = item.description && item.description.store ? item.description.store : ""
                let category = props.categories.find(itemCategory => itemCategory.id === item.categoryID)
                let categoryName = category ? category.name : ""
                let subcategory = props.subCategories.find(itemSubCategory => itemSubCategory.id === item.subcategoryID)
                let subCategoryName = subcategory ? subcategory.name : ""
                let subcategory2 = props.subCategories2.find(itemSubCategory2 => itemSubCategory2.id === item.subcategory2ID)
                let subCategory2Name = subcategory2 && subcategory2.id !== '3dc30aff-66a5-49fa-9f20-49c76031a994' ? subcategory2.name : ""
                let height = item.dimensions && item.dimensions.height ? item.dimensions.height : "" 
                let length = item.dimensions && item.dimensions.length ? item.dimensions.length : ""
                let width = item.dimensions && item.dimensions.width ? item.dimensions.width : ""
                let image = item.images && item.images.image1 ? JSON.parse(item.images.image1).data_url : ""
                let MSRP = item.price && item.price.MSRP ? item.price.MSRP : ""
                let listPrice = ""
                let myStore = item.price && item.price.store ? item.price.store : ""
                let sourceWarehouse = item.source && item.source.warehouse ? item.source.warehouse : false
                let sourceDropship = item.source && item.source.dropship ? item.source.dropship : false
                let attributesParse = item.Attributes ? JSON.parse(item.Attributes) : []
                //console.log("********* ITEM:", item)

               /*let product = { 
                    SKU: item.SKU, MPN: item.mpn, BinLocation: item.binLocation,
                    Brand: brandName, PartsSKU: '', TuckerSKU: '', WPSSKU: '', ItemName: title,
                    BodyDescription: description, Handle: item.handle, Category: categoryName, SubCategory: subCategoryName,
                    SubCategory2: subCategory2Name, Weight: item.appliedWeight, Height: height, Length: length, Width: width,
                    ShopifyFitmentTags: item.shopifyFitmentTags, ShopifyOnlyTags: item.shopifyOnlyTags, Image: image, ApparelGender: '',
                    ApparelMaterial: '', ApparelSize: '', ApparelSizeSegment: '', ApparelSizeModifier: '',
                    ApparelStyle: '', BatteryCode: '', BearingSize: '', BoltPattern: '', Bore: '',
                    Compression: '', ContainerSize: '', Diameter: '', HandlebarBlinkers: '', 
                    HandlebarClampingDiameter: '', HandlebarConfiguration: '', HandlebarControlColor: '',
                    HandlebarPullback: '', HandlebarRise: '', HandlebarDiameter: '', HandlebarSwitchColor: '',
                    HandlebarStyle: '', HandlebarWidth: '', LensStyle: '', LoadRating: '', Material: '',
                    Pitch: '', SeatStyle: '', SeatWidthDriver: '', SeatWidthPassenger: '', Shape: '',
                    Sizing: '', SpringRate: '', SprocketPosition: '', SprocketTeeth: '', SprocketSize: '',
                    Thickness: '', Speed: '', TireApplication: '', TireConstruction: '', TirePly: '',
                    TireRimOffset: '', TireSpeedRating: '', TireType: '', WheelDiameter: '', WheelDisc: '',
                    WheelSpokeCount: '', WheelSpokeFinish: '', WheelWidth: '', OptionName1: '', OptionValue1: '',
                    OptionName2: '', OptionValue2: '', OptionName3: '', OptionValue3: '', OptionName4: '',
                    OptionValue4: '', OptionName5: '', OptionValue5: '', MSRP: MSRP, Cost: item.cost, ListPrice: listPrice,
                    MyStorePrice: myStore, SellPrice: '', UpdateFlag: '0'
                }*/

                let product = { 
                    SKU: item.SKU, MPN: item.mpn, BinLocation: item.parentSKU,
                    Brand: brandName, PartsSKU: '', TuckerSKU: '', WPSSKU: '', ItemName: title,
                    BodyDescription: description, Handle: item.handle, Category: categoryName, SubCategory: subCategoryName,
                    SubCategory2: subCategory2Name, Weight: item.appliedWeight, Height: height, Length: length, Width: width,
                    ShopifyFitmentTags: item.shopifyFitmentTags, ShopifyOnlyTags: item.shopifyOnlyTags, Image: image, MSRP: MSRP, Cost: item.cost, ListPrice: listPrice,
                    MyStorePrice: myStore, SellPrice: 0, UpdateFlag: 0
                }

                let n = 0
                console.log(attributesParse)
                console.log("TODOS LOS ATTRIBUTES:",props.attributes)
                for (let itemList of attributesParse){
                    n++
                    
                    let attribute = props.attributes.find(itemAttr => itemAttr.id === itemList.id )
                    let name = attribute ? attribute.name : ''
                    console.log("ESTE ES EL NAME: ",name)
                    if (itemList.option){
                        //options.push({name: name, value: itemList.value})
                        product[`OptionName${n}`] = name
                        product[`OptionValue${n}`] = itemList.value
                    }
                    product[`${name.split(' ').join('')}`] = itemList.value
                }

                console.log(product)

                if (sourceWarehouse) {
                    //product.Source = 'DEMONS'
                    result.push({...product, Source: 'DEMONS'})
                }
                if (sourceDropship) {
                    //product.Source = 'DROPSHIP'
                    result.push({...product, Source: 'DROPSHIP'})
                }                
                

                //result.push(product)
            
            }
            
            setData(result)
      
        } catch (err) { console.log(err) }
    }

    /*const fetchBrands = async () => {
        try {
          const brandsData = await API.graphql({
            query: listBrands,
          })      
          const brands = await brandsData.data.listBrands.items.filter(item => !item._deleted)   
          setBrands(brands)

        } catch (err) { console.log(err) }
    }*/

    /*const fetchAttributes = async () => {
        try {
          const attributesData = await API.graphql({
            query: listAttributes,          
          })
          const attributesTemp = await attributesData.data.listAttributes.items.filter(item => !item._deleted)      
          setAttributes(attributesTemp)
          //console.log("OTROS ATTRIBUTES:", attributes)   
          
      
        } catch (err) { console.log(err) }
    }*/

    /*const fetchCategories = async () => {
        try {
          const categoriesData = await API.graphql({
            query: listCategorys,
          
          })      
          const categories = await categoriesData.data.listCategorys.items.filter(item => !item._deleted)      
          setCategories(categories)   
          
      
        } catch (err) { console.log(err) }
      }

      const fetchSubCategories = async () => {
        try {
          const subCategoriesData = await API.graphql({
            query: listSubCategorys,
          
          })      
          
          const subCategories = await subCategoriesData.data.listSubCategorys.items.filter(item => !item._deleted)      
          setSubCategories(subCategories)             
      
        } catch (err) { console.log(err) }
      }

      const fetchSubCategories2 = async () => {
        try {
          const subCategoriesData2 = await API.graphql({
            query: listSubCategory2s,
          
          })     
          const subCategories2 = await subCategoriesData2.data.listSubCategory2s.items.filter(item => !item._deleted)      
          setSubCategories2(subCategories2)             
      
        } catch (err) { console.log(err) }
      }*/

      const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                //console.log(json);
                handleApplyCategoriesChanges(json)
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }


    const updateItems = async (item) => {
      try {
        console.log(item)
        let id = uuidv4()
        let name = item.name
        //let product = products.find(item => item.id === id)
        //let version = product._version
        //let categoryOld = product.categoryID
        //let subCategoryOld = product.subcategoryID
        //let subCategoryOld2 = product.subcategory2ID
        //let ebayStoreCategoryOld = product.ebaystorecategoryID
        
        let itemDetails = {
          id,
          name,
          /*categoryID: editCategoriesSelected.category.checked ? editCategoriesSelected.category.id : categoryOld, 
          subcategoryID: editCategoriesSelected.subCategory.checked ? editCategoriesSelected.subCategory.id : subCategoryOld,
          subcategory2ID: editCategoriesSelected.subCategory2.checked ? editCategoriesSelected.subCategory2.id : subCategoryOld2,
          ebaystorecategoryID: editCategoriesSelected.ebayStoreCategory.checked ? editCategoriesSelected.ebayStoreCategory.id : ebayStoreCategoryOld,
          _version: version,*/          
        }
        await API.graphql(graphqlOperation(createManufacturer, { input: itemDetails }))
        
        
    
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
    
    const handleApplyCategoriesChanges = (excelFile) => {
      try {
      for (let item of excelFile){
        //console.log(item)
        updateItems(item)
      }
      setTimeout(() => {
        toast({
            type: 'success',
            icon: 'check circle outline',
            size: 'tiny',              
            description: 'Products successfully updated',
            time: 2000,              
        })
      }, 200
      )
      } catch (error) {
        console.log(error)
      }
    }

    const updateProducts = async (item) => {
      try {
        console.log(item)
        let id = uuidv4()
        
        let itemDetails = {
          id,
          SKU: item.SKU,
          title: item.title,
          source: item.source,
          status: item.status,
          legacyID: item.legacyID,
          mpn: item.mpn,
          Attributes: item.Attributes,
          parentSKU: item.parentSKU,
          brandID: item.brandID,
          manufacturerID: item.manufacturerID,
          categoryID: item.categoryID,
          subcategoryID: item.subcategoryID,
          subcategory2ID: item.subcategory2ID,
          ebaystorecategoryID: item.ebaystorecategoryID,
          binLocation: item.binLocation,
          title: item.title,
          description: item.description,
          handle: item.handle,
          weight: item.weight,
          dimensionalWeight: item.dimensionalWeight,
          appliedWeight: item.appliedWeight,
          dimensions: item.dimensions,
          shopifyFitmentTags: item.shopifyFitmentTags,
          shopifyOnlyTags: item.shopifyOnlyTags,
          price: item.price,
          cost: item.cost,
          shopifyMetaTitle: item.shopifyMetaTitle,
          shopifyMetaDescription: item.shopifyMetaDescription,
        }

          /*categoryID: editCategoriesSelected.category.checked ? editCategoriesSelected.category.id : categoryOld, 
          subcategoryID: editCategoriesSelected.subCategory.checked ? editCategoriesSelected.subCategory.id : subCategoryOld,
          subcategory2ID: editCategoriesSelected.subCategory2.checked ? editCategoriesSelected.subCategory2.id : subCategoryOld2,
          ebaystorecategoryID: editCategoriesSelected.ebayStoreCategory.checked ? editCategoriesSelected.ebayStoreCategory.id : ebayStoreCategoryOld,
          _version: version,*/          
        
        await API.graphql(graphqlOperation(createProduct, { input: itemDetails }))
        
        
    
      } catch (err) {
        console.log('error creating Product:', err)
        setTimeout(() => {
          toast({
              type: 'error',
              icon: 'times',
              size: 'tiny',              
              title: 'Error updating Product',
              description: err,              
              time: 2000,              
          });
        }, 200);
      }
    }

    const handleApplyProductsChanges = (excelFile) => {
      try {
      for (let item of excelFile){
        //console.log(item.SKU + ' - ', item.OptionName1)
        
        let options = []
        let attributesProduct = []

        options.push({name: item.OptionName1, value: item.OptionValue1})
        options.push({name: item.OptionName2, value: item.OptionValue2})
        options.push({name: item.OptionName3, value: item.OptionValue3})
        options.push({name: item.OptionName4, value: item.OptionValue4})
        options.push({name: item.OptionName5, value: item.OptionValue5})


        for (let i of options){
          if (i.name) {
            attributesProduct.push({id: props.attributes.find(item => item.name === i.name) ? props.attributes.find(item => item.name === i.name).id : "ERROR", value: i.value, option: true  })
            //console.log(i.name)
            //console.log(props.attributes.find(item => item.name === i.name).id)
          }
        }

        let attributeList = []
        attributeList.push({name: 'Apparel Gender', value: item.ApparelGender})
        attributeList.push({name: 'Apparel Material', value: item.ApparelMaterial})
        attributeList.push({name: 'Apparel Size', value: item.ApparelSize})
        attributeList.push({name: 'Apparel Size Segment', value: item.ApparelSizeSegment})
        attributeList.push({name: 'Apparel Size Modifier', value: item.ApparelSizeModifier})
        attributeList.push({name: 'Apparel Style', value: item.ApparelStyle})
        attributeList.push({name: 'Battery Code', value: item.BatteryCode})
        attributeList.push({name: 'Bearing Size', value: item.BearingSize})
        attributeList.push({name: 'Bolt Pattern', value: item.BoltPattern})
        attributeList.push({name: 'Bore', value: item.Bore})
        attributeList.push({name: 'Compression', value: item.Compression })
        attributeList.push({name: 'Container Size', value: item.ContainerSize      })
        attributeList.push({name: 'Diameter', value: item.Diameter})
        attributeList.push({name: 'Handlebar Blinkers', value: item.HandlebarBlinkers      })
        attributeList.push({name: 'Handlebar Clamping Diameter', value: item.HandlebarClampingDiameter      })
        attributeList.push({name: 'Handlebar Configuration', value: item.HandlebarConfiguration      })
        attributeList.push({name: 'Handlebar Control Color', value: item.HandlebarControlColor      })
        attributeList.push({name: 'Handlebar Rise', value: item.HandlebarRise      })
        attributeList.push({name: 'Handlebar Pullback', value: item.HandlebarPullback      })
        attributeList.push({name: 'Handlebar Diameter', value: item.HandlebarDiameter      })
        attributeList.push({name: 'Handlebar Switch Color', value: item.HandlebarSwitchColor      })
        attributeList.push({name: 'Handlebar Style', value: item.HandlebarStyle      })
        attributeList.push({name: 'Lens Style', value: item.LensStyle   })
        attributeList.push({name: 'Load Rating', value: item.LoadRating  })
        attributeList.push({name: 'Material', value: item.Material      })
        attributeList.push({name: 'Seat Style', value: item.SeatStyle      })
        attributeList.push({name: 'Seat Width Driver', value: item.SeatWidthDriver   })
        attributeList.push({name: 'Seat Width Passenger', value: item.SeatWidthPassenger     })
        attributeList.push({name: 'Shape', value: item.Shape     })
        attributeList.push({name: 'Sizing', value: item.Sizing    })
        attributeList.push({name: 'Speed', value: item.Speed      })
        attributeList.push({name: 'Spring Rate', value: item.SpringRate})
        attributeList.push({name: 'Sprocket Position', value: item.SprocketPosition   })
        attributeList.push({name: 'Sprocket Teeth', value: item.SprocketTeeth      })
        attributeList.push({name: 'Sprocket Size', value: item.SprocketSize      })
        attributeList.push({name: 'Thickness', value: item.Thickness      })
        attributeList.push({name: 'Tire Application', value: item.TireApplication    })
        attributeList.push({name: 'Tire Construction', value: item.TireConstruction      })
        attributeList.push({name: 'Tire Ply', value: item.TirePly      })
        attributeList.push({name: 'Tire Rim Offset', value: item.TireRimOffset      })
        attributeList.push({name: 'Tire Speed Rating', value: item.TireSpeedRating     })
        attributeList.push({name: 'Tire Type', value: item.TireType    })
        attributeList.push({name: 'Wheel Diameter', value: item.WheelDiameter     })
        attributeList.push({name: 'Wheel Disc', value: item.WheelDisc     })
        attributeList.push({name: 'Wheel Spoke Count', value: item.WheelSpokeCount    })
        attributeList.push({name: 'Wheel Spoke Finish', value: item.WheelSpokeFinish    })
        attributeList.push({name: 'Wheel Width', value: item.WheelWidth      })


        for (let i of attributeList){
          //let errors = []
          if (i.value) {
            attributesProduct.push({id: props.attributes.find(item => item.name === i.name) ? props.attributes.find(item => item.name === i.name).id : "ERROR", value: i.value, option: false  })
            if (!props.attributes.find(item => item.name === i.name)){
              console.log({sku: item.SKU, value: i.value })
            }
            //console.log(i.name)
            //console.log(props.attributes.find(item => item.name === i.name).id)
          }
        }

        //console.log("item sku", item.SKU, " ***************************")
        //console.log(JSON.stringify(attributesProduct))
        let attributesString = JSON.stringify(attributesProduct) ? JSON.stringify(attributesProduct) : ""
        
        //id	SKU	legacyID	mpn	Attributes	parentSKU	source	brandID	manufacturerID	categoryID	subcategoryID	subcategory2ID	ebaystorecategoryID	binLocation	title	
        //description	bulletPoints	images	handle	weight	dimensionalWeight	appliedWeight	dimensions	shopifyFitmentTags	shopifyOnlyTags	price	cost	options	
        //updateFlag	status	shopifyMetaTitle	shopifyMetaDescription

        //SKU	MPN	Source	BinLocation	Brand	BrandID	ManufacturerID	PartsSKU	TuckerSKU	WPSSKU	ItemName	BodyDescription	Handle	Category	CategoryID	
        //SubCategory	SubCategoryID	SubCategory2	SubCategory2ID	Weight	Height	Length	Width	ShopifyFitmentTags	
        //ShopifyOnlyTags	Image	ApparelGender	ApparelMaterial	ApparelSize	ApparelSizeSegment	ApparelSizeModifier	ApparelStyle	BatteryCode	
        //BearingSize	BoltPattern	Bore	Compression	ContainerSize	Diameter	HandlebarBlinkers	HandlebarClampingDiameter	HandlebarConfiguration	
        //HandlebarControlColor	HandlebarPullback	HandlebarRise	HandlebarDiameter	HandlebarSwitchColor	HandlebarStyle	HandlebarWidth	LensStyle	LoadRating	
        //Material	Pitch	SeatStyle	SeatWidthDriver	SeatWidthPassenger	Shape	Sizing	Speed	SpringRate	SprocketPosition	SprocketTeeth	SprocketSize	
        //Thickness	TireApplication	TireConstruction	TirePly	TireRimOffset	TireSpeedRating	TireType	WheelDiameter	WheelDisc	WheelSpokeCount	WheelSpokeFinish
        //	WheelWidth	OptionName1	OptionValue1	OptionName2	OptionValue2	OptionName3	OptionValue3	OptionName4	OptionValue4	OptionName5	
        //OptionValue5	MSRP	Cost	ListPrice	MyStorePrice	SellPrice	UpdateFlag

        let product = {
          SKU: item.SKU,
          legacyID: "",
          mpn: item.MPN,
          Attributes: attributesString ? attributesString : '',
          parentSKU: item.BinLocation ? item.BinLocation: '',
          source: {"warehouse":  item.Source === 'DEMONS' ? true : false ,"dropship": item.Source === 'DROPSHIP' ? true : false},
          brandID: item.BrandID ? item.BrandID : '',
          manufacturerID: item.ManufacturerID ? item.ManufacturerID : "" ,
          categoryID: item.CategoryID ? item.CategoryID : undefined,
          subcategoryID: item.SubCategoryID ? item.SubCategoryID : undefined,
          subcategory2ID: item.SubCategory2ID ? item.SubCategory2ID : undefined,
          ebaystorecategoryID: undefined,
          binLocation: '',
          title: { store: item.ItemName ? item.ItemName : '' },
          description: { store: item.BodyDescription ? item.BodyDescription : ''},
          handle: item.Handle ? item.handle : '',
          weight: item.Weight ? item.Weight : 0,
          dimensionalWeight: item.Weight ? item.Weight : 0,
          appliedWeight: item.Weight ? item.Weight : 0,
          dimensions: {height: item.Height ? item.Height : 0, length: item.Length ? item.Length : 0, width: item.Width ? item.Width : 0},
          shopifyFitmentTags: item.ShopifyFitmentTags ? item.ShopifyFitmentTags : '',
          shopifyOnlyTags: item.ShopifyOnlyTags ? item.ShopifyOnlyTags : '',
          price: {"MSRP": item.MSRP ? item.MSRP : 0},
          cost: item.Cost ? item.Cost : 0,
          status: 'Active',
          shopifyMetaTitle: '',
          shopifyMetaDescription: ''
        }

        console.log(product)


        //}

        updateProducts(product)
      }
      setTimeout(() => {
        toast({
            type: 'success',
            icon: 'check circle outline',
            size: 'tiny',              
            description: 'Products successfully updated',
            time: 2000,              
        })
      }, 200
      )
      } catch (error) {
        console.log(error)
      }
    }
    
    const readUploadNewProducts = (e) => {
      e.preventDefault();
      if (e.target.files) {
          const reader = new FileReader();
          reader.onload = (e) => {
              const data = e.target.result;
              const workbook = xlsx.read(data, { type: "array" });
              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const json = xlsx.utils.sheet_to_json(worksheet);
              //console.log(json);
              handleApplyProductsChanges(json)
          };
          reader.readAsArrayBuffer(e.target.files[0]);
      }
  }

      
      

    return (
        <div style={divStyle}>
        <SemanticToastContainer position="top-center" />
        <h1>Export File</h1>
        <CSVLink
            enclosingCharacter={`'`} 
            data={data} 
            headers={headers}
            filename={"flxpoint_export_file.csv"}
            className="btn btn-primary"
            target="_blank"
            >
            <Icon name='download' size='huge' />
            Create export file for FlxPoint
            
        </CSVLink>
        <hr></hr>
        <label htmlFor="upload">Upload to AWS</label><br></br>
          <input
              type="file"
              name="upload"
              id="upload"
              onChange={readUploadFile}
          />
        <hr></hr>
        <label htmlFor="upload">Upload New Products</label><br></br>
          <input
              type="file"
              name="upload"
              id="upload"
              onChange={readUploadNewProducts}
          />
          

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