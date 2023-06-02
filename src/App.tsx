import Header from "./components/Header";
import MainPage from "./pages/main/MainPage";
import LoginForm from "./pages/login/LoginForm";
import HeadlinesMain from "./pages/headlines/HeadlinesMain";
import NewsMain from "./pages/news/NewsMain";
import GlobalStyle from "./assets/style/globalStyle";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/headlines' element={<HeadlinesMain />} />
        <Route path='/news' element={<NewsMain />} />
      </Routes>
    </div>
  );
}

export default App;
