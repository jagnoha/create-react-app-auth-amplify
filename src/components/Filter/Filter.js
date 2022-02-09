import React, { useState, useEffect }from 'react'
import { Button, Icon, Popup, Dropdown, Grid } from 'semantic-ui-react'

export default function Filter(props) {
    
    const [checkedOR, setCheckedOR] = useState(true)
    const [filterFormOpen, setFilterFormOpen] = useState(false)
    const filterOptions = [
        { key: 'Amazon Price',text: 'Amazon Price',value: 'Amazon Price' },
        { key: 'Attribute',text: 'Attribute',value: 'Attribute', type:'attributeList' },
        { key: 'Brand',text: 'Brand',value: 'Brand', type:'BrandList' },
        { key: 'Category',text: 'Category',value: 'Category', type:'CategoryList' },
        { key: 'Cost',text: 'Cost',value: 'Cost', type:'' },
        { key: 'Description',text: 'Description',value: 'Description' },
        { key: 'eBay Category Store',text: 'ebay Category Store',value: 'eBay Category Store' },
        { key: 'eBay Price',text: 'eBay Price', value: 'eBay Price' },
        { key: 'Manufacturer',text: 'Manufacturer', value: 'ManufacturerList' },
        { key: 'MPN',text: 'MPN',value: 'MPN' },
        { key: 'MSRP',text: 'MSRP',value: 'MSRP' },
        { key: 'Store Price',text: 'Store Price',value: 'Store Price' },
        { key: 'SubCategory',text: 'SubCategory',value: 'SubCategory' },
        { key: 'SubCategory2',text: 'SubCategory2',value: 'SubCategory2' },
        { key: 'SKU',text: 'SKU',value: 'SKU' },
        { key: 'Title',text: 'Title',value: 'Title' },
    ]
    return (
    <span>
    <span style={{marginLeft: 20, marginRight: 5}}>Filters</span>
    <span>
              
            <Popup
            //style = {{backgroundColor: 'lightgray'}}
            hoverable={false}
            wide={true}
            offset={[-10, 0]}
            position='bottom left'
            //onClick={()=>setFilterFormOpen(!filterFormOpen)}
            onClose={()=>setCheckedOR(!checkedOR)}
            //inverted
            //disabled={filterFormOpen}
            content={
                
                    <>
                        
                    <Dropdown
                        placeholder='-- Select a Field --'
                        //fluid
                        selection
                        options={filterOptions}
                        search
                    />
                    
                    
                    <Button primary style={{marginLeft: 10}}>Add</Button>

                    </>
                    
                    
                
                }
                on='click'
                //positionFixed
                trigger={<Icon onClick = {()=>setCheckedOR(!checkedOR)} name={checkedOR ? 'plus square' : 'caret square up'} />}            
            />
           
      
    </span>
    </span>  
  );
  
}