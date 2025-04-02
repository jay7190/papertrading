import Navbar from "./UserNavbar/Navbar";
import PageContent from "./UserPageContent/PageContent";
import Footer from "./UserFooter/UserFooter";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div>
      <Navbar />
      <PageContent>
        <Outlet />
      </PageContent>
      <Footer />
    </div>
  );
}

export default Home;
