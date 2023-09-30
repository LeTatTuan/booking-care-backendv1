require('dotenv').config();
import nodemailer from 'nodemailer';


let sendSimpleEmail = async (dataSend) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        }
    });

    let mailOptions = {
        from: '"Le Tat Tuan 👻" <letattuan04052003@gmail.com>',
        to: dataSend.receiverEmail,
        subject: "Thông tin đặt lịch khám bệnh",
        html: getBodyHTMLEmail(dataSend),
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked an online medical appointment on booking.care</p>
        <p>Information to schedule an appointment: </p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>

        <p>
            If the above information is true, please click
            Click the link below to confirm and complete the procedure
            schedule a medical examination
        </p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here!</a>
        </div>

        <div>Sincerely thank!</div>
        `
    }
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên booking.care</p>
        <p>Thông tin đặt lịch khám bệnh: </p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>
            Nếu các thông tin trên là đúng sự thật, vui lòng click
            vào đường link bên dưới để xác nhận và hoàn tất thủ tục
            đặt lịch khám bệnh
        </p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here!</a>
        </div>

        <div>Xin chân thành cám ơn!</div>
        `
    }

    return result;
}

let sendAttachment = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        }
    });

    let mailOptions = {
        from: '"Le Tat Tuan 👻" <letattuan04052003@gmail.com>',
        to: dataSend.email,
        subject: "Kết quả khám bệnh",
        attachments: [
            {   // encoded string as an attachment
                filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                content: dataSend.imgBase64.split('base64,')[1],
                encoding: 'base64'
            },
        ],
        html: getBodyHTMLEmailRemedy(dataSend),
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã  khám bệnh thành công!</p>
        <p>Thông tin kết quả khám bệnh(đơn thuốc/hóa đơn) được gửi trong
        file đính kèm.</p>

        <div>Xin chân thành cảm ơn!</div>
        `
    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You are receiving this email because your medical examination was successful!</p>
        <p>Medical examination result information (prescription/invoice) is sent in
        attached files.</p>

        <div>Sincerely thank!</div>
        `
    }

    return result;
}
module.exports = {
    sendSimpleEmail,
    sendAttachment
}