const makeApplication = require("../../entities/application");
const { BadRequestError } = require("../../shared/errors");

/**
 * @param {object} deps
 * @param {import('../../data-access/equipmentDb')} deps.equipmentDb
 */

module.exports = function makeShowEquipment({ equipmentDb }) {
    return async function showEquipment(data) {
        try {
            console.log('Data', data)

            const applicationInfo = await equipmentDb.findOne({
                "passport.jsshir": data.passportJsshir,
                phone: data.phone
            });
            console.log('pppp', data, applicationInfo);
            if (!applicationInfo) {
                throw new BadRequestError(
                    "Bunday Passportli odam avval hujjat topshirmagagan"
                );
            }

            return applicationInfo;
        } catch (e) {

            throw e;
        }
    };
};
