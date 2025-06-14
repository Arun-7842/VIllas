// import VillaShowCase from "../models/villaShowCase.model.js";
import VillaShowCase from "../models/villaShowCase.model.js";

export const AddVillaShowCase = async (req, res) => {
  try {
    const {
      villaTitle,
      villaType,
      description,
      state,
      city,
      pricePerNight,
      discountOffer,
      numberOfBedrooms,
      numberOfBathrooms,
      capacity,
      roomType,
      aminities,
      availableDate,
      coverImage,
      images,
    } = req.body;
    const villaShowCase = new VillaShowCase({
      villaTitle,
      villaType,
      description,
      state,
      city,
      pricePerNight,
      discountOffer,
      numberOfBedrooms,
      numberOfBathrooms,
      capacity,
      roomType,
      aminities,
      availableDate,
      images,
      coverImage,
    });
    const saveVillaShowCase = await villaShowCase.save();
    return res.status(200).json({
      message: "Villa added successfully",
      data: saveVillaShowCase,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getVillaController = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const villa = await VillaShowCase.findById(id);
      if (!villa) {
        return res.status(404).json({
          message: "Villa not found",
          error: true,
          success: false,
        });
      }
      return res.status(200).json({
        message: "Villa found successfully",
        data: villa,
        error: false,
        success: true,
      });
    }

    const villas = await VillaShowCase.find();
    return res.status(200).json({
      data: villas,
      message: "All Villas found successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateVillaController = async (req, res) => {
  try {
    const { id } = req.params;

    const updateVilla = await VillaShowCase.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateVilla) {
      return res.status(404).json({
        message: "Villa not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Villa updated successfully",
      data: updateVilla,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const deleteVillaController = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteVilla = await VillaShowCase.findByIdAndDelete(id);

    if (!deleteVilla) {
      return res.status(404).json({
        message: "Villa not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Villa deleted successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
