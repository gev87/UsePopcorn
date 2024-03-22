import Logo from "./Logo";
import NumResults from "./NumResults";

export default function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
    
      {children}
      {/* <NumResults length={movies?.length} /> */}
    </nav>
  );
}
