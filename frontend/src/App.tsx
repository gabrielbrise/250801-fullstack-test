import HeaderSection from "./sections/HeaderSection";
import FilterSection from "./sections/FilterSection";
import TableSection from "./sections/TableSection";

function App() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <HeaderSection />
      <FilterSection />
      <TableSection />
    </div>
  );
}

export default App;
