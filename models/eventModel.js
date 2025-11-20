import Event from "../schema/eventSchema.js";

class eventModel {

    async createEvent(eventData) {
        return await Event.create(eventData);
    }

    async getActiveEventBySpot(spot_num) {
        return await Event.findOne({
            spot_num,
            status: "occupied"
        });
    }

    async closeEvent(spot_num) {
        const event = await this.getActiveEventBySpot(spot_num);
        if (!event) return null; 

        const exitTime = new Date();
        const durationMinutes = Math.round(
            (exitTime - event.entry_time) / (1000 * 60)
        );

        return await Event.findByIdAndUpdate(
            event._id,
            {
                exit_time: exitTime,
                duration: durationMinutes,
                status: "completed"
            },
            { new: true }
        );
    }

    async getAll() {
        return await Event.find();
    }

    async getEventsBySpot(spot_num) {
        return await Event.find({ spot_num });
    }

    async getEventsBySpotOrdered(spot_num) {
        return await Event.find({ spot_num }).sort({ entry_time: -1 });
    }

    async getAverageDuration() {
        const result = await Event.aggregate([
            { $match: { status: "completed" } },
            {
                $group: {
                    _id: null,
                    avgDuration: { $avg: "$duration" }
                }
            }
        ]);

        return result[0] || { avgDuration: 0 };
    }

    async getEventsByDay() {
        return await Event.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$entry_time" },
                        month: { $month: "$entry_time" },
                        day: { $dayOfMonth: "$entry_time" }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 } }
        ]);
    }

}

export default new eventModel();
