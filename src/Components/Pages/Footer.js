import React from 'react';
import { MDBFooter, MDBContainer, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <MDBFooter bgColor="dark" className="text-white text-center text-lg-left d-flex flex-column ">
      <MDBContainer className="p-4">
        <MDBRow className="justify-content-between align-items-start">
          <MDBCol lg="6" md="12" className="mb-4 mb-md-0 order-1 order-md-0">
            <h5 className="text-uppercase">Footer Content</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam, est atque cumque eum delectus sint!
            </p>
          </MDBCol>

          <MDBCol lg="3" md="6" className="mb-4 mb-md-0 order-0 order-md-1">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              {[1, 2, 3, 4].map((num) => (
                <li key={num}>
                  <Link to="#!" className="text-white">
                    Link {num}
                  </Link>
                </li>
              ))}
            </ul>
          </MDBCol>

          <MDBCol lg="3" md="6" className="mb-4 mb-md-0 order-2">
            <h5 className="text-uppercase mb-0">Links</h5>
            <ul className="list-unstyled">
              {[5, 6, 7, 8].map((num) => (
                <li key={num}>
                  <Link to="#!" className="text-white">
                    Link {num}
                  </Link>
                </li>
              ))}
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className="text-center p-3 md-3 fixed-bottom" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()}{' '}
        <Link to="/" className="text-white">
          Triveous
        </Link>
      </div>
    </MDBFooter>
  );
}
