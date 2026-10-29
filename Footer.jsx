function Footer() {
  return (
    <footer id="footer" className="py-2 var-font text-center"
              style={{
                "--font": "var(--inter)",
                "--font-size": "14px",
                "--font-weight": "400",
                "color": "black"
              }}>
        @2026 CLAW. All rights reserved.<span className="ms-5"></span> Website by <a href="https://github.com/Nell-JvR-251061" target="_blank" rel="noopener noreferrer" style={{"color": "black"}}>Néll Janse van Rensburg.</a>
    </footer>
  );
}

export default Footer;
