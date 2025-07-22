const Theater = require("../models/Theater");
exports.getTheaters = async (req, res) => {
    try {
        const city = req.params.city.toLowerCase();
        const theaters = await Theater.find({ city: new RegExp(city, "i") });

        if (theaters.length === 0) {
            console.warn(`No theaters found for city: ${city}. Returning default list.`);
            return res.json({
                source: "static",
                city,
                theaters: defaultTheaters
            });
        }

        res.json({
            source: "database",
            city,
            theaters
        });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};

exports.postTheater = async (req, res) => {
    try {
        const { name, area, city, screens } = req.body;

        if (!name || !area || !city || !screens) {
            return res.status(400).json({
                error: "All fields (name, area, city, screens) are required.",
            });
        }

        const newTheater = new Theater({ name, area, city, screens });
        await newTheater.save();

        res.status(201).json({
            message: "Theater added successfully",
            theater: newTheater,
        });
    } catch (err) {
        console.error("Error adding theater:", err);
        res.status(500).json({ error: "Server Error" });
    }
};

exports.deleteTheater = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTheater = await Theater.findByIdAndDelete(id);

        if (!deletedTheater) {
            return res.status(404).json({ error: "Theater not found" });
        }

        res.json({ message: "Theater deleted successfully", theater: deletedTheater });
    } catch (err) {
        console.error("Error deleting theater:", err);
        res.status(500).json({ error: "Server Error" });
    }
};

exports.updateTheaterDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, area, city, screens } = req.body;

        if (!name || !area || !city || !screens) {
            return res.status(400).json({ error: "All fields (name, area, city, screens) are required." });
        }

        const updatedTheater = await Theater.findByIdAndUpdate(
            id,
            { name, area, city, screens },
            { new: true, runValidators: true }
        );

        if (!updatedTheater) {
            return res.status(404).json({ error: "Theater not found" });
        }

        res.json({ message: "Theater updated successfully", theater: updatedTheater });
    } catch (err) {
        console.error("Error updating theater:", err);
        res.status(500).json({ error: "Server Error" });
    }
};