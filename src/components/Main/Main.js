import React, {useState} from 'react'
import { Route, Routes, Link, useLocation, useNavigate  } from "react-router-dom"
import Home from "../Home/Home"
import Products from "../Products/Products"
import Header from "../Header/Header"
import { Menu, Segment, Grid, Icon, Divider, Container, Tab, Label, Input} from 'semantic-ui-react'

//const Home = () => <h1>Home</h1>;
//const Products = () => <h1>Products</h1>;



export default function Main(props) {

    const routes = [
        {
          path: "/",
          main: () => <Home user={props.user} />,
          /*sidebar: () => (
            <p>
              This is your home page. You'll see your feed which is made up of the
              people you follow.
            </p>
          )*/
        },
        {
          path: "/products",
          main: () => <Products />,
          /*sidebar: () => (
            <p>
              This is your products page. You'll be able to see all your profile
              information as well as the people you follow.
            </p>
          )*/
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
        }
        return newTitle;
      }

      let newTitle = getTitle();

      

  return (
    <div className="wrapper">
      


     <Header user={props.user} title = {newTitle} />
      <Grid>
      <Grid.Column stretched width={2}>
      <Menu icon vertical pointing >
        <Menu.Item
          name='home'
          active={activeItem === ''}          
          onClick={()=>handleItemClick('')}
        >
          
          <Icon size='large' name='home' /><br></br>
          Dashboard
        </Menu.Item>

        <Menu.Item
          name='products'
          active={activeItem === 'products'}
          onClick={()=>handleItemClick('products')}
        >
          <Icon size='large' name='tags' />
          <br></br>
          Products
          
          
        </Menu.Item>

        

        <Menu.Item
          name='categories'
          //active={activeItem === 'video play'}
          //onClick={this.handleItemClick}
        >
          <Icon size='large' name='sitemap' />
          <br></br>Categories
        </Menu.Item>

        <Menu.Menu>
        <Menu.Item name='category'>
            Category
          </Menu.Item>
          <Menu.Item name='subcategory'>
            SubCategory
          </Menu.Item>
          <Menu.Item name='subcategory2'>
            SubCategory 2
          </Menu.Item>
          <Menu.Item name='eBayStoreCategory'>
            eBay Store Category
          </Menu.Item>
        </Menu.Menu>

        <Menu.Item
          name='brands'
          //active={activeItem === 'video play'}
          //onClick={this.handleItemClick}
        >
          <Icon size='large' name='motorcycle' /><br></br>Brands
        </Menu.Item>
        <Menu.Item
          name='manufacturers'
          //active={activeItem === 'video play'}
          //onClick={this.handleItemClick}
        >
          <Icon size='large' name='factory' /><br></br>Manufacturers
        </Menu.Item>
      </Menu>



      





      </Grid.Column>
      <Grid.Column stretched width={13}>
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
