import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { CSSProperties } from "react";

interface LaunchpadLoginEmailProps {
  username?: string;
  loginLink?: string;
  expiresInMinutes?: number;
}

const customCSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&display=swap');
  @font-face {
      font-family: 'FH Lecturis';
      src: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FHLecturisRounded-Regular-4o0BAsoghq9sl7B7UXJRfPpapMub52.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
  }
  @font-face {
      font-family: 'FH Lecturis';
      src: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FHLecturisRounded-Bold-nSd4K1kDP1OIxsJGfKkX5PS0YBjNtX.woff2') format('woff2');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
  }
  @font-face {
      font-family: 'FH Lecturis';
      src: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FHLecturisRounded-Light-K2n9opf6PfzRcFavmZglLxCumrtEli.woff2') format('woff2');
      font-weight: 300;
      font-style: normal;
      font-display: swap;
  }
`;

const styles = {
  body: {
    margin: "0",
    padding: "0",
    fontFamily: "'DM Sans', Arial, sans-serif",
    fontWeight: "300",
    lineHeight: "1.2",
    color: "#ffffff",
    backgroundColor: "#0e1116",
  } as CSSProperties,
  emailContainer: {
    maxWidth: "620px",
    margin: "0 auto",
    backgroundColor: "#0e1116",
    position: "relative",
  } as CSSProperties,
  verticalLineLeft: {
    position: "absolute",
    top: "100px",
    bottom: "0",
    left: "36px",
    width: "1px",
    background: "rgba(48, 242, 242, 0.20)",
  } as CSSProperties,
  verticalLineRight: {
    position: "absolute",
    top: "100px",
    bottom: "0",
    right: "36px",
    width: "1px",
    background: "rgba(48, 242, 242, 0.20)",
  } as CSSProperties,
  header: {
    height: "100px",
    backgroundImage:
      "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gradient-CKqj6b1iXKPJKdMeqiSCuMLT0IR4LJ.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "0 36px",
  } as CSSProperties,
  headerTable: {
    width: "100%",
    height: "100px",
  } as CSSProperties,
  logoCell: {
    width: "50%",
    textAlign: "left",
    verticalAlign: "middle",
  } as CSSProperties,
  dateCell: {
    width: "50%",
    textAlign: "right",
    verticalAlign: "middle",
    fontFamily: "'FH Lecturis', 'DM Sans', Arial, sans-serif",
    fontWeight: "300",
    fontSize: "20px",
    lineHeight: "100%",
    color: "#ffffff",
    whiteSpace: "nowrap",
  } as CSSProperties,
  mainContent: {
    padding: "0 36px",
    backgroundColor: "#0e1116",
  } as CSSProperties,
  headingContainer: {
    marginTop: "64px",
    marginBottom: "48px",
  } as CSSProperties,
  heading: {
    fontFamily: "'FH Lecturis', 'DM Sans', Arial, sans-serif",
    fontWeight: "normal",
    fontSize: "40px",
    lineHeight: "100%",
    letterSpacing: "-1.6px",
    margin: "0",
    color: "#ffffff",
  } as CSSProperties,
  greeting: {
    fontFamily: "'DM Sans', Arial, sans-serif",
    fontWeight: "300",
    fontSize: "22px", // match cyan text size
    lineHeight: "140%",
    color: "#30f2f2",
    marginBottom: "32px",
    marginTop: "24px",
  } as CSSProperties,
  paragraph: {
    fontFamily: "'DM Sans', Arial, sans-serif",
    fontWeight: "300",
    fontSize: "22px", // match cyan text size
    lineHeight: "140%",
    margin: "0 0 32px 0",
    color: "#30f2f2",
  } as CSSProperties,
  buttonRow: {
    margin: "32px 0",
    display: "flex",
    justifyContent: "center",
    padding: 0,
  } as CSSProperties,
  buttonContainer: {
    borderRadius: "12px",
    border: "1px solid rgba(48, 242, 242, 0.10)",
    background:
      "linear-gradient(270deg, rgba(94, 74, 227, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(139deg, rgba(94, 74, 227, 0.20) 2.48%, rgba(93, 79, 227, 0.20) 2.48%, rgba(48, 242, 242, 0.20) 81.39%, rgba(195, 247, 58, 0.20) 126.28%)",
    padding: "0",
    display: "flex",
    alignItems: "center",
    width: "100%", // full width
    maxWidth: "none", // remove max width
    margin: "0", // remove auto margin
    boxSizing: "border-box",
  } as CSSProperties,
  buttonText: {
    color: "#fff",
    fontFamily: "'DM Sans', Arial, sans-serif",
    fontSize: "22px",
    fontWeight: "400",
    padding: "32px 0 32px 32px",
    flex: 1,
  } as CSSProperties,
  loginButton: {
    background: "#CFFF4A",
    color: "#0e1116",
    borderRadius: "32px",
    fontFamily: "'DM Sans', Arial, sans-serif",
    fontWeight: "400",
    fontSize: "20px",
    padding: "16px 32px",
    margin: "16px",
    border: "none",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
  } as CSSProperties,
  expires: {
    color: "#30f2f2",
    fontFamily: "'DM Sans', Arial, sans-serif",
    fontSize: "22px", // match cyan text size
    margin: "40px 0 0 0",
  } as CSSProperties,
  footer: {
    padding: "0 0 32px",
  } as CSSProperties,
  footerGradient: {
    height: "2px",
    backgroundImage: "linear-gradient(to right, #3023AE, #53A0FD, #6DFD9C)",
    marginBottom: "32px",
    width: "100%",
  } as CSSProperties,
  footerContent: {
    padding: "0 36px",
  } as CSSProperties,
  footerLeft: {
    width: "33.33%",
    textAlign: "left",
    verticalAlign: "middle",
  } as CSSProperties,
  footerCenter: {
    width: "33.33%",
    textAlign: "center",
    verticalAlign: "middle",
  } as CSSProperties,
  footerRight: {
    width: "33.33%",
    textAlign: "right",
    verticalAlign: "middle",
  } as CSSProperties,
  footerLogo: {
    maxHeight: "40px",
    width: "auto",
    display: "inline-block",
  } as CSSProperties,
  footerText: {
    fontFamily: "'FH Lecturis', 'DM Sans', Arial, sans-serif",
    fontWeight: "300",
    fontSize: "20px",
    letterSpacing: "-0.6px",
    color: "#30f2f2",
    textDecoration: "none",
  } as CSSProperties,
};

export const LaunchpadLoginEmail = ({
  username = "there",
  loginLink = "https://hack404.dev/login",
  expiresInMinutes = 404,
}: LaunchpadLoginEmailProps) => {
  const previewText = "Ready to see your launchpad?";
  return (
    <Html>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: customCSS }} />
      </Head>
      <Preview>{previewText}</Preview>
      <Body style={styles.body}>
        <Container style={styles.emailContainer}>
          <div style={styles.verticalLineLeft}></div>
          <div style={styles.verticalLineRight}></div>
          <Section style={styles.header}>
            <Row style={styles.headerTable}>
              <Column style={styles.logoCell}>
                <Img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/whitefull-0TRiUOfPxYtvWZSfP5Sd3hwGMpB6xA.png"
                  width="135"
                  height="21"
                  alt="hack404 Logo"
                />
              </Column>
              <Column style={styles.dateCell}>
                July 4 – 6, 2025 | Toronto, Ontario
              </Column>
            </Row>
          </Section>
          <Section style={styles.mainContent}>
            <div style={styles.headingContainer}>
              <Text style={styles.heading}>
                Ready to see your
                <br />
                launchpad?
              </Text>
            </div>
            <Text style={styles.greeting}>
              Hey {username}{" "}
              <span role="img" aria-label="wave">
                👋
              </span>
            </Text>
            <Text style={styles.paragraph}>
              Thank you for creating a Hack404 account!
            </Text>
            <Text style={styles.paragraph}>
              Click the button below to login and start your application.
            </Text>
            <div style={styles.buttonRow}>
              <div style={styles.buttonContainer}>
                <span style={styles.buttonText}>Access your account</span>
                <a
                  href={loginLink}
                  style={{
                    ...styles.loginButton,
                    fontFamily: "'DM Sans', Arial, sans-serif",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Log In
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ marginLeft: "8px" }}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 5L20 12L13 19"
                      stroke="#0e1116"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 12H4"
                      stroke="#0e1116"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <Text style={styles.expires}>
              This button will expire in {expiresInMinutes} minutes.
            </Text>
            <Text style={styles.paragraph}>
              Sincerely,
              <br />
              The Hack404 Team
            </Text>
          </Section>
          <Section style={styles.footer}>
            <div style={styles.footerGradient}></div>
            <div style={styles.footerContent}>
              <Row>
                <Column style={styles.footerLeft}>
                  <Img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PUYO%20Logo-jCW5IINcDKxVsB5Sx0XNmev4XawyxW.png"
                    alt="Power Unit Youth Organization"
                    style={styles.footerLogo}
                  />
                </Column>
                <Column style={styles.footerCenter}>
                  <Link href="https://hack404.dev" style={styles.footerText}>
                    hack404.dev
                  </Link>
                </Column>
                <Column style={styles.footerRight}>
                  <Img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Colour%20Logo%20Clear.png-rxDX3o8b4wAZ9PbarkfCLjOcIsSSnP.jpeg"
                    alt="hack404 Logo"
                    style={styles.footerLogo}
                  />
                </Column>
              </Row>
            </div>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

LaunchpadLoginEmail.PreviewProps = {
  username: "there",
  loginLink: "https://hack404.dev/login",
  expiresInMinutes: 404,
} as LaunchpadLoginEmailProps;

export default LaunchpadLoginEmail;
