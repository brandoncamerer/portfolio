import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  About,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";
import MarkdownPage from "./components/MarkdownPage";
import MarkdownViewPage from "./components/MarkdownViewPage";

const Home = () => {
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>

      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />
      <StarsCanvas />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/markdown" element={<MarkdownPage />} />
        <Route path="/:slug" element={<MarkdownViewPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
