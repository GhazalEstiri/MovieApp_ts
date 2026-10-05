import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
function Hello() {
  const { user, logout } = useContext(AuthContext);
  return (
    <section className="text-white">
      {user ? (
        <div>
          <p> Hello {user.name}</p>
          <button onClick={logout}> log out</button>
        </div>
      ) : (
        <div>
            <Link to="/Login">Login</Link>
        </div>
      )}
    </section>
  );
}
export default Hello;
