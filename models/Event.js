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

eventSchema.pre("validate", function (next) {
    const errors = [];

    const hasDate = !!this.date;
    const hasDatetime = !!this.datetimeStart || !!this.datetimeEnd;

    if (hasDate && hasDatetime) {
        errors.push({ path: "date", message: "Cannot have both 'date' and 'datetime'" });
    }

    if (!hasDate && !hasDatetime) {
        errors.push({ path: "date", message: "One of 'date' or 'datetime' is required" });
    }

    if (!hasDate) {
        if (!this.datetimeStart) {
            errors.push({ path: "datetimeStart", message: "'datetimeStart' is required" });
        }
        if (!this.datetimeEnd) {
            errors.push({ path: "datetimeEnd", message: "'datetimeEnd' is required" });
        }
        if (
            this.datetimeStart &&
            this.datetimeEnd &&
            this.datetimeStart >= this.datetimeEnd
        ) {
            errors.push({ path: "datetimeEnd", message: "'datetimeEnd' must be after 'datetimeStart'" });
        }
    }

    if (errors.length > 0) {
        errors.forEach(e => this.invalidate(e.path, e.message));
    }

    next();
});



export default mongoose.model("Event", eventSchema);