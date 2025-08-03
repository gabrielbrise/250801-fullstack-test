import "./App.css";
import HeaderSection from "./sections/HeaderSection";
import FilterSection from "./sections/FilterSection";

function App() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <HeaderSection />
      <FilterSection />
    </div>
  );
}

export default App;
