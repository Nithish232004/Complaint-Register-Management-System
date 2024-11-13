import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaComments, FaUserPlus, FaSignInAlt, FaArrowRight } from 'react-icons/fa'
import 'bootstrap/dist/css/bootstrap.min.css'
import FooterC from './FooterC'

export default function Home() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <Container>
          <Link to="/" className="navbar-brand fw-bold text-primary">
            <FaComments className="me-2" />
            FixHub
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  <FaUserPlus className="me-1" /> Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  <FaSignInAlt className="me-1" /> Login
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </nav>

      <Container className="flex-grow-1 py-5">
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0">
            <h1 className="display-4 fw-bold text-primary mb-3">Empower Your Voice</h1>
            <p className="lead mb-4">
              Our Complaint Management Solution helps you raise concerns, track progress, and achieve resolutions efficiently.
            </p>
            <Link to="/Login">
              <Button variant="primary" size="lg" className="rounded-pill">
                Register a Complaint <FaArrowRight className="ms-2" />
              </Button>
            </Link>
          </Col>
          <Col lg={6}>
            <div className="position-relative">
              <img
                src="https://www.slnsoftwares.com/images/benefit-complaint-system.webp"
                alt="FixHub Features"
                className="img-fluid rounded shadow-lg"
              />
            </div>
          </Col>
        </Row>
      </Container>

     <FooterC/>
    </div>
  )
}