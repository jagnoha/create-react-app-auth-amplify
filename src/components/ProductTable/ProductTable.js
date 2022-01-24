import React from 'react'
import { Table, Loader, Container } from 'semantic-ui-react'


export default function ProductTable(props) {

    if (!props.data) {  

    return (
        
        <Container>

            <Loader active style = {{top:350}} />        
        </Container>
        
    );

    } 

    return (
        
            <Table sortable celled selectable>
        <Table.Header>


            
          <Table.Row >
            <Table.HeaderCell 
                sorted={props.orderColumn.column === 'sku' ? props.orderColumn.direction : null}
                onClick={() => props.handleOrder('sku')}
            >SKU</Table.HeaderCell>
            <Table.HeaderCell>MPN</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
            
            {props.data.map((item) => 
            
            <Table.Row key={item.id} onClick = {()=>props.openForm(item)}>
            <Table.Cell>{item.SKU}</Table.Cell>
            <Table.Cell>{item.mpn}</Table.Cell>
          </Table.Row>
            
            )}

          </Table.Body>
          </Table>
        
    )
    
    
  }
