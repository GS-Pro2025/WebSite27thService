import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { EventStatus } from "../enums/enums";

export interface CalendarEventAttributes {
  event_id?: number;
  move_id: string;
  google_event_id: string | null;
  event_status: EventStatus | null;
}

class CalendarEvent
  extends Model<CalendarEventAttributes>
  implements CalendarEventAttributes
{
  public event_id!: number;
  public move_id!: string;
  public google_event_id!: string | null;
  public event_status!: EventStatus | null;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

CalendarEvent.init(
  {
    event_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    move_id: {
      type: DataTypes.CHAR(12),
      allowNull: false,
      references: {
        model: "moves",
        key: "move_id",
      },
    },
    google_event_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    event_status: {
      type: DataTypes.ENUM(...Object.values(EventStatus)),
      allowNull: true,
      defaultValue: EventStatus.SCHEDULED,
    },
  },
  {
    sequelize,
    tableName: "calendar_events",
    timestamps: true,
  }
);

export default CalendarEvent;
