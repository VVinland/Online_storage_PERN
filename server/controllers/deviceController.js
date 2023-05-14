import path from 'path';
import fs, { lutimes } from 'fs';
import { Device, DeviceInfo } from './../models/models.js';
import ApiError from '../error/ApiError.js';

const __dirname = path.resolve();

class DeviceController {
    async create(req, res, next) {
        try {
            let { name, price, typeId, brandId, info } = req.body;
            const { file } = req.files;
            const img = file;
            fs.writeFile(path.join(__dirname + '/static/' + img.name), img.data, 'utf-8', (err) => {
                if (err) throw err;
            })
            const device = await Device.create({ name, price, brandId, typeId, img: img.name });
            if (info) {
                info = JSON.parse(info)
                for (const item of info) {
                    DeviceInfo.create({
                        title: item.title,
                        description: item.description,
                        deviceId: device.id
                    })
                }
            }
            return res.json(device)

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query;
        let devices;
        page = page || 1;
        limit = limit || 12;
        const offset = page * limit - limit
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset });
        }
        else if (!brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
        }
        else if (brandId && !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
        }
        else {
            devices = await Device.findAndCountAll({ limit, offset });
        }

        return res.json(devices);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const device = await Device.findOne({
            where: { id },
            include: [{ model: DeviceInfo, as: 'info' }]
        }
        );
        return res.json(device);
    }
}

export default new DeviceController();


