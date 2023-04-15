import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Header from "./Components/Header/Header";
import ExplorePage from "./Pages/ExplorePage/ExplorePage";
import FilterPage from "./Pages/FilterPage/FilterPage";
import "./Styles/App.css";
import ProductPage from "./Pages/ProductPage/ProductPage";
import { CartProvider } from "./Helpers/CartContext";
import { OverlayProvider } from "./Helpers/OverlayContext";
import CategoryPage from "./Pages/CategoriesPage/CategoryPage";
import CartPage from "./Pages/CartPage/CartPage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import { AuthProvider } from "./Helpers/AuthContext";
import { SearchProvider } from "./Helpers/SearchContext";
import AccountPage from "./Pages/AccountPage/AccountPage";
import CheckoutSuccess from "./Pages/CheckoutSuccess/CheckoutSuccess";

function App() {
  return (
    <Router>
      <AuthProvider>
        <OverlayProvider>
          <SearchProvider>
            <CartProvider>
              <Header />
              <div>
                <Switch>
                  <Route path="/" exact component={HomePage} />
                  <Route path="/explore-all" component={ExplorePage} />
                  <Route path="/filter-page" component={FilterPage} />
                  <Route path="/product/:id" component={ProductPage} />
                  <Route path="/category/:gender" component={CategoryPage} />
                  <Route path="/cart" component={CartPage} />
                  <Route path="/search/:name?" component={SearchPage} />
                  <Route path="/account" component={AccountPage} />
                  <Route path="/checkout-success" component={CheckoutSuccess} />
                </Switch>
              </div>
            </CartProvider>
          </SearchProvider>
        </OverlayProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
