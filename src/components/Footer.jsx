import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer__inner">
          <p className="footer__copy">&copy; 2026 sharan deepak</p>
          <nav aria-label="social links">
            <ul className="footer__links" role="list">
              <li>contact me @</li>
              <li>
                <a href="https://github.com/silveredtheorem" target="_blank" rel="noopener noreferrer">
                  github
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/sharan-deepak" target="_blank" rel="noopener noreferrer">
                  linkedin
                </a>
              </li>
              <li>
                <a href="mailto:silvered.theorem@gmail.com">email</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
