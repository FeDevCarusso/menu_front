import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <div style={{ minHeight: "42vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "1" }}>
      </div>
      <div style={{ flexShrink: "0" }}>
        <Container fluid className="bg-dark text-light text-center p-3">
          BasilOrien ®
        </Container>
      </div>
    </div>
  );
};

export default Footer;
