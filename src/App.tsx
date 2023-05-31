import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import HeadlinesPage from "./pages/HeadlinesPage";
import NewsPage from "./pages/NewsPage";
import GlobalStyle from "./components/assets/style/globalStyle";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/headlines' element={<HeadlinesPage />} />
        <Route path='/news' element={<NewsPage />} />
      </Routes>
    </div>
  );
}

export default App;
