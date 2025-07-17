import { ImBlogger } from "react-icons/im";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import SearchInput from "./SearchInput";
import Notifications from "./Notifications";
import Profile from "./Profile";

const NavBar = () => {
  return (
    <nav className="w-full sticky top-0 z-50 shadow-lg dark:shadow-md dark:shadow-gray-900 dark:bg-gray-950 dark:text-gray-300">
      <Container>
        <div className="flex justify-between items-center gap-8 ">
          <div className="flex items-center gap-1 cursor-pointer ">
            <ImBlogger size={20}/>
            <div className="font-bold text-xl">
              <h1>- LOGGER</h1>
            </div>
          </div>
          {<SearchInput />}
          <div className="flex gap-8">
            {<ThemeToggle />}
            {<Notifications />}
            {<Profile />}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
