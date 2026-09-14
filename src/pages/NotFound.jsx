import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <section className="section not-found">
      <div className="container not-found__inner">
        <p className="not-found__code">404</p>
        <h1 className="not-found__heading">nothing here</h1>
        <p className="not-found__text">
          whatever you were looking for either moved or never existed. it happens.
        </p>
        <Link to="/home" className="btn btn--primary">
          take me home
        </Link>
      </div>
    </section>
  );
}
