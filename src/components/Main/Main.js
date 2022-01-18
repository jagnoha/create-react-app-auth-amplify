import React, {useState} from 'react'
import { Route, Routes, Link, useLocation, useNavigate  } from "react-router-dom"
import Home from "../Home/Home"
import Products from "../Products/Products"
import Brands from "../Brands/Brands"
import Header from "../Header/Header"
import { Menu, Segment, Grid, Icon, Divider, Container, Tab, Label, Input, Popup} from 'semantic-ui-react'
import Manufacturers from '../Manufacturers/Manufacturers'
import Categories from '../Categories/Categories'
import Reports from '../Reports/Reports'
import Settings from '../Settings/Settings'

//const Home = () => <h1>Home</h1>;
//const Products = () => <h1>Products</h1>;

const style = {
  opacity: 0.8,
}

export default function Main(props) {

    const routes = [
        {
          path: "/",
          main: () => <Home user={props.user} />,          
        },
        {
          path: "/products",
          main: () => <Products />,         
        },
        {
          path: "/brands",
          main: () => <Brands />,          
        },
        {
          path: "/manufacturers",
          main: () => <Manufacturers />,          
        },
        {
          path: "/categories",
          main: () => <Categories />,          
        },
        {
          path: "/reports",
          main: () => <Reports />,          
        },
        {
          path: "/settings",
          main: () => <Settings />,          
        }            
      ];

      const location = useLocation();
      const navigate = useNavigate()
      const menuItem = location.pathname.split('/')[1]; 
      console.log(location.pathname);

      
      const [activeItem, setActiveItem] = useState(menuItem);

      function handleItemClick(item) {          
        setActiveItem(item);
        navigate(`/${item}`)
      }

      function getTitle(){
        let newTitle = '';
        if (menuItem === ''){
            return 'Dashboard'
        } else if (menuItem === 'products'){
            return 'Products'
        } else if (menuItem === 'brands'){
          return 'Brands'
        } else if (menuItem === 'manufacturers'){
          return 'Manufacturers'
        } else if (menuItem === 'categories'){
          return 'Categories & Subcategories'
        } else if (menuItem === 'reports'){
          return 'Reports'
        } else if (menuItem === 'settings'){
          return 'Settings'
        }
        return newTitle;
      }

      let newTitle = getTitle();

      

  return (
    <div>
      


     <Header user={props.user} title = {newTitle} />
      <Grid stretched>
      <Grid.Column width={1}>
        
      <Menu icon vertical pointing borderless={true} fixed={'left'} style = {{top:55}}>
        <Menu.Item
          name='home'
          active={activeItem === ''}          
          onClick={()=>handleItemClick('')}
        >
         <Popup content='Home' position='right center' style={style} offset={[0, 15]} inverted trigger={<Icon size='large' name='home' />} />
          
          
          
          
        </Menu.Item>

        <Menu.Item
          name='products'
          active={activeItem === 'products'}
          onClick={()=>handleItemClick('products')}
        >
          <Popup content='Products' position='right center' style={style} offset={[0, 15]} inverted trigger={<Icon size='large' name='tags' />} />
         
          
          
          
          
          
        </Menu.Item>

        

        

        <Menu.Item
          name='brands'
          active={activeItem === 'brands'}
          onClick={()=>handleItemClick('brands')}
          
        >
          <Popup content='Brands' position='right center' style={style} offset={[0, 15]} inverted trigger={<Icon size='large' name='motorcycle' />} />
         
        </Menu.Item>
        <Menu.Item
          name='manufacturers'
          active={activeItem === 'manufacturers'}
          onClick={()=>handleItemClick('manufacturers')}
        >
          <Popup content='Manufacturers' position='right center' style={style} offset={[0, 15]} inverted trigger={<Icon size='large' name='factory' />} />
         
        </Menu.Item>
        <Menu.Item
          name='categories'
          active={activeItem === 'categories'}
          onClick={()=>handleItemClick('categories')}
        >
          <Popup content='Categories & SubCategories' position='right center' style={style} offset={[0, 15]} inverted trigger={<Icon size='large' name='sitemap' />} />
         
        </Menu.Item>
      </Menu>

      <Menu icon vertical pointing borderless={true} fixed={'bottom'} >
      <Menu.Item
          name='reports'
          active={activeItem === 'reports'}
          onClick={()=>handleItemClick('reports')}
        >
         <Popup content='Reports' position='right center' style={style} offset={[0, 15]} inverted trigger={<Icon size='large' name='table' />} />
          
        </Menu.Item>

        
        <Menu.Item
          name='settings'
          active={activeItem === 'settings'}
          onClick={()=>handleItemClick('settings')}
        >
         <Popup content='Settings' position='right center' style={style} offset={[0, 15]} inverted trigger={<Icon size='large' name='settings' />} />
          
        </Menu.Item>

        </Menu>

      

      


      





      </Grid.Column>
      <Grid.Column width={15} >
        <Container fluid>
        <Routes>
        {routes.map(({ path, main }) => (
          <Route key={path} path={path} element={main()} />
        ))}
      </Routes>
          
        </Container>
        </Grid.Column>
        </Grid>
 



      
      
      
      
      











      


    </div>
  );
}
