import { Theme } from "@radix-ui/themes";
import AppRouter from "./Components/AppRouter";
import NavigatorBar from "./Components/NavigatorBar";
import Footer from "./Components/footer";

function App() {
  return (
    <Theme appearance="dark">
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#121212" }}>
        <NavigatorBar />
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <AppRouter />
        </div>
        <Footer />
      </div>
    </Theme>
  );
}

export default App;