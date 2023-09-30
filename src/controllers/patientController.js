import patientService from "../services/patientService";

let postBookAppoitment = async (req, res) => {
    try {
        let infor = await patientService.postBookAppoitment(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
}

let postVerifyBookAppoitment = async (req, res) => {
    try {
        let infor = await patientService.postVerifyBookAppoitment(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
}
module.exports = {
    postBookAppoitment,
    postVerifyBookAppoitment
}