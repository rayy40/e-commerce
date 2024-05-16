import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Header from "./Components/Header/Header";
import ExplorePage from "./Pages/ExplorePage/ExplorePage";
import FilterPage from "./Pages/FilterPage/FilterPage";
import ProductPage from "./Pages/ProductPage/ProductPage";
import { CartProvider } from "./Helpers/CartContext";
import { OverlayProvider } from "./Helpers/OverlayContext";
import CategoryPage from "./Pages/CategoriesPage/CategoryPage";
import CartPage from "./Pages/CartPage/CartPage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import { AuthProvider } from "./Helpers/AuthContext";
import { SearchProvider } from "./Helpers/SearchContext";
import AccountPage from "./Pages/AccountPage/AccountPage";
import CheckoutSuccess from "./Pages/Checkout/CheckoutSuccess";
import CheckoutFailed from "./Pages/Checkout/CheckoutFailed";
import "./Styles/App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <OverlayProvider>
          <SearchProvider>
            <CartProvider>
              <Header />
              <div>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explore-all" element={<ExplorePage />} />
                  <Route path="/filter-page" element={<FilterPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/category/:gender" element={<CategoryPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/search/:name?" element={<SearchPage />} />
                  <Route path="/account/*" element={<AccountPage />} />
                  <Route path="/account/logout" element={<Navigate to="/" />} />
                  <Route
                    path="/checkout-success"
                    element={<CheckoutSuccess />}
                  />
                  <Route path="/checkout-failed" element={<CheckoutFailed />} />
                </Routes>
              </div>
            </CartProvider>
          </SearchProvider>
        </OverlayProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
