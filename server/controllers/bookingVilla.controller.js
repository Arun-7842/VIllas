import bookingModel from "../models/Booking.model.js";

export const bookVillaController = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      villaSelected,
      cities,
      person,
      startDate,
      endDate,
    } = req.body;

    if (
      !name ||
      !email ||
      !mobile ||
      !villaSelected ||
      !cities ||
      !person ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }

    const parsedStart = new Date(startDate);
    const parsedEnd = new Date(endDate);

    if (isNaN(parsedStart) || isNaN(parsedEnd)) {
      return res.status(400).json({
        message: "Invalid check-in or check-out date",
        error: true,
        success: false,
      });
    }

    const isVillaBooked = await bookingModel.findOne({
      villaSelected,
      $or: [
        {
          startDate: { $lte: parsedEnd },
          endDate: { $gte: parsedStart },
        },
      ],
    });

    if (isVillaBooked) {
      return res.status(409).json({
        message: "Villa is already booked",
        error: true,
        success: false,
      });
    }

    const villa = await bookingModel.create({
      name,
      email,
      mobile,
      villaSelected,
      cities,
      // roomType,
      person,
      startDate: parsedStart,
      endDate: parsedEnd,
    });

    return res.status(200).json({
      message: "Villa booked successfully",
      error: false,
      success: true,
      data: villa,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};
export const getAllBookingsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await bookingModel.countDocuments();
    const bookings = await bookingModel
      .find()
      .populate("villaSelected", "villaTitle")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      error: false,
      data: bookings,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};
export const checkAvailabilityController = async (req, res) => {
  const villaId = req.params.id;
  const { checkIn, checkOut, persons } = req.body;

  if (!checkIn || !checkOut || !persons) {
    return res.status(400).json({
      message: "Check-in, Check-out, and persons are required.",
      success: false,
    });
  }

  try {
    const conflict = await bookingModel.findOne({
      villaSelected: villaId,
      $or: [
        {
          startDate: { $lte: new Date(checkOut) },
          endDate: { $gte: new Date(checkIn) },
        },
      ],
    });

    if (conflict) {
      return res.status(200).json({
        message: "Villa is not available",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Villa is available",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};
