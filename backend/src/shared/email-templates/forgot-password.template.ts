export const FORGOT_PASSWORD_TEMPLATE =
    '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '  <head>\n' +
    '    <meta charset="UTF-8" />\n' +
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
    '    <meta http-equiv="X-UA-Compatible" content="ie=edge" />\n' +
    '    <title>Static Template</title>\n' +
    '\n' +
    '    <link\n' +
    '      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"\n' +
    '      rel="stylesheet"\n' +
    '    />\n' +
    '  </head>\n' +
    '  <body\n' +
    '    style="\n' +
    '      margin: 0;\n' +
    "      font-family: 'Poppins', sans-serif;\n" +
    '      background: #ffffff;\n' +
    '      font-size: 14px;\n' +
    '    "\n' +
    '  >\n' +
    '    <div\n' +
    '      style="\n' +
    '        max-width: 680px;\n' +
    '        margin: 0 auto;\n' +
    '        padding: 45px 30px 60px;\n' +
    '        background: #f4f7ff;\n' +
    '        background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);\n' +
    '        background-repeat: no-repeat;\n' +
    '        background-size: 800px 452px;\n' +
    '        background-position: top center;\n' +
    '        font-size: 14px;\n' +
    '        color: #434343;\n' +
    '      "\n' +
    '    >\n' +
    '      <header>\n' +
    '        <table style="width: 100%;">\n' +
    '          <tbody>\n' +
    '            <tr style="height: 0;">\n' +
    '              <td>\n' +
    // '                <img\n' +
    // '                  alt=""\n' +
    // '                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEiIGhlaWdodD0iNDIiIHZpZXdCb3g9IjAgMCA1MSA0MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI1LjcyOSAxMy44ODQ4SDIwLjU2NDhDMTYuODk3OSAxMy44ODQ4IDEzLjkwMzMgMTcuMDg3NCAxMy45MDMzIDIwLjk4NUMxMy45MDMzIDI0LjkxMjggMTYuODk3OSAyOC4wODUyIDIwLjU2NDggMjguMDg1MkgyMy42MjA2QzI0LjE3MDYgMjguMDg1MiAyNC42MjkgMjcuNjkyNCAyNC43NTEyIDI3LjE0ODZMMjYuODU5NyAxNS4xODRDMjYuOTgxOSAxNC41MTkzIDI2LjQzMTkgMTMuODg0OCAyNS43MjkgMTMuODg0OFoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8yNDNfNTEwMSkiLz4KPHBhdGggZD0iTTI4LjA4MjIgMC41SDIxLjA1NEM5LjY1NjA0IDAuNSAwLjE1MjY4IDkuNDczNDcgLTAuMDAwMTA3MDEgMjAuNzEzQy0wLjE1Mjg5NCAzMi4xNjQgOS4xOTc2OCA0MS40Njk4IDIwLjcxNzggNDEuNDY5OEgyMS4yNjc5QzIxLjgxNzkgNDEuNDY5OCAyMi4yNzYzIDQxLjA3NyAyMi4zOTg1IDQwLjUzMzJMMjMuMjU0MSAzNS42Mzg1QzIzLjM3NjMgMzQuOTQzNiAyMi44MjYzIDM0LjMzOTQgMjIuMTIzNSAzNC4zMzk0SDIwLjU2NUMxMy4zODQgMzQuMzM5NCA3LjU3ODEzIDI4LjM1NyA3LjU3ODEzIDIwLjk1NDdDNy41NzgxMyAxMy41NTIzIDEzLjM4NCA3LjU3MDAxIDIwLjU2NSA3LjU3MDAxSDI3LjIyNjZDMjcuNzc2NiA3LjU3MDAxIDI4LjIzNSA3LjE3NzIzIDI4LjM1NzIgNi42MzMzOEwyOS4yMTI4IDEuNzM4NzZDMjkuMzM1IDEuMTM0NDkgMjguNzg1IDAuNSAyOC4wODIyIDAuNVoiIGZpbGw9InVybCgjcGFpbnQxX2xpbmVhcl8yNDNfNTEwMSkiLz4KPHBhdGggZD0iTTUxLjAwMDIgMjAuOTg0NUM1MS4wMDAyIDI4LjM4NjkgNDUuMTYzNyAzNC4zNjkyIDM4LjAxMzMgMzQuMzY5MkgzMy45Nzk3QzMzLjM5OTEgMzQuMzY5MiAzMi45NDA3IDM0Ljc5MjIgMzIuODQ5MSAzNS4zMzZMMzIuMTE1NyA0MC41MzI4QzMyLjAyNCA0MS4wNzY2IDMxLjU2NTcgNDEuNDk5NiAzMC45ODUxIDQxLjQ5OTZIMjYuMzQwM0MyNS42Mzc1IDQxLjQ5OTYgMjUuMTE4IDQwLjg2NTEgMjUuMjA5NyA0MC4yMDA0TDI2LjIxODEgMzQuMzk5NEwyNy4xNjU0IDI5LjA1MTZDMjcuMjU3MSAyOC41MDc3IDI3Ljc0NiAyOC4xMTUgMjguMjk2IDI4LjExNUgzNy45ODI3QzQxLjY0OTYgMjguMTE1IDQ0LjY0NDIgMjQuOTQyNSA0NC42NDQyIDIxLjAxNDdDNDQuNjQ0MiAxNy4wODY5IDQxLjY0OTYgMTMuOTE0NSAzNy45ODI3IDEzLjkxNDVIMzEuMTY4NEMzMC40NjU2IDEzLjkxNDUgMjkuOTQ2MSAxMy4yOCAzMC4wMzc4IDEyLjYxNTNMMzAuNzQwNiA4LjU5Njg5QzMwLjgzMjMgOC4wNTMwNSAzMS4zMjEyIDcuNjYwMjcgMzEuODcxMiA3LjY2MDI3SDM3Ljk1MjJDNDUuMTYzNyA3LjYzMDA2IDUxLjAwMDIgMTMuNjEyNCA1MS4wMDAyIDIwLjk4NDVaIiBmaWxsPSJ1cmwoI3BhaW50Ml9saW5lYXJfMjQzXzUxMDEpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMjQzXzUxMDEiIHgxPSIyMC4zOSIgeTE9IjEzLjg4NDgiIHgyPSIyMC4zOSIgeTI9IjI4LjA4NTIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzRFQUVGRCIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDhDRkYiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDFfbGluZWFyXzI0M181MTAxIiB4MT0iMTQuNjE0IiB5MT0iMC41IiB4Mj0iMTQuNjE0IiB5Mj0iNDEuNDY5OCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjNEVBRUZEIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwOENGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50Ml9saW5lYXJfMjQzXzUxMDEiIHgxPSIzOC4wOTk3IiB5MT0iNy42NjAxNiIgeDI9IjM4LjA5OTciIHkyPSI0MS40OTk2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiM0RUFFRkQiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDA4Q0ZGIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg=="\n' +
    // '                  height="30px"\n' +
    // '                  ,\n' +
    // '                  style="margin-right: 10px;"\n' +
    // '                />\n' +
    '                <img\n' +
    '                  alt=""\n' +
    '                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjIxIiB2aWV3Qm94PSIwIDAgMTIwIDIxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTAuNTk3OCAyMC4yMzAyQzQuNjA4NTIgMjAuMjMwMiAwLjM5MTYwMiAxNi4zMzI2IDAuMzkxNjAyIDEwLjQxMDdWMTAuMTM4OEMwLjM5MTYwMiA0LjIxNjkgNC42MDg1MiAwLjMxOTMzNiAxMC41OTc4IDAuMzE5MzM2SDI1LjA4MlYzLjEyOTIxSDEwLjU5NzhDNi4yODkxOCAzLjEyOTIxIDMuMjMzNDQgNS44NDg0NCAzLjIzMzQ0IDEwLjEwODZWMTAuMzgwNUMzLjIzMzQ0IDE0LjY0MDYgNi4yODkxOCAxNy4zNTk5IDEwLjU5NzggMTcuMzU5OUgyNS4wODJWMjAuMTY5N0gxMC41OTc4VjIwLjIzMDJaIiBmaWxsPSIjRjFGMkYyIi8+CjxwYXRoIGQ9Ik0zOC43NDEyIDIwLjIzMDJDMzIuNzUyIDIwLjIzMDIgMjguNTM1IDE2LjMzMjYgMjguNTM1IDEwLjQxMDdWMTAuMTM4OEMyOC41MzUgNC4yMTY5IDMyLjc1MiAwLjMxOTMzNiAzOC43NDEyIDAuMzE5MzM2SDQ3LjY2NEM1My42NTMyIDAuMzE5MzM2IDU3Ljg3MDIgNC4yMTY5IDU3Ljg3MDIgMTAuMTM4OFYxMC40MTA3QzU3Ljg3MDIgMTYuMzMyNiA1My42NTMyIDIwLjIzMDIgNDcuNjY0IDIwLjIzMDJIMzguNzQxMlpNNDcuNjMzNCAxNy40MjAzQzUxLjk0MiAxNy40MjAzIDU0Ljk5NzggMTQuNzAxMSA1NC45OTc4IDEwLjQ0MDlWMTAuMTM4OEM1NC45OTc4IDUuODc4NjYgNTEuOTQyIDMuMTU5NDMgNDcuNjMzNCAzLjE1OTQzSDM4LjcxMDdDMzQuNDAyMSAzLjE1OTQzIDMxLjM0NjMgNS44Nzg2NiAzMS4zNDYzIDEwLjEzODhWMTAuNDEwN0MzMS4zNDYzIDE0LjY3MDggMzQuNDAyMSAxNy4zOTAxIDM4LjcxMDcgMTcuMzkwMUg0Ny42MzM0VjE3LjQyMDNaIiBmaWxsPSIjRjFGMkYyIi8+CjxwYXRoIGQ9Ik02NC4xNjU0IDIwLjIzMDJINjEuMjkzVjE1LjQ1NjVDNjEuMjkzIDEzLjMxMTMgNjIuNzI5MiAxMS44OTEyIDY0Ljg5ODcgMTEuODkxMkg3Ni4yMzU1Qzc5Ljg0MTMgMTEuODkxMiA4MS43OTcgOS43MTU4NiA4MS43OTcgNy43MjE3NVY3LjE0NzY5QzgxLjc5NyA1LjE4MzggNzkuODQxMyAyLjk3ODIgNzYuMjM1NSAyLjk3ODJINjEuMzIzNVYwLjM0OTYwOUg3Ni41NDExQzgyLjYyMiAwLjM0OTYwOSA4NC42MDgzIDQuNjA5NzQgODQuNjA4MyA3LjE3NzkxVjcuNzIxNzVDODQuNjA4MyAxMC4zNTAzIDgyLjQ2OTMgMTQuNTUwMSA3Ni41NDExIDE0LjU1MDFINjUuNzg0OUM2NC44Mzc2IDE0LjU1MDEgNjQuMTk1OSAxNS4xODQ1IDY0LjE5NTkgMTYuMTIxMlYyMC4yMzAySDY0LjE2NTRaIiBmaWxsPSIjRjFGMkYyIi8+CjxwYXRoIGQ9Ik04OC4wMzAzIDAuMzE5MzM2SDkwLjkwMjdWMjAuMkg4OC4wMzAzVjAuMzE5MzM2WiIgZmlsbD0iI0YxRjJGMiIvPgo8cGF0aCBkPSJNOTcuODA4OSAzLjE1OTQyVjIwLjJIOTQuOTM2NVYwLjMxOTMzNkg5OS45MTc0QzEwMi4wODcgMC4zMTkzMzYgMTA0LjE2NSAxLjU1ODEgMTA1LjE3MyAzLjQ2MTU2TDExMS43MTMgMTUuOTdDMTEyLjE0IDE2Ljc4NTggMTEzLjA1NyAxNy4zNTk5IDExNC4wMDQgMTcuMzU5OUgxMTYuNzU1VjAuMzE5MzM2SDExOS42MjdWMjAuMkgxMTQuNjE1QzExMi40NDYgMjAuMiAxMTAuMzY4IDE4Ljk2MTIgMTA5LjM2IDE3LjA1NzdMMTAyLjgyIDQuNTQ5MjVDMTAyLjM5MyAzLjcwMzI3IDEwMS40NzYgMy4xNTk0MiAxMDAuNTI5IDMuMTU5NDJIOTcuODA4OVoiIGZpbGw9IiNGMUYyRjIiLz4KPC9zdmc+Cg=="\n' +
    '                  height="30px"\n' +
    '                />\n' +
    '              </td>\n' +
    '            </tr>\n' +
    '          </tbody>\n' +
    '        </table>\n' +
    '      </header>\n' +
    '\n' +
    '      <main>\n' +
    '        <div\n' +
    '          style="\n' +
    '            margin: 0;\n' +
    '            margin-top: 70px;\n' +
    '            padding: 92px 30px 115px;\n' +
    '            background: #ffffff;\n' +
    '            border-radius: 30px;\n' +
    '            text-align: center;\n' +
    '          "\n' +
    '        >\n' +
    '          <div style="width: 100%; max-width: 489px; margin: 0 auto;">\n' +
    '            <h1\n' +
    '              style="\n' +
    '                margin: 0;\n' +
    '                font-size: 24px;\n' +
    '                font-weight: 500;\n' +
    '                color: #1f1f1f;\n' +
    '              "\n' +
    '            >\n' +
    '              Your OTP\n' +
    '            </h1>\n' +
    '            <p\n' +
    '              style="\n' +
    '                margin: 0;\n' +
    '                margin-top: 17px;\n' +
    '                font-weight: 500;\n' +
    '                letter-spacing: 0.56px;\n' +
    '              "\n' +
    '            >\n' +
    '              Thank you for choosing Copin Analyzer. Use the following OTP to\n' +
    '              complete the procedure to forgot your password. OTP is valid for\n' +
    '              <span style="font-weight: 600; color: #1f1f1f;">5 minutes</span>.\n' +
    '              Do not share this code with others, including Copin Analyzer\n' +
    '              employees.\n' +
    '            </p>\n' +
    '            <p\n' +
    '              style="\n' +
    '                margin: 0;\n' +
    '                margin-top: 60px;\n' +
    '                font-size: 40px;\n' +
    '                font-weight: 600;\n' +
    '                letter-spacing: 25px;\n' +
    '                color: #ba3d4f;\n' +
    '              "\n' +
    '            >\n' +
    '              [OTP_CODE]\n' +
    '            </p>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <p\n' +
    '          style="\n' +
    '            max-width: 400px;\n' +
    '            margin: 0 auto;\n' +
    '            margin-top: 30px;\n' +
    '            text-align: center;\n' +
    '            font-weight: 500;\n' +
    '            color: #8c8c8c;\n' +
    '          "\n' +
    '        >\n' +
    '          Need help? Ask at\n' +
    '          <a\n' +
    '            href="mailto:archisketch@gmail.com"\n' +
    '            style="color: #499fb6; text-decoration: none;"\n' +
    '            >hi@copin.io</a\n' +
    '          >\n' +
    '          or visit our\n' +
    '          <a\n' +
    '            href=""\n' +
    '            target="https://t.me/Copin_io"\n' +
    '            style="color: #499fb6; text-decoration: none;"\n' +
    '            >Telegram</a\n' +
    '          >\n' +
    '        </p>\n' +
    '      </main>\n' +
    '\n' +
    '      <footer\n' +
    '        style="\n' +
    '          width: 100%;\n' +
    '          max-width: 490px;\n' +
    '          margin: 20px auto 0;\n' +
    '          text-align: center;\n' +
    '          border-top: 1px solid #e6ebf1;\n' +
    '        "\n' +
    '      >\n' +
    '        <p\n' +
    '          style="\n' +
    '            margin: 0;\n' +
    '            margin-top: 40px;\n' +
    '            font-size: 16px;\n' +
    '            font-weight: 600;\n' +
    '            color: #434343;\n' +
    '          "\n' +
    '        >\n' +
    '          Copin Analyzer\n' +
    '        </p>\n' +
    '        <p style="margin: 0; margin-top: 16px; color: #434343;">\n' +
    '          Copyright © 2023 Company. All rights reserved.\n' +
    '        </p>\n' +
    '      </footer>\n' +
    '    </div>\n' +
    '  </body>\n' +
    '</html>\n'
