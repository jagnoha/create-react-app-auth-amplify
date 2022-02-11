import { filenameToContentType } from '@aws-amplify/core'
import React, { useState, useEffect }from 'react'
import { Button, Icon, Popup, Dropdown, Grid, GridRow, GridColumn, Segment, Divider, Form, Input, Label } from 'semantic-ui-react'
import { v4 as uuidv4 } from 'uuid'

export default function Filter(props) {
    
    const [checkedOR, setCheckedOR] = useState(true)
    const [filterList, setFilterList] = useState([])
    const [filterItem, setFilterItem] = useState(null)
    const [openPopup, setOpenPopup] = useState(false)
    const [filterFormOpen, setFilterFormOpen] = useState(false)
    const [secondaryOption, setSecondaryOption] = useState(null)
    const [valueFilter, setValueFilter] = useState('')
    const [field, setField] = useState('')
    const [type, setType] = useState('')
    const [ formField, setFormField ] = useState('')
    const [ openFormField, setOpenFormField ] = useState(false)
    const [ readyToApply, setReadyToApply ] = useState(false)

    
        const filterOptions = [
        { key: 'Amazon Price',text: 'Amazon Price',value: 'Amazon Price', type: 'numberOptions' },
        { key: 'Attribute',text: 'Attribute',value: 'Attribute', type:'attributeList' },
        { key: 'Brand',text: 'Brand',value: 'Brand', type:'brandList' },
        { key: 'Category',text: 'Category',value: 'Category', type:'categoryList' },
        { key: 'Cost',text: 'Cost',value: 'Cost', type: 'numberOptions' },
        { key: 'Description',text: 'Description',value: 'Description', type: 'textOptions' },
        { key: 'eBay Category Store',text: 'ebay Category Store',value: 'eBay Category Store', type:'ebayCategoryList' },
        { key: 'eBay Price',text: 'eBay Price', value: 'eBay Price', type: 'numberOptions' },
        { key: 'Manufacturer',text: 'Manufacturer', value: 'manufacturerList' },
        { key: 'MPN',text: 'MPN',value: 'MPN', type: 'textOptions' },
        { key: 'MSRP',text: 'MSRP',value: 'MSRP', type: 'numberOptions' },
        { key: 'Store Price',text: 'Store Price',value: 'Store Price', type: 'numberOptions' },
        { key: 'SubCategory',text: 'SubCategory',value: 'SubCategory', type: 'subCategoryList' },
        { key: 'SubCategory2',text: 'SubCategory2',value: 'SubCategory2', type: 'subCategoryList2' },
        { key: 'SKU',text: 'SKU',value: 'SKU', type: 'textOptions' },
        { key: 'Title',text: 'Title',value: 'Title', type: 'textOptions' },
    ]

    const numberOptions = [
        { key: 'Equals',text: 'Equals', value: 'Equals' },
        { key: 'Does not Equal',text: 'Does not Equal',value: 'Does not Equal' },
        { key: 'Empty',text: 'Empty',value: 'Empty' },
        { key: 'Not Empty',text: 'Not Empty',value: 'Not Empty' },
        { key: 'Greater Than',text: 'Greater Than',value: 'Greater Than' },
        { key: 'Greater Than Or Equal To',text: 'Greater Than Or Equal To',value: 'Greater Than Or Equal To' },
        { key: 'Less Than',text: 'Less Than',value: 'Less Than' },
        { key: 'Less Than Or Equal To',text: 'Less Than Or Equal To',value: 'Less Than Or Equal To' },
    ]

    const textOptions = [
        { key: 'Exact Match',text: 'Exact Match', value: 'Exact Match' },
        { key: 'Contains',text: 'Contains',value: 'Contains' },
        { key: 'Starts With',text: 'Starts With',value: 'Starts With' },
        { key: 'Ends With',text: 'Ends With',value: 'Ends With' },
        { key: 'Empty',text: 'Empty',value: 'Empty' },
        { key: 'Not Empty',text: 'Not Empty',value: 'Not Empty' },
        { key: 'Does Not Contain',text: 'Does Not Contain',value: 'Does Not Contain' },
        
    ]

    

    const handleFilterOptions = (e, {value}) => {
        //console.log(e.target)
        setReadyToApply(false)
        setOpenFormField(false)
        console.log(value)
        setField(value)
        let typeTemp = filterOptions.find(item => item.key === value).type
        console.log(type)
        setType(typeTemp)
        
        if (typeTemp === 'numberOptions') {
            setSecondaryOption(numberOptions)
        } else if (typeTemp === 'textOptions') {
            setSecondaryOption(textOptions)
        } else {
            setSecondaryOption(null)
        }
        
    }

    const handleSecondaryFilterOptions = (value) => {
        //console.log(e.target)
        setReadyToApply(false)
        setOpenFormField(false)
        console.log(value)

        let id = uuidv4()

        if (value === 'Empty'){
            //setFilterList([...filterList, {id, field: field, comparation: value, value: 'Empty' }])
            setFilterItem({id, field: field, comparation: value, value: 'Empty' })
            setReadyToApply(true)
        } else if (value === 'Not Empty'){
            //setFilterList([...filterList, {id, field: field, comparation: value, value: 'Not Empty' }])
            setFilterItem({id, field: field, comparation: value, value: 'Not Empty' })
            setReadyToApply(true)            
        } else {
            //setFilterList([...filterList, {id, field: field, comparation: value }])
            setFilterItem({id, field: field, comparation: value })
            setOpenFormField(true)
        }

        /*let type = filterOptions.find(item => item.key === value).type
        console.log(type)
        if (type === 'numberOptions') {
            setSecondaryOption(numberOptions)
        } else if (type === 'textOptions') {
            setSecondaryOption(textOptions)
        } else {
            setSecondaryOption(null)
        }*/
        
    }

    const secondaryDropList = (option) => {
        return (
            <Segment>
            <Dropdown
                    style={{marginLeft: 10}}
                        placeholder='-- Select a Field --'
                        //fluid
                        selection
                        options={option}
                        search
                        onChange={ /*(e,{value}) => console.log(value)*/ (e,{value}) => handleSecondaryFilterOptions(value)}
                    />
            </Segment>
        )
    }

    const handleValueComparationField = (evt) => {
        let value = evt.target.value
        console.log(value)

        if (value.length > 0){
            setReadyToApply(true)
        }

        setFilterItem( (values) => ({
          ...values, value  
        }))
    }

    const handleAddFilter = () => {
        setFilterList([...filterList, filterItem])
        setCheckedOR(!checkedOR)
        setOpenPopup(false)
        //setFilterList([])
        setFilterItem(null)
        setFilterFormOpen(false)
        setSecondaryOption(null)
        setField('')
        setType('')
        setReadyToApply(false)
        setFormField('')
        setOpenFormField(false)
    }

    const valueComparationField = () => {
        return (
        <Segment>
                <Input placeholder='' type ={type === 'numberOptions' ? 'number' : 'text'} onChange = {(e) => handleValueComparationField(e)} />        
        </Segment>
        )  
    }

    const handleCloseFilter = () => {
        setCheckedOR(!checkedOR)
        //setFilterList([])
        setFilterItem(null)
        setFilterFormOpen(false)
        setSecondaryOption(null)
        setField('')
        setType('')
        setReadyToApply(false)
        setFormField('')
        setOpenFormField(false)
        setOpenPopup(false)
    }

    const handleDeleteItem = (id) => {
        console.log(id)
        setFilterList(filterList.filter(item => item.id !== id))
    }

    

    const filterListTags = () => {
        
        let test = filterList.map(item => {
            return (
            <Label color='blue' key={item.id}>
                <Icon name='delete' onClick = {()=>handleDeleteItem(item.id)} /> {`${item.field} ${item.comparation} 
                ${   (item.comparation !== 'Empty' && item.comparation !== 'Not Empty') ? item.value : '' }`}
            </Label>
            )
        })

        return (test)
        
        
        
            
    }

    console.log(filterList)
    console.log(filterItem)

    return (
    
    <span>
        
    <span style={{marginLeft: 20, marginRight: 5}}>Filters</span>
    <span>
              
            <Popup
            //style = {{backgroundColor: 'whitesmoke'}}
            hoverable={false}
            open = {openPopup}
            onOpen={()=>setOpenPopup(true)}
            //wide={true}
            offset={[-10, 0]}
            position='bottom left'
            //onClick={()=>setFilterFormOpen(!filterFormOpen)}
            onClose={() => handleCloseFilter()} //          ()=>setCheckedOR(!checkedOR)}
            //inverted
            //disabled={filterFormOpen}
            content={
                
                    <>
                     <Segment.Group horizontal>
                     <Segment secondary> 
                     
                    <Dropdown
                        
                        placeholder='-- Select a Field --'
                        //fluid
                        selection
                        options={filterOptions}
                        search
                        onChange={(e, {value}) => handleFilterOptions(e, {value})}
                    />
                    </Segment>
                    
                    {console.log(checkedOR)}
                    
                    { secondaryOption ? secondaryDropList(secondaryOption) : ""}
                    { /*console.log("ddsds: ", secondaryOption)*/ }

                    { openFormField ? valueComparationField() : ""}
                    
                    
                    <Segment>
                    <Button 
                        onClick = {()=>handleAddFilter()}
                        disabled = {!readyToApply} primary style={{marginLeft: 10}}>Add</Button>
                    </Segment>
                    
                        
                    
                    </Segment.Group>
                    

                    </>
                    
                    
                
                }
                on='click'
                //positionFixed
                trigger={<Icon onClick = {()=>setCheckedOR(!checkedOR)} name={checkedOR ? 'plus square' : 'caret square up'} />}            
            />
           
           
    </span>
    <span style={{marginLeft: 10}}>
    
    { filterList.length > 0 ? filterListTags() : '' } 
    
    
    
    </span>
   
     
    </span>
  );
  
}