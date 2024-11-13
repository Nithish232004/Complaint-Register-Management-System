import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom'

export default function FooterC() {
  return (
    <footer className="bg-white py-4 mt-auto border-top">
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <h5 className="text-primary mb-0">FixHub</h5>
          </Col>
          <Col md={4} className="text-center mb-3 mb-md-0">
            <p className="text-muted mb-0">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </Col>
          <Col md={4} className="text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end">
              <Link href="#" passHref>
                <a className="text-muted me-3">
                  <FaFacebookF />
                  <span className="visually-hidden">Facebook</span>
                </a>
              </Link>
              <Link href="#" passHref>
                <a className="text-muted me-3">
                  <FaTwitter />
                  <span className="visually-hidden">Twitter</span>
                </a>
              </Link>
              <Link href="#" passHref>
                <a className="text-muted me-3">
                  <FaInstagram />
                  <span className="visually-hidden">Instagram</span>
                </a>
              </Link>
              <Link href="#" passHref>
                <a className="text-muted">
                  <FaLinkedinIn />
                  <span className="visually-hidden">LinkedIn</span>
                </a>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
