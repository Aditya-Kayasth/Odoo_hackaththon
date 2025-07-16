import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 shadow-sm border-b  dark:bg-gray-900 dark:text-gray-300">
      <Container>
        <div className="flex justify-between items-center gap-8 ">
          <div className="flex items-center gap-5 cursor-pointer">
            <div>Icon</div>
            <div>Title</div>
          </div>
          <div>Search</div>
          <div className="flex gap-5">
            
            {<ThemeToggle />}
            
            <div>Notifications</div>
            <div>Profile</div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
