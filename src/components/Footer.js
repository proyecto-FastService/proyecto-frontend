import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer">
      <div className="container-footer">
        <div className="footer-left">
          <span>FastService 2023 &copy; Todos los derechos reservados</span>
        </div>
        <div className="footer-center">
          <span>proyecto2.medacarena.es</span>
        </div>
        <div className="footer-right">
          <ul className="social-icons">
            <li>
              <a href="https://www.github.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
