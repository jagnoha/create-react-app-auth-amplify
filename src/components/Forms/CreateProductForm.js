import React from 'react'
import { Form } from 'semantic-ui-react'

export default function CreateProductForm(props) {
  
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
                  </Form>  
  );
  
}