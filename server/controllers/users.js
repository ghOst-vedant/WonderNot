import User from "../models/User.js";
import Appointment from "../models/Appointments.js";
import AcceptedAppointment from "../models/AcceptedAppointments.js";
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

// Become mentor
export const becomeMentor = async (req, res) => {
  try {
    const { id } = req.params;
    const { mentorSkills } = req.body;
    const user = await User.findById(id);
    user.isA = "Mentor";
    user.mentorSkills = mentorSkills;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create appointment
export const createAppointment = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const { description } = req.body;
    const user = await User.findById(id);

    const appointment = new Appointment({
      description,
      createdBy: user._id,
      recipient: userId,
    });
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

export const acceptApponintment = async (req, res) => {
  try {
    const { id, sender, requestId } = req.params;

    const { meetingLink, date } = req.body;
    const user = await User.findById(id);
    const recipient = await User.findById(sender);
    const acceptedAppointment = new AcceptedAppointment({
      date,
      appointmentId: requestId,
      createdBy: id,
      meetingLink,
      recipient: sender,
    });

    await acceptedAppointment.save();
    user.acceptedAppointments.push(acceptedAppointment._id);
    recipient.acceptedAppointments.push(acceptedAppointment._id);
    await user.save();
    await recipient.save();
    return res.status(201).json(acceptedAppointment);
  } catch (error) {
    console.error(error);
  }
};
// get Appointment
export const getAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.find({ recipient: id });
    res.status(200).json({ appointment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRequest = async (req, res) => {
  const { requestId } = req.params;
  try {
    // Find the request in the database
    const request = await Appointment.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }
    const { createdBy, recipient } = request;
    const mentee = await User.findById(createdBy);
    const mentor = await User.findById(recipient);
    mentee.appointments = mentee.appointments.filter(
      (id) => id.toString() !== request._id.toString()
    );
    mentor.appointments = mentor.appointments.filter(
      (id) => id.toString() !== request._id.toString()
    );
    await mentor.save();
    await mentee.save();
    await request.deleteOne();
    return res.status(204).send(); // Respond with 204 No Content on successful deletion
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
