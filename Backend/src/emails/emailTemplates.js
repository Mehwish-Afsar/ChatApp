// utils/emailTemplate.js

const emailTemplate = ({ name, clientURL }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to Chat App</title>
</head>

<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 5px 15px rgba(0,0,0,.08);">

    <!-- Header -->
    <tr>
        <td
        align="center"
        style="
        background:linear-gradient(135deg,#32c5ff,#4a6cf7);
        padding:40px 20px;
        ">

            <div
            style="
            width:80px;
            height:80px;
            background:#ffffff;
            border-radius:50%;
            line-height:80px;
            font-size:36px;
            margin:auto;
            ">
            💬
            </div>

            <h1
            style="
            color:#fff;
            margin:20px 0 0;
            font-size:28px;
            font-weight:bold;
            ">
            Welcome to Chat App
            </h1>

        </td>
    </tr>

    <!-- Content -->
    <tr>
        <td style="padding:40px;">

            <h2
            style="
            margin:0;
            color:#333;
            ">
            Hello ${name},
            </h2>

            <p
            style="
            color:#666;
            line-height:1.8;
            font-size:15px;
            margin-top:20px;
            ">
            Welcome to <strong>Chat App</strong>! Your account has been created successfully.
            We're excited to have you join our community. You can now start chatting with
            friends, explore new conversations, and enjoy all the features our platform has to offer.
            </p>

            <!-- Steps Box -->
            <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="
            background:#f8fafc;
            border-left:4px solid #32c5ff;
            border-radius:8px;
            margin:30px 0;
            ">
                <tr>
                    <td style="padding:25px;">

                        <h3
                        style="
                        margin-top:0;
                        color:#333;
                        ">
                        Getting Started
                        </h3>

                        <ul
                        style="
                        padding-left:20px;
                        color:#666;
                        line-height:2;
                        ">
                            <li>Complete your profile.</li>
                            <li>Add a profile picture.</li>
                            <li>Start chatting with your friends.</li>
                            <li>Explore all the features of Chat App.</li>
                        </ul>

                    </td>
                </tr>
            </table>

            <!-- Button -->
            <div align="center">

                <a
                href="${clientURL}"
                style="
                display:inline-block;
                padding:14px 34px;
                background:#32c5ff;
                color:#ffffff;
                text-decoration:none;
                border-radius:40px;
                font-size:16px;
                font-weight:bold;
                ">
                Open Chat App
                </a>

            </div>

            <p
            style="
            color:#777;
            margin-top:40px;
            line-height:1.8;
            font-size:14px;
            ">
            If you have any questions, simply reply to this email.
            We're always happy to help.
            </p>

            <p
            style="
            color:#333;
            margin-top:30px;
            ">
            Best Regards,<br>
            <strong>Chat App Team</strong>
            </p>

        </td>
    </tr>

    <!-- Footer -->
    <tr>
        <td
        align="center"
        style="
        background:#f8fafc;
        padding:20px;
        color:#888;
        font-size:13px;
        ">
        © ${new Date().getFullYear()} Chat App. All Rights Reserved.
        </td>
    </tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};

module.exports = emailTemplate;