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
// Set the expireToken field to 30 minutes from now
newPin.expireToken = new Date(Date.now() + 30 * 60 * 1000);

// Save the newPin
newPin.save().then((result) => {
  console.log('Token will expire in 30 minutes:', result);
});

// Set the expireToken field to 1 hour from now
newPin.expireToken = new Date(Date.now() + 60 * 60 * 1000);

// Save the newPin again
newPin.save().then((result) => {
  console.log('Token will expire in 1 hour:', result);
});

// Set the expireToken field to 3 hours from now
newPin.expireToken = new Date(Date.now() + 3 * 60 * 60 * 1000);

      const newPin = new Pin({
        pin:generateRandomPIN(),
        latitude,
        longitude,
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
  exports.getPinById = async (req, res) => {
    try {
      const pin = await Pin.findById(req.params.id);
      if (!pin) {
        return res.status(404).json({ error: 'Pin not found' });
      }
      res.status(200).json(pin);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching pin' });
    }
  };
  
  // Update a pin by ID
  exports.updatePin = async (req, res) => {
    try {
      const updatedPin = await Pin.findByIdAndUpdate(req.params.id, req.body, {
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
      const deletedPin = await Pin.findByIdAndRemove(req.params.id);
      if (!deletedPin) {
        return res.status(404).json({ error: 'Pin not found' });
      }
      res.status(200).json({ message: 'Pin deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting pin' });
    }
  };
  