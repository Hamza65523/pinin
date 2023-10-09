const Pin = require('../models/pin'); // Import the Pin model


function generateRandomPIN() {
    const length = 6; // You can adjust the length as needed
    const characters = '0123456789';
    let pin = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      pin += characters.charAt(randomIndex);
    }
    return pin;
  }

  // Create a new pin
  exports.createPin = async (req, res) => {
    try {
      const {  latitude, longitude } = req.body;

const newPin = new Pin({
  pin:generateRandomPIN(),
  latitude,
  longitude,
  expireToken:new Date(Date.now() + customMinutes * 60 * 1000) 
});
const savedPin = await newPin.save();
      res.status(201).json(savedPin);
    } catch (error) {
      res.status(500).json({ error: 'Error creating pin' });
    }
  };
  
  // Get all pins
  exports.getAllPins = async (req, res) => {
    try {
      const pins = await Pin.find();
      res.status(200).json(pins);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching pins' });
    }
  };
  
  // Get a single pin by ID
  exports.getPinByPin = async (req, res) => {
    try {
      const pin = await Pin.findOne({pin:req.params.pin,expireToken:{$gt:Date.now()}});
      if (!pin) {
        return res.status(404).json({ error: 'Pin not found or Expired' });
      }
      res.status(200).json(pin);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching pin' });
    }
  };
  
  // Update a pin by ID
  exports.updatePin = async (req, res) => {
    try {
      const {latitude,longitude,customMinutes} = req.body;
      const updatedPin = await Pin.findOneAndUpdate({pin:req.params.pin},{
        pin:generateRandomPIN(),
        latitude,
        longitude,
        expireToken:new Date(Date.now() + customMinutes * 60 * 1000) 
      }, {
        new: true,
      });
      if (!updatedPin) {
        return res.status(404).json({ error: 'Pin not found' });
      }
      res.status(200).json(updatedPin);
    } catch (error) {
      res.status(500).json({ error: 'Error updating pin' });
    }
  };
  
  // Delete a pin by ID
  exports.deletePin = async (req, res) => {
    try {
      const deletedPin = await Pin.findOneAndRemove({pin:req.params.pin});
      if (!deletedPin) {
        return res.status(404).json({ error: 'Pin not found' });
      }
      res.status(200).json({ message: 'Pin deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting pin' });
    }
  };
  