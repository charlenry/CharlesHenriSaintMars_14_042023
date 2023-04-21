import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";

/**
 * A function component that returns a JSX element.
 * It renders the page not found.
 *
 * @component
 * @name NotFound
 * @kind function
 * @param { any } props - No props
 * @returns { JSX.Element }
 */
const NotFound = (props) => {

  return (
    <>
      <Header />
      <main className="container bg-dark">
        <div className="notfound">
          <p>Désolé, cette page n'existe pas.</p>
          <Link className="button-link" to="/">Retourner à la page d'accueil</Link>
        </div>
      </main>
    </>
  );
};

export default NotFound;