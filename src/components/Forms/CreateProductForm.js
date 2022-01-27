import React, {useState} from 'react'
import { Form, Checkbox, GridRow } from 'semantic-ui-react'
import { Dropdown, Segment, Header, Icon, Divider, Grid, Accordion } from 'semantic-ui-react'

export default function CreateProductForm(props) {
  let brands = props.brands.map(item => { return {key: item.id, text: item.name, value: item.id } } )
  let manufacturers = props.manufacturers.map(item => { return {key: item.id, text: item.name, value: item.id } } )
  let categories = props.categories.map(item => { return {key: item.id, text: item.name, value: item.id } } )
  let subCategories = props.subCategories.map(item => { return {key: item.id, text: item.name, value: item.id } } )
  let subCategories2 = props.subCategories2.map(item => { return {key: item.id, text: item.name, value: item.id } } )
  let ebayStoreCategorys = props.ebayStoreCategorys.map(item => { return {key: item.id, text: item.name, value: item.id } } )
  

  
  
  return (
    <Form>
                    <Form.Field required>
                      <label>SKU</label>
                      <input placeholder='Product SKU' 
                        value = {props.sku}
                        onChange = {props.handleSKU}
                      />
                    </Form.Field>
                    
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={10}>
                    <Form.Field>
                      <label>Parent SKU</label>
                      <input placeholder='Parent SKU' 
                        value = {props.parentSKU} 
                        onChange={props.handleParentSKU }/>
                    </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={6}>
                    <Form.Field>
                      <label>Legacy Id</label>
                      <input placeholder='Legacy Id' 
                        value = {props.legacyId}
                        onChange = {props.handleLegacyId}
                      />
                      </Form.Field>
                      </Grid.Column>
                      </Grid.Row>
                    </Grid>
                    
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={12}>
                    <Segment raised >
                        <Header>Source</Header>
                    <Form.Group >
                      <Form.Field control={Checkbox} toggle label='Warehouse' />
                      <Form.Field control={Checkbox} toggle label='Dropship' />
                    </Form.Group>
                    </Segment>
                    </Grid.Column>
                    <Grid.Column width={4} >
                    <Form.Field>
                      <label>Bin Location</label>
                      <input placeholder='Bin Location' 
                        value = {props.binLocation} 
                        onChange={props.handleBinLocation }/>
                    </Form.Field>
                    </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Divider></Divider>
                      

                      
                     
                    <Form.Field>
                      <label>Manufacturer Part Number</label>
                      <input placeholder='Manufacturer Part Number' 
                        value = {props.mpn} 
                        onChange={props.handleMPN }/>
                    </Form.Field>

                    <Grid>
                      <Grid.Row>
                          <Grid.Column width={8}>
                              <Form.Field>
                              <label>Brand</label>
                                <Dropdown placeholder='Select Brand' search searchInput={{ type: 'text' }} selection 
                                  options={brands} 
                                  onChange={props.handleBrand}
                                  value = {props.valueBrand}
                                  //loading
                                  />                       
                              </Form.Field>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <Form.Field>
                              <label>Manufacturer</label>
                                <Dropdown placeholder='Select Manufacturer' search searchInput={{ type: 'text' }} selection 
                                  options={manufacturers} 
                                  onChange={props.handleManufacturer}
                                  value = {props.valueManufacturer}
                                  //loading
                                  />                       
                              </Form.Field>  
                            </Grid.Column>
                      </Grid.Row>
                    </Grid>
                   
                    <Segment raised >
                        <Header>Title</Header>
                    
                        <Form.Field>
                          <label>Store</label>
                          <input placeholder='Store Title' 
                            value = {props.titleStore} 
                            onChange={props.handleTitleStore }/>
                        </Form.Field>
                        
                        <Grid>
                        <Grid.Row>
                          <Grid.Column width={8}>
                          <Form.Field>
                          <label>eBay - <span style={{"font-size":"0.9em","color":"gray"}}>({props.ebayChars}/80) chars</span></label>
                          <input placeholder='eBay Title' 
                            value = {props.titleEbay} 
                            onChange={props.handleTitleEbay }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={8}>
                        <Form.Field>
                          <label>Amazon</label>
                          <input placeholder='Amazon Title' 
                            value = {props.titleAmazon} 
                            onChange={props.handleTitleAmazon }/>
                        </Form.Field>
                        </Grid.Column>
                        </Grid.Row>
                        </Grid>
                    
                    
                    </Segment>

                    <Segment raised >
                        <Header>Description</Header>
                    
                        <Form.Field>
                          <label>Store</label>
                          <input placeholder='Store Description' 
                            value = {props.descriptionStore} 
                            onChange={props.handleDescriptionStore }/>
                        </Form.Field>
                        
                        <Grid>
                        <Grid.Row>
                          <Grid.Column width={8}>
                          <Form.Field>
                          <label>eBay</label>
                          <input placeholder='eBay Description' 
                            value = {props.descriptionEbay} 
                            onChange={props.handleDescriptionEbay }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={8}>
                        <Form.Field>
                          <label>Amazon</label>
                          <input placeholder='Amazon Description' 
                            value = {props.descriptionAmazon} 
                            onChange={props.handleDescriptionAmazon }/>
                        </Form.Field>
                        </Grid.Column>
                        </Grid.Row>
                        </Grid>
                    
                    
                    </Segment>

                    <Segment raised >
                        <Header>Bullet Points</Header>
                        <Grid>
                        <Grid.Row>
                          <Grid.Column width={4}>
                          <Form.Field>
                          <label>Bullet 1</label>
                          <input placeholder='Bullet point 1' 
                            value = {props.bullet1} 
                            onChange={props.handleBullet1 }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={4}>
                        <Form.Field>
                          <label>Bullet 2</label>
                          <input placeholder='Bullet point 2' 
                            value = {props.bullet2} 
                            onChange={props.handleBullet2 }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={4}>
                          <Form.Field>
                          <label>Bullet 3</label>
                          <input placeholder='Bullet point 3' 
                            value = {props.bullet3} 
                            onChange={props.handleBullet3 }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={4}>
                        <Form.Field>
                          <label>Bullet 4</label>
                          <input placeholder='Bullet point 4' 
                            value = {props.bullet4} 
                            onChange={props.handleBullet4 }/>
                        </Form.Field>
                        </Grid.Column>


                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={5}>
                          <Form.Field>
                          <label>Bullet 5</label>
                          <input placeholder='Bullet point 5' 
                            value = {props.bullet5} 
                            onChange={props.handleBullet5 }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={6}>
                        <Form.Field>
                          <label>Bullet 6</label>
                          <input placeholder='Bullet point 6' 
                            value = {props.bullet6} 
                            onChange={props.handleBullet6 }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={5}>
                          <Form.Field>
                          <label>Bullet 7</label>
                          <input placeholder='Bullet point 7' 
                            value = {props.bullet7} 
                            onChange={props.handleBullet7 }/>
                        </Form.Field>
                        </Grid.Column>
                        </Grid.Row>
                        </Grid>
                    
                    
                    </Segment>

                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={8}>
                    <Form.Field>
                    <label>Category</label>
                      <Dropdown placeholder='Select Category' search searchInput={{ type: 'text' }} selection 
                         options={categories} 
                         onChange={props.handleCategory}
                         value = {props.valueCategory}
                         //loading
                        />                       
                    </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={8}>
                    <Form.Field>
                    <label>SubCategory</label>
                      <Dropdown placeholder='Select SubCategory' search searchInput={{ type: 'text' }} selection 
                         options={subCategories} 
                         onChange={props.handleSubCategory}
                         value = {props.valueSubCategory}
                         //loading
                        />                       
                    </Form.Field>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={8}>
                    <Form.Field>
                    <label>SubCategory 2</label>
                      <Dropdown placeholder='Select SubCategory 2' search searchInput={{ type: 'text' }} selection 
                         options={subCategories2} 
                         onChange={props.handleSubCategory2}
                         value = {props.valueSubCategory2}
                         //loading
                        />                       
                    </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={8}>
                    <Form.Field>
                    <label>eBay Store Category</label>
                      <Dropdown placeholder='Select eBay Store Category' search searchInput={{ type: 'text' }} selection 
                         options={ebayStoreCategorys} 
                         onChange={props.handleEbayStoreCategory}
                         value = {props.valueEbayStoreCategory}
                         //loading
                        />                       
                    </Form.Field>
                    </Grid.Column>
                    </Grid.Row>
                    </Grid>
                    <Divider></Divider>

                    <Segment raised >
                        <Header>Dimensions</Header>
                        
                        <Grid columns='equal'>
                        <Grid.Row>
                          <Grid.Column>
                          <Form.Field>
                          <label>Height</label>
                          <input type='number' min="0" placeholder='Height in inches' 
                            value = {props.height} 
                            onChange={props.handleHeight }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                          <Form.Field>
                          <label>Length</label>
                          <input type='number' min="0" placeholder='Length in inches' 
                            value = {props.length} 
                            onChange={props.handleLength }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                        <Form.Field>
                          <label>Width</label>
                          <input type='number' min="0" placeholder='Width in inches' 
                            value = {props.width} 
                            onChange={props.handleWidth }/>
                        </Form.Field>
                        </Grid.Column>
                        </Grid.Row>
                        </Grid>
                    
                    
                    </Segment>

                    <Segment raised >
                        <Header>Weight</Header>
                        
                        <Grid columns='equal'>
                        <Grid.Row>
                          <Grid.Column>
                          <Form.Field>
                          <label>Weight</label>
                          <input type='number' min="0" placeholder='Weight in pounds' 
                            value = {props.weight} 
                            onChange={props.handleWeight }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                          <Form.Field>
                          <label>Dimensional Weight</label>
                          <input type='number' min="0" placeholder='Dimensional Weight' 
                            value = {props.dimensionalWeight} 
                            onChange={props.handleDimensionalWeight }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                        <Form.Field>
                          <label>Applied Weight</label>
                          <input type='number' min="0" placeholder='Applied Weight' 
                            value = {props.appliedWeight} 
                            onChange={props.handleAppliedWeight }/>
                        </Form.Field>
                        </Grid.Column>
                        </Grid.Row>
                        </Grid>
                    
                    
                    </Segment>
                    <Segment raised >
                    <Form.Field>
                          <label>Cost</label>
                          <input type='number' min="0" placeholder='Cost' 
                            value = {props.cost} 
                            onChange={props.handleCost }/>
                        </Form.Field>
                      </Segment>
                    <Segment raised >
                        <Header>Price</Header>
                        
                        <Grid columns='equal'>
                        
                        <Grid.Row>
                          <Grid.Column>
                          <Form.Field>
                          <label>MSRP</label>
                          <input type='number' min="0" placeholder='MSRP' 
                            value = {props.priceMSRP} 
                            onChange={props.handlePriceMSRP }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                          <Form.Field>
                          <label>MAP</label>
                          <input type='number' min="0" placeholder='MAP' 
                            value = {props.priceMAP} 
                            onChange={props.handlePriceMAP }/>
                        </Form.Field>
                        </Grid.Column>
                        
                        </Grid.Row>

                        <Grid.Row>
                          <Grid.Column>
                          <Form.Field>
                          <label>Store</label>
                          <input type='number' min="0" placeholder='Store price' 
                            value = {props.priceStore} 
                            onChange={props.handlePriceStore }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                          <Form.Field>
                          <label>eBay</label>
                          <input type='number' min="0" placeholder='eBay Price' 
                            value = {props.priceEbay} 
                            onChange={props.handlePriceEbay }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                        <Form.Field>
                          <label>Amazon</label>
                          <input type='number' min="0" placeholder='Amazon price' 
                            value = {props.priceAmazon} 
                            onChange={props.handlePriceAmazon }/>
                        </Form.Field>
                        </Grid.Column>
                        </Grid.Row>
                        

                        <Grid.Row>
                          <Grid.Column>
                          <Form.Field>
                          <label>Wholesale Low</label>
                          <input type='number' min="0" placeholder='Wholesale Low Price' 
                            value = {props.priceWholesaleLow} 
                            onChange={props.handlePriceWholesaleLow }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                          <Form.Field>
                          <label>wholesale High</label>
                          <input type='number' min="0" placeholder='wholesale High Price' 
                            value = {props.priceWholesaleHigh} 
                            onChange={props.handlePriceWholesaleHigh }/>
                        </Form.Field>
                        </Grid.Column>
                        
                        </Grid.Row>

                        <Grid.Row>
                          <Grid.Column>
                          <Form.Field>
                          <label>Scratch Low</label>
                          <input type='number' min="0" placeholder='Scratch Low Price' 
                            value = {props.priceScratchLow} 
                            onChange={props.handlePriceScratchLow }/>
                        </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                          <Form.Field>
                          <label>Scratch High</label>
                          <input type='number' min="0" placeholder='Scratch High Price' 
                            value = {props.priceScratchHigh} 
                            onChange={props.handlePriceScratchHigh }/>
                        </Form.Field>
                        </Grid.Column>
                        
                        </Grid.Row>
                        
                        
                        </Grid>
                    
                    
                    </Segment>



                    

                    <Form.Field>
                      <label>Handle</label>
                      <input placeholder='Handle' 
                        value = {props.handle} 
                        onChange={props.handleHandle }/>
                    </Form.Field>
                    
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={8}>
                    <Form.Field>
                      <label>Shopify Fitment Tags</label>
                      <input placeholder='Shopify Fitment Tags' 
                        value = {props.shopifyFitmentTags} 
                        onChange={props.handleShopifyFitmentTags }/>
                    </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={8}>
                    <Form.Field>
                      <label>Shopify Only Tags</label>
                      <input placeholder='Shopify Fitment Tags' 
                        value = {props.shopifyOnlyTags} 
                        onChange={props.handleShopifyOnlyTags }/>
                    </Form.Field>
                    </Grid.Column>
                    </Grid.Row>
                       </Grid>

                       

                       
                      
                       
                    

                    
                    
                     
                  </Form>  
  );
  
}

const centerObject = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
}