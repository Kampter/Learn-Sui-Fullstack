import { Box, Text, Link } from "@radix-ui/themes";

const Footer = () => {
  return (
    <Box as="footer" style={{ borderTop: "1px solid #333", padding: "16px 0", backgroundColor: "#1e1e1e" }}>
      <Text align="center" size="2" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px", color: "#ccc" }}>
        &copy; 2025 <Link href="https://github.com/Kampter" target="_blank" style={{ color: "#0070f3", textDecoration: "none" }}>Kampter</Link>. All rights reserved.
      </Text>
    </Box>
  );
}

export default Footer;