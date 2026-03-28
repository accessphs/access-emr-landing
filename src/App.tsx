import { Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Landing from "./pages/Landing";
import Layout from "./pages/Landing/Layout";
import { VideoGuide } from "./pages/Landing/VideoGuide";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="/video-guide" element={<VideoGuide />} />
      </Route>
    </Routes>
  );
}

export default App;
