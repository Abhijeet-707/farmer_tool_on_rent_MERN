const pool = require('../db/connectionobj.js');

const registerUser = (request, response) => {
    const { fullName, village, mobile, password } = request.body;
    pool.query("SELECT * FROM users WHERE mobile = $1", [mobile], (error, results) => {
        if (error) return response.status(500).json({ error: error.message });
        if (results.rows.length > 0) return response.status(400).json({ message: "આ મોબાઇલ નંબર પહેલેથી જ નોંધાયેલ છે." });

        pool.query(
            "INSERT INTO users (full_name, village, mobile, password) VALUES ($1, $2, $3, $4) RETURNING id, full_name, role", 
            [fullName, village, mobile, password], 
            (error, results) => {
                if(error) return response.status(500).json({ error: error.message });
                response.status(200).json({ success: true, message: "ખાતું સફળતાપૂર્વક બનાવવામાં આવ્યું છે.", user: results.rows[0] });
            }
        );
    });
};

const loginUser = (request, response) => {
    const { mobile, password } = request.body;
    pool.query("SELECT * FROM users WHERE mobile = $1 AND password = $2", [mobile, password], (error, results) => {
        if(error) return response.status(500).json({ error: error.message });
        if (results.rows.length > 0) {
            const user = results.rows[0];
            response.status(200).json({ success: true, message: "લૉગિન સફળ.", user: { id: user.id, name: user.full_name, role: user.role } });
        } else {
            response.status(401).json({ success: false, message: "અમાન્ય મોબાઇલ નંબર અથવા પાસવર્ડ." });
        }
    });
};

// --- TOOLS CRUD ---
const getAllTools = (req, res) => {
    pool.query(`
        SELECT t.*, 
        CASE WHEN (SELECT COUNT(*) FROM bookings b WHERE b.tool_id = t.id) >= 2 THEN true ELSE false END as is_popular 
        FROM tools t 
        ORDER BY t.created_at DESC
    `, (error, results) => {
        if(error) return res.status(500).json({ error: error.message });
        res.status(200).json(results.rows);
    });
};

const addTool = (req, res) => {
    const { owner_id, name, category, location, price_hour, price_day, description, image, is_popular } = req.body;
    pool.query(
        "INSERT INTO tools (owner_id, name, category, location, price_hour, price_day, description, image, is_popular) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
        [owner_id || 1, name, category, location, price_hour, price_day, description, image, is_popular || false],
        (error, results) => {
            if(error) return res.status(500).json({ error: error.message });
            res.status(201).json({ success: true, tool: results.rows[0] });
        }
    );
};

const updateTool = (req, res) => {
    const { id } = req.params;
    const { name, category, location, price_hour, price_day, description, image, is_popular } = req.body;
    pool.query(
        "UPDATE tools SET name=$1, category=$2, location=$3, price_hour=$4, price_day=$5, description=$6, image=$7, is_popular=$8 WHERE id=$9 RETURNING *",
        [name, category, location, price_hour, price_day, description, image, is_popular, id],
        (error, results) => {
            if(error) return res.status(500).json({ error: error.message });
            res.status(200).json({ success: true, tool: results.rows[0] });
        }
    );
};

const deleteTool = (req, res) => {
    const { id } = req.params;
    pool.query("DELETE FROM tools WHERE id=$1", [id], (error, results) => {
        if(error) return res.status(500).json({ error: error.message });
        res.status(200).json({ success: true, message: "Tool deleted" });
    });
};

// --- BOOKINGS FLOW ---
const createBooking = (req, res) => {
    const { tool_id, renter_id, booking_date, booking_time, hours, address, total_cost } = req.body;
    pool.query(
        "INSERT INTO bookings (tool_id, renter_id, booking_date, booking_time, hours, address, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [tool_id, renter_id, booking_date, booking_time, hours, address, total_cost],
        (error, results) => {
            if(error) return res.status(500).json({ error: error.message });
            res.status(201).json({ success: true, booking: results.rows[0] });
        }
    );
};

const getAllBookings = (req, res) => {
    // Admin needs all data
    pool.query(
        `SELECT b.*, t.name as tool_name, t.image as tool_image, u.full_name as renter_name, u.mobile as renter_mobile 
         FROM bookings b JOIN tools t ON b.tool_id = t.id JOIN users u ON b.renter_id = u.id 
         ORDER BY b.created_at DESC`,
        (error, results) => {
            if(error) return res.status(500).json({ error: error.message });
            res.status(200).json(results.rows);
        }
    );
};

const getFarmerBookings = (req, res) => {
    const { id } = req.params;
    pool.query(
        `SELECT b.*, t.name as tool_name, t.image as tool_image 
         FROM bookings b JOIN tools t ON b.tool_id = t.id 
         WHERE b.renter_id = $1 ORDER BY b.created_at DESC`,
        [id],
        (error, results) => {
            if(error) return res.status(500).json({ error: error.message });
            res.status(200).json(results.rows);
        }
    );
};

const updateBookingStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    pool.query(
        "UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *",
        [status, id],
        (error, results) => {
            if(error) return res.status(500).json({ error: error.message });
            res.status(200).json({ success: true, booking: results.rows[0] });
        }
    );
};

const deleteBooking = (req, res) => {
    const { id } = req.params;
    pool.query("DELETE FROM bookings WHERE id=$1", [id], (error, results) => {
        if(error) return res.status(500).json({ error: error.message });
        res.status(200).json({ success: true, message: "Booking deleted" });
    });
};

module.exports = {
    registerUser, loginUser,
    getAllTools, addTool, updateTool, deleteTool,
    createBooking, getAllBookings, getFarmerBookings, updateBookingStatus, deleteBooking
};
