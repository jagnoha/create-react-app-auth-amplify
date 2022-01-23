import React, { useState, useEffect }from 'react'
import { Icon, Label, Menu, Table, Button, Checkbox, Loader, Dimmer, Container } from 'semantic-ui-react'


export default function SimpleTable(props) {

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
            <Table.HeaderCell width={4}>Id</Table.HeaderCell>
            <Table.HeaderCell 
                sorted={props.orderColumn.column === 'name' ? props.orderColumn.direction : null}
                onClick={() => props.handleOrder('name')}
            >Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
            
            {props.data.map((item) => 
            
            <Table.Row key={item.id} onClick = {()=>props.openForm(item)}>
            <Table.Cell>
               {item.id}  
            </Table.Cell>
            <Table.Cell>{item.name}</Table.Cell>
          </Table.Row>
            
            
            
            
            
            
            )}

          </Table.Body>
          </Table>
        
    )

    

    //console.log(props.tableData);
    
    /*if (props.tableData === null){
        return (<><p>Processing</p></>)
    } 
    
    return 
         
        (
    
        
        <><Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={4}>Id</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>

        {props.tableData.map( item => (
          
          <Table.Row key={item.id}>
            <Table.Cell>
               {item.id}  
            </Table.Cell>
            <Table.Cell>{item.name}</Table.Cell>
          </Table.Row>
          
          
          )
          
          
          
          )}


          </Table.Body>
    
        
      </Table>


      </>  
    );*/

    
    
  }

  