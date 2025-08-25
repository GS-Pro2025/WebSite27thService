import User from "../models/User";
import Move from "../models/Move";
import Payment from "../models/Payment";
import MoveItem from "../models/MoveItem";
import CalendarEvent from "../models/CalendarEvent";
import Service from "../models/Services";
import MoveService from "../models/MoveService";
import Person from "../models/Person";

export const setupAssociations = () => {
  User.hasOne(Person, {
    foreignKey: "user_id",
    as: "personDetails",
  });

  Person.belongsTo(User, {
    foreignKey: "user_id",
    as: "userAccount",
  });
  Person.hasMany(Move, {
    foreignKey: "person_id",
    as: "moves",
  });
  Move.belongsTo(Person, {
    foreignKey: "person_id",
    as: "client",
  });
  Move.hasMany(Payment, {
    foreignKey: "move_id",
  });

  Payment.belongsTo(Move, {
    foreignKey: "move_id",
    as: "move",
  });
  Move.hasMany(MoveItem, {
    foreignKey: "move_id",
  });

  MoveItem.belongsTo(Move, {
    foreignKey: "move_id",
    as: "move",
  });

  Move.hasMany(CalendarEvent, {
    foreignKey: "move_id",
  });

  CalendarEvent.belongsTo(Move, {
    foreignKey: "move_id",
    as: "move",
  });
  Move.belongsToMany(Service, {
    through: MoveService,
    foreignKey: "move_id",
    as: "services",
  });

  Service.belongsToMany(Move, {
    through: MoveService,
    foreignKey: "service_id",
    as: "moves",
  });
};
