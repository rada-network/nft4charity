// prettier-ignore
export const verifyMail = `
  <!DOCTYPE html>
  <html>

  <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <style type="text/css">
          @media screen {
              @font-face {
                  font-family: 'Lato';
                  font-style: normal;
                  font-weight: 400;
                  src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
              }

              @font-face {
                  font-family: 'Lato';
                  font-style: normal;
                  font-weight: 700;
                  src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
              }

              @font-face {
                  font-family: 'Lato';
                  font-style: italic;
                  font-weight: 400;
                  src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
              }

              @font-face {
                  font-family: 'Lato';
                  font-style: italic;
                  font-weight: 700;
                  src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
              }
          }

          /* CLIENT-SPECIFIC STYLES */
          body,
          table,
          td,
          a {
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
          }

          table,
          td {
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
          }

          img {
              -ms-interpolation-mode: bicubic;
          }

          /* RESET STYLES */
          img {
              border: 0;
              height: auto;
              line-height: 100%;
              outline: none;
              text-decoration: none;
          }

          table {
              border-collapse: collapse !important;
          }

          body {
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
          }

          /* iOS BLUE LINKS */
          a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: none !important;
              font-size: inherit !important;
              font-family: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
          }

          /* MOBILE STYLES */
          @media screen and (max-width:600px) {
              h1 {
                  font-size: 32px !important;
                  line-height: 32px !important;
              }
          }

          /* ANDROID CENTER FIX */
          div[style*="margin: 16px 0;"] {
              margin: 0 !important;
          }
      </style>
  </head>

  <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <!-- LOGO -->
          <tr>
              <td bgcolor="#f4f4f4" align="center">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td bgcolor="#ffffff" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400;">
                              <a href="--ProjectLink--" target="_blank">
                                <img alt="--ProjectName--" title="--ProjectName--" src="--ProjectLogo--" width="170" style="font-size: 15px;"/>
                              </a>
                              <h1 style="font-size: 30px; font-weight: 400; margin: 2;">
                                Hey --PersonName-- 👋,<br />Thanks for joining
                                  <b>--ProjectName--</b>!<br />Let\'s confirm your
                                  email address.
                              </h1> 
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;">By clicking on the following link, you are confirming your email address.</p>
                          </td>
                      </tr>
                      <tr>
                          <td bgcolor="#ffffff" align="left">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                      <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                          <table border="0" cellspacing="0" cellpadding="0">
                                              <tr>
                                                  <td align="center" style="border-radius: 3px;" bgcolor="--ProjectColor--"><a href="--ButtonLink--" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid --ProjectColor--; display: inline-block;">Confirm Account</a></td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr> <!-- COPY -->
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;">If you have any questions, just reply to this email — we're always happy to help out.</p>
                          </td>
                      </tr>
                      <tr>
                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                              <p style="margin: 0;">Cheers,<br>--ProjectName-- Team.</p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
          <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td bgcolor="#FFFFFF" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <span
                          style="float: none; display: block; text-align: center">
                            <a
                              href="--ProjectLink--"
                              style="
                                box-sizing: border-box;
                                color: --ProjectColor--;
                                font-weight: 400;
                                text-decoration: none;
                                font-size: 12px;
                              "
                              target="_blank"
                              ><img
                                alt="--ProjectName--"
                                title="--ProjectName--"
                                src="--ProjectLogo--"
                                width="100" /></a
                          ></span>
                          <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help? Contact us.</h2>
                          <p
                            style="
                              color: #294661;
                              font-family: \'Open Sans\',\'Helvetica Neue\',\'Helvetica\',Helvetica,Arial,sans-serif;
                              font-size: 12px;
                              font-weight: 400;
                              margin-bottom: 5px;
                              margin: 10px 0 20px;
                            "
                          >
                            --ProjectSlogan--
                          </p>
                          <p
                            style="
                              margin: 0;
                              color: #294661;
                              font-family: \'Open Sans\',\'Helvetica Neue\',\'Helvetica\',Helvetica,Arial,sans-serif;
                              font-weight: 300;
                              font-size: 12px;
                              margin-bottom: 5px;
                            "
                          >
                            © --ProjectName-- --ProjectAddress--
                          </p>
                          <p
                            style="
                              margin: 0;
                              color: #294661;
                              font-family: \'Open Sans\',\'Helvetica Neue\',\'Helvetica\',Helvetica,Arial,sans-serif;
                              font-weight: 300;
                              font-size: 12px;
                              margin-bottom: 5px;
                            "
                          >
                            --Socials--
                          </p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>

  </html>
`;
