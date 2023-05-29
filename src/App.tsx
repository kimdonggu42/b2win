import Header from "./components/nav/Header";
import LoginPage from "./pages/LoginPage";
import HeadlinesPage from "./pages/HeadlinesPage";
import NewsPage from "./pages/NewsPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/headlines' element={<HeadlinesPage />} />
        <Route path='/news' element={<NewsPage />} />
      </Routes>
    </div>
  );
}

export default App;
