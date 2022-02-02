import React from 'react'
import { Table, Loader, Container, Image, Label, Icon } from 'semantic-ui-react'

function AttributeList(props){
    let attributeParse = props.attributesSelected ? JSON.parse( props.attributesSelected) : [] 
    /*console.log("MMMMMMMMMMMMMMMMM: ", props.attributesSelected.map(item => {
        return ({
            id: item.id,
            value: item.value,
        })
    }))*/

    let list = []
    for (let item of attributeParse){
        let attr = props.attributes.find(itemAtr => itemAtr.id === item.id)
        if (item && props.attributes){
            list.push({
                name: attr ? attr.name : "",
                value: item.value
            })
        }
    }
    //console.log(list)
    if (props.attributes) {
    return (
        <div>
            {list.map(item => {
                return (
                    <p>
                        

                        <Label size={"mini"}>
                            {item.name}
                            <Label.Detail>{item.value}</Label.Detail>
                        </Label>
                        
                    </p>
                )
            })}
        </div>
    )}

    return (
        <div></div>
    )
}

export default function ProductTable(props) {

    if (!props.data) {  

    return (
        
        <Container>

            <Loader active style = {{top:350}} />        
        </Container>
        
    );

    } 

    console.log(props.data)


    return (
        
            <Table style={{fontSize:12}} sortable selectable basic>
        <Table.Header>


            
          <Table.Row >
            <Table.HeaderCell >Status</Table.HeaderCell>
            <Table.HeaderCell width={1}>Images</Table.HeaderCell>
            <Table.HeaderCell 
                sorted={props.orderColumn.column === 'sku' ? props.orderColumn.direction : null}
                onClick={() => props.handleOrder('sku')}
            >SKU</Table.HeaderCell>
            <Table.HeaderCell width={2}>Source</Table.HeaderCell>
            
            
            <Table.HeaderCell width={2} sorted={props.orderColumn.column === 'title' ? props.orderColumn.direction : null}
                onClick={() => props.handleOrder('title')}>Title</Table.HeaderCell>
            
            
            <Table.HeaderCell width={1}
                sorted={props.orderColumn.column === 'mpn' ? props.orderColumn.direction : null}
                onClick={() => props.handleOrder('mpn')}>MPN
            </Table.HeaderCell>
            <Table.HeaderCell width={2}>Attributes</Table.HeaderCell>
            <Table.HeaderCell width={2}>Category</Table.HeaderCell>
            <Table.HeaderCell width={2}>SubCategory</Table.HeaderCell>
            <Table.HeaderCell width={1}>SubCategory 2</Table.HeaderCell>
            <Table.HeaderCell width={1} sorted={props.orderColumn.column === 'createdAt' ? props.orderColumn.direction : null}
                onClick={() => props.handleOrder('createdAt')}>Created</Table.HeaderCell>
            <Table.HeaderCell width={1} sorted={props.orderColumn.column === 'updatedAt' ? props.orderColumn.direction : null}
                onClick={() => props.handleOrder('updatedAt')}>Updated</Table.HeaderCell>
            
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
            
            {props.data.map((item) => {
                let category = props.categories.find(itemCat => itemCat.id === item.categoryID )
                let subCategory = props.subCategories.find(itemCat => itemCat.id === item.subcategoryID )
                let subCategory2 = props.subCategories2.find(itemCat => itemCat.id === item.subcategory2ID )
                //let attributesSelected = item.Attributes ? JSON.parse(item.Attributes) : ""
                //console.log("Atributes Selected: ", attributesSelected)
                
                
                return (
            <Table.Row key={item.id} onClick = {()=>props.openForm(item)}>
            <Table.Cell>{item.status === 'Active' ? <Icon color="green" name = "circle" /> : <Icon name = "circle" /> }
                
            </Table.Cell>
            <Table.Cell>
                
                <Image src={item.images.image1 ? JSON.parse(item.images.image1).data_url : ""} size='mini' />
            
            </Table.Cell>
            <Table.Cell>{item.SKU}</Table.Cell>
            <Table.Cell>
                {item.source.warehouse ? <Label color='blue' size={"mini"}>Warehouse</Label> : ''}  
                {item.source.dropship ? <Label color='orange' size={"mini"}>Dropship</Label> : ''}          
            </Table.Cell>
            <Table.Cell>{item.title.store}</Table.Cell>
            <Table.Cell>{item.mpn}</Table.Cell>
            <Table.Cell><AttributeList attributesSelected = {item.Attributes} attributes = {props.attributes} /></Table.Cell>
            <Table.Cell>{ 
                    category ? category.name : ""

                }</Table.Cell>
                <Table.Cell>{ 
                    subCategory ? subCategory.name : ""

                }</Table.Cell>
                <Table.Cell>{ 
                    subCategory2 ? subCategory2.name : ""

                }</Table.Cell>
                <Table.Cell >{new Date(item.createdAt).toString().split(' GMT')[0]}</Table.Cell>
                <Table.Cell >{new Date(item.updatedAt).toString().split(' GMT')[0]}</Table.Cell>


          </Table.Row>
            )
            }

            )}

          </Table.Body>
          </Table>
        
    )
    
    
  }
