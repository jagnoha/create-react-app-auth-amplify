import React, {useState} from 'react'
import { Form } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import Manufacturers from '../Manufacturers/Manufacturers'

export default function CreateProductForm(props) {
  let brands = props.brands.map(item => { return {key: item.id, text: item.name, value: item.id } } )
  let manufacturers = props.manufacturers.map(item => { return {key: item.id, text: item.name, value: item.id } } )
  let categories = props.categories.map(item => { return {key: item.id, text: item.name, value: item.id } } )
  let subCategories = props.subCategories.map(item => { return {key: item.id, text: item.name, value: item.id } } )
  let subCategories2 = props.subCategories2.map(item => { return {key: item.id, text: item.name, value: item.id } } )
  let ebayStoreCategorys = props.ebayStoreCategorys.map(item => { return {key: item.id, text: item.name, value: item.id } } )


  
  
  return (
    <Form>
                    <Form.Field>
                      <label>SKU</label>
                      <input placeholder='Product SKU' 
                        value = {props.sku}
                        onChange = {props.handleSKU}
                      />

                    </Form.Field>
                    <Form.Field>
                      <label>Legacy Id</label>
                      <input placeholder='Legacy Id' 
                        value = {props.legacyId}
                        onChange = {props.handleLegacyId}
                      />

                    </Form.Field>
                    <Form.Field>
                      <label>Manufacturer Part Number</label>
                      <input placeholder='Manufacturer Part Number' 
                        value = {props.mpn} 
                        onChange={props.handleMPN }/>
                    </Form.Field>
                    <Form.Field>
                      <label>Parent SKU</label>
                      <input placeholder='Parent SKU' 
                        value = {props.parentSKU} 
                        onChange={props.handleParentSKU }/>
                    </Form.Field>
                    <Form.Field>
                      <label>Bin Location</label>
                      <input placeholder='Bin Location' 
                        value = {props.binLocation} 
                        onChange={props.handleBinLocation }/>
                    </Form.Field>
                    <Form.Field>
                      <label>Handle</label>
                      <input placeholder='Handle' 
                        value = {props.handle} 
                        onChange={props.handleHandle }/>
                    </Form.Field>
                    <Form.Field>
                      <label>Shopify Fitment Tags</label>
                      <input placeholder='Shopify Fitment Tags' 
                        value = {props.shopifyFitmentTags} 
                        onChange={props.handleShopifyFitmentTags }/>
                    </Form.Field>
                    <Form.Field>
                      <label>Shopify Only Tags</label>
                      <input placeholder='Shopify Fitment Tags' 
                        value = {props.shopifyOnlyTags} 
                        onChange={props.handleShopifyOnlyTags }/>
                    </Form.Field>
                    <Form.Field>
                    <label>Brand</label>
                      <Dropdown placeholder='Select Brand' search searchInput={{ type: 'text' }} selection 
                         options={brands} 
                         onChange={props.handleBrand}
                         value = {props.valueBrand}
                         //loading
                        />                       
                    </Form.Field>
                    <Form.Field>
                    <label>Manufacturer</label>
                      <Dropdown placeholder='Select Manufacturer' search searchInput={{ type: 'text' }} selection 
                         options={manufacturers} 
                         onChange={props.handleManufacturer}
                         value = {props.valueManufacturer}
                         //loading
                        />                       
                    </Form.Field>     
                    
                    
                    <Form.Field>
                    <label>Category</label>
                      <Dropdown placeholder='Select Category' search searchInput={{ type: 'text' }} selection 
                         options={categories} 
                         onChange={props.handleCategory}
                         value = {props.value}
                         //loading
                        />                       
                    </Form.Field>
                    <Form.Field>
                    <label>SubCategory</label>
                      <Dropdown placeholder='Select SubCategory' search searchInput={{ type: 'text' }} selection 
                         options={subCategories} 
                         onChange={props.handleSubCategory}
                         value = {props.value}
                         //loading
                        />                       
                    </Form.Field>
                    <Form.Field>
                    <label>SubCategory 2</label>
                      <Dropdown placeholder='Select SubCategory 2' search searchInput={{ type: 'text' }} selection 
                         options={subCategories2} 
                         onChange={props.handleSubCategory2}
                         value = {props.value}
                         //loading
                        />                       
                    </Form.Field>
                    <Form.Field>
                    <label>eBay Store Category</label>
                      <Dropdown placeholder='Select eBay Store Category' search searchInput={{ type: 'text' }} selection 
                         options={ebayStoreCategorys} 
                         onChange={props.handleEbayStoreCategory}
                         value = {props.value}
                         //loading
                        />                       
                    </Form.Field>
                     
                  </Form>  
  );
  
}