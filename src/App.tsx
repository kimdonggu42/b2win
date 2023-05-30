import Header from "./components/nav/Header";
import LoginPage from "./pages/LoginPage";
import HeadlinesPage from "./pages/HeadlinesPage";
import NewsPage from "./pages/NewsPage";
import DetailPage from "./pages/DetailPage";
import GlobalStyle from "./components/assets/style/globalStyle";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/headlines' element={<HeadlinesPage />} />
        <Route path='/news' element={<NewsPage />} />
        <Route path='/detailnews/:id' element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
