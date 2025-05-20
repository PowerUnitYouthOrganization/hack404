import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Img,
  Text,
  Link,
  Hr,
} from "@react-email/components";

export default function WaitlistEmail() {
  return (
    <Html lang="en">
      <Head>
        <title>Hack404 - Hacker Applications Opening Soon!</title>
        <style dangerouslySetInnerHTML={{ __html: `
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
          
          body, html {
            margin: 0;
            padding: 0;
            font-family: 'DM Sans', Arial, sans-serif;
            font-weight: 300;
            line-height: 1.2;
            color: #ffffff;
            background-color: #0e1116;
          }
          
          * {
            box-sizing: border-box;
          }
          
          .email-container {
            max-width: 620px;
            margin: 0 auto;
            background-color: #0e1116;
            position: relative;
          }
          
          .vertical-line-left {
            position: absolute;
            top: 100px;
            bottom: 0;
            left: 36px;
            width: 0.5px;
            background: rgba(48, 242, 242, 0.20);
          }
          
          .vertical-line-right {
            position: absolute;
            top: 100px;
            bottom: 0;
            right: 36px;
            width: 0.5px;
            background: rgba(48, 242, 242, 0.20);
          }
          
          .header {
            height: 100px;
            background-image: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gradient-CKqj6b1iXKPJKdMeqiSCuMLT0IR4LJ.png');
            background-size: cover;
            background-position: center;
            padding: 0 36px;
          }
          
          .header-table {
            width: 100%;
            height: 100px;
          }
          
          .logo-cell {
            width: 50%;
            text-align: left;
            vertical-align: middle;
          }
          
          .date-cell {
            width: 50%;
            text-align: right;
            vertical-align: middle;
            font-family: 'FH Lecturis', 'DM Sans', Arial, sans-serif;
            font-weight: 300;
            font-size: 20px;
            line-height: 100%;
            color: #ffffff;
            white-space: nowrap;
          }
          
          .logo img {
            width: 135px;
            height: 21px;
          }
          
          .main-content {
            padding: 0 36px;
            background-color: #0e1116;
          }
          
          .heading-container {
            margin-top: 64px;
            margin-bottom: 48px;
          }
          
          h1 {
            font-family: 'FH Lecturis', 'DM Sans', Arial, sans-serif;
            font-weight: normal;
            font-size: 40px;
            line-height: 100%;
            letter-spacing: -1.6px;
            margin: 0;
            color: #ffffff;
          }
          
          .greeting {
            font-family: 'DM Sans', Arial, sans-serif;
            font-weight: 300;
            font-size: 24px;
            line-height: 120%;
            color: #30f2f2;
            margin-bottom: 30px;
          }
          
          p {
            font-family: 'DM Sans', Arial, sans-serif;
            font-weight: 300;
            font-size: 24px;
            line-height: 120%;
            margin: 0 0 24px 0;
            color: #30f2f2;
          }
          
          .white-text {
            color: #ffffff;
            font-weight: 400;
          }
          
          .social-section {
            margin-top: 64px;
            margin-bottom: 64px;
            border-radius: 12px;
            background: linear-gradient(270deg, rgba(94, 74, 227, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), 
                        linear-gradient(139deg, rgba(94, 74, 227, 0.20) 2.48%, rgba(93, 79, 227, 0.20) 2.48%, 
                        rgba(48, 242, 242, 0.20) 81.39%, rgba(195, 247, 58, 0.20) 126.28%);
            border: 1px solid rgba(48, 242, 242, 0.10);
            padding: 36px;
          }
          
          .social-table {
            width: 100%;
            height: 54px;
          }
          
          .social-left {
            width: 50%;
            text-align: left;
            vertical-align: middle;
          }
          
          .social-right {
            width: 50%;
            text-align: right;
            vertical-align: middle;
            padding-right: 0;
          }
          
          .social-text-container {
            display: inline-block;
          }
          
          .social-heading {
            font-family: 'FH Lecturis', 'DM Sans', Arial, sans-serif;
            font-weight: 300;
            font-size: 20px;
            line-height: 100%;
            letter-spacing: -0.6px;
            margin: 0 0 4px 0;
            color: #ffffff;
          }
          
          .social-handle {
            font-family: 'FH Lecturis', 'DM Sans', Arial, sans-serif;
            font-weight: 300;
            font-size: 36px;
            line-height: 100%;
            letter-spacing: -1.08px;
            margin: 0;
            color: #ffffff;
          }
          
          .instagram-button {
            display: inline-block;
            position: relative;
            width: 161px;
            height: 54px;
          }
          
          .instagram-button-svg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          
          .instagram-button-link {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-decoration: none;
            color: #000;
            padding: 0 24px 0 24px;
            font-family: 'DM Sans', Arial, sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: 100%;
            letter-spacing: -0.48px;
          }
          
          .footer {
            padding: 0 0 32px;
          }
          
          .footer-gradient {
            height: 2px;
            background-image: linear-gradient(to right, #3023AE, #53A0FD, #6DFD9C);
            margin-bottom: 32px;
            width: 100%;
          }
          
          .footer-content {
            padding: 0 36px;
          }
          
          .footer-table {
            width: 100%;
          }
          
          .footer-left {
            width: 33.33%;
            text-align: left;
            vertical-align: middle;
          }
          
          .footer-center {
            width: 33.33%;
            text-align: center;
            vertical-align: middle;
          }
          
          .footer-right {
            width: 33.33%;
            text-align: right;
            vertical-align: middle;
          }
          
          .footer-logo img {
            max-height: 40px;
            width: auto;
          }
          
          .footer-text {
            font-family: 'FH Lecturis', 'DM Sans', Arial, sans-serif;
            font-weight: 300;
            font-size: 20px;
            letter-spacing: -0.6px;
            color: #30f2f2;
            text-decoration: none;
          }
          
          a {
            color: #30f2f2;
            text-decoration: underline;
          }
          
          @media screen and (max-width: 620px) {
            .header {
              padding: 0 24px;
            }
            
            .main-content {
              padding-left: 24px;
              padding-right: 24px;
            }
            
            .footer-content {
              padding-left: 24px;
              padding-right: 24px;
            }
            
            .vertical-line-left {
              left: 24px;
            }
            
            .vertical-line-right {
              right: 24px;
            }
            
            .heading-container {
              margin-top: 40px;
              margin-bottom: 32px;
            }
            
            .logo img {
              width: 120px;
              height: auto;
            }
            
            .date-cell {
              font-size: 16px;
            }
            
            h1 {
              font-size: 32px;
            }
            
            .greeting {
              font-size: 20px;
            }
            
            p {
              font-size: 20px;
            }
            
            .social-section {
              margin-top: 40px;
              margin-bottom: 40px;
              padding: 24px;
            }
            
            .social-heading {
              font-size: 18px;
            }
            
            .social-handle {
              font-size: 28px;
            }
            
            .social-left, .social-right {
              display: block;
              width: 100%;
            }
            
            .social-right {
              text-align: left;
              margin-top: 16px;
            }
            
            .footer-left, .footer-center, .footer-right {
              display: block;
              width: 100%;
              text-align: center;
              margin-bottom: 16px;
            }
          }
        ` }} />
      </Head>
      <Body style={{ 
        margin: 0,
        padding: 0,
        fontFamily: "'DM Sans', Arial, sans-serif",
        fontWeight: 300,
        lineHeight: 1.2,
        color: "#ffffff",
        backgroundColor: "#0e1116"
      }}>
        <Container className="email-container" style={{ 
          maxWidth: "620px",
          margin: "0 auto",
          backgroundColor: "#0e1116",
          position: "relative"
        }}>
          {/* Vertical lines */}
          <div className="vertical-line-left"></div>
          <div className="vertical-line-right"></div>
          
          {/* Header with gradient background */}
          <Section className="header" style={{
            height: "100px",
            backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gradient-CKqj6b1iXKPJKdMeqiSCuMLT0IR4LJ.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "0 36px"
          }}>
            <Row style={{ height: "100px" }}>
              <Column style={{ width: "50%", textAlign: "left", verticalAlign: "middle" }}>
                <Img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/whitefull-0TRiUOfPxYtvWZSfP5Sd3hwGMpB6xA.png" 
                  alt="hack404 Logo" 
                  width="135" 
                  height="21" 
                />
              </Column>
              <Column style={{ 
                width: "50%", 
                textAlign: "right", 
                verticalAlign: "middle",
                fontFamily: "'FH Lecturis', 'DM Sans', Arial, sans-serif",
                fontWeight: 300,
                fontSize: "20px",
                lineHeight: "100%",
                color: "#ffffff",
                whiteSpace: "nowrap"
              }}>
                July 4 - 6 2025, Toronto Ontario
              </Column>
            </Row>
          </Section>
          
          {/* Main content */}
          <Section className="main-content" style={{ padding: "0 36px", backgroundColor: "#0e1116" }}>
            <div className="heading-container" style={{ marginTop: "64px", marginBottom: "48px" }}>
              <Text style={{
                fontFamily: "'FH Lecturis', 'DM Sans', Arial, sans-serif",
                fontWeight: "normal",
                fontSize: "40px",
                lineHeight: "100%",
                letterSpacing: "-1.6px",
                margin: 0,
                color: "#ffffff"
              }}>
                Hacker applications<br />opening soon!
              </Text>
            </div>
            
            <Text className="greeting" style={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              fontWeight: 300,
              fontSize: "24px",
              lineHeight: "120%",
              color: "#30f2f2",
              marginBottom: "30px"
            }}>
              Hey there 👋
            </Text>
            
            <Text style={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              fontWeight: 300,
              fontSize: "24px",
              lineHeight: "120%",
              margin: "0 0 24px 0",
              color: "#30f2f2"
            }}>
              Thank you for signing up for Hack404's information list!
            </Text>
            
            <Text style={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              fontWeight: 300,
              fontSize: "24px",
              lineHeight: "120%",
              margin: "0 0 24px 0",
              color: "#30f2f2"
            }}>
              We're excited for our first iteration happening this July 4-6. Stay tuned - <span style={{ color: "#ffffff", fontWeight: 400 }}>hacker applications will open shortly.</span>
            </Text>
            
            <Text style={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              fontWeight: 300,
              fontSize: "24px",
              lineHeight: "120%",
              margin: "0 0 24px 0",
              color: "#30f2f2"
            }}>
              In the meantime, tell your friends to sign up and check out our Instagram - <Link href="https://instagram.com/hack404.dev" style={{ color: "#30f2f2", textDecoration: "underline" }}>@hack404.dev</Link>.
            </Text>
            
            <Text style={{
              fontFamily: "'DM Sans', Arial, sans-serif",
              fontWeight: 300,
              fontSize: "24px",
              lineHeight: "120%",
              margin: "0 0 24px 0",
              color: "#30f2f2"
            }}>
              Sincerely,<br />The Hack404 Team
            </Text>
            
            {/* Social section */}
            <Section className="social-section" style={{
              marginTop: "64px",
              marginBottom: "64px",
              borderRadius: "12px",
              background: "linear-gradient(270deg, rgba(94, 74, 227, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(139deg, rgba(94, 74, 227, 0.20) 2.48%, rgba(93, 79, 227, 0.20) 2.48%, rgba(48, 242, 242, 0.20) 81.39%, rgba(195, 247, 58, 0.20) 126.28%)",
              border: "1px solid rgba(48, 242, 242, 0.10)",
              padding: "36px"
            }}>
              <Row style={{ height: "54px" }}>
                <Column style={{ width: "50%", textAlign: "left", verticalAlign: "middle" }}>
                  <div style={{ display: "inline-block" }}>
                    <Text style={{
                      fontFamily: "'FH Lecturis', 'DM Sans', Arial, sans-serif",
                      fontWeight: 300,
                      fontSize: "20px",
                      lineHeight: "100%",
                      letterSpacing: "-0.6px",
                      margin: "0 0 4px 0",
                      color: "#ffffff"
                    }}>
                      Follow
                    </Text>
                    <Text style={{
                      fontFamily: "'FH Lecturis', 'DM Sans', Arial, sans-serif",
                      fontWeight: 300,
                      fontSize: "36px",
                      lineHeight: "100%",
                      letterSpacing: "-1.08px",
                      margin: 0,
                      color: "#ffffff",
                      textDecoration: "none"
                    }}>
                      @hack404.dev
                    </Text>
                  </div>
                </Column>
                <Column style={{ width: "50%", textAlign: "right", verticalAlign: "middle", paddingRight: 0 }}>
                  <div style={{ display: "inline-block", position: "relative", width: "161px", height: "54px" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="161" height="54" viewBox="0 0 161 54" fill="none" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                      <path d="M161 38.497C161 39.5579 160.579 40.5753 159.828 41.3254L148.325 52.8284C147.575 53.5786 146.558 54 145.497 54H4.5C2.29087 54 0.5 52.2091 0.5 50V4C0.5 1.79086 2.29086 0 4.5 0H157C159.209 0 161 1.79086 161 4V38.497Z" fill="white"/>
                    </svg>
                    <Link href="https://instagram.com/hack404.dev" style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textDecoration: "none",
                      color: "#000",
                      padding: "0 24px 0 24px",
                      fontFamily: "'DM Sans', Arial, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "100%",
                      letterSpacing: "-0.48px"
                    }}>
                      Instagram
                      <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="arrow_forward">
                          <mask id="mask0_1_130" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="18">
                            <rect id="Bounding box" y="0.692322" width="16.6154" height="16.6154" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_1_130)">
                            <path id="arrow_forward_2" d="M11.1981 9.69232H2.76929V8.3077H11.1981L7.32121 4.43078L8.30775 3.46155L13.8462 9.00001L8.30775 14.5385L7.32121 13.5692L11.1981 9.69232Z" fill="#1C1B1F"/>
                          </g>
                        </g>
                      </svg>
                    </Link>
                  </div>
                </Column>
              </Row>
            </Section>
          </Section>
          
          {/* Footer */}
          <Section className="footer" style={{ padding: "0 0 32px" }}>
            <div className="footer-gradient" style={{
              height: "2px",
              backgroundImage: "linear-gradient(to right, #3023AE, #53A0FD, #6DFD9C)",
              marginBottom: "32px",
              width: "100%"
            }}></div>
            
            <div className="footer-content" style={{ padding: "0 36px" }}>
              <Row>
                <Column style={{ width: "33.33%", textAlign: "left", verticalAlign: "middle" }}>
                  <Img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PUYO%20Logo-jCW5IINcDKxVsB5Sx0XNmev4XawyxW.png" 
                    alt="Power Unit Youth Organization" 
                    style={{ height: "40px", width: "auto", display: "inline-block" }}
                  />
                </Column>
                <Column style={{ width: "33.33%", textAlign: "center", verticalAlign: "middle" }}>
                  <Link href="https://hack404.dev" style={{
                    fontFamily: "'FH Lecturis', 'DM Sans', Arial, sans-serif",
                    fontWeight: 300,
                    fontSize: "20px",
                    letterSpacing: "-0.6px",
                    textDecoration: "none",
                    color: "#30f2f2",
                    display: "inline-block",
                    margin: "0 auto"
                  }}>
                    hack404.dev
                  </Link>
                </Column>
                <Column style={{ width: "33.33%", textAlign: "right", verticalAlign: "middle" }}>
                  <Img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Colour%20Logo%20Clear.png-rxDX3o8b4wAZ9PbarkfCLjOcIsSSnP.jpeg" 
                    alt="hack404 Logo" 
                    style={{ height: "40px", width: "auto", display: "inline-block", marginLeft: "auto" }}
                  />
                </Column>
              </Row>
            </div>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}