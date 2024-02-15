import User from "../models/User.js";
import Appointment from "../models/Appointments.js";
// Read User on the id basis

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (er) {
    res.status(500).json({ error: er.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, skills, location, picturePath }) => {
        return { _id, firstName, lastName, skills, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update add remove firends

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Search
export const searchUser = async (req, res) => {
  try {
    // Get search criteria from query parameters
    const { keyword } = req.query;

    // Perform a case-insensitive search for users based on name and skills
    const users = await User.find({
      $or: [
        { firstName: { $regex: new RegExp(keyword, "i") } },
        { lastName: { $regex: new RegExp(keyword, "i") } },
        { mentorSkills: { $in: [new RegExp(keyword, "i")] } }, // Use $in to match any skill in the array
      ],
    });

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const becomeMentor = async (req, res) => {
  try {
    const { id } = req.params;
    const { mentorSkills } = req.body;
    console.log(mentorSkills);
    const user = await User.findById(id);
    user.isA = "Mentor";
    user.mentorSkills = mentorSkills;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const { date } = req.body;
    const user = await User.findById(id);
    const existingAppointment = user.appointments.find(
      (appointment) => appointment.date === date
    );
    if (existingAppointment) {
      return res.status(400).json({
        error: "Appointment time slot is already booked.",
      });
    }
    const appointment = new Appointment({
      date,
      createdBy: user._id,
      recipient: userId,
    });

    // Save the appointment
    await appointment.save();

    user.appointments.push(appointment._id);
    await user.save();
    const recipientUser = await User.findById(userId);
    if (recipientUser) {
      recipientUser.appointments.push(appointment._id);
      await recipientUser.save();
    }
    return res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
  }
};
