import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    date: {
        type: String,
        default: null,
        validate: {
            validator: v => /^\d{4}-\d{2}-\d{2}$/.test(v) || v == null,
            message: props => `${props.value} is not a valid date format (expected YYYY-MM-DD)`,
        }
    },
    datetimeStart: {type: Date, default: null},
    datetimeEnd: {type: Date, default: null},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
}, {timestamps: true});

eventSchema.pre("save", function (next) {
    const hasDate = !!this.date;
    const hasDatetime = !!this.datetimeStart || !!this.datetimeEnd;

    if (hasDate && hasDatetime) {
        this.invalidate("date", "Cannot have both 'date' and 'datetime'");
    }

    if (!hasDate && !hasDatetime) {
        this.invalidate("date", "One of 'date' or 'datetime' is required");
    }

    if (!hasDate) {
        if (!this.datetimeStart) {
            this.invalidate("datetimeStart", "'datetimeStart' is required when using datetime event");
        }
        if (!this.datetimeEnd) {
            this.invalidate("datetimeEnd", "'datetimeEnd' is required when using datetime event");
        }
        if (this.datetimeStart && this.datetimeEnd && this.datetimeStart >= this.datetimeEnd) {
            this.invalidate("datetimeEnd", "'datetimeEnd' must be after 'datetimeStart'");
        }
    }

    next();
});


export default mongoose.model("Event", eventSchema);