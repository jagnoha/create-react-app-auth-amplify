import React, { useState, useEffect } from 'react'
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'
import { Pagination, Input, Segment, Button, Icon, Grid, Modal, Header, Form, ItemContent} from 'semantic-ui-react'
import { listProducts, listBrands, listCategorys, listSubCategorys, listSubCategory2s, listEbayStoreCategorys, listAttributes } from '../../graphql/queries'
import aws_exports from '../../aws-exports'
import { CSVLink } from 'react-csv'
import { attachEventProps } from '@aws-amplify/ui-react/lib-esm/react-component-lib/utils'
//import Attributes from '../Attributes/Attributes'

Amplify.configure(aws_exports)


export default function ExportFile(props) {

    const [products, setProducts] = useState([])
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