import React from 'react'
import Header from '../Header/Header';
import { Menu, Segment, Grid, Icon, Divider, Tab, Label, Input} from 'semantic-ui-react'



export default function Main(props) {
  
  return (
    <div>
      <Header user={props.user}/>
      <Grid>
      <Grid.Column width={2}>
      <Menu icon vertical pointing >
        <Menu.Item
          name='home'
          active={true}
          //onClick={this.handleItemClick}
        >
          <Icon size='large' name='home' /><br></br>Dashboard
        </Menu.Item>

        <Menu.Item
          name='products'
          //active={activeItem === 'video camera'}
          //onClick={this.handleItemClick}
        >
          <Icon size='large' name='tags' />
          <br></br>Products
          
        </Menu.Item>

        <Menu.Item
          name='video play'
          //active={activeItem === 'video play'}
          //onClick={this.handleItemClick}
        >
          <Icon size='large' name='sitemap' />
          <br></br>Categories
        </Menu.Item>
        <Menu.Item
          name='video play'
          //active={activeItem === 'video play'}
          //onClick={this.handleItemClick}
        >
          <Icon size='large' name='motorcycle' /><br></br>Brands
        </Menu.Item>
        <Menu.Item
          name='video play'
          //active={activeItem === 'video play'}
          //onClick={this.handleItemClick}
        >
          <Icon size='large' name='factory' /><br></br>Manufacturers
        </Menu.Item>
      </Menu>
      </Grid.Column>
      <Grid.Column stretched width={14}>
        <Segment raised>
          <p>Aqui va contenido</p>
        </Segment>
        </Grid.Column>
        </Grid>
    </div>  
  );
  
}